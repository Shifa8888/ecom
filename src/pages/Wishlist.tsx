import { useCart, useRouter, useWishlist } from "../context/AppContext";
import { PRODUCTS } from "../data/products";
import { ProductCard } from "../components/ProductCard";
import { RippleButton } from "../components/RippleButton";

export function Wishlist() {
  const wishlist = useWishlist();
  const { add } = useCart();
  const { navigate } = useRouter();
  const items = PRODUCTS.filter(p => wishlist.ids.includes(p.id));

  if (items.length === 0) {
    return (
      <div className="page-enter max-w-xl mx-auto px-4 py-20 text-center">
        <div className="text-7xl mb-6 inline-block heartbeat">♡</div>
        <h1 className="text-3xl font-bold mb-3" style={{ fontFamily: "var(--font-display)" }}>Your wishlist is empty</h1>
        <p className="muted mb-8">Tap the heart icon on any product to save it for later.</p>
        <RippleButton onClick={() => navigate("/")} className="theme-btn-primary spring btn-shine px-6 py-3">
          Browse products →
        </RippleButton>
      </div>
    );
  }

  const addAll = () => { items.forEach(p => add(p.id)); };

  return (
    <div className="page-enter max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-wrap items-end justify-between gap-3 mb-6">
        <div>
          <h1 className="text-3xl font-bold" style={{ fontFamily: "var(--font-display)" }}>Your wishlist</h1>
          <p className="muted text-sm mt-1">{items.length} saved item{items.length > 1 ? "s" : ""}</p>
        </div>
        <div className="flex gap-2">
          <RippleButton onClick={addAll} className="theme-btn-primary spring px-4 py-2 text-sm">
            Add all to cart
          </RippleButton>
          <button onClick={() => wishlist.clear()} className="theme-btn-outline px-4 py-2 text-sm">
            Clear wishlist
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 stagger">
        {items.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  );
}
