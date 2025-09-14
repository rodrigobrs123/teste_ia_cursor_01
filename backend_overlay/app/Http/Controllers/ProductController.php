<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Http\Resources\ProductResource;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $products = Product::query()->latest()->paginate(20);
        return ProductResource::collection($products);
    }

    public function show(int $id)
    {
        $product = Product::query()->findOrFail($id);
        return new ProductResource($product);
    }
}

