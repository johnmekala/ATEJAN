import { Container } from "./shared";
import { useCMS } from "@/context/cms-context";

export type ClientBrand = {
  id: string;
  name: string;
  tagline: string;
  image: string;
};

export type ClientTestimonial = {
  id: string;
  brandName: string;
  role: string;
  quote: string;
};

// Default brands list with brand names & logo images — any new brand added here automatically joins the marquee!
export const defaultBrands: ClientBrand[] = [
  {
    id: "aura-tech",
    name: "AURA SYSTEMS",
    tagline: "AI & CLOUD INFRASTRUCTURE",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "nexus-luxury",
    name: "NEXUS LUXURY",
    tagline: "PREMIUM LIFESTYLE & WINE",
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "velocity-commerce",
    name: "VELOCITY LOGISTICS",
    tagline: "GLOBAL SUPPLY PLATFORM",
    image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "kinetic-health",
    name: "KINETIC HEALTH",
    tagline: "BIOTECH & MEDICAL LABS",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "prism-media",
    name: "PRISM PRODUCTIONS",
    tagline: "CINEMATIC MEDIA & BROADCAST",
    image: "https://images.unsplash.com/photo-1518173946687-a4c8a383392e?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "vertex-fintech",
    name: "VERTEX CAPITAL",
    tagline: "GLOBAL BANKING & PAYMENTS",
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "elevate-realty",
    name: "ELEVATE REALTY",
    tagline: "ARCHITECTURAL SPACES",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "orbit-ai",
    name: "ORBIT AI LABS",
    tagline: "AUTONOMOUS WORKFLOWS",
    image: "https://images.unsplash.com/photo-1677442136019-21780efad99a?q=80&w=400&auto=format&fit=crop",
  },
];

// Default client testimonials mapped per available client brand
export const defaultTestimonials: ClientTestimonial[] = [
  {
    id: "test-aura",
    brandName: "AURA SYSTEMS",
    role: "Managing Director",
    quote: "Their architectural precision and design depth turned our vision into a premier digital platform in record time.",
  },
  {
    id: "test-nexus",
    brandName: "NEXUS LUXURY",
    role: "Founder",
    quote: "The aesthetic polish and technical rigor AJETAN brought to our brand gave us a measurable advantage in our market.",
  },
  {
    id: "test-velocity",
    brandName: "VELOCITY LOGISTICS",
    role: "CTO",
    quote: "AJETAN completely elevated our digital presence with unmatched precision and speed. The execution was flawless.",
  },
  {
    id: "test-kinetic",
    brandName: "KINETIC HEALTH",
    role: "Executive Team",
    quote: "The custom cloud software and automated workflows streamlined our operational efficiency by over 60%.",
  },
  {
    id: "test-prism",
    brandName: "PRISM PRODUCTIONS",
    role: "Creative Director",
    quote: "Incredible design craftsmanship paired with robust engineering. Our platform engagement increased significantly.",
  },
  {
    id: "test-vertex",
    brandName: "VERTEX CAPITAL",
    role: "Managing Partner",
    quote: "AJETAN delivered an enterprise-grade fintech platform with surgical technical precision and zero downtime.",
  },
  {
    id: "test-elevate",
    brandName: "ELEVATE REALTY",
    role: "Founder & Lead Architect",
    quote: "From initial concept to production release, AJETAN executed every phase with exceptional clarity and vision.",
  },
  {
    id: "test-orbit",
    brandName: "ORBIT AI LABS",
    role: "Head of Product",
    quote: "The human-controlled AI automation pipelines transformed how our teams process complex data every single day.",
  },
];

interface ClienteleMarqueeProps {
  brands?: ClientBrand[];
  testimonials?: ClientTestimonial[];
}

