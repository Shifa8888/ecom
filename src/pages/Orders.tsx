import { useState } from "react";
import { useOrders, useRouter } from "../context/AppContext";
import { RippleButton } from "../components/RippleButton";

export function Orders() {
  const { orders } = useOrders();
  const { navigate } = useRouter();
  const [openId, setOpenId] = useState<string | null>(null);

  if (orders.length === 0) {
    return (
      <div className="page-enter max-w-xl mx-auto px-4 py-20 text-center">
        <div className="text-7xl mb-6 inline-block float">📦</div>
        <h1 className="text-3xl font-bold mb-3" style={{ fontFamily: "var(--font-display)" }}>No orders yet</h1>
        <p className="muted mb-8">Once you place an order, you'll see it here for tracking and reordering.</p>
        <RippleButton onClick={() => navigate("/")} className="theme-btn-primary spring btn-shine px-6 py-3">
          Start shopping →
        </RippleButton>
      </div>
    );
  }

  return (
    <div className="page-enter max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold mb-1" style={{ fontFamily: "var(--font-display)" }}>My orders</h1>
      <p className="muted text-sm mb-8">{orders.length} order{orders.length > 1 ? "s" : ""} placed</p>

      <div className="space-y-4 stagger">
        {orders.map(o => {
          const isOpen = openId === o.id;
          const statusColor =
            o.status === "Delivered" ? "#10b981" :
            o.status === "Shipped"   ? "#3b82f6" : "#f59e0b";
          return (
            <div key={o.id} className="theme-card overflow-hidden">
              <button onClick={() => setOpenId(isOpen ? null : o.id)}
                      className="w-full p-5 flex flex-wrap items-center gap-4 text-left hover:opacity-90">
                <div className="flex -space-x-3">
                  {o.items.slice(0, 3).map((i, idx) => (
                    <div key={idx}
                         className="w-12 h-12 rounded-full overflow-hidden border-2 shrink-0"
                         style={{ borderColor: "var(--color-surface-2)" }}>
                      <img src={i.photo} alt={i.name} className="w-full h-full object-cover" />
                    </div>
                  ))}
                  {o.items.length > 3 && (
                    <div className="w-12 h-12 rounded-full surface flex items-center justify-center text-xs font-bold shrink-0 border-2"
                         style={{ borderColor: "var(--color-surface-2)" }}>
                      +{o.items.length - 3}
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-[180px]">
                  <div className="font-bold text-sm">Order {o.id}</div>
                  <div className="text-xs muted">{o.date} · {o.items.reduce((s, i) => s + i.qty, 0)} items</div>
                </div>
                <div className="text-right">
                  <div className="font-bold">${o.total.toFixed(2)}</div>
                  <div className="text-xs font-semibold mt-0.5 inline-flex items-center gap-1.5"
                       style={{ color: statusColor }}>
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: statusColor }} />
                    {o.status}
                  </div>
                </div>
                <span className={`text-xl transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>▾</span>
              </button>

              {isOpen && (
                <div className="border-t p-5 space-y-4 fade-in" style={{ borderColor: "var(--color-border)" }}>
                  {/* Items */}
                  <div className="space-y-2">
                    {o.items.map((i, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className="w-14 h-14 rounded overflow-hidden surface shrink-0">
                          <img src={i.photo} alt={i.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm truncate">{i.name}</div>
                          <div className="text-xs muted">Qty {i.qty} × ${i.price.toFixed(2)}</div>
                        </div>
                        <div className="font-semibold text-sm">${(i.qty * i.price).toFixed(2)}</div>
                      </div>
                    ))}
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t" style={{ borderColor: "var(--color-border)" }}>
                    <div>
                      <div className="text-xs uppercase tracking-wider muted mb-1">Ship to</div>
                      <div className="text-sm font-medium">{o.address.fullName}</div>
                      <div className="text-sm muted">{o.address.street}</div>
                      <div className="text-sm muted">{o.address.city}, {o.address.state} {o.address.zip}</div>
                      <div className="text-sm muted">{o.address.country}</div>
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-wider muted mb-1">Payment</div>
                      <div className="text-sm font-medium capitalize">{o.payment.method}{o.payment.last4 ? ` •••• ${o.payment.last4}` : ""}</div>
                      <div className="space-y-1 mt-2 text-sm">
                        <div className="flex justify-between"><span className="muted">Subtotal</span><span>${o.subtotal.toFixed(2)}</span></div>
                        <div className="flex justify-between"><span className="muted">Shipping</span><span>{o.shipping === 0 ? "FREE" : `$${o.shipping.toFixed(2)}`}</span></div>
                        <div className="flex justify-between"><span className="muted">Tax</span><span>${o.tax.toFixed(2)}</span></div>
                        <div className="flex justify-between font-bold pt-1 border-t mt-1" style={{ borderColor: "var(--color-border)" }}>
                          <span>Total</span><span>${o.total.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
