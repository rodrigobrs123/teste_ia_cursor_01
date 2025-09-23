import axios from 'axios';
import { Category, Product, Cart, Order, PaginatedResponse } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Add session ID to requests
api.interceptors.request.use((config) => {
  let sessionId = localStorage.getItem('session_id');
  if (!sessionId) {
    sessionId = Date.now().toString(36) + Math.random().toString(36).substr(2);
    localStorage.setItem('session_id', sessionId);
  }
  config.headers['X-Session-ID'] = sessionId;
  return config;
});

// Categories
export const getCategories = async (): Promise<Category[]> => {
  const response = await api.get('/categories');
  return response.data;
};

export const getCategory = async (slug: string): Promise<Category> => {
  const response = await api.get(`/categories/${slug}`);
  return response.data;
};

// Products
export const getProducts = async (params?: {
  category?: string;
  featured?: boolean;
  search?: string;
  min_price?: number;
  max_price?: number;
  sort_by?: string;
  sort_order?: string;
  page?: number;
}): Promise<PaginatedResponse<Product>> => {
  const response = await api.get('/products', { params });
  return response.data;
};

export const getProduct = async (slug: string): Promise<Product> => {
  const response = await api.get(`/products/${slug}`);
  return response.data;
};

export const getFeaturedProducts = async (): Promise<Product[]> => {
  const response = await api.get('/products/featured');
  return response.data;
};

export const getRelatedProducts = async (slug: string): Promise<Product[]> => {
  const response = await api.get(`/products/${slug}/related`);
  return response.data;
};

// Cart
export const getCart = async (): Promise<Cart> => {
  const response = await api.get('/cart');
  return response.data;
};

export const addToCart = async (productId: number, quantity: number = 1) => {
  const response = await api.post('/cart', {
    product_id: productId,
    quantity,
  });
  return response.data;
};

export const updateCartItem = async (itemId: number, quantity: number) => {
  const response = await api.put(`/cart/${itemId}`, { quantity });
  return response.data;
};

export const removeFromCart = async (itemId: number) => {
  const response = await api.delete(`/cart/${itemId}`);
  return response.data;
};

export const clearCart = async () => {
  const response = await api.delete('/cart');
  return response.data;
};

// Orders
export const createOrder = async (orderData: {
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  shipping_address: string;
  city: string;
  state: string;
  zip_code: string;
}): Promise<{ order: Order; message: string }> => {
  const response = await api.post('/orders', orderData);
  return response.data;
};

export const getOrder = async (orderNumber: string): Promise<Order> => {
  const response = await api.get(`/orders/${orderNumber}`);
  return response.data;
};

export const processPayment = async (
  orderNumber: string,
  paymentData: {
    payment_method: string;
    payment_data: Record<string, any>;
  }
) => {
  const response = await api.post(`/orders/${orderNumber}/payment`, paymentData);
  return response.data;
};

export default api;