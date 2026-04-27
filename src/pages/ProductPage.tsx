import { useState } from "react";
import { PRODUCTS, CATEGORIES } from "../data/products";
import { useCart, useRouter } from "../context/AppContext";
import { ProductCard } from "../components/ProductCard";
import { RippleButton } from "../components/RippleButton";

export function ProductPage({ id }: { id: string }) {
  const { navigate } = useRouter();
  const { add } = useCart();
  const product = PRODUCTS.find(p => p.id === id);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center page-enter">
        <h1 className="text-3xl font-bold mb-4">Product not found</h1>
        <button onClick={() => navigate("/")} className="theme-btn-primary px-5 py-2.5">Back home</button>
      </div>
    );
  }

  const cat = CATEGORIES.find(c => c.id === product.category);
  const related = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAdd = () => {
    add(product.id, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="page-enter max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <nav className="text-xs muted mb-5 flex items-center gap-2 flex-wrap">
        <button onClick={() => navigate("/")} className="hover:underline">Home</button>
        <span>/</span>
        <button onClick={() => navigate(`/category/${product.category}`)} className="hover:underline">{cat?.name}</button>
        <span>/</span>
        <span style={{ color: "var(--color-text)" }} className="font-medium">{product.name}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-10">
        {/* Image */}
        <div className={`theme-card tilt overflow-hidden h-[300px] sm:h-[400px] lg:h-[520px] flex items-center justify-center bg-gradient-to-br ${product.gradient} relative scale-in group`}>
          <img
            src={product.photo}
            alt={product.name}
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <span className="absolute text-[12rem] opacity-0 pointer-events-none">{product.image}</span>
          {product.badge && (
            <span className="absolute top-4 left-4 px-3 py-1 text-xs font-bold rounded-full bg-white/90 text-slate-900 z-10 pop-in">
              {product.badge}
            </span>
          )}
        </div>

        {/* Info */}
        <div className="slide-in-right">
          <div className="text-xs uppercase tracking-widest muted mb-2">{cat?.name}</div>
          <h1 className="text-3xl lg:text-4xl font-bold mb-3" style={{ fontFamily: "var(--font-display)" }}>{product.name}</h1>

          <div className="flex items-center gap-3 mb-5">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map(i => (
                <span key={i} style={{ color: i <= Math.round(product.rating) ? "var(--color-accent)" : "var(--color-border)" }}>★</span>
              ))}
            </div>
            <span className="text-sm font-medium">{product.rating}</span>
            <span className="text-sm muted">({product.reviews.toLocaleString()} reviews)</span>
          </div>

          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-4xl font-bold">${product.price}</span>
            {product.oldPrice && (
              <>
                <span className="text-xl muted line-through">${product.oldPrice}</span>
                <span className="px-2 py-0.5 rounded text-xs font-bold bg-rose-500 text-white">
                  Save ${product.oldPrice - product.price}
                </span>
              </>
            )}
          </div>

          <p className="muted leading-relaxed mb-7">{product.description}</p>

          <div className="theme-card p-4 sm:p-5 mb-6">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <div className="text-sm font-medium">Quantity</div>
              <div className="flex items-center theme-btn-outline overflow-hidden">
                <button onClick={() => setQty(q => Math.max(1, q - 1))} className="px-3 py-2 hover:opacity-70">−</button>
                <div className="px-4 font-bold min-w-[40px] text-center">{qty}</div>
                <button onClick={() => setQty(q => Math.min(product.stock, q + 1))} className="px-3 py-2 hover:opacity-70">+</button>
              </div>
              <div className="text-xs muted">
                {product.stock > 10
                  ? <span style={{color:"#10b981"}}>● In stock</span>
                  : <span style={{color:"#f59e0b"}}>● Only {product.stock} left</span>}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <RippleButton onClick={handleAdd}
                      className={`theme-btn-primary btn-shine spring py-3 text-sm transition-transform active:scale-95 ${added ? "scale-105 heartbeat" : "hover:scale-[1.02]"}`}>
                {added ? "✓ Added!" : "Add to cart"}
              </RippleButton>
              <RippleButton onClick={() => { add(product.id, qty); navigate("/cart"); }}
                      className="theme-btn-outline spring py-3 text-sm transition-transform hover:scale-[1.02] active:scale-95">
                Buy now
              </RippleButton>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 text-xs stagger">
            <div className="theme-card p-3 text-center group">
              <div className="text-xl mb-1 inline-block group-hover:-translate-y-1 transition-transform">🚚</div>
              <div className="font-semibold">Free shipping</div>
              <div className="muted">On orders $50+</div>
            </div>
            <div className="theme-card p-3 text-center group">
              <div className="text-xl mb-1 inline-block group-hover:-rotate-12 transition-transform">↩️</div>
              <div className="font-semibold">30-day returns</div>
              <div className="muted">Hassle-free</div>
            </div>
            <div className="theme-card p-3 text-center group">
              <div className="text-xl mb-1 inline-block group-hover:scale-125 transition-transform">🔒</div>
              <div className="font-semibold">Secure checkout</div>
              <div className="muted">SSL encrypted</div>
            </div>
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-5" style={{ fontFamily: "var(--font-display)" }}>You might also like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 stagger">
            {related.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </div>
  );
}
