import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { Container, FinalCTA, SectionHeading } from "@/components/site/shared";
import { GlassBadge, GlassPanel } from "@/components/site/glass";
import { useCMS } from "@/context/cms-context";
import { projectBySlug } from "@/content/site";
import { assets } from "@/lib/assets";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/portfolio/$slug")({
  loader: ({ params }) => {
    // Use static data for initial load; component will prefer CMS data
    const project = projectBySlug(params.slug);
    return project || null;
  },
  head: ({ loaderData, params }) => ({
    meta: [
      { title: loaderData ? `${loaderData.title} — AJETAN Case Study` : "Case Study — AJETAN" },
      { name: "description", content: loaderData?.summary ?? "AJETAN case-study information." },
      { property: "og:title", content: loaderData ? `${loaderData.title} — AJETAN` : "AJETAN Portfolio" },
      { property: "og:description", content: loaderData?.summary ?? "Digital product case studies." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `/portfolio/${params.slug}` }],
  }),
  component: ProjectPage,
});

function ProjectPage() {
  const { slug } = Route.useParams();
  const { data } = useCMS();
  const project = data.projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <section className="min-h-[60vh] flex items-center justify-center bg-white">
        <Container className="text-center">
          <h1 className="font-display text-4xl font-extrabold text-neutral-950">Project not found</h1>
          <p className="mt-4 text-neutral-600">The case study you're looking for doesn't exist.</p>
          <Button asChild className="mt-8 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold">
            <Link to="/portfolio">Browse all projects</Link>
          </Button>
        </Container>
      </section>
    );
  }

  const projectAssetKey = project.slug.split("-")[0] as keyof typeof assets.portfolio;
  const imageUrl = project.image || assets.portfolio[projectAssetKey] || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop";

  const sections = [
    { title: "THE CHALLENGE", text: project.challenge, num: "01" },
    { title: "THE APPROACH", text: project.approach, num: "02" },
    { title: "THE BUILD", text: project.solution, num: "03" },
    { title: "THE OUTCOME", text: project.result, num: "04" },
  ];

  return (
    <>
      {/* 1. Case Study Hero (WHITE) */}
      <section className="relative overflow-hidden bg-white pt-36 pb-20 text-neutral-950 border-b border-neutral-200">
        <div className="glow-orb top-0 right-1/4 size-[500px] bg-red-600/15" />
        <Container className="relative z-10">
          <div className="flex items-center gap-3">
            <Button asChild variant="outline" size="sm" className="rounded-xl border-neutral-300 bg-white text-neutral-900 hover:border-red-600 hover:bg-red-50 hover:text-red-600 font-bold">
              <Link to="/portfolio">
                <ArrowLeft className="mr-2 size-4" /> Back to portfolio
              </Link>
            </Button>
            <GlassBadge icon={Sparkles}>{project.category}</GlassBadge>
          </div>

          <div className="mt-8 max-w-4xl animate-rise">
            <h1 className="font-display text-4xl font-extrabold text-neutral-950 sm:text-6xl">
              {project.title}
            </h1>
            <p className="mt-6 text-xl leading-relaxed text-neutral-600 font-medium">
              {project.summary}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <GlassBadge key={tech}>{tech}</GlassBadge>
              ))}
            </div>
          </div>

          {/* Project Main Hero Visual Image */}
          <div className="relative mt-12 aspect-[16/9] w-full overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-100 shadow-2xl">
            <img src={imageUrl} alt={project.title} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>
        </Container>
      </section>

      {/* 2. Case Study Immersive Breakdown (BLACK) */}
      <section className="section-pad bg-black text-white border-b border-neutral-800">
        <Container>
          <SectionHeading
            light
            eyebrow="Case Study Architecture"
            title="From Context to Measured Outcome."
            copy="Detailed decision narrative detailing key architectural and experience choices."
          />

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {sections.map((sec) => (
              <div key={sec.title} className="dark-glass-panel p-8 border border-neutral-800 bg-neutral-900 rounded-2xl flex flex-col justify-between hover:border-red-600">
                <div>
                  <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
                    <span className="font-mono text-xs font-bold text-red-500">{sec.num} / CASE STUDY</span>
                    <CheckCircle2 className="size-5 text-red-500" />
                  </div>
                  <h3 className="mt-6 font-display text-2xl font-extrabold text-white">{sec.title}</h3>
                  <p className="mt-4 text-base leading-relaxed text-neutral-300 font-medium">{sec.text}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 3. Contact CTA (WHITE) */}
      <section className="py-20 bg-white text-neutral-950 border-b border-neutral-200">
        <Container className="text-center">
          <h2 className="font-display text-3xl font-extrabold text-neutral-950 sm:text-5xl">
            Want to build a similar system for your business?
          </h2>
          <p className="mt-4 text-neutral-600 max-w-xl mx-auto font-medium text-lg">
            Let's discuss your project scope, timeline, and architectural requirements.
          </p>
          <Button asChild size="lg" className="mt-8 rounded-xl bg-red-600 hover:bg-red-700 font-bold text-white shadow-lg shadow-red-600/25">
            <Link to="/contact">
              Start a project <ArrowRight className="ml-2 size-5" />
            </Link>
          </Button>
        </Container>
      </section>

      {/* 4. Final CTA (BLACK) */}
      <FinalCTA />
    </>
  );
}