import { useRouter } from "../context/AppContext";
import { CATEGORIES, PRODUCTS } from "../data/products";
import { ProductCard } from "../components/ProductCard";
import { Reveal, CountUp } from "../components/Reveal";
import { RippleButton } from "../components/RippleButton";

export function Home() {
  const { navigate } = useRouter();
  const featured = PRODUCTS.filter(p => p.badge).slice(0, 8);
  const trending = [...PRODUCTS].sort((a, b) => b.reviews - a.reviews).slice(0, 4);

  return (
    <div className="page-enter">
      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Animated gradient blobs in background */}
        <div className="blob w-[500px] h-[500px] -top-32 -left-32"
             style={{ background: "var(--color-primary)" }} />
        <div className="blob blob-2 w-[400px] h-[400px] top-40 right-0"
             style={{ background: "var(--color-accent)" }} />
        <div className="blob blob-3 w-[350px] h-[350px] bottom-0 left-1/3"
             style={{ background: "var(--color-primary)", opacity: 0.25 }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 grid lg:grid-cols-2 gap-10 items-center">
          <div className="slide-in-left">
            <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full mb-4 pop-in"
                  style={{ background: "color-mix(in srgb, var(--color-primary) 15%, transparent)",
                           color: "var(--color-primary)",
                           animationDelay: "0.1s" }}>
              ✦ New Spring Collection
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-[1.05] mb-6" style={{ fontFamily: "var(--font-display)" }}>
              Discover things <br/>
              <span style={{
                background: "linear-gradient(90deg, var(--color-primary), var(--color-accent), var(--color-primary))",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                animation: "shimmer 4s linear infinite",
              }}>you'll love.</span>
            </h1>
            <p className="text-lg muted mb-8 max-w-md">
              Curated electronics, fashion, home essentials & more — all crafted to bring a little more delight into your everyday.
            </p>
            <div className="flex flex-wrap gap-3">
              <RippleButton onClick={() => navigate("/category/electronics")}
                            className="theme-btn-primary btn-shine spring px-6 py-3 text-sm">
                Shop now →
              </RippleButton>
              <RippleButton onClick={() => navigate("/category/fashion")}
                            className="theme-btn-outline spring px-6 py-3 text-sm">
                Browse fashion
              </RippleButton>
            </div>

            <div className="flex flex-wrap gap-6 sm:gap-8 mt-10 pt-8 border-t" style={{ borderColor: "var(--color-border)" }}>
              <div>
                <div className="text-2xl font-bold"><CountUp to={12} suffix="k+" /></div>
                <div className="text-xs muted">Customers</div>
              </div>
              <div>
                <div className="text-2xl font-bold"><CountUp to={850} suffix="+" /></div>
                <div className="text-xs muted">Products</div>
              </div>
              <div>
                <div className="text-2xl font-bold"><CountUp to={4.9} decimals={1} suffix="★" /></div>
                <div className="text-xs muted">Avg rating</div>
              </div>
            </div>
          </div>

          {/* Hero visual */}
          <div className="relative h-[440px] hidden lg:block slide-in-right">
            <div className="absolute inset-0 grid grid-cols-2 gap-4">
              <div className="theme-card overflow-hidden mt-8 bg-gradient-to-br from-indigo-500 to-purple-600 float">
                <img src="/images/headphones.jpg" alt="Headphones" className="w-full h-full object-cover kenburns" />
              </div>
              <div className="theme-card overflow-hidden bg-gradient-to-br from-pink-400 to-rose-500 float-delay">
                <img src="/images/cosmetics.jpg" alt="Beauty" className="w-full h-full object-cover kenburns" />
              </div>
              <div className="theme-card overflow-hidden bg-gradient-to-br from-amber-500 to-orange-600 float-slow">
                <img src="/images/leather-bag.jpg" alt="Bag" className="w-full h-full object-cover kenburns" />
              </div>
              <div className="theme-card overflow-hidden -mt-8 bg-gradient-to-br from-teal-400 to-cyan-600 float-fast">
                <img src="/images/yoga.jpg" alt="Yoga" className="w-full h-full object-cover kenburns" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Reveal variant="up">
          <div className="flex items-end justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold" style={{ fontFamily: "var(--font-display)" }}>Shop by category</h2>
              <p className="muted text-sm mt-1">Explore our handpicked collections.</p>
            </div>
          </div>
        </Reveal>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 stagger">
          {CATEGORIES.map(c => (
            <button key={c.id}
                    onClick={() => navigate(`/category/${c.id}`)}
                    className="theme-card p-6 text-center hover:scale-[1.05] active:scale-[0.96] transition-transform group">
              <div className="text-4xl mb-3 inline-block group-hover:scale-125 group-hover:-rotate-6 transition-transform duration-300">{c.icon}</div>
              <div className="font-semibold text-sm">{c.name}</div>
            </button>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Reveal variant="left">
          <div className="flex items-end justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold" style={{ fontFamily: "var(--font-display)" }}>Featured products</h2>
              <p className="muted text-sm mt-1">Our most-loved picks this week.</p>
            </div>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 stagger">
          {featured.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Reveal variant="scale">
          <div className="theme-card p-8 lg:p-12 text-center relative overflow-hidden grad-shift"
               style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-accent), var(--color-primary))",
                        color: "var(--color-on-primary)" }}>
            <div className="absolute inset-0 shimmer pointer-events-none" />
            <div className="relative">
              <div className="text-sm uppercase tracking-widest opacity-80 mb-2">Limited time</div>
              <h2 className="text-3xl lg:text-5xl font-bold mb-3" style={{ fontFamily: "var(--font-display)" }}>
                Up to <CountUp to={30} suffix="%" />  off select styles
              </h2>
              <p className="opacity-90 mb-6 max-w-xl mx-auto">
                Refresh your routine with bestsellers — discounted for a limited window only.
              </p>
              <RippleButton onClick={() => navigate("/category/fashion")}
                      className="btn-shine spring px-6 py-3 text-sm font-bold rounded-lg hover:scale-105 active:scale-95 transition-transform"
                      style={{ background: "white", color: "var(--color-primary)",
                               borderRadius: "var(--radius-btn)" }}>
                Shop the sale →
              </RippleButton>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Trending */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Reveal variant="right">
          <div className="flex items-end justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold" style={{ fontFamily: "var(--font-display)" }}>Trending now</h2>
              <p className="muted text-sm mt-1">What customers are obsessed with.</p>
            </div>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 stagger">
          {trending.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </div>
  );
}
