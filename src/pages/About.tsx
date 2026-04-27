import { useRouter } from "../context/AppContext";
import { Reveal, CountUp } from "../components/Reveal";
import { RippleButton } from "../components/RippleButton";

export function About() {
  const { navigate } = useRouter();

  const values = [
    { icon: "🌱", title: "Sustainably sourced", text: "We partner with artisans and brands that respect the planet." },
    { icon: "✨", title: "Curated, not crowded", text: "Every product is hand-picked. No noise, just the good stuff." },
    { icon: "🤝", title: "People first", text: "Real humans helping real customers — every step of the way." },
    { icon: "🚀", title: "Built for delight", text: "Beautiful design and a buttery-smooth experience, always." },
  ];

  const team = [
    { name: "Aanya Kapoor", role: "Founder & CEO", emoji: "👩‍💼", grad: "from-pink-400 to-rose-600" },
    { name: "Rohan Mehta", role: "Head of Design", emoji: "🎨", grad: "from-indigo-500 to-purple-600" },
    { name: "Sara Lin", role: "Lead Engineer", emoji: "💻", grad: "from-cyan-500 to-blue-600" },
    { name: "Marcus Cole", role: "Customer Joy", emoji: "🤗", grad: "from-amber-500 to-orange-600" },
  ];

  return (
    <div className="page-enter">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="blob w-[500px] h-[500px] -top-40 -left-32" style={{ background: "var(--color-primary)" }} />
        <div className="blob blob-2 w-[400px] h-[400px] top-20 right-0" style={{ background: "var(--color-accent)" }} />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 text-center">
          <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full mb-4 pop-in"
                style={{ background: "color-mix(in srgb, var(--color-primary) 15%, transparent)",
                         color: "var(--color-primary)" }}>
            ✦ Our story
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-[1.05] mb-6" style={{ fontFamily: "var(--font-display)" }}>
            Designed with intent. <br/>
            <span style={{
              background: "linear-gradient(90deg, var(--color-primary), var(--color-accent), var(--color-primary))",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: "shimmer 4s linear infinite",
            }}>Delivered with love.</span>
          </h1>
          <p className="text-lg muted max-w-2xl mx-auto">
            Hashir-store started as a small idea in 2021 — a place where great design, great products, and great service
            could finally live together. Today, we ship to over 40 countries and our community keeps growing.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Reveal variant="up">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { n: 12, s: "k+", l: "Happy customers" },
              { n: 850, s: "+", l: "Products curated" },
              { n: 40, s: "+", l: "Countries shipped" },
              { n: 4.9, s: "★", l: "Avg. rating", d: 1 },
            ].map(s => (
              <div key={s.l} className="theme-card p-6 text-center">
                <div className="text-4xl font-bold mb-1" style={{ color: "var(--color-primary)" }}>
                  <CountUp to={s.n} suffix={s.s} decimals={s.d || 0} />
                </div>
                <div className="text-sm muted">{s.l}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Reveal variant="up">
          <div className="text-center mb-10">
            <h2 className="text-3xl lg:text-4xl font-bold mb-2" style={{ fontFamily: "var(--font-display)" }}>What we believe</h2>
            <p className="muted">The principles that guide every decision we make.</p>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 stagger">
          {values.map(v => (
            <div key={v.title} className="theme-card p-6 group">
              <div className="text-4xl mb-3 inline-block group-hover:scale-125 group-hover:-rotate-6 transition-transform">{v.icon}</div>
              <h3 className="font-bold mb-1.5">{v.title}</h3>
              <p className="text-sm muted leading-relaxed">{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Reveal variant="up">
          <div className="text-center mb-10">
            <h2 className="text-3xl lg:text-4xl font-bold mb-2" style={{ fontFamily: "var(--font-display)" }}>Meet the team</h2>
            <p className="muted">A small, passionate group obsessed with the details.</p>
          </div>
        </Reveal>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 stagger">
          {team.map(t => (
            <div key={t.name} className="theme-card overflow-hidden text-center group">
              <div className={`h-44 flex items-center justify-center text-7xl bg-gradient-to-br ${t.grad}`}>
                <span className="group-hover:scale-110 transition-transform duration-500">{t.emoji}</span>
              </div>
              <div className="p-4">
                <h3 className="font-bold">{t.name}</h3>
                <p className="text-xs muted">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Reveal variant="scale">
          <div className="theme-card p-10 lg:p-14 text-center grad-shift relative overflow-hidden"
               style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-accent), var(--color-primary))",
                        color: "var(--color-on-primary)" }}>
            <div className="absolute inset-0 shimmer pointer-events-none" />
            <div className="relative">
              <h2 className="text-3xl lg:text-5xl font-bold mb-3" style={{ fontFamily: "var(--font-display)" }}>
                Ready to shop the difference?
              </h2>
              <p className="opacity-90 mb-6 max-w-xl mx-auto">Browse our latest collection and find something you'll love.</p>
              <RippleButton onClick={() => navigate("/")}
                            className="btn-shine spring px-6 py-3 text-sm font-bold rounded-lg"
                            style={{ background: "white", color: "var(--color-primary)", borderRadius: "var(--radius-btn)" }}>
                Explore the store →
              </RippleButton>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
