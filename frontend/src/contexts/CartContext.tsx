import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Cart, CartItem } from '../types';
import * as api from '../services/api';
import toast from 'react-hot-toast';

interface CartState extends Cart {
  loading: boolean;
}

type CartAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_CART'; payload: Cart }
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'UPDATE_ITEM'; payload: { id: number; quantity: number } }
  | { type: 'REMOVE_ITEM'; payload: number }
  | { type: 'CLEAR_CART' };

const initialState: CartState = {
  items: [],
  total: 0,
  count: 0,
  loading: false,
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    
    case 'SET_CART':
      return { ...state, ...action.payload, loading: false };
    
    case 'ADD_ITEM':
      const existingItemIndex = state.items.findIndex(
        item => item.product_id === action.payload.product_id
      );
      
      if (existingItemIndex >= 0) {
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex] = action.payload;
        const newTotal = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const newCount = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
        
        return {
          ...state,
          items: updatedItems,
          total: newTotal,
          count: newCount,
          loading: false,
        };
      } else {
        const newItems = [...state.items, action.payload];
        const newTotal = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const newCount = newItems.reduce((sum, item) => sum + item.quantity, 0);
        
        return {
          ...state,
          items: newItems,
          total: newTotal,
          count: newCount,
          loading: false,
        };
      }
    
    case 'UPDATE_ITEM':
      const updatedItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      const newTotal = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const newCount = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
      
      return {
        ...state,
        items: updatedItems,
        total: newTotal,
        count: newCount,
        loading: false,
      };
    
    case 'REMOVE_ITEM':
      const filteredItems = state.items.filter(item => item.id !== action.payload);
      const filteredTotal = filteredItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const filteredCount = filteredItems.reduce((sum, item) => sum + item.quantity, 0);
      
      return {
        ...state,
        items: filteredItems,
        total: filteredTotal,
        count: filteredCount,
        loading: false,
      };
    
    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
        total: 0,
        count: 0,
        loading: false,
      };
    
    default:
      return state;
  }
};

interface CartContextType extends CartState {
  addToCart: (productId: number, quantity?: number) => Promise<void>;
  updateCartItem: (itemId: number, quantity: number) => Promise<void>;
  removeFromCart: (itemId: number) => Promise<void>;
  clearCart: () => Promise<void>;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: React.ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const refreshCart = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const cart = await api.getCart();
      dispatch({ type: 'SET_CART', payload: cart });
    } catch (error) {
      console.error('Error fetching cart:', error);
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const addToCart = async (productId: number, quantity: number = 1) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await api.addToCart(productId, quantity);
      dispatch({ type: 'ADD_ITEM', payload: response.item });
      toast.success('Item adicionado ao carrinho!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Erro ao adicionar item ao carrinho');
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const updateCartItem = async (itemId: number, quantity: number) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      await api.updateCartItem(itemId, quantity);
      dispatch({ type: 'UPDATE_ITEM', payload: { id: itemId, quantity } });
      toast.success('Carrinho atualizado!');
    } catch (error) {
      console.error('Error updating cart item:', error);
      toast.error('Erro ao atualizar item do carrinho');
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const removeFromCart = async (itemId: number) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      await api.removeFromCart(itemId);
      dispatch({ type: 'REMOVE_ITEM', payload: itemId });
      toast.success('Item removido do carrinho!');
    } catch (error) {
      console.error('Error removing from cart:', error);
      toast.error('Erro ao remover item do carrinho');
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const clearCart = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      await api.clearCart();
      dispatch({ type: 'CLEAR_CART' });
      toast.success('Carrinho limpo!');
    } catch (error) {
      console.error('Error clearing cart:', error);
      toast.error('Erro ao limpar carrinho');
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  useEffect(() => {
    refreshCart();
  }, []);

  const value: CartContextType = {
    ...state,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    refreshCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;