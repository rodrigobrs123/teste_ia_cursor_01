<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class WebhookController extends Controller
{
    public function handle(Request $request)
    {
        $event = $request->all();
        Log::info('Payment webhook received', $event);

        $orderId = data_get($event, 'data.order_id');
        $status = data_get($event, 'data.status');

        if ($orderId && $status) {
            $order = Order::query()->find($orderId);
            if ($order) {
                $order->status = $status;
                $order->save();
            }
        }

        return response()->json(['received' => true]);
    }
}