export function ClienteleMarquee({
  brands,
  testimonials = defaultTestimonials,
}: ClienteleMarqueeProps) {
  const { data: cmsData } = useCMS();
  const cmsBrands: ClientBrand[] = (cmsData?.clientBrands || [])
    .filter((b) => b.visible)
    .sort((a, b) => a.order - b.order)
    .map((b) => ({
      id: b.id,
      name: b.name,
      tagline: b.category || "PARTNER BRAND",
      image: b.logo || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=400&auto=format&fit=crop",
    }));

  const activeBrands = brands || (cmsBrands.length > 0 ? cmsBrands : defaultBrands);

  // Duplicate arrays to create seamless infinite marquee scroll loops
  const marqueeItems = [...activeBrands, ...activeBrands];
  const marqueeTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="py-16 sm:py-24 bg-white text-neutral-950 border-b border-neutral-200 overflow-hidden relative">
      {/* Background Light Grid Overlay */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* 1. OUR CLIENTELE BRAND CARDS SECTION */}
      <Container className="relative z-10 text-center mb-12 sm:mb-16">
        {/* Eyebrow */}
        <p className="mb-4 text-xs font-extrabold uppercase tracking-[0.25em] text-red-600 flex items-center justify-center gap-3">
          <span className="h-px w-8 bg-red-600 inline-block" />
          OUR CLIENTELE
          <span className="h-px w-8 bg-red-600 inline-block" />
        </p>

        {/* Main Title */}
        <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-neutral-950 uppercase">
          TRUSTED BY <span className="text-red-600">VISIONARY BRANDS</span>
        </h2>

        {/* Subtitle */}
        <p className="mt-3 text-base sm:text-lg leading-relaxed text-neutral-600 font-medium max-w-2xl mx-auto">
          Partnering with ambitious teams across technology, luxury, commerce, and media.
        </p>
      </Container>

      {/* Auto-Scroll Horizontal Marquee Container for Brands */}
      <div className="relative w-full overflow-hidden py-4">
        {/* Gradient Fades on Edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-white to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-white to-transparent z-20 pointer-events-none" />

        <div className="flex gap-6 animate-marquee">
          {marqueeItems.map((brand, idx) => {
            const originalIndex = idx % Math.max(1, activeBrands.length);
            const formattedNum = originalIndex < 9 ? `0${originalIndex + 1}` : `${originalIndex + 1}`;

            return (
              <div
                key={`${brand.id}-${idx}`}
                className="group relative size-[180px] sm:size-[210px] shrink-0 rounded-3xl border border-neutral-200 bg-white p-5 shadow-xl flex flex-col items-center justify-center text-center transition-all duration-300 hover:border-red-500 hover:shadow-2xl hover:scale-105 cursor-pointer"
              >
                {/* Number Accent Top-Right */}
                <span className="absolute top-3.5 right-4 font-mono text-[11px] font-extrabold text-red-500/80">
                  {formattedNum}
                </span>

                {/* Accent Red Dot Bottom-Left */}
                <span className="absolute bottom-3.5 left-4 size-1.5 rounded-full bg-red-500" />

                {/* Brand Logo Image Box */}
                <div className="relative size-14 sm:size-16 rounded-2xl overflow-hidden border border-neutral-100 shadow-md mb-2.5 transition-transform duration-300 group-hover:scale-110 group-hover:border-red-400">
                  <img
                    src={brand.image}
                    alt={brand.name}
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* Brand Name */}
                <span className="font-display text-sm sm:text-base font-extrabold text-neutral-900 tracking-tight leading-snug">
                  {brand.name}
                </span>

                {/* Tagline */}
                <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-neutral-400 mt-0.5 max-w-[150px] truncate">
                  {brand.tagline}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. VOICES OF OUR CLIENTS AUTO-SCROLL MARQUEE SECTION */}
      <div className="mt-8 sm:mt-10 border-t border-neutral-200/80 pt-6">
        <Container className="relative z-10 mb-6">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-red-600 flex items-center gap-2">
            <span className="size-1.5 bg-red-600 inline-block rounded-xs" />
            VOICES OF OUR CLIENTS
          </p>
        </Container>

        {/* Testimonial Auto-Scroll Marquee Container */}
        <div className="relative w-full overflow-hidden py-3">
          {/* Gradient Fades on Edges */}
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-white to-transparent z-20 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-white to-transparent z-20 pointer-events-none" />

          <div className="flex gap-6 animate-marquee">
            {marqueeTestimonials.map((item, idx) => (
              <div
                key={`${item.id}-${idx}`}
                className="group relative w-[320px] sm:w-[420px] shrink-0 rounded-2xl sm:rounded-3xl border border-neutral-200/90 bg-white p-6 sm:p-7 shadow-lg flex flex-col justify-between transition-all duration-300 hover:border-red-500 hover:shadow-xl hover:scale-[1.02] cursor-pointer"
              >
                <p className="text-sm sm:text-base leading-relaxed text-neutral-800 font-medium italic">
                  "{item.quote}"
                </p>

                <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between">
                  <span className="font-mono text-xs font-extrabold uppercase tracking-wider text-neutral-900">
                    {item.brandName} <span className="text-red-600 font-normal">─ {item.role}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
