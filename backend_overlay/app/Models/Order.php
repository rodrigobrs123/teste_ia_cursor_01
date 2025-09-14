<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'status', 'currency', 'total_amount', 'payment_url'
    ];

    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }
}

