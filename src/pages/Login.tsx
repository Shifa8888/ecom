import { useState } from "react";
import { useAuth } from "../context/AppContext";
import { RippleButton } from "../components/RippleButton";

export function Login() {
  const { login } = useAuth();
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    setTimeout(() => {
      const res = login(u, p);
      if (!res.ok) setErr(res.error || "Login failed");
      setLoading(false);
    }, 500);
  };

  const fillDemo = () => { setU("demo"); setP("lumen2026"); };

  return (
    <div className="min-h-screen flex items-stretch">
      {/* Left: brand panel */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden p-12 flex-col justify-between slide-in-left"
           style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-accent))",
                    color: "var(--color-on-primary)" }}>
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-20 spin-slow"
             style={{ background: "white" }} />
        <div className="absolute -bottom-40 -left-20 w-[500px] h-[500px] rounded-full opacity-10 spin-slow"
             style={{ background: "white", animationDirection: "reverse" }} />

        <div className="relative">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 flex items-center justify-center font-bold text-2xl rounded-xl bg-white/20 backdrop-blur">
              L
            </div>
            <span className="text-2xl font-bold tracking-tight" style={{ fontFamily: "var(--font-display)" }}>LUMEN</span>
          </div>
        </div>

        <div className="relative max-w-md">
          <h1 className="text-4xl xl:text-5xl font-bold leading-tight mb-4" style={{ fontFamily: "var(--font-display)" }}>
            Welcome back to your favorite store.
          </h1>
          <p className="text-lg opacity-90">
            Discover curated essentials, bold designs, and a shopping experience built for you.
          </p>
        </div>

        <div className="relative grid grid-cols-3 gap-4 stagger">
          {[
            { n: "12k+", l: "Happy customers" },
            { n: "850+", l: "Products" },
            { n: "4.9★", l: "Avg rating" },
          ].map(s => (
            <div key={s.l} className="bg-white/15 backdrop-blur rounded-xl p-4 hover:scale-105 transition-transform">
              <div className="text-2xl font-bold">{s.n}</div>
              <div className="text-xs opacity-80">{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right: form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10" style={{ background: "var(--color-bg)" }}>
        <form onSubmit={submit} className="w-full max-w-md slide-in-right">
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg"
                 style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-accent))",
                          color: "var(--color-on-primary)" }}>L</div>
            <span className="text-xl font-bold">LUMEN</span>
          </div>

          <h2 className="text-3xl font-bold mb-2" style={{ fontFamily: "var(--font-display)" }}>Sign in</h2>
          <p className="muted mb-8">Enter your credentials to continue shopping.</p>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium block mb-1.5">Username</label>
              <input
                type="text"
                value={u}
                onChange={e => setU(e.target.value)}
                placeholder="demo"
                className="theme-input w-full px-4 py-3 text-sm"
                autoComplete="username"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium block mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPw ? "text" : "password"}
                  value={p}
                  onChange={e => setP(e.target.value)}
                  placeholder="••••••••"
                  className="theme-input w-full px-4 py-3 text-sm pr-12"
                  autoComplete="current-password"
                  required
                />
                <button type="button" onClick={() => setShowPw(v => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-xs muted hover:opacity-70">
                  {showPw ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {err && (
              <div className="text-sm px-3 py-2 rounded-lg" style={{
                background: "color-mix(in srgb, #ef4444 12%, transparent)",
                color: "#dc2626",
                border: "1px solid color-mix(in srgb, #ef4444 30%, transparent)"
              }}>
                ⚠ {err}
              </div>
            )}

            <RippleButton type="submit" disabled={loading}
                    className="theme-btn-primary btn-shine spring w-full py-3 text-sm disabled:opacity-60 transition-transform hover:scale-[1.02] active:scale-[0.98]">
              {loading ? (
                <span className="inline-flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
                  Signing in...
                </span>
              ) : "Sign in →"}
            </RippleButton>

            <div className="theme-card p-4 text-xs space-y-1.5" style={{ background: "var(--color-surface)" }}>
              <div className="font-semibold flex items-center justify-between">
                <span>🔐 Demo credentials</span>
                <button type="button" onClick={fillDemo} className="theme-link font-medium">Auto-fill</button>
              </div>
              <div className="muted">Username: <span className="font-mono" style={{color:"var(--color-text)"}}>demo</span> · Password: <span className="font-mono" style={{color:"var(--color-text)"}}>lumen2026</span></div>
              <div className="muted">Username: <span className="font-mono" style={{color:"var(--color-text)"}}>admin</span> · Password: <span className="font-mono" style={{color:"var(--color-text)"}}>admin123</span></div>
            </div>
          </div>

          <p className="text-center text-sm muted mt-8">
            New to LUMEN? <a href="#" className="theme-link font-medium">Create an account</a>
          </p>
        </form>
      </div>
    </div>
  );
}
