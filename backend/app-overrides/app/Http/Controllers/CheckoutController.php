<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Http;

class CheckoutController extends Controller
{
    public function start(Request $request)
    {
        $validated = $request->validate([
            'items' => 'required|array|min:1',
            'items.*.id' => 'required|integer|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
        ]);

        $items = collect($validated['items']);
        $products = Product::whereIn('id', $items->pluck('id'))->get()->keyBy('id');

        $totalCents = 0;
        foreach ($items as $it) {
            $product = $products[$it['id']];
            $totalCents += $product->price_cents * $it['quantity'];
        }

        $order = Order::create([
            'status' => 'pending',
            'total_cents' => $totalCents,
        ]);

        foreach ($items as $it) {
            $product = $products[$it['id']];
            OrderItem::create([
                'order_id' => $order->id,
                'product_id' => $product->id,
                'quantity' => $it['quantity'],
                'price_cents' => $product->price_cents,
            ]);
        }

        // Nuvem Pago integration: create checkout session
        $paymentApiUrl = env('NUVEM_PAGO_API_URL', 'https://api.nuvempago.com/v1');
        $paymentApiKey = env('NUVEM_PAGO_API_KEY', 'demo_key');

        $callbackUrl = url('/api/payments/webhook');
        $frontendBase = env('FRONTEND_URL', 'http://localhost:5173');
        $successUrl = rtrim($frontendBase, '/') . '/sucesso';

        try {
            $response = Http::withToken($paymentApiKey)->post($paymentApiUrl . '/checkout/sessions', [
                'amount' => $totalCents,
                'currency' => 'BRL',
                'reference' => 'order_' . $order->id,
                'metadata' => [ 'order_id' => $order->id ],
                'callback_url' => $callbackUrl,
                'success_url' => $successUrl,
                'items' => $order->items()->with('product')->get()->map(function ($item) {
                    return [
                        'name' => $item->product->name,
                        'unit_amount' => $item->price_cents,
                        'quantity' => $item->quantity,
                    ];
                }),
            ]);

            if (!$response->successful()) {
                Log::error('Nuvem Pago failure', ['body' => $response->body()]);
                return response()->json(['message' => 'Falha ao iniciar pagamento'], 500);
            }

            $payment = $response->json();
            $order->payment_reference = $payment['id'] ?? null;
            $order->save();

            return response()->json([
                'payment_url' => $payment['checkout_url'] ?? $payment['url'] ?? '#'
            ]);
        } catch (\Throwable $e) {
            Log::error('Payment error', ['error' => $e->getMessage()]);
            return response()->json(['message' => 'Erro ao processar pagamento'], 500);
        }
    }
}

