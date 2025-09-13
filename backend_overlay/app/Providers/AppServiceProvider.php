<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Services\Payment\NuvemPagoClient;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->singleton(NuvemPagoClient::class, function () {
            return new NuvemPagoClient();
        });
    }

    public function boot(): void
    {
        //
    }
}

