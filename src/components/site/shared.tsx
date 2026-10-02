import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Container({ children, className }: React.PropsWithChildren<{ className?: string }>) {
  return <div className={cn("mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12", className)}>{children}</div>;
}

export function Eyebrow({ children, light = false }: React.PropsWithChildren<{ light?: boolean }>) {
  return (
    <p className={cn("mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.18em]", light ? "text-red-500" : "text-red-600")}>
      <span className="h-px w-7 bg-red-600 shrink-0" />
      {children}
    </p>
  );
}

export function SectionHeading({ eyebrow, title, copy, light = false }: { eyebrow: string; title: string; copy?: string; light?: boolean }) {
  return (
    <div className="max-w-3xl">
      <Eyebrow light={light}>{eyebrow}</Eyebrow>
      <h2 className={cn("text-balance font-display text-4xl font-extrabold leading-[1.02] sm:text-5xl lg:text-6xl", light ? "text-white" : "text-neutral-950")}>
        {title}
      </h2>
      {copy && (
        <p className={cn("mt-6 max-w-2xl text-base leading-7 sm:text-lg font-medium", light ? "text-neutral-300" : "text-neutral-600")}>
          {copy}
        </p>
      )}
    </div>
  );
}

export function ArrowLink({ to, children, variant = "default" }: { to: string; children: React.ReactNode; variant?: "default" | "outline" }) {
  return <Button asChild variant={variant} size="lg"><Link to={to}>{children}<ArrowRight /></Link></Button>;
}

export function PageHero({ eyebrow, title, copy }: { eyebrow: string; title: string; copy: string }) {
  return (
    <section className="page-hero bg-white border-b border-neutral-200">
      <Container>
        <div className="max-w-5xl animate-rise">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="text-balance font-display text-5xl font-extrabold leading-[0.96] sm:text-7xl lg:text-[6.6rem] text-neutral-950">{title}</h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-neutral-600 sm:text-xl font-medium">{copy}</p>
        </div>
      </Container>
    </section>
  );
}

import { useCMS } from "@/context/cms-context";

export function FinalCTA() {
  const { data } = useCMS();
  const cta: Record<string, any> = data.pages["home"] || {};

  return (
    <section className="bg-black text-white py-20 sm:py-28 border-t border-neutral-800 relative overflow-hidden">
      <div className="glow-orb top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[500px] bg-red-600/15" />
      <Container className="relative z-10">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <p className="mb-5 flex items-center justify-center gap-3 text-xs font-bold uppercase tracking-[0.18em] text-red-500">
            <span className="h-px w-7 bg-red-600 shrink-0" />
            {cta["heroEyebrow"] || "Begin the conversation"}
            <span className="h-px w-7 bg-red-600 shrink-0" />
          </p>
          <h2 className="text-balance font-display text-4xl font-extrabold leading-[1.02] sm:text-5xl lg:text-6xl text-white">
            Your next digital product starts here.
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-7 sm:text-lg font-medium text-neutral-300">
            Bring us the ambition, the bottleneck or the early idea. We’ll help define what should happen next.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="rounded-xl bg-red-600 hover:bg-red-700 font-bold text-white shadow-xl shadow-red-600/25 transition-all duration-300 hover:scale-105">
              <Link to={cta["primaryCtaLink"] || "/contact"}>
                {cta["primaryCtaText"] || "Start a project"}<ArrowRight className="ml-2 size-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-xl border-neutral-700 bg-neutral-900/80 text-white hover:border-red-600 hover:bg-neutral-900 hover:text-red-500">
              <Link to={cta["secondaryCtaLink"] || "/portfolio"}>{cta["secondaryCtaText"] || "View portfolio"}</Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}