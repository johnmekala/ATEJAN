import { Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  Bot,
  CodeXml,
  LayoutTemplate,
  Smartphone,
  AppWindow,
  CheckCircle2,
} from "lucide-react";
import { assets } from "@/lib/assets";
import { useCMS } from "@/context/cms-context";

const iconsMap = {
  "web-development": CodeXml,
  "app-development": Smartphone,
  "ai-automation": Bot,
  "ui-ux-design": LayoutTemplate,
  "custom-software": AppWindow,
};

// Metric badges mapped per service
const metricsMap: Record<string, { value: string; label: string }> = {
  "web-development": { value: "190%", label: "TRAFFIC GROWTH" },
  "app-development": { value: "5x", label: "ENGAGEMENT LIFT" },
  "ai-automation": { value: "340%", label: "ROI INCREASE" },
  "ui-ux-design": { value: "100%", label: "USER CLARITY" },
  "custom-software": { value: "99.9%", label: "SYSTEM UPTIME" },
};

// Straplines in red per service
const straplinesMap: Record<string, string> = {
  "web-development": "Rank higher. Convert faster. Scale seamlessly.",
  "app-development": "Content & products that engage, not just impress.",
  "ai-automation": "Every workflow operating with maximum efficiency.",
  "ui-ux-design": "Intuitive experiences engineered for clarity.",
  "custom-software": "Tailored infrastructure built around your business.",
};

export function ServicesInteractive() {
  const { data } = useCMS();
  const services = data.services.filter((s) => s.visible).sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-6 sm:space-y-8 text-white">
      {services.map((service, index) => {
        const ServiceIcon = iconsMap[service.slug as keyof typeof iconsMap] || CodeXml;
        const camelSlug = service.slug.replace(/-([a-z])/g, (_, char) => char.toUpperCase());
        const asset = (assets.services as Record<string, { image: string }>)[camelSlug] ?? {
          image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
        };

        const metric = metricsMap[service.slug] || { value: `${100 + index * 50}%`, label: "PERFORMANCE" };
        const strapline = straplinesMap[service.slug] || service.summary;
        const formattedIndex = index < 9 ? `0${index + 1}` : `${index + 1}`;
        const isEven = index % 2 === 0;

        return (
          <div
            key={service.slug}
            className="group relative rounded-2xl sm:rounded-3xl border border-neutral-900 bg-neutral-950/90 shadow-2xl overflow-hidden transition-all duration-500 hover:border-neutral-800 grid grid-cols-1 lg:grid-cols-12 items-stretch"
          >
            {/* Visual Image Box (Alternates Order on Desktop) */}
            <div
              className={`relative w-full min-h-[180px] sm:min-h-[220px] lg:min-h-full overflow-hidden bg-neutral-900 lg:col-span-4 ${
                isEven ? "lg:order-1" : "lg:order-2"
              }`}
            >
              {/* Floating Metric Badge */}
              <div className="absolute top-3.5 left-3.5 z-10 rounded-xl border border-white/10 bg-black/85 px-3 py-1.5 shadow-xl backdrop-blur-md">
                <span className="block font-display text-sm sm:text-base font-extrabold text-white leading-none">
                  {metric.value}
                </span>
                <span className="block font-mono text-[9px] font-extrabold uppercase tracking-wider text-neutral-400 mt-0.5">
                  {metric.label}
                </span>
              </div>

              <img
                src={service.image || asset.image}
                alt={service.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-80" />
            </div>

            {/* Content Side (Alternates Order on Desktop) */}
            <div
              className={`p-5 sm:p-7 flex flex-col justify-between relative lg:col-span-8 ${
                isEven ? "lg:order-2" : "lg:order-1"
              }`}
            >
              <div>
                {/* Header Row: Icon + Title + Red Strapline + Number */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="grid size-9 place-items-center rounded-xl bg-red-950/60 border border-red-800/80 text-red-500 shrink-0 shadow-md shadow-red-600/10">
                      <ServiceIcon className="size-4 sm:size-5" />
                    </div>
                    <div>
                      <h3 className="font-display text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                        {service.title}
                      </h3>
                      <p className="mt-0.5 text-xs font-bold text-red-500 tracking-wide">
                        {strapline}
                      </p>
                    </div>
                  </div>

                  <span className="font-mono text-3xl sm:text-4xl font-extrabold text-white/90 tracking-tighter shrink-0 select-none">
                    {formattedIndex}
                  </span>
                </div>

                {/* Pill Tags Row */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-4">
                  {service.deliverables.map((item) => (
                    <span
                      key={item}
                      className="inline-flex items-center gap-1.5 rounded-full border border-neutral-800/90 bg-neutral-900/90 px-3 py-1 text-[11px] font-semibold text-neutral-300 transition-colors group-hover:border-neutral-700"
                    >
                      <CheckCircle2 className="size-3 text-red-500 shrink-0" />
                      {item}
                    </span>
                  ))}
                </div>

                {/* Description */}
                <p className="mt-3 text-xs sm:text-sm leading-relaxed text-neutral-400 font-medium max-w-2xl">
                  {service.detail}
                </p>
              </div>

              {/* Bottom CTA Row */}
              <div className="mt-4 pt-4 border-t border-neutral-900/80 flex items-center justify-between">
                <span className="text-[10px] font-mono text-neutral-500 font-extrabold uppercase tracking-widest hidden sm:inline-block">
                  AJETAN // CAPABILITY_{formattedIndex}
                </span>

                <Link
                  to="/services/$slug"
                  params={{ slug: service.slug }}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-red-600 hover:bg-red-700 px-5 py-2 text-xs font-extrabold uppercase tracking-wider text-white shadow-lg shadow-red-600/20 transition-all duration-300 hover:scale-105"
                >
                  Get Started <ArrowUpRight className="size-3.5" />
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
