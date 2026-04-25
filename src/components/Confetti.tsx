import { useEffect, useRef } from "react";

/** Lightweight canvas confetti burst — runs once on mount. */
export function Confetti({ duration = 2200 }: { duration?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    const colors = ["#6366f1", "#ec4899", "#22d3ee", "#facc15", "#10b981", "#f97316"];
    const N = 140;
    type P = { x: number; y: number; vx: number; vy: number; r: number; c: string; rot: number; vr: number; shape: number };
    const parts: P[] = [];
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2.5;
    for (let i = 0; i < N; i++) {
      const angle = (Math.PI * 2 * i) / N + Math.random() * 0.4;
      const speed = 5 + Math.random() * 8;
      parts.push({
        x: cx, y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 4,
        r: 4 + Math.random() * 6,
        c: colors[i % colors.length],
        rot: Math.random() * Math.PI,
        vr: (Math.random() - 0.5) * 0.4,
        shape: i % 3,
      });
    }

    const start = performance.now();
    let raf = 0;
    const draw = (t: number) => {
      const elapsed = t - start;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      parts.forEach((p) => {
        p.vy += 0.18;       // gravity
        p.vx *= 0.995;
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vr;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.c;
        ctx.globalAlpha = Math.max(0, 1 - elapsed / duration);
        if (p.shape === 0) {
          ctx.fillRect(-p.r / 2, -p.r / 2, p.r, p.r * 0.6);
        } else if (p.shape === 1) {
          ctx.beginPath();
          ctx.arc(0, 0, p.r / 2, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.moveTo(0, -p.r / 2);
          ctx.lineTo(p.r / 2, p.r / 2);
          ctx.lineTo(-p.r / 2, p.r / 2);
          ctx.closePath();
          ctx.fill();
        }
        ctx.restore();
      });
      if (elapsed < duration) raf = requestAnimationFrame(draw);
      else ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
    raf = requestAnimationFrame(draw);

    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, [duration]);

  return <canvas ref={ref} className="fixed inset-0 pointer-events-none z-[60]" />;
}
