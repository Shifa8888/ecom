import { useMemo, useState } from "react";
import { CATEGORIES, PRODUCTS } from "../data/products";
import { ProductCard } from "../components/ProductCard";
import { useRouter } from "../context/AppContext";

export function Category({ id }: { id: string }) {
  const cat = CATEGORIES.find(c => c.id === id);
  const { navigate } = useRouter();
  const [sort, setSort] = useState<"featured" | "price-asc" | "price-desc" | "rating">("featured");
  const [maxPrice, setMaxPrice] = useState<number>(500);
  const [query, setQuery] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const items = useMemo(() => {
    let arr = PRODUCTS.filter(p => p.category === id && p.price <= maxPrice);
    if (query.trim()) {
      const q = query.toLowerCase();
      arr = arr.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    }
    switch (sort) {
      case "price-asc": arr = [...arr].sort((a, b) => a.price - b.price); break;
      case "price-desc": arr = [...arr].sort((a, b) => b.price - a.price); break;
      case "rating": arr = [...arr].sort((a, b) => b.rating - a.rating); break;
    }
    return arr;
  }, [id, sort, maxPrice, query]);

  if (!cat) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center page-enter">
        <h1 className="text-3xl font-bold mb-4">Category not found</h1>
        <button onClick={() => navigate("/")} className="theme-btn-primary px-5 py-2.5">Back home</button>
      </div>
    );
  }

  return (
    <div className="page-enter">
      {/* Header */}
      <section className="surface border-b" style={{ borderColor: "var(--color-border)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <nav className="text-xs muted mb-3 flex items-center gap-2">
            <button onClick={() => navigate("/")} className="hover:underline">Home</button>
            <span>/</span>
            <span style={{ color: "var(--color-text)" }} className="font-medium">{cat.name}</span>
          </nav>
          <div className="flex items-center gap-4">
            <div className="text-5xl pop-in inline-block">{cat.icon}</div>
            <div className="slide-in-left">
              <h1 className="text-2xl lg:text-4xl font-bold" style={{ fontFamily: "var(--font-display)" }}>{cat.name}</h1>
              <p className="muted text-sm mt-1">{PRODUCTS.filter(p => p.category === id).length} products available</p>
            </div>
          </div>
        </div>
      </section>

      {/* Filters + Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Mobile filter toggle */}
        <div className="flex items-center justify-between mb-4 lg:hidden">
          <div className="text-sm muted">Showing <span className="font-bold" style={{color:"var(--color-text)"}}>{items.length}</span> products</div>
          <button onClick={() => setFiltersOpen(v => !v)}
                  className="theme-btn-outline px-4 py-2 text-sm flex items-center gap-2">
            🔧 Filters {filtersOpen ? "▲" : "▼"}
          </button>
        </div>

        <div className="grid lg:grid-cols-[260px_1fr] gap-8">
          <aside className={`space-y-5 ${filtersOpen ? "block" : "hidden"} lg:block`}>
            <div className="theme-card p-5">
              <h3 className="font-semibold text-sm mb-3">Search</h3>
              <input type="search" value={query} onChange={e => setQuery(e.target.value)}
                     placeholder="Search in this category..."
                     className="theme-input w-full px-3 py-2 text-sm" />
            </div>

            <div className="theme-card p-5">
              <h3 className="font-semibold text-sm mb-3">Max price</h3>
              <input type="range" min={20} max={500} step={10}
                     value={maxPrice} onChange={e => setMaxPrice(Number(e.target.value))}
                     className="w-full accent-current"
                     style={{ accentColor: "var(--color-primary)" }} />
              <div className="text-sm muted mt-2 flex justify-between">
                <span>$20</span>
                <span className="font-bold" style={{ color: "var(--color-text)" }}>${maxPrice}</span>
              </div>
            </div>

            <div className="theme-card p-5">
              <h3 className="font-semibold text-sm mb-3">Browse other</h3>
              <div className="space-y-1">
                {CATEGORIES.filter(c => c.id !== id).map(c => (
                  <button key={c.id} onClick={() => navigate(`/category/${c.id}`)}
                          className="w-full text-left px-3 py-2 rounded-md text-sm hover:opacity-70 flex items-center gap-2">
                    <span>{c.icon}</span> {c.name}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          <div>
            <div className="hidden lg:flex items-center justify-between mb-5">
              <div className="text-sm muted">Showing <span className="font-bold" style={{color:"var(--color-text)"}}>{items.length}</span> products</div>
              <select value={sort} onChange={e => setSort(e.target.value as typeof sort)}
                      className="theme-input px-3 py-2 text-sm">
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low → High</option>
                <option value="price-desc">Price: High → Low</option>
                <option value="rating">Top rated</option>
              </select>
            </div>
            {/* Mobile sort */}
            <div className="flex lg:hidden items-center justify-end mb-4">
              <select value={sort} onChange={e => setSort(e.target.value as typeof sort)}
                      className="theme-input px-3 py-2 text-sm">
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low → High</option>
                <option value="price-desc">Price: High → Low</option>
                <option value="rating">Top rated</option>
              </select>
            </div>

            {items.length === 0 ? (
              <div className="theme-card p-12 text-center">
                <div className="text-5xl mb-3">🔎</div>
                <p className="font-semibold mb-1">No products found</p>
                <p className="text-sm muted">Try adjusting your filters or search.</p>
              </div>
            ) : (
              <div key={`${id}-${sort}-${maxPrice}-${query}`} className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 stagger">
                {items.map(p => <ProductCard key={p.id} product={p} />)}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
