import { useState } from "react";
import { Reveal } from "../components/Reveal";
import { RippleButton } from "../components/RippleButton";

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Enter a valid email";
    if (!form.subject.trim()) e.subject = "Subject is required";
    if (!form.message.trim() || form.message.length < 10) e.message = "Message must be at least 10 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setForm({ name: "", email: "", subject: "", message: "" });
    }, 3500);
  };

  const channels = [
    { icon: "✉️", title: "Email", text: "support@lumenstore.com", sub: "Reply within 24 hours" },
    { icon: "📞", title: "Phone", text: "+1 (555) 123-4567", sub: "Mon–Fri, 9am–6pm EST" },
    { icon: "📍", title: "HQ", text: "221B Baker Street", sub: "London, United Kingdom" },
    { icon: "💬", title: "Live chat", text: "Chat with us instantly", sub: "Available 24/7" },
  ];

  return (
    <div className="page-enter">
      {/* Header */}
      <section className="surface border-b" style={{ borderColor: "var(--color-border)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-3" style={{ fontFamily: "var(--font-display)" }}>Get in touch</h1>
          <p className="muted max-w-xl mx-auto">Questions, feedback, partnerships — we'd love to hear from you.</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid lg:grid-cols-[1fr_1.4fr] gap-10">
        {/* Channels */}
        <Reveal variant="left">
          <div className="space-y-4">
            {channels.map(c => (
              <div key={c.title} className="theme-card p-5 flex items-start gap-4 group">
                <div className="text-3xl shrink-0 group-hover:scale-110 transition-transform">{c.icon}</div>
                <div>
                  <div className="font-bold">{c.title}</div>
                  <div className="text-sm font-medium">{c.text}</div>
                  <div className="text-xs muted mt-0.5">{c.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Form */}
        <Reveal variant="right">
          <form onSubmit={submit} className="theme-card p-6 lg:p-8">
            <h2 className="text-2xl font-bold mb-1" style={{ fontFamily: "var(--font-display)" }}>Send us a message</h2>
            <p className="text-sm muted mb-6">We'll get back to you within 1 business day.</p>

            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <Field label="Name" error={errors.name}>
                <input type="text" value={form.name}
                       onChange={e => setForm({ ...form, name: e.target.value })}
                       className="theme-input w-full px-3 py-2.5 text-sm" />
              </Field>
              <Field label="Email" error={errors.email}>
                <input type="email" value={form.email}
                       onChange={e => setForm({ ...form, email: e.target.value })}
                       className="theme-input w-full px-3 py-2.5 text-sm" />
              </Field>
            </div>
            <Field label="Subject" error={errors.subject}>
              <input type="text" value={form.subject}
                     onChange={e => setForm({ ...form, subject: e.target.value })}
                     className="theme-input w-full px-3 py-2.5 text-sm" />
            </Field>
            <div className="h-4" />
            <Field label="Message" error={errors.message}>
              <textarea rows={6} value={form.message}
                        onChange={e => setForm({ ...form, message: e.target.value })}
                        className="theme-input w-full px-3 py-2.5 text-sm resize-none" />
            </Field>

            <div className="mt-6 flex items-center gap-3">
              <RippleButton type="submit" disabled={sent}
                            className="theme-btn-primary btn-shine spring px-6 py-3 text-sm disabled:opacity-60">
                {sent ? "✓ Message sent!" : "Send message →"}
              </RippleButton>
              {sent && <span className="text-sm muted fade-in">We'll be in touch soon.</span>}
            </div>
          </form>
        </Reveal>
      </section>

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Reveal variant="up">
          <h2 className="text-3xl font-bold text-center mb-2" style={{ fontFamily: "var(--font-display)" }}>Quick answers</h2>
          <p className="muted text-center mb-8">Common questions from our customers.</p>
        </Reveal>
        <div className="space-y-3 stagger">
          {[
            { q: "How long does shipping take?", a: "Most orders ship within 1 business day and arrive in 3–5 days within the US, 7–14 internationally." },
            { q: "What's your return policy?", a: "Hassle-free returns within 30 days of delivery. Items must be unused and in original packaging." },
            { q: "Do you offer gift wrapping?", a: "Yes! Add gift wrap at checkout for a small fee, with optional handwritten note." },
            { q: "How can I track my order?", a: "You'll get an email with tracking info as soon as your order ships. You can also see it under My Orders." },
          ].map(f => <FAQ key={f.q} q={f.q} a={f.a} />)}
        </div>
      </section>
    </div>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-sm font-medium block mb-1.5">{label}</label>
      {children}
      {error && <p className="text-xs text-rose-500 mt-1 fade-in">⚠ {error}</p>}
    </div>
  );
}

function FAQ({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="theme-card overflow-hidden">
      <button onClick={() => setOpen(v => !v)}
              className="w-full flex items-center justify-between p-4 text-left hover:opacity-80">
        <span className="font-semibold text-sm">{q}</span>
        <span className={`text-xl transition-transform duration-300 ${open ? "rotate-45" : ""}`}>+</span>
      </button>
      <div className="grid transition-all duration-300"
           style={{ gridTemplateRows: open ? "1fr" : "0fr" }}>
        <div className="overflow-hidden">
          <p className="px-4 pb-4 text-sm muted">{a}</p>
        </div>
      </div>
    </div>
  );
}
