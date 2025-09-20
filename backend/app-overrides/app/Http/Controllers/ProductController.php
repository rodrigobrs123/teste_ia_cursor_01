<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::query()->orderBy('id', 'desc')->get();
        return response()->json([ 'data' => $products ]);
    }

    public function show($id)
    {
        $product = Product::findOrFail($id);
        return response()->json([ 'data' => $product ]);
    }

    public function bulk(Request $request)
    {
        $ids = collect(explode(',', (string) $request->query('ids')))
            ->filter(fn($v) => is_numeric($v))
            ->map(fn($v) => (int) $v)
            ->values();

        $products = Product::whereIn('id', $ids)->get();
        return response()->json([ 'data' => $products ]);
    }
}

