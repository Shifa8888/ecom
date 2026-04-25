import { useMemo } from "react";
import { useRouter } from "../context/AppContext";
import { PRODUCTS, CATEGORIES } from "../data/products";
import { ProductCard } from "../components/ProductCard";

export function Search({ query }: { query: string }) {
  const { navigate } = useRouter();
  const q = query.trim().toLowerCase();

  const results = useMemo(() => {
    if (!q) return [];
    return PRODUCTS.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  }, [q]);

  return (
    <div className="page-enter max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold mb-1" style={{ fontFamily: "var(--font-display)" }}>
        Search results
      </h1>
      <p className="muted mb-8">
        {q ? <>Showing <span className="font-bold" style={{color:"var(--color-text)"}}>{results.length}</span> result{results.length === 1 ? "" : "s"} for <span className="font-bold" style={{color:"var(--color-text)"}}>"{query}"</span></> : "Type something in the search bar to begin."}
      </p>

      {q && results.length === 0 ? (
        <div className="theme-card p-12 text-center">
          <div className="text-6xl mb-3 float inline-block">🔎</div>
          <p className="font-semibold mb-1">No products matched your search</p>
          <p className="text-sm muted mb-5">Try different keywords, or browse a category below.</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {CATEGORIES.map(c => (
              <button key={c.id} onClick={() => navigate(`/category/${c.id}`)}
                      className="theme-btn-outline px-3 py-1.5 text-sm">
                {c.icon} {c.name}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 stagger">
          {results.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  );
}
