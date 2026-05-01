import { useState } from "react";
import emailjs from "@emailjs/browser";
import { useRouter } from "../context/AppContext";
import { CATEGORIES } from "../data/products";

// ─── EmailJS Config ───────────────────────────────────────────────
// 1. emailjs.com par free account banao
// 2. Email Service add karo (Gmail) → Service ID copy karo
// 3. Email Template banao → Template ID copy karo
// 4. Account > API Keys → Public Key copy karo
const EMAILJS_SERVICE_ID  = "YOUR_SERVICE_ID";   // e.g. "service_abc123"
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";  // e.g. "template_xyz789"
const EMAILJS_PUBLIC_KEY  = "YOUR_PUBLIC_KEY";   // e.g. "abcDEFghiJKL"
// ─────────────────────────────────────────────────────────────────

export function Footer() {
  const { navigate } = useRouter();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("sending");

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          subscriber_email: email,
          to_email: "hashirmajeed1447@gmail.com",
          message: `New newsletter subscriber: ${email}`,
        },
        EMAILJS_PUBLIC_KEY
      );
      setStatus("success");
      setEmail("");
      setTimeout(() => setStatus("idle"), 4000);
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };
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

<div className="flex gap-3">
  {/* GitHub */}
  <a href="https://github.com/developer1447/textutils_react" target="_blank" rel="noopener noreferrer" aria-label="GitHub"
     className="w-9 h-9 flex items-center justify-center rounded-full opacity-80 hover:opacity-100 transition-opacity"
     style={{ background: "rgba(255,255,255,0.1)" }}>
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
    </svg>
  </a>
  {/* TikTok */}
  <a href="https://www.tiktok.com/@mikeyxmina676789" target="_blank" rel="noopener noreferrer" aria-label="TikTok"
     className="w-9 h-9 flex items-center justify-center rounded-full opacity-80 hover:opacity-100 transition-opacity"
     style={{ background: "rgba(255,255,255,0.1)" }}>
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/>
    </svg>
  </a>
  {/* Instagram */}
  <a href="https://www.instagram.com/maliha_haniya/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
     className="w-9 h-9 flex items-center justify-center rounded-full opacity-80 hover:opacity-100 transition-opacity"
     style={{ background: "rgba(255,255,255,0.1)" }}>
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
    </svg>
  </a>
  {/* Facebook */}
  <a href="https://www.facebook.com/HashirMikey" target="_blank" rel="noopener noreferrer" aria-label="Facebook"
     className="w-9 h-9 flex items-center justify-center rounded-full opacity-80 hover:opacity-100 transition-opacity"
     style={{ background: "rgba(255,255,255,0.1)" }}>
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  </a>
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
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              required
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === "sending"}
              className="flex-1 px-3 py-2 text-sm rounded-md outline-none min-w-0"
              style={{ background: "rgba(255,255,255,0.1)", color: "var(--footer-text)",
                       border: "1px solid rgba(255,255,255,0.2)" }}
            />
            <button
              type="submit"
              disabled={status === "sending"}
              className="px-4 py-2 text-sm font-semibold rounded-md shrink-0 transition-opacity"
              style={{ background: "var(--color-accent)", color: "var(--footer-bg)",
                       opacity: status === "sending" ? 0.7 : 1 }}
            >
              {status === "sending" ? "..." : "Join"}
            </button>
          </form>

          {/* Status messages */}
          {status === "success" && (
            <p className="mt-2 text-xs" style={{ color: "#4ade80" }}>
              ✓ Subscribed! Welcome aboard 🎉
            </p>
          )}
          {status === "error" && (
            <p className="mt-2 text-xs" style={{ color: "#f87171" }}>
              ✗ Something went wrong. Please try again.
            </p>
          )}
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
