import { useEffect, useRef } from "react";
import { useTheme } from "../context/AppContext";
import { THEMES } from "../data/themes";

export function ThemeSwitcher({ onClose }: { onClose: () => void }) {
  const { themeId, setThemeId } = useTheme();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    setTimeout(() => document.addEventListener("click", onDoc), 0);
    return () => document.removeEventListener("click", onDoc);
  }, [onClose]);

  return (
    <div ref={ref} className="absolute right-0 top-full mt-2 z-50 theme-card p-3 w-[300px] scale-in origin-top-right">
      <div className="text-xs font-semibold uppercase tracking-wider muted px-2 pb-2">Choose a theme</div>
      <div className="space-y-1 stagger">
        {THEMES.map(t => {
          const active = t.id === themeId;
          return (
            <button
              key={t.id}
              onClick={() => { setThemeId(t.id); onClose(); }}
              className="w-full text-left px-3 py-2.5 rounded-lg transition-all flex items-center gap-3 hover:opacity-90"
              style={{
                background: active ? "color-mix(in srgb, var(--color-primary) 12%, transparent)" : "transparent",
                border: active ? "1px solid var(--color-primary)" : "1px solid transparent",
              }}
            >
              <div className="flex gap-1">
                {t.swatch.map((c, i) => (
                  <span key={i}
                        className="w-5 h-5 rounded-full border transition-transform hover:scale-125"
                        style={{ background: c, borderColor: "var(--color-border)", transitionDelay: `${i * 40}ms` }} />
                ))}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold">{t.name}</div>
                <div className="text-xs muted truncate">{t.description}</div>
              </div>
              {active && <span style={{ color: "var(--color-primary)" }}>✓</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}
