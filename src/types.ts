export type Product = {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  category: string;
  rating: number;
  reviews: number;
  description: string;
  image: string; // emoji fallback
  photo: string; // real product photo URL
  gradient: string; // tailwind gradient (used as bg behind photo)
  badge?: string;
  stock: number;
};

export type CartItem = {
  productId: string;
  qty: number;
};

export type Address = {
  fullName: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
};

export type PaymentInfo = {
  method: "card" | "cod" | "paypal";
  cardName?: string;
  cardNumber?: string;
  cardExp?: string;
  cardCvc?: string;
};

export type Order = {
  id: string;
  date: string;
  items: { productId: string; qty: number; price: number; name: string; photo: string }[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  address: Address;
  payment: { method: string; last4?: string };
  status: "Processing" | "Shipped" | "Delivered";
};

export type ThemeId = "lumen" | "midnight" | "rose" | "forest" | "mono";

export type ThemeDef = {
  id: ThemeId;
  name: string;
  description: string;
  swatch: string[];
  vars: Record<string, string>;
};
