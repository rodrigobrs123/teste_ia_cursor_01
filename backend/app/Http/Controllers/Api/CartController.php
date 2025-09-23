<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CartItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class CartController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $sessionId = $request->header('X-Session-ID') ?? session()->getId();
        
        $cartItems = CartItem::with('product.category')
            ->where('session_id', $sessionId)
            ->get();

        $total = $cartItems->sum(function ($item) {
            return $item->getTotal();
        });

        return response()->json([
            'items' => $cartItems,
            'total' => $total,
            'count' => $cartItems->sum('quantity')
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1'
        ]);

        $sessionId = $request->header('X-Session-ID') ?? session()->getId();
        $product = Product::findOrFail($request->product_id);

        // Check if item already exists in cart
        $cartItem = CartItem::where('session_id', $sessionId)
            ->where('product_id', $request->product_id)
            ->first();

        if ($cartItem) {
            $cartItem->quantity += $request->quantity;
            $cartItem->save();
        } else {
            $cartItem = CartItem::create([
                'session_id' => $sessionId,
                'product_id' => $request->product_id,
                'quantity' => $request->quantity,
                'price' => $product->getCurrentPrice()
            ]);
        }

        return response()->json([
            'message' => 'Item added to cart',
            'item' => $cartItem->load('product')
        ]);
    }

    public function update(Request $request, $id): JsonResponse
    {
        $request->validate([
            'quantity' => 'required|integer|min:1'
        ]);

        $sessionId = $request->header('X-Session-ID') ?? session()->getId();
        
        $cartItem = CartItem::where('id', $id)
            ->where('session_id', $sessionId)
            ->firstOrFail();

        $cartItem->quantity = $request->quantity;
        $cartItem->save();

        return response()->json([
            'message' => 'Cart item updated',
            'item' => $cartItem->load('product')
        ]);
    }

    public function destroy(Request $request, $id): JsonResponse
    {
        $sessionId = $request->header('X-Session-ID') ?? session()->getId();
        
        $cartItem = CartItem::where('id', $id)
            ->where('session_id', $sessionId)
            ->firstOrFail();

        $cartItem->delete();

        return response()->json([
            'message' => 'Item removed from cart'
        ]);
    }

    public function clear(Request $request): JsonResponse
    {
        $sessionId = $request->header('X-Session-ID') ?? session()->getId();
        
        CartItem::where('session_id', $sessionId)->delete();

        return response()->json([
            'message' => 'Cart cleared'
        ]);
    }
}
