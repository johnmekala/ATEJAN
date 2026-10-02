import { createFileRoute } from "@tanstack/react-router";
import { HeroSection } from "@/components/site/hero-section";
import { ServicesMarqueeSection } from "@/components/site/services-marquee";
import { HomeServicesInteractive } from "@/components/site/home-services-interactive";
import { AjetanEdgeSection } from "@/components/site/ajetan-edge";
import { ClientValidationSection } from "@/components/site/client-validation";
import { PortfolioGrid, WorkCTA } from "@/components/site/content-blocks";
import { Container, FinalCTA, SectionHeading } from "@/components/site/shared";
import { useCMS } from "@/context/cms-context";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AJETAN — Build. Automate. Grow. | Digital Technology Agency" },
      {
        name: "description",
        content:
          "AJETAN designs and builds websites, mobile apps, AI automation and connected digital growth systems for ambitious businesses.",
      },
      { property: "og:title", content: "AJETAN — Build. Automate. Grow." },
      {
        property: "og:description",
        content: "Digital products and systems designed to move businesses forward.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

function HomePage() {
  const { data } = useCMS();
  const projects = data.projects.filter((p) => p.visible).sort((a, b) => a.order - b.order);

  return (
    <>
      {/* 1. Full-Screen Cinematic Hero (WHITE) */}
      <HeroSection />

      {/* 2. Precision Agency & Auto-Scrolling Services Marquee */}
      <ServicesMarqueeSection />

      {/* 4. Interactive Services Showcase (BLACK) */}
      <section className="section-pad relative bg-black text-white border-b border-neutral-800">
        <Container>
          <div className="mb-14 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading
              light
              eyebrow="What we build"
              title="Capability without complexity."
              copy="Focused engineering expertise, united around your core business objective."
            />
          </div>
          <HomeServicesInteractive />
        </Container>
      </section>

      {/* 5. The AJETAN Edge (WHITE) */}
      <AjetanEdgeSection />

      {/* 6. Selected Editorial Portfolio Showcase (BLACK) */}
      <section className="section-pad relative bg-black text-white border-b border-neutral-800">
        <Container>
          <div className="mb-14 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading
              light
              eyebrow="Selected directions"
              title="Work designed to earn attention & action."
              copy="Explore selected project directions built across web, mobile, and custom software systems."
            />
            <WorkCTA dark />
          </div>
          <PortfolioGrid dark items={projects.slice(0, 3)} />
        </Container>
      </section>

      {/* 7. Client Validation (WHITE) */}
      <ClientValidationSection />

      {/* 8. Final CTA (BLACK) */}
      <FinalCTA />
    </>
  );
}