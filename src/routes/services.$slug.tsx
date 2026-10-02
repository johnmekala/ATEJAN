import { createFileRoute, notFound, Link, useParams } from "@tanstack/react-router";
import { ArrowRight, Check, AlertCircle, Sparkles } from "lucide-react";
import { FAQSection } from "@/components/site/content-blocks";
import { ProcessInteractive } from "@/components/site/process-interactive";
import { Container, FinalCTA, SectionHeading } from "@/components/site/shared";
import { GlassBadge, GlassPanel } from "@/components/site/glass";
import { useCMS } from "@/context/cms-context";
import { serviceBySlug } from "@/content/site";
import { assets } from "@/lib/assets";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    // Loader runs before render — use static data for initial load; component will prefer CMS data
    const service = serviceBySlug(params.slug);
    // Don't throw notFound here because the service might only exist in CMS (added dynamically)
    return service || null;
  },
  head: ({ loaderData, params }) => ({
    meta: [
      { title: loaderData ? `${loaderData.title} — AJETAN Service` : "Service — AJETAN" },
      { name: "description", content: loaderData?.summary ?? "AJETAN service information." },
      { property: "og:title", content: loaderData ? `${loaderData.title} — AJETAN` : "AJETAN Services" },
      { property: "og:description", content: loaderData?.summary ?? "Purposeful digital services." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `/services/${params.slug}` }],
  }),
  component: ServicePage,
});

function ServicePage() {
  const { slug } = Route.useParams();
  const { data } = useCMS();
  // Prefer CMS data (includes dynamically added services) over static loader data
  const service = data.services.find((s) => s.slug === slug);

  if (!service) {
    return (
      <section className="min-h-[60vh] flex items-center justify-center bg-white">
        <Container className="text-center">
          <h1 className="font-display text-4xl font-extrabold text-neutral-950">Service not found</h1>
          <p className="mt-4 text-neutral-600">The service you're looking for doesn't exist.</p>
          <Button asChild className="mt-8 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold">
            <Link to="/services">Browse all services</Link>
          </Button>
        </Container>
      </section>
    );
  }

  const assetKey = service.slug.replace(/-([a-z])/g, (_match, char: string) => char.toUpperCase()) as keyof typeof assets.services;
  const fallbackAsset = assets.services[assetKey];
  const imageUrl = service.image || fallbackAsset?.image || "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1200&auto=format&fit=crop";

  return (
    <>
      {/* 1. Hero Header (WHITE) */}
      <section className="relative overflow-hidden bg-white pt-36 pb-20 text-neutral-950 border-b border-neutral-200">
        <div className="glow-orb top-0 left-1/3 size-[500px] bg-red-600/15" />
        <Container className="relative z-10">
          <div className="max-w-3xl animate-rise">
            <GlassBadge icon={Sparkles}>SERVICE CAPABILITY</GlassBadge>
            <h1 className="mt-6 font-display text-5xl font-extrabold text-neutral-950 sm:text-6xl">
              {service.title}
            </h1>
            <p className="mt-6 text-xl leading-relaxed text-neutral-600 font-medium">
              {service.detail}
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              {service.technologies.map((tech) => (
                <GlassBadge key={tech}>{tech}</GlassBadge>
              ))}
            </div>
          </div>

          {/* Service Main Visual Image Banner */}
          <div className="relative mt-12 aspect-[16/8] w-full overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-100 shadow-2xl">
            <img src={imageUrl} alt={service.title} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>
        </Container>
      </section>

      {/* 2. Problems Solved & Deliverables Grid (BLACK) */}
      <section className="section-pad bg-black text-white border-b border-neutral-800">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <SectionHeading light eyebrow="Core Challenges" title="Remove friction. Create momentum." />
              <div className="mt-8 space-y-4">
                {service.problems.map((p) => (
                  <div key={p} className="dark-glass-panel p-5 border border-neutral-800 bg-neutral-900 rounded-2xl flex items-center gap-4">
                    <div className="grid size-9 place-items-center rounded-lg bg-red-600/20 text-red-500 shrink-0">
                      <AlertCircle className="size-5" />
                    </div>
                    <span className="font-bold text-white text-base">{p}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <SectionHeading light eyebrow="Key Deliverables" title="A complete engineering system." />
              <div className="mt-8 grid grid-cols-2 gap-4">
                {service.deliverables.map((d) => (
                  <div key={d} className="dark-glass-panel p-6 border border-neutral-800 bg-neutral-900 rounded-2xl flex flex-col justify-between">
                    <Check className="size-6 text-red-500 mb-4" />
                    <span className="font-bold text-white text-base">{d}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 3. Delivery Process (WHITE) */}
      <section className="section-pad bg-white text-neutral-950 border-b border-neutral-200">
        <Container>
          <SectionHeading eyebrow="Engineering Process" title="How we deliver this service." />
          <div className="mt-12">
            <ProcessInteractive />
          </div>
        </Container>
      </section>

      {/* 4. Contact CTA (BLACK) */}
      <section className="py-20 bg-black text-white border-b border-neutral-800">
        <Container className="text-center">
          <h2 className="font-display text-3xl font-extrabold text-white sm:text-5xl">
            Ready to initiate a {service.title} engagement?
          </h2>
          <p className="mt-4 text-neutral-300 max-w-xl mx-auto font-medium text-lg">
            Share your requirements or schedule a preliminary engineering consultation.
          </p>
          <Button asChild size="lg" className="mt-8 rounded-xl bg-red-600 hover:bg-red-700 font-bold text-white shadow-lg shadow-red-600/25">
            <Link to="/contact">
              Start a project <ArrowRight className="ml-2 size-5" />
            </Link>
          </Button>
        </Container>
      </section>

      {/* 5. FAQ (WHITE) */}
      <FAQSection />

      {/* 6. Final CTA (BLACK) */}
      <FinalCTA />
    </>
  );
}