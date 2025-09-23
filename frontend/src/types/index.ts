export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string;
  products_count?: number;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  short_description?: string;
  price: number;
  sale_price?: number;
  sku: string;
  stock_quantity: number;
  manage_stock: boolean;
  in_stock: boolean;
  featured: boolean;
  images: string[];
  specifications?: Record<string, string>;
  brand?: string;
  size?: string;
  color?: string;
  weight?: number;
  category_id: number;
  category?: Category;
  created_at: string;
  updated_at: string;
}

export interface CartItem {
  id: number;
  session_id: string;
  product_id: number;
  product: Product;
  quantity: number;
  price: number;
  created_at: string;
  updated_at: string;
}

export interface Cart {
  items: CartItem[];
  total: number;
  count: number;
}

export interface OrderItem {
  id: number;
  order_id: number;
  product_id: number;
  product_name: string;
  product_sku: string;
  product_price: number;
  quantity: number;
  total: number;
  product?: Product;
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: number;
  order_number: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  shipping_address: string;
  city: string;
  state: string;
  zip_code: string;
  subtotal: number;
  shipping_cost: number;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded';
  payment_method?: string;
  payment_transaction_id?: string;
  payment_data?: Record<string, any>;
  order_items?: OrderItem[];
  created_at: string;
  updated_at: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  from: number;
  to: number;
}

export interface ApiResponse<T> {
  data?: T;
  message?: string;
  errors?: Record<string, string[]>;
}