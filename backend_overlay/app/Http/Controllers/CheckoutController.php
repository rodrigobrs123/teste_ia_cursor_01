<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Services\Payment\NuvemPagoClient;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rule;

class CheckoutController extends Controller
{
    public function checkout(Request $request, NuvemPagoClient $payments)
    {
        $data = $request->validate([
            'items' => ['required','array','min:1'],
            'items.*.product_id' => ['required','integer','exists:products,id'],
            'items.*.quantity' => ['required','integer','min:1'],
            'customer.email' => ['nullable','email'],
            'customer.name' => ['nullable','string','max:255'],
        ]);

        return DB::transaction(function () use ($data, $payments) {
            $order = new Order();
            $order->status = 'pending';
            $order->currency = 'BRL';
            $order->total_amount = 0;
            $order->save();

            $amount = 0;
            foreach ($data['items'] as $itemData) {
                $product = Product::query()->findOrFail($itemData['product_id']);
                $lineTotal = (int) round($product->price * 100) * $itemData['quantity'];
                $amount += $lineTotal;

                $item = new OrderItem();
                $item->order_id = $order->id;
                $item->product_id = $product->id;
                $item->quantity = $itemData['quantity'];
                $item->unit_amount = (int) round($product->price * 100);
                $item->total_amount = $lineTotal;
                $item->save();
            }

            $order->total_amount = $amount;
            $order->save();

            $payment = $payments->createPaymentIntent(
                orderId: (string) $order->id,
                amountCents: $amount,
                currency: $order->currency,
                customer: $data['customer'] ?? []
            );

            if (isset($payment['payment_url'])) {
                $order->payment_url = $payment['payment_url'];
                $order->save();
            }

            return response()->json([
                'order_id' => $order->id,
                'amount' => $amount,
                'currency' => $order->currency,
                'payment' => $payment,
            ]);
        });
    }
}

