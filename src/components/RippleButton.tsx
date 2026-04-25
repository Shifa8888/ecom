import { useRef, type ButtonHTMLAttributes, type ReactNode } from "react";

/**
 * Button that emits a Material-style ripple from the click point.
 * Drop-in replacement for <button>.
 */
export function RippleButton({
  children,
  className = "",
  onClick,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode }) {
  const ref = useRef<HTMLButtonElement>(null);

  const handle = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = ref.current;
    if (btn) {
      const rect = btn.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      const span = document.createElement("span");
      span.className = "ripple-dot";
      span.style.width = span.style.height = `${size}px`;
      span.style.left = `${x}px`;
      span.style.top = `${y}px`;
      btn.appendChild(span);
      setTimeout(() => span.remove(), 650);
    }
    onClick?.(e);
  };

  return (
    <button ref={ref} onClick={handle} className={`ripple-host ${className}`} {...rest}>
      {children}
    </button>
  );
}
