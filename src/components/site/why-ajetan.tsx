import { useState } from "react";
import { assets } from "@/lib/assets";
import { GlassBadge } from "./glass";

const statements = [
  {
    keyword: "DESIGN",
    rest: "that people understand.",
    image: assets.why.design,
    detail: "Intuitive interfaces and research-led user journeys that eliminate friction.",
    badge: "User Centric",
  },
  {
    keyword: "TECHNOLOGY",
    rest: "that scales with you.",
    image: assets.why.technology,
    detail: "Modern, high-performance architecture built for security and continuous evolution.",
    badge: "Cloud Ready",
  },
  {
    keyword: "AUTOMATION",
    rest: "that saves time.",
    image: assets.why.automation,
    detail: "Human-controlled AI workflows connecting tools and eliminating repetitive tasks.",
    badge: "Intelligent Workflows",
  },
  {
    keyword: "GROWTH",
    rest: "that keeps moving.",
    image: assets.why.growth,
    detail: "Connected measurement, SEO, and continuous optimization designed for impact.",
    badge: "Data Driven",
  },
];

export function WhyAjetan() {
  const [activeItem, setActiveItem] = useState(0);

  return (
    <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
      {/* Left Statements List */}
      <div className="space-y-4">
        {statements.map((item, index) => {
          const isActive = index === activeItem;

          return (
            <div
              key={item.keyword}
              onMouseEnter={() => setActiveItem(index)}
              onClick={() => setActiveItem(index)}
              data-cursor="VIEW"
              className={`group cursor-pointer rounded-2xl border p-6 transition-all duration-300 ${
                isActive
                  ? "border-red-600/50 bg-white shadow-xl shadow-red-500/10"
                  : "border-slate-200/80 bg-white/60 hover:border-slate-300 hover:bg-white"
              }`}
            >
              <div className="flex items-center justify-between">
                <GlassBadge>{item.badge}</GlassBadge>
                <span className="text-xs font-mono font-bold text-slate-400">0{index + 1}</span>
              </div>

              <h3 className="mt-4 font-display text-3xl font-extrabold sm:text-4xl">
                <span className="text-gradient-accent">{item.keyword} </span>
                <span className={isActive ? "text-slate-900" : "text-slate-500 group-hover:text-slate-700"}>
                  {item.rest}
                </span>
              </h3>

              <p className={`mt-3 text-sm leading-relaxed transition-opacity duration-300 ${isActive ? "text-slate-600 opacity-100" : "text-slate-400 opacity-80"}`}>
                {item.detail}
              </p>
            </div>
          );
        })}
      </div>

      {/* Right Visual Image Panel */}
      <div className="relative">
        {(() => {
          const currentStatement = statements[activeItem] || statements[0];
          return (
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 shadow-2xl">
              <img
                src={currentStatement.image}
                alt={currentStatement.keyword}
                className="h-full w-full object-cover transition-all duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200 shadow-xl">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-red-600">
                  0{activeItem + 1} / {currentStatement.keyword} FOCUS
                </span>
                <p className="mt-1 text-lg font-bold text-slate-900">
                  {currentStatement.keyword} {currentStatement.rest}
                </p>
              </div>
            </div>
          );
        })()}
      </div>
    </div>
  );
}
