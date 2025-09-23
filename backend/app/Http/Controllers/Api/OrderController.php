<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\CartItem;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'customer_name' => 'required|string|max:255',
            'customer_email' => 'required|email|max:255',
            'customer_phone' => 'required|string|max:20',
            'shipping_address' => 'required|string',
            'city' => 'required|string|max:255',
            'state' => 'required|string|max:255',
            'zip_code' => 'required|string|max:10',
        ]);

        $sessionId = $request->header('X-Session-ID') ?? session()->getId();
        
        $cartItems = CartItem::with('product')
            ->where('session_id', $sessionId)
            ->get();

        if ($cartItems->isEmpty()) {
            return response()->json(['message' => 'Cart is empty'], 400);
        }

        return DB::transaction(function () use ($request, $cartItems) {
            // Calculate totals
            $subtotal = $cartItems->sum(function ($item) {
                return $item->getTotal();
            });
            
            $shippingCost = $this->calculateShipping($subtotal);
            $total = $subtotal + $shippingCost;

            // Create order
            $order = Order::create([
                'customer_name' => $request->customer_name,
                'customer_email' => $request->customer_email,
                'customer_phone' => $request->customer_phone,
                'shipping_address' => $request->shipping_address,
                'city' => $request->city,
                'state' => $request->state,
                'zip_code' => $request->zip_code,
                'subtotal' => $subtotal,
                'shipping_cost' => $shippingCost,
                'total' => $total,
                'status' => 'pending',
                'payment_status' => 'pending'
            ]);

            // Generate order number
            $order->order_number = $order->generateOrderNumber();
            $order->save();

            // Create order items
            foreach ($cartItems as $cartItem) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $cartItem->product_id,
                    'product_name' => $cartItem->product->name,
                    'product_sku' => $cartItem->product->sku,
                    'product_price' => $cartItem->price,
                    'quantity' => $cartItem->quantity,
                    'total' => $cartItem->getTotal()
                ]);
            }

            // Clear cart
            CartItem::where('session_id', $cartItems->first()->session_id)->delete();

            return response()->json([
                'message' => 'Order created successfully',
                'order' => $order->load('orderItems')
            ]);
        });
    }

    public function show($orderNumber): JsonResponse
    {
        $order = Order::with('orderItems.product')
            ->where('order_number', $orderNumber)
            ->firstOrFail();

        return response()->json($order);
    }

    public function processPayment(Request $request, $orderNumber): JsonResponse
    {
        $request->validate([
            'payment_method' => 'required|string',
            'payment_data' => 'required|array'
        ]);

        $order = Order::where('order_number', $orderNumber)->firstOrFail();

        if ($order->payment_status === 'paid') {
            return response()->json(['message' => 'Order already paid'], 400);
        }

        // Here you would integrate with Nuvem Pago API
        // For now, we'll simulate a successful payment
        $paymentResult = $this->processNuvemPagoPayment($order, $request->all());

        if ($paymentResult['success']) {
            $order->update([
                'payment_status' => 'paid',
                'status' => 'processing',
                'payment_method' => $request->payment_method,
                'payment_transaction_id' => $paymentResult['transaction_id'],
                'payment_data' => $request->payment_data
            ]);

            return response()->json([
                'message' => 'Payment processed successfully',
                'order' => $order
            ]);
        } else {
            $order->update([
                'payment_status' => 'failed'
            ]);

            return response()->json([
                'message' => 'Payment failed',
                'error' => $paymentResult['error']
            ], 400);
        }
    }

    private function calculateShipping($subtotal): float
    {
        // Free shipping over R$ 200
        if ($subtotal >= 200) {
            return 0;
        }
        
        return 15.90; // Fixed shipping rate
    }

    private function processNuvemPagoPayment($order, $paymentData): array
    {
        // This is where you would integrate with Nuvem Pago API
        // For demonstration purposes, we'll simulate a successful payment
        
        // Simulate API call delay
        usleep(500000); // 0.5 seconds
        
        // Simulate success (90% success rate)
        $success = rand(1, 10) <= 9;
        
        if ($success) {
            return [
                'success' => true,
                'transaction_id' => 'NP_' . time() . '_' . $order->id
            ];
        } else {
            return [
                'success' => false,
                'error' => 'Payment declined by bank'
            ];
        }
    }
}
