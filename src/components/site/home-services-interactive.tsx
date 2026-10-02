import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Bot,
  CodeXml,
  LayoutTemplate,
  Smartphone,
  AppWindow,
  ChartNoAxesCombined,
} from "lucide-react";
import { assets } from "@/lib/assets";
import { GlassBadge } from "./glass";
import { useCMS } from "@/context/cms-context";

const iconsMap = {
  "web-development": CodeXml,
  "app-development": Smartphone,
  "ai-automation": Bot,
  "ui-ux-design": LayoutTemplate,
  "custom-software": AppWindow,
};

export function HomeServicesInteractive() {
  const { data } = useCMS();
  const services = data.services.filter((s) => s.visible).sort((a, b) => a.order - b.order);
  const [activeIndex, setActiveIndex] = useState(0);

  const activeService = services[activeIndex] ?? services[0] ?? {
    slug: "web-development",
    title: "Website Development",
    shortTitle: "Web Dev",
    detail: "High-performance web solutions built with modern technology.",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1200&auto=format&fit=crop",
    technologies: ["React", "TypeScript", "TailwindCSS"],
  };
  const Icon = iconsMap[activeService.slug as keyof typeof iconsMap] || CodeXml;
  const activeAssetKey = activeService.slug.replace(/-([a-z])/g, (_, char) => char.toUpperCase());
  const activeAsset = (assets.services as Record<string, { image: string; badge?: string }>)[activeAssetKey] ?? {
    image: (activeService as any).image || "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1200&auto=format&fit=crop",
    badge: "Performance & Responsive",
  };

  return (
    <div className="relative text-white">
      {/* Desktop & Tablet Sticky Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Interactive Service Selection List */}
        <div className="lg:col-span-5 space-y-3.5 sticky top-28">
          <p className="mb-6 text-xs font-extrabold uppercase tracking-[0.2em] text-red-500">
            SELECT A SERVICE CAPABILITY
          </p>

          {services.map((service, index) => {
            const ServiceIcon = iconsMap[service.slug as keyof typeof iconsMap] || CodeXml;
            const isActive = index === activeIndex;
            const formattedNum = index < 9 ? `0${index + 1}` : `${index + 1}`;

            return (
              <button
                key={service.slug}
                onClick={() => setActiveIndex(index)}
                onMouseEnter={() => setActiveIndex(index)}
                className={`group relative flex w-full items-center justify-between rounded-2xl p-5 text-left transition-all duration-300 ${
                  isActive
                    ? "bg-neutral-900/95 border-2 border-red-600 shadow-2xl shadow-red-600/20"
                    : "bg-neutral-950/80 border border-neutral-900 hover:border-neutral-800 hover:bg-neutral-900/80"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`grid size-12 place-items-center rounded-xl transition-all duration-300 ${
                      isActive
                        ? "bg-red-600 text-white shadow-lg shadow-red-600/30"
                        : "bg-neutral-900 border border-neutral-800 text-neutral-400 group-hover:text-red-500 group-hover:border-red-600/40"
                    }`}
                  >
                    <ServiceIcon className="size-6" />
                  </div>
                  <div>
                    <span className="text-xs font-mono font-bold text-neutral-500 block">
                      {formattedNum}
                    </span>
                    <h3
                      className={`text-lg sm:text-xl font-bold transition-colors ${
                        isActive ? "text-white" : "text-neutral-300 group-hover:text-white"
                      }`}
                    >
                      {service.title}
                    </h3>
                  </div>
                </div>

                {/* Right Arrow & Active Explore Pill */}
                <div className="flex items-center gap-3">
                  {isActive && (
                    <span className="hidden sm:inline-flex size-10 rounded-full border border-red-600/60 bg-red-950/40 text-[9px] font-mono font-bold uppercase tracking-widest text-red-400 items-center justify-center animate-pulse">
                      EXPLORE
                    </span>
                  )}
                  <ArrowRight
                    className={`size-5 transition-transform duration-300 ${
                      isActive
                        ? "translate-x-1 text-red-500 opacity-100"
                        : "text-neutral-600 opacity-0 group-hover:opacity-100 group-hover:text-neutral-400"
                    }`}
                  />
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Dynamic Service Visual Preview Box */}
        <div className="lg:col-span-7 relative">
          <div className="dark-glass-panel p-8 sm:p-10 border border-neutral-800 bg-neutral-900/90 rounded-3xl min-h-[560px] flex flex-col justify-between shadow-2xl">
            <div>
              {/* Top Bar Header */}
              <div className="flex items-center justify-between border-b border-neutral-800/80 pb-6">
                <div className="flex items-center gap-3">
                  <div className="grid size-10 place-items-center rounded-xl bg-red-950/60 border border-red-800/80 text-red-500">
                    <Icon className="size-5" />
                  </div>
                  <span className="text-xs font-mono font-extrabold tracking-widest text-neutral-400 uppercase">
                    0{activeIndex + 1} / {activeService.shortTitle}
                  </span>
                </div>
                <GlassBadge className="bg-neutral-800 text-neutral-200 border-neutral-700">
                  {activeAsset.badge || "System Capability"}
                </GlassBadge>
              </div>

              {/* Title & Detail */}
              <div className="mt-6">
                <h3 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
                  {activeService.title}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-neutral-300 font-medium">
                  {activeService.detail}
                </p>
              </div>

              {/* Visual Mockup Container */}
              <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950 shadow-lg group">
                <img
                  src={activeAsset.image}
                  alt={activeService.title}
                  className="h-full w-full object-cover transition-all duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                {/* Floating Tags Over Image */}
                <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
                  {activeService.technologies.map((tech) => (
                    <GlassBadge key={tech} className="bg-neutral-900/90 text-white border-neutral-700">
                      {tech}
                    </GlassBadge>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom CTA Link */}
            <div className="mt-8 flex items-center justify-between pt-6 border-t border-neutral-800">
              <span className="text-xs font-mono font-bold text-neutral-400 uppercase tracking-widest hidden sm:inline-block">
                Customized Enterprise Architecture
              </span>
              <Link
                to="/services/$slug"
                params={{ slug: activeService.slug }}
                className="inline-flex items-center gap-2 rounded-xl bg-red-600 hover:bg-red-700 px-6 py-3.5 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-white shadow-xl shadow-red-600/25 transition-all duration-300 hover:scale-105"
              >
                View Service Details <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
