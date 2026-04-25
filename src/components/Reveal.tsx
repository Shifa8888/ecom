import type { ReactNode } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";

type Variant = "up" | "left" | "right" | "scale" | "fade";

export function Reveal({
  children,
  variant = "up",
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  variant?: Variant;
  delay?: number;
  className?: string;
}) {
  const { ref, visible } = useScrollReveal();

  const initial: Record<Variant, string> = {
    up: "opacity-0 translate-y-8",
    left: "opacity-0 -translate-x-8",
    right: "opacity-0 translate-x-8",
    scale: "opacity-0 scale-95",
    fade: "opacity-0",
  };
  const final = "opacity-100 translate-x-0 translate-y-0 scale-100";

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out will-change-transform ${
        visible ? final : initial[variant]
      } ${className}`}
    >
      {children}
    </div>
  );
}

/** Animated number counter triggered when scrolled into view */
export function CountUp({
  to,
  suffix = "",
  prefix = "",
  decimals = 0,
  duration = 1400,
  className = "",
}: {
  to: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
}) {
  const { ref, visible } = useScrollReveal({ threshold: 0.4 });
  // local count
  const value = useCountInternal(to, duration, visible);
  return (
    <span ref={ref as never} className={className}>
      {prefix}
      {value.toFixed(decimals)}
      {suffix}
    </span>
  );
}

import { useEffect, useState } from "react";
function useCountInternal(target: number, duration: number, start: boolean) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const e = 1 - Math.pow(1 - p, 3);
      setV(target * e);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start]);
  return v;
}
