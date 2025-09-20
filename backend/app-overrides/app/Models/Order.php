<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'status', 'total_cents', 'payment_reference', 'customer_email', 'customer_name'
    ];

    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }
}

