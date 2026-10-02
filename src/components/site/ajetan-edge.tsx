import { BarChart3, Globe, Zap, Layers, Rocket, Users } from "lucide-react";
import { Container } from "./shared";

const edgeCards = [
  {
    icon: BarChart3,
    title: "PROVEN RESULTS",
    hasBadge: false,
    description: "Every strategy is designed to deliver measurable return on investment.",
  },
  {
    icon: Globe,
    title: "LOCAL EXPERTS",
    hasBadge: true,
    description: "We understand the local market dynamics to put your brand on the map.",
  },
  {
    icon: Zap,
    title: "AFFORDABLE & FAST",
    hasBadge: false,
    description: "Premium quality digital campaigns with fast turnarounds and transparent pricing.",
  },
  {
    icon: Layers,
    title: "FULL-SERVICE UNDER ONE ROOF",
    hasBadge: false,
    description: "From engineering to AI systems, we seamlessly handle everything under one unified team.",
  },
  {
    icon: Rocket,
    title: "QUICK WINS FOR STARTUPS",
    hasBadge: false,
    description: "Agile performance strategies that get you traction from day one.",
  },
  {
    icon: Users,
    title: "CLIENT-FOCUSED PARTNERSHIP",
    hasBadge: false,
    description: "We act as a true extension of your team, fully invested in your long-term success.",
  },
];

export function AjetanEdgeSection() {
  return (
    <section className="relative overflow-hidden bg-white text-neutral-950 py-20 sm:py-28 border-b border-neutral-200">
      {/* Grid Pattern Background */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <Container className="relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.25em] text-red-600 flex items-center gap-3">
            <span className="h-px w-8 bg-red-600 inline-block" />
            THE AJETAN EDGE
            <span className="h-px w-8 bg-red-600 inline-block" />
          </p>

          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-neutral-950 max-w-4xl uppercase leading-tight">
            GROW YOUR BUSINESS LOCALLY AND GLOBALLY.
          </h2>
        </div>

        {/* 3x2 Grid of Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {edgeCards.map((card, index) => {
            const Icon = card.icon;

            return (
              <div
                key={index}
                className="group relative flex flex-col justify-between rounded-2xl bg-neutral-950 p-7 sm:p-8 border border-neutral-900 transition-all duration-300 hover:border-red-600/70 hover:shadow-2xl hover:shadow-red-600/10 hover:-translate-y-1"
              >
                {/* Top Section */}
                <div>
                  {/* Icon Badge */}
                  <div className="mb-6 flex size-12 items-center justify-center rounded-xl bg-neutral-900 border border-neutral-800 text-red-500 group-hover:bg-red-950/40 group-hover:border-red-600/50 group-hover:text-red-500 transition-colors">
                    <Icon className="size-5" />
                  </div>

                  {/* Card Title */}
                  <div className="flex items-center gap-2">
                    <h3 className="font-display text-lg sm:text-xl font-extrabold uppercase tracking-tight text-white group-hover:text-red-500 transition-colors">
                      {card.title}
                    </h3>
                    {card.hasBadge && (
                      <span className="size-2.5 rounded-full bg-red-600 animate-pulse inline-block" />
                    )}
                  </div>

                  {/* Description */}
                  <p className="mt-3 text-xs sm:text-sm leading-relaxed text-neutral-400 font-medium">
                    {card.description}
                  </p>
                </div>

                {/* Bottom Decorative Line + Plus */}
                <div className="mt-8 flex items-center gap-2 text-xs font-mono text-neutral-700 group-hover:text-red-500 transition-colors">
                  <span className="h-px w-6 bg-neutral-800 group-hover:bg-red-600 transition-colors inline-block" />
                  <span className="font-bold">+</span>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
