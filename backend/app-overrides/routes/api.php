<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\PaymentWebhookController;

Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/bulk', [ProductController::class, 'bulk']);
Route::get('/products/{id}', [ProductController::class, 'show']);

Route::post('/checkout', [CheckoutController::class, 'start']);
Route::post('/payments/webhook', [PaymentWebhookController::class, 'handle']);

