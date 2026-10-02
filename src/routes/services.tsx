import { useState, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { ServicesInteractive } from "@/components/site/services-interactive";
import { TechEcosystem } from "@/components/site/tech-ecosystem";
import { Container, SectionHeading } from "@/components/site/shared";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — AJETAN Digital Technology Agency" },
      {
        name: "description",
        content:
          "Explore AJETAN website, mobile app, AI automation, digital marketing, UI/UX and custom software services.",
      },
      { property: "og:title", content: "AJETAN Services" },
      {
        property: "og:description",
        content: "Strategy, design and engineering connected around business growth.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: ServicesPage,
});

function ServicesSuccessCTA() {
  return (
    <section className="bg-white text-neutral-950 py-16 sm:py-24 border-t border-neutral-200 relative overflow-hidden">
      {/* Background Light Grid */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <Container className="relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 sm:gap-10">
          <div>
            {/* Red Accent Line */}
            <span className="block h-1 w-12 bg-red-600 mb-4 rounded-full" />

            {/* Title */}
            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-950">
              Let's Build Your <span className="text-red-600">Success Story</span>
            </h2>

            {/* Subtitle */}
            <p className="mt-3 text-sm sm:text-base text-neutral-600 font-medium">
              Join 100+ brands that trust AJETAN.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 shrink-0">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 hover:bg-red-700 px-7 py-4 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-white shadow-xl shadow-red-600/20 transition-all duration-300 hover:scale-105"
            >
              Free Strategy Call <ArrowUpRight className="size-4" />
            </Link>

            <Link
              to="/portfolio"
              className="inline-flex items-center justify-center rounded-xl border border-neutral-300 bg-transparent hover:border-neutral-900 px-7 py-4 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-neutral-900 transition-all duration-300 hover:bg-neutral-900 hover:text-white"
            >
              Our Work
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}

function ServicesPage() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Section 1: Page Hero Header Section with Smooth Parallax Scroll (MATCHING ABOUT PAGE) */}
      <section className="relative overflow-hidden bg-white text-neutral-950 pt-36 pb-28 border-b border-neutral-200 min-h-[60vh] flex items-center justify-center">
        {/* Low-Angle Skyscraper Background Image with Parallax Shift */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1920&auto=format&fit=crop"
            alt="AJETAN Services Architecture"
            className="h-[120%] w-full object-cover opacity-30 transition-transform duration-75 ease-out"
            style={{
              transform: `translateY(${scrollY * 0.15}px) scale(1.05)`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/50 to-white" />

          {/* Grid lines overlay */}
          <div
            className="absolute inset-0 opacity-[0.05] pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        {/* Text Content Moving Up on Scroll */}
        <Container className="relative z-10 text-center flex flex-col items-center">
          <div
            className="transition-transform duration-75 ease-out"
            style={{
              transform: `translateY(-${scrollY * 0.35}px)`,
              opacity: Math.max(0, 1 - scrollY / 500),
            }}
          >
            {/* Eyebrow */}
            <p className="mb-4 text-xs font-extrabold uppercase tracking-[0.25em] text-red-600 flex items-center gap-3 justify-center">
              <span className="h-px w-8 bg-red-600 inline-block" />
              CAPABILITIES // DIGITAL_SYSTEMS
              <span className="h-px w-8 bg-red-600 inline-block" />
            </p>

            {/* Main Title */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-950 uppercase leading-none">
              FIVE SERVICES. <span className="text-red-600 italic font-serif lowercase">endless growth.</span>
            </h1>

            {/* Subtitle */}
            <p className="mt-6 text-base sm:text-xl leading-relaxed text-neutral-600 font-medium max-w-2xl mx-auto">
              Every service is built to attract, convert, and retain — regardless of your industry or budget.
            </p>
          </div>
        </Container>
      </section>

      {/* Section 2: Interactive Services (BLACK) */}
      <section className="section-pad bg-black text-white border-b border-neutral-800">
        <Container>
          <ServicesInteractive />
        </Container>
      </section>

      {/* Section 3: Tech Ecosystem (WHITE) */}
      <section className="py-12 sm:py-16 bg-white text-neutral-950 border-b border-neutral-200">
        <Container>
          <TechEcosystem />
        </Container>
      </section>

      {/* Section 4: Engagement Models (BLACK) */}
      <section className="py-12 sm:py-16 bg-black text-white border-b border-neutral-800 relative overflow-hidden">
        <div className="glow-orb top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[450px] bg-red-600/10" />
        <Container className="relative z-10">
          <SectionHeading light eyebrow="Engagement Models" title="A focused way to move forward." />
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              ["Define", "Clarify the problem, priority, architecture, and practical path forward."],
              ["Create", "Design and engineer a complete product, application, or business system."],
              ["Evolve", "Improve and scale an existing platform through focused, iterative development."],
            ].map(([t, c], i) => (
              <div
                key={t}
                className="group relative p-8 border border-neutral-800 bg-neutral-950 rounded-2xl flex flex-col justify-between transition-all duration-300 hover:border-red-600 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl hover:shadow-red-600/20 cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-red-500 group-hover:text-red-400 transition-colors">
                      0{i + 1} / MODEL
                    </span>
                    <span className="size-2 rounded-full bg-neutral-800 group-hover:bg-red-600 transition-colors" />
                  </div>
                  <h3 className="mt-4 text-3xl font-extrabold text-white group-hover:text-red-500 transition-colors">
                    {t}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-neutral-300 font-medium">
                    {c}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Section 5: White Success Story CTA */}
      <ServicesSuccessCTA />
    </>
  );
}