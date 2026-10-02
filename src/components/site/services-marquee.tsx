import { Link } from "@tanstack/react-router";
import { ArrowRight, CodeXml, Smartphone, Bot, LayoutTemplate, AppWindow } from "lucide-react";
import { assets } from "@/lib/assets";
import { useCMS } from "@/context/cms-context";

const iconsMap = {
  "web-development": CodeXml,
  "app-development": Smartphone,
  "ai-automation": Bot,
  "ui-ux-design": LayoutTemplate,
  "custom-software": AppWindow,
};

export function ServicesMarqueeSection() {
  const { data } = useCMS();
  const services = data.services.filter((s) => s.visible).sort((a, b) => a.order - b.order);

  return (
    <section id="intro" className="relative overflow-hidden bg-black text-white py-12 sm:py-16 border-b border-neutral-800">
      {/* Background Ambient Red Glow */}
      <div className="glow-orb top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[450px] bg-red-600/15" />

      <div className="relative z-10 flex flex-col items-center text-center px-4 sm:px-6 mb-8">
        {/* Eyebrow */}
        <p className="mb-2 text-[11px] sm:text-xs font-extrabold uppercase tracking-[0.2em] text-red-500 flex items-center gap-2 sm:gap-3">
          <span className="h-px w-6 sm:w-8 bg-red-600 inline-block" />
          EXCELLENCE IN DIGITAL PRODUCTION
          <span className="h-px w-6 sm:w-8 bg-red-600 inline-block" />
        </p>

        {/* Title */}
        <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-white">
          PRECISION <span className="text-red-600 italic font-serif">agency.</span>
        </h2>

        {/* Subtitle */}
        <p className="mt-2 max-w-2xl text-[11px] sm:text-xs font-mono tracking-widest text-neutral-400 uppercase">
          ENGINEERED FOR IMPACT. ARCHITECTED FOR SCALE. THE PINNACLE OF DIGITAL CRAFTSMANSHIP.
        </p>
      </div>

      {/* Auto-scrolling Cards Marquee (Right to Left) */}
      <div className="relative w-full overflow-hidden py-2">
        {/* Gradient Blur Mask Edges */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-20 w-12 sm:w-24 bg-gradient-to-r from-black via-black/80 to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-20 w-12 sm:w-24 bg-gradient-to-l from-black via-black/80 to-transparent" />

        <div className="animate-marquee flex gap-4 sm:gap-5 whitespace-nowrap">
          {[...services, ...services, ...services].map((service, index) => {
            const Icon = iconsMap[service.slug as keyof typeof iconsMap] || CodeXml;
            const assetKey = service.slug.replace(/-([a-z])/g, (_, letter) => (letter ? letter.toUpperCase() : "")) as keyof typeof assets.services;
            const asset = (assets.services as Record<string, { image: string }>)[assetKey] ?? assets.services.webDevelopment;
            const itemNumber = (index % Math.max(1, services.length)) + 1;

            return (
              <Link
                key={`${service.slug}-${index}`}
                to="/services/$slug"
                params={{ slug: service.slug }}
                className="group relative flex-shrink-0 w-[240px] sm:w-[290px] h-[320px] sm:h-[360px] overflow-hidden rounded-xl border border-neutral-800 bg-neutral-950 transition-all duration-300 hover:border-red-600 hover:scale-[1.02] hover:shadow-xl hover:shadow-red-600/20"
              >
                {/* Background Image */}
                <img
                  src={service.image || asset.image}
                  alt={service.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Dark Vignette Overlay for Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/40 transition-opacity duration-300 group-hover:opacity-90" />

                {/* Inner Content Card */}
                <div className="relative z-10 flex h-full flex-col justify-between p-5 whitespace-normal">
                  {/* Top Badge */}
                  <div className="flex items-center gap-2">
                    <Icon className="size-3.5 text-red-500" />
                    <span className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-widest text-red-500">
                      0{itemNumber} // SERVICE
                    </span>
                  </div>

                  {/* Bottom Info */}
                  <div>
                    <h3 className="font-display text-lg sm:text-xl font-extrabold text-white group-hover:text-red-500 transition-colors">
                      {service.title}
                    </h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-neutral-300 font-medium line-clamp-2">
                      {service.summary}
                    </p>

                    <div className="mt-4 flex items-center gap-1.5 text-[11px] font-bold text-red-500 group-hover:text-white transition-colors">
                      <span>EXPLORE SERVICE</span>
                      <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
