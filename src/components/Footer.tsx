import { useRouter } from "../context/AppContext";
import { CATEGORIES } from "../data/products";

export function Footer() {
  const { navigate } = useRouter();
  return (
    <footer className="theme-footer mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 flex items-center justify-center font-bold text-lg"
                 style={{ background: "var(--color-accent)", color: "var(--footer-bg)",
                          borderRadius: "var(--radius-btn)" }}>
              L
            </div>
            <span className="text-xl font-bold tracking-tight" style={{ fontFamily: "var(--font-display)" }}>Hashir-store</span>
          </div>
<p className="text-sm opacity-80 leading-relaxed mb-4">
  Curated essentials for the modern life. Designed with intention, delivered with care.
</p>

<div className="flex gap-4 text-sm opacity-80">
  <a href="#" className="hover:opacity-100 hover:underline">Facebook</a>
  <a href="#" className="hover:opacity-100 hover:underline">Instagram</a>
  <a href="#" className="hover:opacity-100 hover:underline">Twitter</a>
  <a href="#" className="hover:opacity-100 hover:underline">LinkedIn</a>
</div>        </div>

        <div>
          <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider opacity-90">Shop</h4>
          <ul className="space-y-2 text-sm opacity-80">
            {CATEGORIES.map(c => (
              <li key={c.id}>
                <button onClick={() => navigate(`/category/${c.id}`)} className="hover:opacity-100 hover:underline">
                  {c.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider opacity-90">Company</h4>
          <ul className="space-y-2 text-sm opacity-80">
            <li><button onClick={() => navigate("/about")} className="hover:underline">About Us</button></li>
            <li><button onClick={() => navigate("/contact")} className="hover:underline">Contact</button></li>
            <li><button onClick={() => navigate("/orders")} className="hover:underline">My Orders</button></li>
            <li><button onClick={() => navigate("/account")} className="hover:underline">My Account</button></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider opacity-90">Stay in touch</h4>
          <p className="text-sm opacity-80 mb-3">Get 10% off your first order.</p>
          <form onSubmit={(e) => { e.preventDefault(); alert("Subscribed!"); }} className="flex gap-2">
            <input type="email" required placeholder="you@email.com"
                   className="flex-1 px-3 py-2 text-sm rounded-md outline-none"
                   style={{ background: "rgba(255,255,255,0.1)", color: "var(--footer-text)",
                            border: "1px solid rgba(255,255,255,0.2)" }} />
            <button className="px-4 py-2 text-sm font-semibold rounded-md"
                    style={{ background: "var(--color-accent)", color: "var(--footer-bg)" }}>
              Join
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs opacity-70">
          <div>© 2026 Hashir-store. All rights reserved.</div>
          <div className="flex gap-5">
            <a href="#" className="hover:opacity-100">Privacy</a>
            <a href="#" className="hover:opacity-100">Terms</a>
            <a href="#" className="hover:opacity-100">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
