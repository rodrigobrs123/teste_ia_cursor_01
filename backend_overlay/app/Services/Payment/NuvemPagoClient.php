<?php

namespace App\Services\Payment;

use Illuminate\Support\Facades\Http;

class NuvemPagoClient
{
    public function __construct(private ?string $baseUrl = null, private ?string $apiKey = null)
    {
        $this->baseUrl = $baseUrl ?? config('nuvempago.base_url');
        $this->apiKey = $apiKey ?? config('nuvempago.key');
    }

    public function createPaymentIntent(string $orderId, int $amountCents, string $currency = 'BRL', array $customer = []): array
    {
        $endpoint = rtrim($this->baseUrl, '/').'/payments';

        $frontend = config('app.frontend_url', env('FRONTEND_URL', 'http://localhost:5173'));
        $payload = [
            'order_id' => $orderId,
            'amount' => $amountCents,
            'currency' => $currency,
            'customer' => $customer,
            'callback_url' => config('app.url').'/api/payments/webhook',
            'success_url' => rtrim($frontend, '/').'/success',
            'failure_url' => rtrim($frontend, '/').'/checkout',
        ];

        $response = Http::withHeaders([
            'Authorization' => 'Bearer '.$this->apiKey,
            'Accept' => 'application/json',
        ])->post($endpoint, $payload);

        if ($response->failed()) {
            return [
                'status' => 'error',
                'message' => $response->body(),
            ];
        }

        return $response->json();
    }
}

