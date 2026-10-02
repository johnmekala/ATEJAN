import { useState, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Sparkles, Shield, Target, Eye, Compass, Users, Quote, ArrowRight, CheckCircle2 } from "lucide-react";
import { assets } from "@/lib/assets";
import { Container, SectionHeading } from "@/components/site/shared";
import { AboutCorePrinciplesAndCTA } from "@/components/site/about-core-principles";
import { Reveal } from "@/components/site/reveal";
import { GlassBadge, GlassPanel } from "@/components/site/glass";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About AJETAN — Founder Chandu Babu Baddani & Purposeful Engineering" },
      {
        name: "description",
        content:
          "Meet founder Chandu Babu Baddani and AJETAN's business-first approach to strategy, design, technology, and long-term digital growth.",
      },
      { property: "og:title", content: "About AJETAN — Founder Chandu Babu Baddani" },
      {
        property: "og:description",
        content: "We turn ideas into purposeful digital products and systems.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const values = [
    {
      title: "Build with purpose",
      copy: "Every decision, line of code, and layout element must connect to a real business outcome.",
      icon: Target,
    },
    {
      title: "Design with clarity",
      copy: "Complexity belongs behind the experience, never inside the user interface.",
      icon: Sparkles,
    },
    {
      title: "Engineer for scale",
      copy: "Foundational architecture must support immediate needs while remaining ready for future expansion.",
      icon: Shield,
    },
    {
      title: "Move with intent",
      copy: "Speed and momentum matter most when aligned with a clear strategy.",
      icon: Compass,
    },
    {
      title: "Think long term",
      copy: "Digital products strengthen through continuous data feedback, iteration, and refinement.",
      icon: Users,
    },
  ];

  return (
    <>
      {/* 1. Page Hero Header Section with Smooth Parallax Scroll */}
      <section className="relative overflow-hidden bg-white text-neutral-950 pt-36 pb-28 border-b border-neutral-200 min-h-[60vh] flex items-center justify-center">
        {/* Low-Angle Skyscraper Background Image with Parallax Shift */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1920&auto=format&fit=crop"
            alt="AJETAN Architecture"
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
              ARCHITECTURE // COMPANY_PROFILE
              <span className="h-px w-8 bg-red-600 inline-block" />
            </p>

            {/* Main Title */}
            <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight text-neutral-950 uppercase leading-none">
              ARCHITECTING <span className="text-red-600 italic font-serif lowercase">growth.</span>
            </h1>
          </div>
        </Container>
      </section>

      {/* 2. FOUNDER SECTION — Chandu Babu Baddani (BLACK) */}
      <section className="section-pad relative overflow-hidden bg-black text-white border-b border-neutral-800">
        <div className="glow-orb top-1/3 right-0 size-[500px] bg-red-600/15" />
        <Container className="relative z-10">
          <Reveal>
            <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
              {/* Founder Image Card */}
              <div className="relative mx-auto w-full max-w-md">
                <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-red-600 to-red-500 blur-xl opacity-20" />
                <div className="relative p-3 border-2 border-neutral-800 bg-neutral-900 shadow-2xl rounded-3xl overflow-hidden">
                  <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-neutral-950">
                    <img
                      src={assets.about.mission}
                      alt="Chandu Babu Baddani — Founder of AJETAN"
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-neutral-900/95 backdrop-blur-md border border-neutral-800 shadow-lg">
                      <h3 className="font-display text-xl font-extrabold text-white">
                        Chandu Babu Baddani
                      </h3>
                      <p className="text-xs font-bold uppercase tracking-wider text-red-500">
                        Founder & Managing Director
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Founder Hi Note & Message */}
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-red-600/30 bg-red-600/10 px-4 py-1.5">
                  <Quote className="size-4 text-red-500" />
                  <span className="text-xs font-extrabold uppercase tracking-widest text-red-400">
                    HI NOTE FROM OUR FOUNDER
                  </span>
                </div>

                <h2 className="font-display text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
                  "Hi, I’m <span className="text-gradient-accent">Chandu Babu Baddani</span>. Welcome to AJETAN."
                </h2>

                <div className="space-y-4 text-neutral-300 text-base leading-relaxed font-medium">
                  <p>
                    When we founded AJETAN, our goal was clear: to eliminate the disconnect between ambitious business vision and high-performance technical execution.
                  </p>
                  <p>
                    Too often, companies are forced to choose between creative design agencies that don't understand scalable software, or technical developers who lack business insight. At AJETAN, we unite strategy, modern design, AI automation, and robust software engineering into one cohesive engine.
                  </p>
                  <p>
                    Our promise is simple: we build systems designed around your real operational outcomes—engineered to adapt, scale, and drive long-term business growth.
                  </p>
                </div>

                {/* Founder Pillars */}
                <div className="pt-4 grid grid-cols-2 gap-4 border-t border-neutral-800 text-sm">
                  <div className="flex items-center gap-2 font-bold text-white">
                    <CheckCircle2 className="size-5 text-red-500 shrink-0" />
                    <span>Business First Strategy</span>
                  </div>
                  <div className="flex items-center gap-2 font-bold text-white">
                    <CheckCircle2 className="size-5 text-red-500 shrink-0" />
                    <span>Scalable Cloud Architecture</span>
                  </div>
                  <div className="flex items-center gap-2 font-bold text-white">
                    <CheckCircle2 className="size-5 text-red-500 shrink-0" />
                    <span>Human-Centric AI</span>
                  </div>
                  <div className="flex items-center gap-2 font-bold text-white">
                    <CheckCircle2 className="size-5 text-red-500 shrink-0" />
                    <span>Transparent Partnership</span>
                  </div>
                </div>

                <div className="pt-4">
                  <Button asChild size="lg" className="rounded-xl bg-red-600 hover:bg-red-700 font-bold text-white shadow-lg shadow-red-600/25">
                    <Link to="/contact">
                      Connect with Chandu & Team <ArrowRight className="ml-2 size-5" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* 3. MISSION & VISION STAGGERED SECTION (WHITE) */}
      <section className="py-12 sm:py-16 relative bg-white text-neutral-950 border-b border-neutral-200">
        <Container className="space-y-10">
          {/* ROW 1: OUR MISSION */}
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            {/* Left Card: OUR MISSION */}
            <div className="relative rounded-3xl bg-neutral-950 p-8 sm:p-12 text-white border border-neutral-900 shadow-2xl flex flex-col justify-between min-h-[320px]">
              <div>
                <div className="mb-6 flex size-12 items-center justify-center rounded-xl bg-red-950/60 border border-red-800 text-red-500">
                  <Target className="size-6" />
                </div>

                <h3 className="font-display text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-white">
                  OUR MISSION
                </h3>

                <p className="mt-4 text-sm sm:text-base leading-relaxed text-neutral-300 font-medium">
                  Delivering data-driven, scalable digital solutions for entrepreneurs. We engineer technical checklists, modern interfaces, and automated workflows that scale your business in the market with surgical precision.
                </p>
              </div>

              <div className="mt-8 flex items-center gap-2 text-xs font-mono text-neutral-500 font-bold">
                <span className="h-px w-6 bg-red-600 inline-block" />
                <span className="size-2 rounded-full bg-red-600 inline-block" />
              </div>
            </div>

            {/* Right Card: Tech Visual */}
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-100 shadow-2xl group">
              <img
                src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop"
                alt="AJETAN Engineering Hardware & Systems"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>

          {/* ROW 2: OUR VISION */}
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            {/* Left Card: Modern Architectural Visual */}
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-100 shadow-2xl group order-2 lg:order-1">
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop"
                alt="AJETAN Architecture & Space"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            {/* Right Card: OUR VISION */}
            <div className="relative rounded-3xl bg-neutral-950 p-8 sm:p-12 text-white border border-neutral-900 shadow-2xl flex flex-col justify-between min-h-[320px] order-1 lg:order-2">
              <div>
                <div className="mb-6 flex size-12 items-center justify-center rounded-xl bg-red-950/60 border border-red-800 text-red-500">
                  <Eye className="size-6" />
                </div>

                <h3 className="font-display text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-white">
                  OUR VISION
                </h3>

                <p className="mt-4 text-sm sm:text-base leading-relaxed text-neutral-300 font-medium">
                  To be the premier digital design and systems agency for the bold. We visualize a future where elite digital craftsmanship is the standard, architecting long-term growth for ambitious brands worldwide.
                </p>
              </div>

              <div className="mt-8 flex items-center gap-2 text-xs font-mono text-neutral-500 font-bold">
                <span className="h-px w-6 bg-red-600 inline-block" />
                <span className="size-2 rounded-full bg-red-600 inline-block" />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 4. Values Grid Section (BLACK) */}
      <section className="py-12 sm:py-16 relative overflow-hidden bg-black text-white border-b border-neutral-800">
        <div className="glow-orb top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[450px] bg-red-600/10" />
        <Container className="relative z-10">
          <SectionHeading light eyebrow="Core Values" title="Principles that shape the work." />

          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {values.map((val, i) => {
              const Icon = val.icon;
              return (
                <Reveal key={val.title} delay={i * 80}>
                  <div className="group relative h-full p-6 rounded-2xl bg-neutral-950 border border-neutral-900 flex flex-col justify-between transition-all duration-300 hover:border-red-600/80 hover:-translate-y-2 hover:shadow-2xl hover:shadow-red-600/20">
                    <div>
                      <div className="flex items-center justify-between">
                        <div className="grid size-10 place-items-center rounded-xl bg-neutral-900 border border-neutral-800 text-red-500 transition-all duration-300 group-hover:bg-red-600 group-hover:text-white group-hover:scale-110 group-hover:-rotate-6">
                          <Icon className="size-5" />
                        </div>
                        <span className="font-mono text-xs font-bold text-neutral-600 group-hover:text-red-500 transition-colors">
                          0{i + 1}
                        </span>
                      </div>

                      <h3 className="mt-6 text-lg font-extrabold text-white group-hover:text-red-500 transition-colors">
                        {val.title}
                      </h3>
                      <p className="mt-2.5 text-xs leading-relaxed text-neutral-400 font-medium">
                        {val.copy}
                      </p>
                    </div>

                    <div className="mt-6 pt-3 border-t border-neutral-900 flex items-center justify-between">
                      <span className="h-0.5 w-4 bg-neutral-800 group-hover:w-8 group-hover:bg-red-600 transition-all duration-300" />
                      <span className="font-mono text-[10px] text-neutral-600 group-hover:text-neutral-400 transition-colors">AJETAN</span>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* 5. Core Principles Strip & Initiate Consultation CTA */}
      <AboutCorePrinciplesAndCTA />
    </>
  );
}