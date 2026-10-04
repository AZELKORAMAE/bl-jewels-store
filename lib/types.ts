export type Collection = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  is_featured: boolean;
  sort_order: number;
  created_at?: string;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  details: string | null;
  price: number;
  compare_at_price: number | null;
  category: string;
  material: string | null;
  collection_id: string | null;
  collection?: { name: string; slug: string } | null;
  images: string[];
  stock: number;
  is_featured: boolean;
  is_new: boolean;
  is_active: boolean;
  created_at?: string;
};

export type OrderStatus = "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";

export type OrderItem = {
  id?: string;
  product_id?: string | null;
  product_name: string;
  product_image: string | null;
  unit_price: number;
  quantity: number;
  line_total: number;
};

export type Order = {
  id: string;
  order_number: string;
  user_id: string | null;
  customer_name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postal_code: string | null;
  country: string;
  notes: string | null;
  subtotal: number;
  shipping: number;
  total: number;
  status: OrderStatus;
  payment_method: string;
  created_at: string;
  order_items?: OrderItem[];
};

export type AdminNotification = {
  id: string;
  type: string;
  title: string;
  message: string | null;
  order_id: string | null;
  is_read: boolean;
  created_at: string;
};

export type CartItem = {
  productId: string;
  slug: string;
  name: string;
  collection: string | null;
  image: string | null;
  price: number;
  quantity: number;
  stock: number;
};
