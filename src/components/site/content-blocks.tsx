import { Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { type Project } from "@/content/site";
import { Container, SectionHeading } from "./shared";
import { Reveal } from "./reveal";
import { GlassBadge, GlassPanel } from "./glass";
import { assets } from "@/lib/assets";
import { useCMS } from "@/context/cms-context";

export function PortfolioGrid({ items, dark = false }: { items?: Project[]; dark?: boolean }) {
  const { data } = useCMS();
  const cmsProjects = data.projects.filter((p) => p.visible).sort((a, b) => a.order - b.order);
  const projectsList = items || (cmsProjects as any);

  return (
    <div className="space-y-16">
      {projectsList.map((project: any, index: number) => {
        const isEven = index % 2 === 0;
        const imageUrl = project.image || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop";

        return (
          <Reveal key={project.slug} delay={100}>
            <Link
              to="/portfolio/$slug"
              params={{ slug: project.slug }}
              data-cursor="VIEW"
              className="group block"
            >
              <div
                className={`p-6 sm:p-10 rounded-3xl border transition-all duration-500 hover:border-red-600 ${
                  dark
                    ? "bg-neutral-900 border-neutral-800 text-white shadow-2xl hover:shadow-red-600/10"
                    : "bg-white border-neutral-200 text-neutral-950 shadow-xl hover:shadow-red-600/10"
                }`}
              >
                <div className={`grid gap-8 lg:grid-cols-2 lg:items-center ${isEven ? "" : "lg:grid-flow-dense"}`}>
                  {/* Project Image Panel */}
                  <div className={`relative aspect-[16/10] overflow-hidden rounded-2xl border ${dark ? "border-neutral-800 bg-neutral-950" : "border-neutral-200 bg-neutral-100"} ${isEven ? "" : "lg:col-start-2"}`}>
                    <img
                      src={imageUrl}
                      alt={project.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-all duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-40" />

                    <div className="absolute top-4 left-4">
                      <GlassBadge className={dark ? "bg-neutral-900/90 text-white border-neutral-700" : "bg-white/90 text-neutral-950 border-white font-bold"}>
                        {project.category}
                      </GlassBadge>
                    </div>
                  </div>

                  {/* Project Description Panel */}
                  <div className="flex flex-col justify-between">
                    <div>
                      <span className="font-mono text-xs font-bold text-red-500 uppercase tracking-widest">
                        0{index + 1} / FEATURED DIRECTION
                      </span>
                      <h3 className={`mt-2 text-3xl font-extrabold sm:text-4xl transition-colors ${dark ? "text-white group-hover:text-red-500" : "text-neutral-950 group-hover:text-red-600"}`}>
                        {project.title}
                      </h3>
                      <p className={`mt-4 text-base leading-relaxed font-medium ${dark ? "text-neutral-300" : "text-neutral-600"}`}>
                        {project.summary}
                      </p>

                      <div className="mt-6 flex flex-wrap gap-2">
                        {project.technologies?.map((tech: string) => (
                          <GlassBadge key={tech} className={dark ? "bg-neutral-800 text-neutral-300 border-neutral-700" : ""}>
                            {tech}
                          </GlassBadge>
                        ))}
                      </div>
                    </div>

                    <div className="mt-8 flex items-center gap-3 font-bold text-red-500 group-hover:text-red-400">
                      <span>View case study</span>
                      <div className="grid size-10 place-items-center rounded-full bg-red-600 text-white group-hover:scale-105 transition-all duration-300">
                        <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </Reveal>
        );
      })}
    </div>
  );
}

export function FAQSection() {
  const { data } = useCMS();
  const faqsList = data.faqs.filter((f) => f.visible).sort((a, b) => a.order - b.order);

  return (
    <section className="section-pad relative overflow-hidden bg-white text-neutral-950 border-b border-neutral-200">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading
            eyebrow="Useful answers"
            title="Start with clarity."
            copy="Direct answers to the questions that shape an effective engineering partnership."
          />
          <Accordion type="single" collapsible className="border-t border-neutral-200 space-y-2">
            {faqsList.map((faq, index) => (
              <AccordionItem key={faq.id} value={`faq-${index}`} className="border-b border-neutral-200 px-2">
                <AccordionTrigger className="py-6 text-left text-lg font-bold text-neutral-950 hover:text-red-600 hover:no-underline sm:text-xl">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="max-w-2xl pb-6 text-base leading-relaxed text-neutral-600 font-medium">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Container>
    </section>
  );
}

export function WorkCTA({ dark = false }: { dark?: boolean }) {
  return (
    <Button
      asChild
      variant="outline"
      size="lg"
      className={`rounded-xl border-neutral-700 font-bold transition-all duration-300 ${
        dark
          ? "bg-neutral-900 text-white hover:border-red-600 hover:bg-neutral-900 hover:text-red-500"
          : "border-neutral-300 bg-white text-neutral-900 hover:border-red-600 hover:bg-red-50 hover:text-red-600"
      }`}
    >
      <Link to="/portfolio">
        View all work <ArrowRight className="ml-2 size-4" />
      </Link>
    </Button>
  );
}