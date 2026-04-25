import { useState } from "react";
import { useCart, useOrders, useRouter } from "../context/AppContext";
import { PRODUCTS } from "../data/products";
import { RippleButton } from "../components/RippleButton";
import { Confetti } from "../components/Confetti";
import type { Address, Order, PaymentInfo } from "../types";

type Step = 1 | 2 | 3 | 4;

const emptyAddress: Address = {
  fullName: "", email: "", phone: "",
  street: "", city: "", state: "", zip: "", country: "United States",
};
const emptyPayment: PaymentInfo = {
  method: "card", cardName: "", cardNumber: "", cardExp: "", cardCvc: "",
};

export function Checkout() {
  const { items, clear } = useCart();
  const { add: addOrder } = useOrders();
  const { navigate } = useRouter();
  const [step, setStep] = useState<Step>(1);
  const [address, setAddress] = useState<Address>(emptyAddress);
  const [payment, setPayment] = useState<PaymentInfo>(emptyPayment);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [orderId, setOrderId] = useState<string | null>(null);
  const [shipMethod, setShipMethod] = useState<"standard" | "express">("standard");

  const lines = items.map(it => {
    const product = PRODUCTS.find(p => p.id === it.productId)!;
    return { ...it, product };
  }).filter(l => l.product);

  const subtotal = lines.reduce((s, l) => s + l.product.price * l.qty, 0);
  const shipping = subtotal === 0 ? 0 : (shipMethod === "express" ? 14.99 : (subtotal > 50 ? 0 : 7.99));
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  // Empty cart guard (but not after order placed)
  if (lines.length === 0 && !orderId) {
    return (
      <div className="page-enter max-w-xl mx-auto px-4 py-20 text-center">
        <div className="text-7xl mb-6 inline-block float">🛒</div>
        <h1 className="text-3xl font-bold mb-3" style={{ fontFamily: "var(--font-display)" }}>Your cart is empty</h1>
        <p className="muted mb-8">Add something to your cart before checking out.</p>
        <RippleButton onClick={() => navigate("/")} className="theme-btn-primary spring btn-shine px-6 py-3">
          Browse products →
        </RippleButton>
      </div>
    );
  }

  // ---------- VALIDATION ----------
  const validateAddress = () => {
    const e: Record<string, string> = {};
    if (!address.fullName.trim()) e.fullName = "Required";
    if (!address.email.trim()) e.email = "Required";
    else if (!/^\S+@\S+\.\S+$/.test(address.email)) e.email = "Invalid email";
    if (!address.phone.trim() || address.phone.replace(/\D/g, "").length < 7) e.phone = "Invalid phone";
    if (!address.street.trim()) e.street = "Required";
    if (!address.city.trim()) e.city = "Required";
    if (!address.state.trim()) e.state = "Required";
    if (!address.zip.trim() || address.zip.length < 4) e.zip = "Invalid zip";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validatePayment = () => {
    const e: Record<string, string> = {};
    if (payment.method === "card") {
      if (!payment.cardName?.trim()) e.cardName = "Required";
      const num = (payment.cardNumber || "").replace(/\s/g, "");
      if (num.length < 13 || num.length > 19) e.cardNumber = "Invalid card number";
      if (!/^\d{2}\/\d{2}$/.test(payment.cardExp || "")) e.cardExp = "MM/YY";
      if (!/^\d{3,4}$/.test(payment.cardCvc || "")) e.cardCvc = "3–4 digits";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // ---------- ACTIONS ----------
  const placeOrder = () => {
    const id = "LMN-" + Date.now().toString(36).toUpperCase();
    const order: Order = {
      id,
      date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }),
      items: lines.map(l => ({
        productId: l.productId, qty: l.qty, price: l.product.price,
        name: l.product.name, photo: l.product.photo,
      })),
      subtotal, shipping, tax, total, address,
      payment: {
        method: payment.method,
        last4: payment.method === "card" ? (payment.cardNumber || "").replace(/\s/g, "").slice(-4) : undefined,
      },
      status: "Processing",
    };
    addOrder(order);
    clear();
    setOrderId(id);
    setStep(4);
  };

  const formatCard = (v: string) => v.replace(/\D/g, "").slice(0, 19).replace(/(\d{4})(?=\d)/g, "$1 ");
  const formatExp = (v: string) => {
    const d = v.replace(/\D/g, "").slice(0, 4);
    return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
  };

  // ---------- SUCCESS ----------
  if (step === 4 && orderId) {
    return (
      <>
        <Confetti />
        <div className="page-enter max-w-2xl mx-auto px-4 py-20 text-center">
          <div className="text-7xl mb-6 inline-block heartbeat">🎉</div>
          <h1 className="text-4xl font-bold mb-3" style={{ fontFamily: "var(--font-display)" }}>Order confirmed!</h1>
          <p className="muted mb-2">Thanks for shopping with LUMEN.</p>
          <p className="text-sm mb-8">Your order ID is <span className="font-bold font-mono">{orderId}</span></p>

          <div className="theme-card p-6 mb-8 text-left">
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-xs uppercase tracking-wider muted mb-1">Shipping to</div>
                <div className="font-medium">{address.fullName}</div>
                <div className="muted">{address.street}</div>
                <div className="muted">{address.city}, {address.state} {address.zip}</div>
                <div className="muted">{address.country}</div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider muted mb-1">Payment</div>
                <div className="font-medium capitalize">{payment.method === "card" ? `Card •••• ${(payment.cardNumber || "").replace(/\s/g, "").slice(-4)}` : payment.method}</div>
                <div className="text-2xl font-bold mt-2">${total.toFixed(2)}</div>
                <div className="text-xs muted">Estimated delivery: 3–5 days</div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <RippleButton onClick={() => navigate("/orders")} className="theme-btn-primary spring btn-shine px-6 py-3">
              View order →
            </RippleButton>
            <RippleButton onClick={() => navigate("/")} className="theme-btn-outline spring px-6 py-3">
              Continue shopping
            </RippleButton>
          </div>
        </div>
      </>
    );
  }

  // ---------- LAYOUT ----------
  return (
    <div className="page-enter max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: "var(--font-display)" }}>Checkout</h1>
      <p className="muted text-sm mb-8">Complete your purchase in 3 simple steps.</p>

      {/* Stepper */}
      <div className="flex items-center justify-between mb-10 max-w-2xl mx-auto">
        {(["Shipping", "Payment", "Review"] as const).map((label, i) => {
          const n = (i + 1) as Step;
          const done = step > n;
          const active = step === n;
          return (
            <div key={label} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center gap-2 flex-1">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${done || active ? "scale-110" : "opacity-50"}`}
                     style={{
                       background: done || active ? "var(--color-primary)" : "var(--color-surface)",
                       color: done || active ? "var(--color-on-primary)" : "var(--color-muted)",
                       border: "2px solid " + (done || active ? "var(--color-primary)" : "var(--color-border)"),
                     }}>
                  {done ? "✓" : n}
                </div>
                <div className={`text-xs font-semibold ${active ? "" : "muted"}`}>{label}</div>
              </div>
              {i < 2 && (
                <div className="h-[2px] flex-1 mx-2 -mt-6 transition-colors"
                     style={{ background: step > n ? "var(--color-primary)" : "var(--color-border)" }} />
              )}
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-[1fr_360px] gap-8">
        {/* MAIN PANEL */}
        <div className="theme-card p-6 lg:p-8 page-enter" key={step}>
          {/* STEP 1: Shipping */}
          {step === 1 && (
            <div>
              <h2 className="text-xl font-bold mb-1" style={{ fontFamily: "var(--font-display)" }}>Shipping address</h2>
              <p className="text-sm muted mb-6">Where should we send your order?</p>

              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Full name" error={errors.fullName}>
                  <input value={address.fullName} onChange={e => setAddress({ ...address, fullName: e.target.value })}
                         className="theme-input w-full px-3 py-2.5 text-sm" placeholder="John Doe" />
                </Field>
                <Field label="Email" error={errors.email}>
                  <input type="email" value={address.email} onChange={e => setAddress({ ...address, email: e.target.value })}
                         className="theme-input w-full px-3 py-2.5 text-sm" placeholder="you@email.com" />
                </Field>
                <Field label="Phone" error={errors.phone}>
                  <input type="tel" value={address.phone} onChange={e => setAddress({ ...address, phone: e.target.value })}
                         className="theme-input w-full px-3 py-2.5 text-sm" placeholder="+1 (555) 123-4567" />
                </Field>
                <Field label="Country">
                  <select value={address.country} onChange={e => setAddress({ ...address, country: e.target.value })}
                          className="theme-input w-full px-3 py-2.5 text-sm">
                    {["United States", "United Kingdom", "Canada", "India", "Pakistan", "Australia", "Germany", "France"].map(c => <option key={c}>{c}</option>)}
                  </select>
                </Field>
                <div className="sm:col-span-2">
                  <Field label="Street address" error={errors.street}>
                    <input value={address.street} onChange={e => setAddress({ ...address, street: e.target.value })}
                           className="theme-input w-full px-3 py-2.5 text-sm" placeholder="221B Baker Street" />
                  </Field>
                </div>
                <Field label="City" error={errors.city}>
                  <input value={address.city} onChange={e => setAddress({ ...address, city: e.target.value })}
                         className="theme-input w-full px-3 py-2.5 text-sm" placeholder="London" />
                </Field>
                <Field label="State / Province" error={errors.state}>
                  <input value={address.state} onChange={e => setAddress({ ...address, state: e.target.value })}
                         className="theme-input w-full px-3 py-2.5 text-sm" placeholder="NW" />
                </Field>
                <Field label="ZIP / Postal code" error={errors.zip}>
                  <input value={address.zip} onChange={e => setAddress({ ...address, zip: e.target.value })}
                         className="theme-input w-full px-3 py-2.5 text-sm" placeholder="NW1 6XE" />
                </Field>
              </div>

              <div className="mt-8">
                <h3 className="font-semibold mb-3 text-sm">Shipping method</h3>
                <div className="space-y-2">
                  <ShipOption value="standard" current={shipMethod} onSelect={setShipMethod}
                              title="Standard (3–5 days)" price={subtotal > 50 ? "FREE" : "$7.99"} />
                  <ShipOption value="express" current={shipMethod} onSelect={setShipMethod}
                              title="Express (1–2 days)" price="$14.99" badge="Fastest" />
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <button onClick={() => navigate("/cart")} className="theme-btn-outline px-5 py-2.5 text-sm">
                  ← Back to cart
                </button>
                <RippleButton onClick={() => { if (validateAddress()) setStep(2); }}
                              className="theme-btn-primary spring btn-shine px-6 py-2.5 text-sm">
                  Continue to payment →
                </RippleButton>
              </div>
            </div>
          )}

          {/* STEP 2: Payment */}
          {step === 2 && (
            <div>
              <h2 className="text-xl font-bold mb-1" style={{ fontFamily: "var(--font-display)" }}>Payment method</h2>
              <p className="text-sm muted mb-6">Choose how you'd like to pay.</p>

              <div className="space-y-2 mb-6">
                <PayOption value="card" current={payment.method} onSelect={(m) => setPayment({ ...payment, method: m })}
                           icon="💳" title="Credit / Debit Card" sub="Visa, Mastercard, Amex" />
                <PayOption value="paypal" current={payment.method} onSelect={(m) => setPayment({ ...payment, method: m })}
                           icon="🅿️" title="PayPal" sub="Pay securely with your PayPal account" />
                <PayOption value="cod" current={payment.method} onSelect={(m) => setPayment({ ...payment, method: m })}
                           icon="💵" title="Cash on Delivery" sub="Pay when your order arrives" />
              </div>

              {payment.method === "card" && (
                <div className="grid sm:grid-cols-2 gap-4 fade-in">
                  <div className="sm:col-span-2">
                    <Field label="Cardholder name" error={errors.cardName}>
                      <input value={payment.cardName} onChange={e => setPayment({ ...payment, cardName: e.target.value })}
                             className="theme-input w-full px-3 py-2.5 text-sm" placeholder="JOHN DOE" />
                    </Field>
                  </div>
                  <div className="sm:col-span-2">
                    <Field label="Card number" error={errors.cardNumber}>
                      <input value={payment.cardNumber}
                             onChange={e => setPayment({ ...payment, cardNumber: formatCard(e.target.value) })}
                             className="theme-input w-full px-3 py-2.5 text-sm font-mono"
                             placeholder="4242 4242 4242 4242" inputMode="numeric" />
                    </Field>
                  </div>
                  <Field label="Expiry (MM/YY)" error={errors.cardExp}>
                    <input value={payment.cardExp}
                           onChange={e => setPayment({ ...payment, cardExp: formatExp(e.target.value) })}
                           className="theme-input w-full px-3 py-2.5 text-sm font-mono" placeholder="12/29" inputMode="numeric" />
                  </Field>
                  <Field label="CVC" error={errors.cardCvc}>
                    <input value={payment.cardCvc}
                           onChange={e => setPayment({ ...payment, cardCvc: e.target.value.replace(/\D/g, "").slice(0, 4) })}
                           className="theme-input w-full px-3 py-2.5 text-sm font-mono" placeholder="123" inputMode="numeric" />
                  </Field>
                </div>
              )}

              {payment.method !== "card" && (
                <div className="theme-card p-5 surface fade-in">
                  <p className="text-sm muted">
                    {payment.method === "paypal"
                      ? "You'll be redirected to PayPal to complete payment after reviewing your order."
                      : "Pay in cash when your order is delivered. An extra $2 handling fee may apply."}
                  </p>
                </div>
              )}

              <div className="flex justify-between mt-8">
                <button onClick={() => setStep(1)} className="theme-btn-outline px-5 py-2.5 text-sm">
                  ← Back
                </button>
                <RippleButton onClick={() => { if (validatePayment()) setStep(3); }}
                              className="theme-btn-primary spring btn-shine px-6 py-2.5 text-sm">
                  Review order →
                </RippleButton>
              </div>
            </div>
          )}

          {/* STEP 3: Review */}
          {step === 3 && (
            <div>
              <h2 className="text-xl font-bold mb-1" style={{ fontFamily: "var(--font-display)" }}>Review your order</h2>
              <p className="text-sm muted mb-6">Make sure everything looks good before placing your order.</p>

              <div className="space-y-3 mb-6">
                {lines.map(l => (
                  <div key={l.productId} className="flex items-center gap-3 p-3 surface rounded-md"
                       style={{ borderRadius: "var(--radius-btn)" }}>
                    <div className="w-14 h-14 rounded overflow-hidden shrink-0 surface">
                      <img src={l.product.photo} alt={l.product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm truncate">{l.product.name}</div>
                      <div className="text-xs muted">Qty {l.qty} × ${l.product.price.toFixed(2)}</div>
                    </div>
                    <div className="font-semibold text-sm">${(l.qty * l.product.price).toFixed(2)}</div>
                  </div>
                ))}
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                <ReviewBox title="Shipping address" onEdit={() => setStep(1)}>
                  <div className="text-sm font-medium">{address.fullName}</div>
                  <div className="text-sm muted">{address.email} · {address.phone}</div>
                  <div className="text-sm muted mt-1">{address.street}</div>
                  <div className="text-sm muted">{address.city}, {address.state} {address.zip}</div>
                  <div className="text-sm muted">{address.country}</div>
                  <div className="text-xs mt-2 inline-block px-2 py-0.5 rounded-full"
                       style={{ background: "color-mix(in srgb, var(--color-primary) 12%, transparent)", color: "var(--color-primary)" }}>
                    {shipMethod === "express" ? "Express (1–2 days)" : "Standard (3–5 days)"}
                  </div>
                </ReviewBox>

                <ReviewBox title="Payment" onEdit={() => setStep(2)}>
                  <div className="text-sm font-medium capitalize">
                    {payment.method === "card"
                      ? `Card ending in ${(payment.cardNumber || "").replace(/\s/g, "").slice(-4)}`
                      : payment.method === "paypal" ? "PayPal" : "Cash on Delivery"}
                  </div>
                  {payment.method === "card" && (
                    <div className="text-sm muted">{payment.cardName}</div>
                  )}
                </ReviewBox>
              </div>

              <div className="flex justify-between">
                <button onClick={() => setStep(2)} className="theme-btn-outline px-5 py-2.5 text-sm">
                  ← Back
                </button>
                <RippleButton onClick={placeOrder}
                              className="theme-btn-primary spring btn-shine px-6 py-2.5 text-sm">
                  🔒 Place order · ${total.toFixed(2)}
                </RippleButton>
              </div>
            </div>
          )}
        </div>

        {/* SUMMARY SIDEBAR */}
        <aside className="theme-card p-6 h-fit lg:sticky lg:top-24">
          <h2 className="font-bold text-lg mb-4">Order summary</h2>
          <div className="space-y-2 mb-4 max-h-48 overflow-y-auto pr-1">
            {lines.map(l => (
              <div key={l.productId} className="flex items-center gap-2 text-sm">
                <div className="w-9 h-9 rounded overflow-hidden surface shrink-0">
                  <img src={l.product.photo} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="truncate text-xs font-medium">{l.product.name}</div>
                  <div className="text-xs muted">× {l.qty}</div>
                </div>
                <div className="text-xs font-semibold">${(l.qty * l.product.price).toFixed(2)}</div>
              </div>
            ))}
          </div>
          <div className="space-y-2 text-sm pb-4 border-b" style={{ borderColor: "var(--color-border)" }}>
            <div className="flex justify-between"><span className="muted">Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
            <div className="flex justify-between"><span className="muted">Shipping</span><span>{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span></div>
            <div className="flex justify-between"><span className="muted">Tax (8%)</span><span>${tax.toFixed(2)}</span></div>
          </div>
          <div className="flex justify-between font-bold text-lg my-4">
            <span>Total</span><span>${total.toFixed(2)}</span>
          </div>
          <p className="text-xs muted text-center">🔒 Secured by 256-bit SSL encryption</p>
        </aside>
      </div>
    </div>
  );
}

// ---------- helpers ----------
function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-sm font-medium block mb-1.5">{label}</label>
      {children}
      {error && <p className="text-xs text-rose-500 mt-1 fade-in">⚠ {error}</p>}
    </div>
  );
}

function ShipOption({ value, current, onSelect, title, price, badge }: {
  value: "standard" | "express"; current: string;
  onSelect: (v: "standard" | "express") => void;
  title: string; price: string; badge?: string;
}) {
  const active = value === current;
  return (
    <button onClick={() => onSelect(value)}
            className="w-full p-3 flex items-center gap-3 text-left transition-all"
            style={{
              border: "2px solid " + (active ? "var(--color-primary)" : "var(--color-border)"),
              background: active ? "color-mix(in srgb, var(--color-primary) 8%, transparent)" : "transparent",
              borderRadius: "var(--radius-btn)",
            }}>
      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors`}
           style={{ borderColor: active ? "var(--color-primary)" : "var(--color-border)" }}>
        {active && <div className="w-2.5 h-2.5 rounded-full" style={{ background: "var(--color-primary)" }} />}
      </div>
      <div className="flex-1">
        <div className="text-sm font-semibold flex items-center gap-2">
          {title}
          {badge && <span className="text-xs px-1.5 py-0.5 rounded-full" style={{ background: "var(--color-accent)", color: "white" }}>{badge}</span>}
        </div>
      </div>
      <div className="text-sm font-bold">{price}</div>
    </button>
  );
}

function PayOption({ value, current, onSelect, icon, title, sub }: {
  value: PaymentInfo["method"]; current: string;
  onSelect: (m: PaymentInfo["method"]) => void;
  icon: string; title: string; sub: string;
}) {
  const active = value === current;
  return (
    <button onClick={() => onSelect(value)}
            className="w-full p-4 flex items-center gap-3 text-left transition-all"
            style={{
              border: "2px solid " + (active ? "var(--color-primary)" : "var(--color-border)"),
              background: active ? "color-mix(in srgb, var(--color-primary) 8%, transparent)" : "transparent",
              borderRadius: "var(--radius-btn)",
            }}>
      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0`}
           style={{ borderColor: active ? "var(--color-primary)" : "var(--color-border)" }}>
        {active && <div className="w-2.5 h-2.5 rounded-full" style={{ background: "var(--color-primary)" }} />}
      </div>
      <div className="text-2xl">{icon}</div>
      <div className="flex-1">
        <div className="text-sm font-semibold">{title}</div>
        <div className="text-xs muted">{sub}</div>
      </div>
    </button>
  );
}

function ReviewBox({ title, onEdit, children }: { title: string; onEdit: () => void; children: React.ReactNode }) {
  return (
    <div className="surface p-4 rounded-md" style={{ borderRadius: "var(--radius-btn)" }}>
      <div className="flex items-center justify-between mb-2">
        <div className="text-xs uppercase tracking-wider muted font-semibold">{title}</div>
        <button onClick={onEdit} className="text-xs theme-link font-medium">Edit</button>
      </div>
      {children}
    </div>
  );
}
