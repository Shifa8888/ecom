import { useState } from "react";
import { useRouter, useCart, useWishlist } from "../context/AppContext";
import type { Product } from "../types";

export function ProductCard({ product }: { product: Product }) {
  const { navigate } = useRouter();
  const { add } = useCart();
  const wishlist = useWishlist();
  const wished = wishlist.has(product.id);
  const [added, setAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    add(product.id);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <div className="theme-card overflow-hidden flex flex-col group hover:-translate-y-1.5 relative">
      <button onClick={() => navigate(`/product/${product.id}`)}
              className={`relative h-52 bg-gradient-to-br ${product.gradient} flex items-center justify-center overflow-hidden`}>
        <img
          src={product.photo}
          alt={product.name}
          loading="lazy"
          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        <span className="absolute text-7xl opacity-0 pointer-events-none">{product.image}</span>
        {/* Hover overlay */}
        <span className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300" />
        <span className="absolute bottom-3 left-1/2 -translate-x-1/2 translate-y-3 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 px-3 py-1.5 rounded-full bg-white/90 text-slate-900 text-xs font-semibold backdrop-blur">
          Quick view →
        </span>
        {product.badge && (
          <span className="absolute top-3 left-3 px-2.5 py-1 text-xs font-bold rounded-full bg-white/90 text-slate-900 backdrop-blur pop-in">
            {product.badge}
          </span>
        )}
        {product.oldPrice && (
          <span className="absolute top-3 right-3 px-2.5 py-1 text-xs font-bold rounded-full bg-rose-500 text-white pulse-glow">
            -{Math.round((1 - product.price / product.oldPrice) * 100)}%
          </span>
        )}
      </button>
      {/* Wishlist heart */}
      <button
        onClick={(e) => { e.stopPropagation(); wishlist.toggle(product.id); }}
        aria-label="Wishlist"
        className={`absolute ${product.oldPrice ? "top-12" : "top-3"} right-3 w-9 h-9 rounded-full backdrop-blur bg-white/90 flex items-center justify-center text-base shadow-md transition-transform hover:scale-110 active:scale-90 ${wished ? "heartbeat" : ""}`}
      >
        <span style={{ color: wished ? "#ef4444" : "#94a3b8" }}>{wished ? "♥" : "♡"}</span>
      </button>

      <div className="p-4 flex flex-col flex-1">
        <button onClick={() => navigate(`/product/${product.id}`)} className="text-left">
          <h3 className="font-semibold text-base leading-snug mb-1 line-clamp-1">{product.name}</h3>
        </button>
        <div className="flex items-center gap-1 text-xs muted mb-2">
          <span style={{ color: "var(--color-accent)" }}>★</span>
          <span className="font-medium" style={{ color: "var(--color-text)" }}>{product.rating}</span>
          <span>({product.reviews.toLocaleString()})</span>
        </div>
        <p className="text-xs muted line-clamp-2 mb-3 flex-1">{product.description}</p>

        <div className="flex items-end justify-between mt-auto">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-bold">${product.price}</span>
              {product.oldPrice && <span className="text-xs muted line-through">${product.oldPrice}</span>}
            </div>
          </div>
          <button onClick={handleAdd}
                  className={`theme-btn-primary btn-shine px-3 py-2 text-sm transition-transform active:scale-90 ${added ? "scale-110" : ""}`}>
            {added ? "✓ Added" : "+ Add"}
          </button>
        </div>
      </div>
    </div>
  );
}
