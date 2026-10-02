import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PortfolioGrid } from "@/components/site/content-blocks";
import { ClienteleMarquee } from "@/components/site/clientele-marquee";
import { Container, FinalCTA, SectionHeading } from "@/components/site/shared";
import { Button } from "@/components/ui/button";
import { GlassBadge } from "@/components/site/glass";
import { useCMS, type ProjectItem } from "@/context/cms-context";
import { Sparkles } from "lucide-react";

const categories = ["All", "Websites", "Apps", "AI", "Branding", "Marketing", "Software"] as const;
type Category = "All" | ProjectItem["category"];

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio — AJETAN Digital Case Studies & Systems" },
      {
        name: "description",
        content:
          "Explore AJETAN's website, mobile app, AI automation and custom software project case studies.",
      },
      { property: "og:title", content: "AJETAN Portfolio" },
      {
        property: "og:description",
        content: "A flexible showcase for verified digital product and technology work.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/portfolio" }],
  }),
  component: PortfolioPage,
});

function PortfolioPage() {
  const { data } = useCMS();
  const projects = data.projects.filter((p) => p.visible).sort((a, b) => a.order - b.order);
  const [category, setCategory] = useState<Category>("All");
  const filtered =
    category === "All" ? projects : projects.filter((project) => project.category === category);

  return (
    <>
      {/* Section 1: Hero Header (WHITE) */}
      <section className="relative overflow-hidden bg-white pt-36 pb-20 text-neutral-950 border-b border-neutral-200">
        <div className="glow-orb top-0 left-1/4 size-[500px] bg-red-600/15" />
        <Container className="relative z-10">
          <div className="max-w-3xl animate-rise">
            <GlassBadge icon={Sparkles}>CASE STUDY SHOWCASE</GlassBadge>
            <h1 className="mt-6 font-display text-5xl font-extrabold leading-tight sm:text-6xl text-neutral-950">
              Work shaped around <span className="text-gradient-accent">meaningful change.</span>
            </h1>
            <p className="mt-6 text-xl leading-relaxed text-neutral-600 font-medium">
              Explore selected digital system directions across web applications, mobile products, AI workflows, and software platforms.
            </p>
          </div>
        </Container>
      </section>

      {/* Section 2: Projects Showcase (BLACK) */}
      <section className="section-pad bg-black text-white border-b border-neutral-800">
        <Container>
          <div className="mb-14 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              light
              eyebrow="Filter by capability"
              title="Selected directions."
              copy="Filter projects by domain to explore how engineering and design connect."
            />

            {/* Category Filter Tabs */}
            <div
              className="flex max-w-full gap-2 overflow-x-auto pb-2"
              role="group"
              aria-label="Filter projects by category"
            >
              {categories.map((item) => (
                <Button
                  key={item}
                  variant={category === item ? "default" : "outline"}
                  size="sm"
                  aria-pressed={category === item}
                  onClick={() => setCategory(item)}
                  className={`rounded-xl px-5 transition-all duration-300 font-bold ${
                    category === item
                      ? "bg-red-600 text-white shadow-md shadow-red-600/25"
                      : "border-neutral-700 bg-neutral-900 text-neutral-300 hover:border-red-600 hover:bg-neutral-900 hover:text-red-500"
                  }`}
                >
                  {item}
                </Button>
              ))}
            </div>
          </div>

          {filtered.length ? (
            <div key={category} className="animate-rise">
              <PortfolioGrid dark items={filtered} />
            </div>
          ) : (
            <div className="dark-glass-panel p-16 text-center border border-dashed border-neutral-800 bg-neutral-900 rounded-3xl">
              <p className="text-xl font-bold text-white">No verified projects in this category yet.</p>
              <p className="mt-2 text-sm text-neutral-400 font-medium">
                This category is ready for verified client projects to be added when supplied.
              </p>
            </div>
          )}
        </Container>
      </section>

      {/* Section 3: Trusted Brands Clientele Auto-Scroll Section (WHITE) */}
      <ClienteleMarquee />

      {/* Section 4: Final CTA (BLACK) */}
      <FinalCTA />
    </>
  );
}