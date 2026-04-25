import { useEffect, useRef, useState } from "react";
import { useAuth, useCart, useRouter, useWishlist } from "../context/AppContext";
import { CATEGORIES } from "../data/products";
import { ThemeSwitcher } from "./ThemeSwitcher";

export function Navbar() {
  const { navigate, path } = useRouter();
  const { user, logout } = useAuth();
  const { count } = useCart();
  const wishlist = useWishlist();
  const [open, setOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);
  const [bouncing, setBouncing] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  const [searchQ, setSearchQ] = useState("");
  const prevCount = useRef(count);

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQ.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQ.trim())}`);
      setSearchQ("");
      setOpen(false);
    }
  };

  useEffect(() => {
    if (count !== prevCount.current && count > 0) {
      setBouncing(true);
      const t = setTimeout(() => setBouncing(false), 500);
      prevCount.current = count;
      return () => clearTimeout(t);
    }
    prevCount.current = count;
  }, [count]);

  const NavLink = ({ to, label }: { to: string; label: string }) => {
    const active = path === to || (to !== "/" && path.startsWith(to));
    return (
      <button
        onClick={() => { navigate(to); setOpen(false); }}
        className="relative text-sm font-medium px-1 py-2 transition-colors"
        style={{ color: active ? "var(--color-primary)" : "var(--color-text)" }}
      >
        {label}
        {active && (
          <span className="absolute -bottom-0.5 left-0 right-0 h-0.5 rounded-full"
                style={{ background: "var(--color-primary)" }} />
        )}
      </button>
    );
  };

  return (
    <header className="theme-nav sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button onClick={() => navigate("/")} className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-lg transition-transform group-hover:rotate-12 group-hover:scale-110"
                 style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-accent))",
                          color: "var(--color-on-primary)",
                          borderRadius: "var(--radius-btn)" }}>
              L
            </div>
            <span className="text-xl font-bold tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
              Hashir-store
            </span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-6">
            <NavLink to="/" label="Home" />
            <div className="relative group">
              <button className="text-sm font-medium px-1 py-2" style={{ color: "var(--color-text)" }}>
                Shop ▾
              </button>
              <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                <div className="theme-card p-2 min-w-[220px]">
                  {CATEGORIES.map(c => (
                    <button key={c.id}
                            onClick={() => navigate(`/category/${c.id}`)}
                            className="w-full text-left px-3 py-2 rounded-md text-sm hover:opacity-70 transition-opacity flex items-center gap-2">
                      <span>{c.icon}</span>{c.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <NavLink to="/about" label="About" />
            <NavLink to="/contact" label="Contact" />
          </nav>

          {/* Search bar (desktop) */}
          <form onSubmit={submitSearch} className="hidden md:flex flex-1 max-w-xs mx-4">
            <div className="relative w-full">
              <input
                type="search"
                value={searchQ}
                onChange={e => setSearchQ(e.target.value)}
                placeholder="Search products..."
                className="theme-input w-full pl-9 pr-3 py-2 text-sm"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 muted text-sm">🔍</span>
            </div>
          </form>

          {/* Right actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="relative">
              <button
                onClick={() => setThemeOpen(v => !v)}
                className="theme-btn-outline wiggle px-3 py-2 text-sm flex items-center gap-2 transition-transform hover:scale-105 active:scale-95"
                aria-label="Theme"
              >
                <span className="inline-block">🎨</span>
                <span className="hidden sm:inline">Theme</span>
              </button>
              {themeOpen && (
                <ThemeSwitcher onClose={() => setThemeOpen(false)} />
              )}
            </div>

            <button onClick={() => navigate("/wishlist")}
                    className="theme-btn-outline px-3 py-2 text-sm relative transition-transform hover:scale-110 active:scale-95 hidden sm:flex">
              <span className="inline-block">♥</span>
              {wishlist.ids.length > 0 && (
                <span key={wishlist.ids.length}
                      className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 text-xs flex items-center justify-center rounded-full font-bold tick-pop"
                      style={{ background: "#ef4444", color: "white" }}>
                  {wishlist.ids.length}
                </span>
              )}
            </button>

            <button onClick={() => navigate("/cart")}
                    className={`theme-btn-outline px-3 py-2 text-sm relative transition-transform hover:scale-110 active:scale-95 ${bouncing ? "bounce-y" : ""}`}>
              <span className="inline-block">🛒</span>
              {count > 0 && (
                <span key={count}
                      className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 text-xs flex items-center justify-center rounded-full font-bold tick-pop"
                      style={{ background: "var(--color-accent)", color: "white" }}>
                  {count}
                </span>
              )}
            </button>

            {user && (
              <div className="relative hidden sm:block">
                <button onClick={() => setUserMenu(v => !v)}
                        className="flex items-center gap-2 px-2 py-1.5 rounded-lg surface text-sm hover:opacity-90">
                  <span className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs"
                        style={{ background: "var(--color-primary)", color: "var(--color-on-primary)" }}>
                    {user.charAt(0).toUpperCase()}
                  </span>
                  <span className="font-medium capitalize">{user}</span>
                  <span className="text-xs muted">▾</span>
                </button>
                {userMenu && (
                  <div className="absolute right-0 top-full mt-2 z-50 theme-card p-2 w-[200px] scale-in origin-top-right">
                    <button onClick={() => { navigate("/account"); setUserMenu(false); }}
                            className="w-full text-left px-3 py-2 rounded-md text-sm hover:opacity-70 flex items-center gap-2">
                      <span>👤</span> My Account
                    </button>
                    <button onClick={() => { navigate("/orders"); setUserMenu(false); }}
                            className="w-full text-left px-3 py-2 rounded-md text-sm hover:opacity-70 flex items-center gap-2">
                      <span>📦</span> My Orders
                    </button>
                    <button onClick={() => { navigate("/wishlist"); setUserMenu(false); }}
                            className="w-full text-left px-3 py-2 rounded-md text-sm hover:opacity-70 flex items-center gap-2">
                      <span>♥</span> Wishlist
                    </button>
                    <div className="my-1 border-t" style={{ borderColor: "var(--color-border)" }} />
                    <button onClick={() => { logout(); setUserMenu(false); }}
                            className="w-full text-left px-3 py-2 rounded-md text-sm hover:opacity-70 flex items-center gap-2 text-rose-500">
                      <span>↪</span> Logout
                    </button>
                  </div>
                )}
              </div>
            )}

            <button onClick={() => setOpen(v => !v)} className="lg:hidden theme-btn-outline px-3 py-2">
              ☰
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {open && (
          <div className="lg:hidden pb-4 space-y-1 border-t pt-3" style={{ borderColor: "var(--color-border)" }}>
            <form onSubmit={submitSearch} className="px-1 pb-2">
              <input type="search" value={searchQ} onChange={e => setSearchQ(e.target.value)}
                     placeholder="🔍 Search..." className="theme-input w-full px-3 py-2 text-sm" />
            </form>
            <button onClick={() => { navigate("/"); setOpen(false); }} className="block w-full text-left px-3 py-2 rounded-md hover:opacity-70">🏠 Home</button>
            <div className="text-xs uppercase tracking-wider muted px-3 pt-2">Categories</div>
            {CATEGORIES.map(c => (
              <button key={c.id}
                      onClick={() => { navigate(`/category/${c.id}`); setOpen(false); }}
                      className="block w-full text-left px-3 py-2 rounded-md hover:opacity-70">
                {c.icon} {c.name}
              </button>
            ))}
            <div className="text-xs uppercase tracking-wider muted px-3 pt-2">Account</div>
            <button onClick={() => { navigate("/wishlist"); setOpen(false); }} className="block w-full text-left px-3 py-2 rounded-md hover:opacity-70">♥ Wishlist</button>
            <button onClick={() => { navigate("/orders"); setOpen(false); }} className="block w-full text-left px-3 py-2 rounded-md hover:opacity-70">📦 Orders</button>
            <button onClick={() => { navigate("/account"); setOpen(false); }} className="block w-full text-left px-3 py-2 rounded-md hover:opacity-70">👤 Account</button>
            <button onClick={() => { navigate("/about"); setOpen(false); }} className="block w-full text-left px-3 py-2 rounded-md hover:opacity-70">ℹ️ About</button>
            <button onClick={() => { navigate("/contact"); setOpen(false); }} className="block w-full text-left px-3 py-2 rounded-md hover:opacity-70">✉️ Contact</button>
            {user && (
              <div className="flex items-center justify-between px-3 py-2 mt-2 rounded-md surface">
                <span className="text-sm font-medium capitalize">👤 {user}</span>
                <button onClick={logout} className="text-sm theme-link">Logout</button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
