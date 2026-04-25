import { useAuth, useCart, useOrders, useRouter, useWishlist } from "../context/AppContext";
import { Reveal } from "../components/Reveal";
import { RippleButton } from "../components/RippleButton";

export function Account() {
  const { user, logout } = useAuth();
  const { count } = useCart();
  const wishlist = useWishlist();
  const { orders } = useOrders();
  const { navigate } = useRouter();

  const totalSpent = orders.reduce((s, o) => s + o.total, 0);

  const tiles = [
    { icon: "📦", title: "Orders", value: orders.length, sub: "View order history", to: "/orders" },
    { icon: "♥",  title: "Wishlist", value: wishlist.ids.length, sub: "Saved for later", to: "/wishlist" },
    { icon: "🛒", title: "Cart", value: count, sub: "Items waiting", to: "/cart" },
    { icon: "💰", title: "Total spent", value: `$${totalSpent.toFixed(0)}`, sub: "Lifetime", to: "/orders" },
  ];

  return (
    <div className="page-enter max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Profile header */}
      <Reveal variant="up">
        <div className="theme-card p-6 lg:p-8 mb-8 grad-shift relative overflow-hidden"
             style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-accent), var(--color-primary))",
                      color: "var(--color-on-primary)" }}>
          <div className="absolute inset-0 shimmer pointer-events-none opacity-50" />
          <div className="relative flex items-center gap-5">
            <div className="w-20 h-20 rounded-full flex items-center justify-center font-bold text-3xl bg-white/25 backdrop-blur shadow-lg">
              {user?.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm uppercase tracking-widest opacity-80">Welcome back</div>
              <h1 className="text-3xl lg:text-4xl font-bold capitalize" style={{ fontFamily: "var(--font-display)" }}>{user}</h1>
              <p className="text-sm opacity-80 mt-1">Member since 2026 · Gold tier ✨</p>
            </div>
            <button onClick={logout}
                    className="px-4 py-2 text-sm font-semibold rounded-md bg-white/20 hover:bg-white/30 backdrop-blur transition-colors hidden sm:block">
              Logout
            </button>
          </div>
        </div>
      </Reveal>

      {/* Stats tiles */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8 stagger">
        {tiles.map(t => (
          <button key={t.title} onClick={() => navigate(t.to)}
                  className="theme-card p-5 text-left hover:-translate-y-1 group">
            <div className="text-3xl mb-2 inline-block group-hover:scale-110 transition-transform">{t.icon}</div>
            <div className="text-2xl font-bold">{t.value}</div>
            <div className="text-xs muted">{t.title} · {t.sub}</div>
          </button>
        ))}
      </div>

      {/* Profile details (display only, demo) */}
      <Reveal variant="up">
        <div className="theme-card p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-lg" style={{ fontFamily: "var(--font-display)" }}>Profile details</h2>
            <button className="text-sm theme-link">Edit</button>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <Detail label="Username" value={user || "—"} />
            <Detail label="Email" value={`${user}@lumenstore.com`} />
            <Detail label="Phone" value="+1 (555) 010-2026" />
            <Detail label="Member tier" value="Gold ✨" />
          </div>
        </div>
      </Reveal>

      {/* Recent activity */}
      <Reveal variant="up">
        <div className="theme-card p-6">
          <h2 className="font-bold text-lg mb-4" style={{ fontFamily: "var(--font-display)" }}>Recent activity</h2>
          {orders.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-3 float inline-block">🛍️</div>
              <p className="muted text-sm mb-4">You haven't placed any orders yet.</p>
              <RippleButton onClick={() => navigate("/")} className="theme-btn-primary spring px-5 py-2 text-sm">
                Start shopping
              </RippleButton>
            </div>
          ) : (
            <div className="space-y-3">
              {orders.slice(0, 3).map(o => (
                <button key={o.id} onClick={() => navigate("/orders")}
                        className="w-full p-3 surface rounded-lg flex items-center gap-3 text-left hover:opacity-90 transition-opacity"
                        style={{ borderRadius: "var(--radius-btn)" }}>
                  <div className="w-10 h-10 rounded surface overflow-hidden shrink-0">
                    <img src={o.items[0].photo} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">Order {o.id}</div>
                    <div className="text-xs muted">{o.date}</div>
                  </div>
                  <div className="text-sm font-bold">${o.total.toFixed(2)}</div>
                </button>
              ))}
            </div>
          )}
        </div>
      </Reveal>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="surface p-3 rounded-md" style={{ borderRadius: "var(--radius-btn)" }}>
      <div className="text-xs uppercase tracking-wider muted mb-0.5">{label}</div>
      <div className="font-medium">{value}</div>
    </div>
  );
}
