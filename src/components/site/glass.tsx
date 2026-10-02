import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface GlassProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  glowColor?: "red" | "rose" | "crimson" | "ruby";
  hoverEffect?: boolean;
}

export function GlassPanel({
  children,
  className,
  glowColor = "red",
  hoverEffect = true,
  ...props
}: GlassProps) {
  const glowMap = {
    red: "hover:border-red-500/40 hover:shadow-[0_20px_50px_rgba(220,38,38,0.12)]",
    rose: "hover:border-rose-500/40 hover:shadow-[0_20px_50px_rgba(225,29,72,0.12)]",
    crimson: "hover:border-rose-600/40 hover:shadow-[0_20px_50px_rgba(153,27,27,0.12)]",
    ruby: "hover:border-red-600/40 hover:shadow-[0_20px_50px_rgba(153,27,27,0.12)]",
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white/80 p-6 backdrop-blur-xl shadow-xl shadow-slate-200/40 transition-all duration-300",
        hoverEffect && glowMap[glowColor],
        className
      )}
      {...props}
    >
      {/* Light sheen layer */}
      <div className="pointer-events-none absolute -inset-full top-0 block bg-gradient-to-r from-transparent via-red-500/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      {children}
    </div>
  );
}

export function GlassCard({
  children,
  className,
  glowColor = "red",
  ...props
}: GlassProps) {
  const [coords, setCoords] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setCoords({ x, y });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className={cn(
        "group relative overflow-hidden rounded-xl border border-slate-200/80 bg-white/70 p-6 backdrop-blur-md shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-red-500/40 hover:bg-white hover:shadow-xl hover:shadow-red-500/10",
        className
      )}
      style={
        {
          "--mouse-x": `${coords.x}%`,
          "--mouse-y": `${coords.y}%`,
        } as React.CSSProperties
      }
      {...props}
    >
      {/* Dynamic light spot following cursor */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(220, 38, 38, 0.08), transparent 80%)`,
        }}
      />
      {children}
    </div>
  );
}

export function GlassBadge({
  children,
  className,
  icon: Icon,
}: {
  children: React.ReactNode;
  className?: string;
  icon?: React.ElementType;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-100/80 px-3 py-1 text-xs font-bold tracking-wide text-slate-700 backdrop-blur-md transition-colors hover:border-red-500/40 hover:bg-red-50 hover:text-red-700",
        className
      )}
    >
      {Icon && <Icon className="size-3.5 text-red-600" />}
      {children}
    </span>
  );
}
