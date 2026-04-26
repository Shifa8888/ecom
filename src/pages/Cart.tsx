import { useCart, useRouter } from "../context/AppContext";
import { PRODUCTS } from "../data/products";
import { RippleButton } from "../components/RippleButton";

export function Cart() {
  const { items, setQty, remove, clear } = useCart();
  const { navigate } = useRouter();

  const lines = items.map(it => {
    const product = PRODUCTS.find(p => p.id === it.productId)!;
    return { ...it, product };
  }).filter(l => l.product);

  const subtotal = lines.reduce((s, l) => s + l.product.price * l.qty, 0);
  const shipping = subtotal > 50 || subtotal === 0 ? 0 : 7.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (lines.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center page-enter">
        <div className="text-7xl mb-6 float inline-block">🛒</div>
        <h1 className="text-3xl font-bold mb-3" style={{ fontFamily: "var(--font-display)" }}>Your cart is empty</h1>
        <p className="muted mb-8">Looks like you haven't added anything yet. Let's fix that.</p>
        <button onClick={() => navigate("/")} className="theme-btn-primary px-6 py-3">Start shopping →</button>
      </div>
    );
  }

  return (
    <div className="page-enter max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: "var(--font-display)" }}>Your cart</h1>
      <p className="muted text-sm mb-8">{lines.length} item{lines.length > 1 ? "s" : ""}</p>

      <div className="grid lg:grid-cols-[1fr_380px] gap-8">
        <div className="space-y-3 stagger">
          {lines.map(l => (
            <div key={l.productId} className="theme-card p-4 flex gap-4 items-start hover:translate-x-1">
              <button onClick={() => navigate(`/product/${l.product.id}`)}
                      className={`w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden shrink-0 bg-gradient-to-br ${l.product.gradient}`}
                      style={{ borderRadius: "var(--radius-card)" }}>
                <img src={l.product.photo} alt={l.product.name}
                     onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                     className="w-full h-full object-cover" />
              </button>
              <div className="flex-1 min-w-0 flex flex-col gap-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <button onClick={() => navigate(`/product/${l.product.id}`)} className="text-left">
                      <h3 className="font-semibold leading-snug line-clamp-2">{l.product.name}</h3>
                    </button>
                    <div className="text-sm muted capitalize mt-0.5">{l.product.category}</div>
                    <div className="text-base font-bold mt-1">${l.product.price.toFixed(2)}</div>
                  </div>
                  <button onClick={() => remove(l.productId)} className="muted hover:text-rose-500 hover:rotate-90 text-sm px-1 transition-transform duration-300 shrink-0">✕</button>
                </div>
                <div className="flex items-center theme-btn-outline overflow-hidden w-fit">
                  <button onClick={() => setQty(l.productId, l.qty - 1)} className="px-2.5 py-1.5 hover:opacity-70">−</button>
                  <div className="px-3 font-bold text-sm min-w-[32px] text-center">{l.qty}</div>
                  <button onClick={() => setQty(l.productId, l.qty + 1)} className="px-2.5 py-1.5 hover:opacity-70">+</button>
                </div>
              </div>
            </div>
          ))}
          <button onClick={clear} className="text-sm muted hover:opacity-70 mt-2">Clear cart</button>
        </div>

        <aside className="theme-card p-4 sm:p-6 h-fit lg:sticky lg:top-24">
          <h2 className="font-bold text-lg mb-4">Order summary</h2>
          <div className="space-y-2.5 text-sm mb-4 pb-4 border-b" style={{ borderColor: "var(--color-border)" }}>
            <div className="flex justify-between">
              <span className="muted">Subtotal</span>
              <span className="font-medium">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="muted">Shipping</span>
              <span className="font-medium">{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between">
              <span className="muted">Tax (est.)</span>
              <span className="font-medium">${tax.toFixed(2)}</span>
            </div>
          </div>
          <div className="flex justify-between font-bold text-lg mb-5">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          {subtotal < 50 && (
            <div className="text-xs muted mb-4 px-3 py-2 surface rounded-md">
              💡 Add <span className="font-bold" style={{color:"var(--color-text)"}}>${(50 - subtotal).toFixed(2)}</span> more for free shipping!
            </div>
          )}
          <RippleButton onClick={() => navigate("/checkout")} className="theme-btn-primary btn-shine spring w-full py-3 text-sm hover:scale-[1.02] active:scale-[0.98] transition-transform">
            Proceed to checkout →
          </RippleButton>
          <p className="text-xs muted text-center mt-3">🔒 Secured by 256-bit SSL encryption</p>
        </aside>
      </div>
    </div>
  );
}
