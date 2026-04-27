import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { THEMES } from "../data/themes";
import type { CartItem, Order, ThemeId } from "../types";

// ---------- AUTH ----------
const VALID_USERS: Record<string, string> = {
  "hashirmajeed1447@gmail.com": "hashirsabri1447$$",
};

type AuthCtx = {
  user: string | null;
  login: (u: string, p: string) => { ok: boolean; error?: string };
  logout: () => void;
};

const AuthContext = createContext<AuthCtx | null>(null);

// ---------- THEME ----------
type ThemeCtx = {
  themeId: ThemeId;
  setThemeId: (id: ThemeId) => void;
};
const ThemeContext = createContext<ThemeCtx | null>(null);

// ---------- CART ----------
type CartCtx = {
  items: CartItem[];
  add: (productId: string, qty?: number) => void;
  remove: (productId: string) => void;
  setQty: (productId: string, qty: number) => void;
  clear: () => void;
  count: number;
};
const CartContext = createContext<CartCtx | null>(null);

// ---------- WISHLIST ----------
type WishlistCtx = {
  ids: string[];
  toggle: (id: string) => void;
  has: (id: string) => boolean;
  clear: () => void;
};
const WishlistContext = createContext<WishlistCtx | null>(null);

// ---------- ORDERS ----------
type OrdersCtx = {
  orders: Order[];
  add: (order: Order) => void;
};
const OrdersContext = createContext<OrdersCtx | null>(null);

// ---------- ROUTER (hash based) ----------
type RouterCtx = {
  path: string;
  navigate: (to: string) => void;
};
const RouterContext = createContext<RouterCtx | null>(null);

function applyTheme(themeId: ThemeId) {
  const theme = THEMES.find(t => t.id === themeId) || THEMES[0];
  const root = document.documentElement;
  Object.entries(theme.vars).forEach(([k, v]) => root.style.setProperty(k, v));
}

export function AppProviders({ children }: { children: ReactNode }) {
  // auth
  const [user, setUser] = useState<string | null>(() => localStorage.getItem("lumen.user"));

  // theme
  const [themeId, setThemeIdState] = useState<ThemeId>(() => {
    const stored = localStorage.getItem("lumen.theme") as ThemeId | null;
    return stored && THEMES.find(t => t.id === stored) ? stored : "mono";
  });

  useEffect(() => { applyTheme(themeId); localStorage.setItem("lumen.theme", themeId); }, [themeId]);

  // cart
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("lumen.cart") || "[]");
    } catch { return []; }
  });
  useEffect(() => { localStorage.setItem("lumen.cart", JSON.stringify(items)); }, [items]);

  // wishlist
  const [wish, setWish] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem("lumen.wish") || "[]"); } catch { return []; }
  });
  useEffect(() => { localStorage.setItem("lumen.wish", JSON.stringify(wish)); }, [wish]);

  // orders
  const [orders, setOrders] = useState<Order[]>(() => {
    try { return JSON.parse(localStorage.getItem("lumen.orders") || "[]"); } catch { return []; }
  });
  useEffect(() => { localStorage.setItem("lumen.orders", JSON.stringify(orders)); }, [orders]);

  // router
  const [path, setPath] = useState<string>(() => window.location.hash.replace(/^#/, "") || "/");
  useEffect(() => {
    const onChange = () => setPath(window.location.hash.replace(/^#/, "") || "/");
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);

  const auth: AuthCtx = useMemo(() => ({
    user,
    login: (u, p) => {
      const key = u.trim();
      if (VALID_USERS[key] && VALID_USERS[key] === p) {
        setUser(key);
        localStorage.setItem("lumen.user", key);
        return { ok: true };
      }
      return { ok: false, error: "Invalid email or password" };
    },
    logout: () => { setUser(null); localStorage.removeItem("lumen.user"); window.location.hash = "/"; },
  }), [user]);

  const themeCtx: ThemeCtx = useMemo(() => ({
    themeId,
    setThemeId: (id) => setThemeIdState(id),
  }), [themeId]);

  const cart: CartCtx = useMemo(() => ({
    items,
    add: (productId, qty = 1) => setItems(prev => {
      const ex = prev.find(i => i.productId === productId);
      if (ex) return prev.map(i => i.productId === productId ? { ...i, qty: i.qty + qty } : i);
      return [...prev, { productId, qty }];
    }),
    remove: (productId) => setItems(prev => prev.filter(i => i.productId !== productId)),
    setQty: (productId, qty) => setItems(prev => qty <= 0
      ? prev.filter(i => i.productId !== productId)
      : prev.map(i => i.productId === productId ? { ...i, qty } : i)),
    clear: () => setItems([]),
    count: items.reduce((sum, i) => sum + i.qty, 0),
  }), [items]);

  const router: RouterCtx = useMemo(() => ({
    path,
    navigate: (to) => { window.location.hash = to; },
  }), [path]);

  const wishlist: WishlistCtx = useMemo(() => ({
    ids: wish,
    toggle: (id) => setWish(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]),
    has: (id) => wish.includes(id),
    clear: () => setWish([]),
  }), [wish]);

  const ordersCtx: OrdersCtx = useMemo(() => ({
    orders,
    add: (o) => setOrders(prev => [o, ...prev]),
  }), [orders]);

  return (
    <AuthContext.Provider value={auth}>
      <ThemeContext.Provider value={themeCtx}>
        <CartContext.Provider value={cart}>
          <WishlistContext.Provider value={wishlist}>
            <OrdersContext.Provider value={ordersCtx}>
              <RouterContext.Provider value={router}>
                {children}
              </RouterContext.Provider>
            </OrdersContext.Provider>
          </WishlistContext.Provider>
        </CartContext.Provider>
      </ThemeContext.Provider>
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth outside provider");
  return ctx;
};
export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme outside provider");
  return ctx;
};
export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart outside provider");
  return ctx;
};
export const useRouter = () => {
  const ctx = useContext(RouterContext);
  if (!ctx) throw new Error("useRouter outside provider");
  return ctx;
};
export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist outside provider");
  return ctx;
};
export const useOrders = () => {
  const ctx = useContext(OrdersContext);
  if (!ctx) throw new Error("useOrders outside provider");
  return ctx;
};
