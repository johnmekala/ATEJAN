import { useEffect, useState } from "react";

export function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hovered, setHovered] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkTouch = () => {
      if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
        setIsTouchDevice(true);
      }
    };
    checkTouch();

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorTarget = target.closest("[data-cursor]") as HTMLElement | null;
      if (cursorTarget) {
        setHovered(true);
        setLabel(cursorTarget.getAttribute("data-cursor"));
      } else if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a")
      ) {
        setHovered(true);
        setLabel(null);
      } else {
        setHovered(false);
        setLabel(null);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  if (isTouchDevice) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden"
      style={{ opacity: pos.x === -100 ? 0 : 1 }}
    >
      <div
        className={`absolute flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full transition-all duration-150 cubic-bezier(0.16, 1, 0.3, 1) ${
          hovered
            ? label
              ? "size-14 border border-red-600/80 bg-red-600/10 shadow-[0_0_20px_rgba(220,38,38,0.4)] backdrop-blur-xs"
              : "size-10 border border-slate-700/60 bg-slate-900/10 backdrop-blur-xs"
            : "size-4 border border-slate-500/50 bg-slate-800/20"
        }`}
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
        }}
      >
        {label && (
          <span className="animate-fade-in text-[0.65rem] font-bold uppercase tracking-widest text-red-700">
            {label}
          </span>
        )}
      </div>
    </div>
  );
}
