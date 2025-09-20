<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class PaymentWebhookController extends Controller
{
    public function handle(Request $request)
    {
        $payload = $request->all();
        Log::info('Webhook received', $payload);

        $reference = $payload['reference'] ?? null;
        $status = $payload['status'] ?? null;

        if (!$reference || !$status || !str_starts_with($reference, 'order_')) {
            return response()->json(['message' => 'ignored']);
        }

        $orderId = (int) str_replace('order_', '', $reference);
        $order = Order::find($orderId);
        if (!$order) return response()->json(['message' => 'not found'], 404);

        if (in_array($status, ['paid', 'succeeded'])) {
            $order->status = 'paid';
        } elseif (in_array($status, ['failed', 'canceled'])) {
            $order->status = 'failed';
        } else {
            $order->status = $status;
        }
        $order->save();

        return response()->json(['ok' => true]);
    }
}

