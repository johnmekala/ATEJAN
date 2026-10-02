import { useState } from "react";
import { CheckCircle2, ChevronRight, Layers, Search, ShieldCheck, Sparkles, Terminal, Rocket, TrendingUp } from "lucide-react";
import { GlassBadge, GlassPanel } from "./glass";

const steps = [
  {
    num: "01",
    title: "DISCOVER",
    icon: Search,
    summary: "Audit business objectives, user needs, and architectural constraints.",
    deliverables: ["Product Roadmap", "Technical Audit", "KPI Definition"],
    accent: "from-red-600 to-rose-600",
  },
  {
    num: "02",
    title: "STRATEGIZE",
    icon: Layers,
    summary: "Define connected user flows, data structures, and tech stack choices.",
    deliverables: ["Architecture Blueprints", "UX Wireframes", "Milestone Plan"],
    accent: "from-rose-600 to-red-500",
  },
  {
    num: "03",
    title: "DESIGN",
    icon: Sparkles,
    summary: "Shape interactive interfaces, design systems, and responsive components.",
    deliverables: ["High-Fidelity Prototypes", "Design System", "Micro-Interactions"],
    accent: "from-red-500 to-orange-500",
  },
  {
    num: "04",
    title: "BUILD",
    icon: Terminal,
    summary: "Production code engineering with clean API integration and performance testing.",
    deliverables: ["Scalable Codebase", "API Integration", "Automated Tests"],
    accent: "from-orange-500 to-rose-600",
  },
  {
    num: "05",
    title: "TEST",
    icon: ShieldCheck,
    summary: "Comprehensive QA, security scans, accessibility checks, and performance tuning.",
    deliverables: ["Security Audit", "Lighthouse 95+ Score", "Cross-Browser QA"],
    accent: "from-rose-600 to-red-600",
  },
  {
    num: "06",
    title: "LAUNCH",
    icon: Rocket,
    summary: "Zero-downtime cloud deployment, DNS configuration, and release verification.",
    deliverables: ["Cloud Deployment", "Monitoring Setup", "Launch Protocol"],
    accent: "from-red-600 to-rose-700",
  },
  {
    num: "07",
    title: "GROW",
    icon: TrendingUp,
    summary: "Continuous analytics, feature evolution, SEO growth, and platform support.",
    deliverables: ["Analytics Dashboard", "Iterative Features", "Ongoing Optimization"],
    accent: "from-rose-700 to-red-700",
  },
];

export function ProcessInteractive() {
  const [activeStep, setActiveStep] = useState(0);
  const current = steps[activeStep] || steps[0];
  const StepIcon = current.icon;

  return (
    <div className="space-y-12">
      {/* Horizontal Progress Timeline Tracker */}
      <div className="relative hidden md:block">
        {/* Animated Connecting Line */}
        <div className="absolute top-1/2 left-0 right-0 h-1 -translate-y-1/2 bg-slate-200" />
        <div
          className="absolute top-1/2 left-0 h-1 -translate-y-1/2 bg-gradient-to-r from-red-600 via-rose-500 to-red-800 transition-all duration-500"
          style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
        />

        <div className="relative z-10 flex items-center justify-between">
          {steps.map((step, index) => {
            const isActive = index === activeStep;
            const isCompleted = index < activeStep;

            return (
              <button
                key={step.num}
                onClick={() => setActiveStep(index)}
                className="group flex flex-col items-center focus:outline-none"
              >
                <div
                  className={`grid size-12 place-items-center rounded-full border-2 transition-all duration-300 ${
                    isActive
                      ? "border-red-600 bg-white text-red-600 shadow-xl shadow-red-500/20 scale-110"
                      : isCompleted
                      ? "border-red-500 bg-red-600 text-white"
                      : "border-slate-300 bg-white text-slate-400 group-hover:border-slate-400 group-hover:text-slate-600"
                  }`}
                >
                  <span className="font-mono text-xs font-bold">{step.num}</span>
                </div>
                <span
                  className={`mt-3 text-xs font-extrabold tracking-wider transition-colors ${
                    isActive ? "text-red-600" : "text-slate-500 group-hover:text-slate-800"
                  }`}
                >
                  {step.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Step Showcase Panel */}
      <GlassPanel className="p-8 border border-slate-200 bg-white shadow-xl">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <div className="flex items-center gap-3">
              <div className={`grid size-12 place-items-center rounded-xl bg-gradient-to-tr ${current.accent} text-white shadow-md`}>
                <StepIcon className="size-6" />
              </div>
              <div>
                <span className="text-xs font-mono font-bold text-slate-400 uppercase">Phase {current.num} of 07</span>
                <h3 className="text-3xl font-extrabold text-slate-900">{current.title}</h3>
              </div>
            </div>

            <p className="mt-6 text-lg leading-relaxed text-slate-600">
              {current.summary}
            </p>

            <div className="mt-8 space-y-3">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Core Deliverables</p>
              <div className="flex flex-wrap gap-2">
                {current.deliverables.map((deliv) => (
                  <GlassBadge key={deliv} icon={CheckCircle2}>
                    {deliv}
                  </GlassBadge>
                ))}
              </div>
            </div>
          </div>

          {/* Right Visual Step Card */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-6 flex flex-col justify-between shadow-inner">
            <div className="flex justify-between items-center border-b border-slate-200 pb-4">
              <span className="text-xs font-mono text-slate-500">AJETAN DELIVERY PROTOCOL</span>
              <span className="size-3 rounded-full bg-red-600 animate-ping" />
            </div>

            <div className="my-auto text-center space-y-2">
              <span className="font-display text-6xl font-black text-slate-200">{current.num}</span>
              <p className="text-xl font-extrabold text-gradient-accent">{current.title} PHASE</p>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">Controlled execution with continuous client inspection</p>
            </div>

            <div className="flex justify-between items-center text-xs text-slate-500 pt-4 border-t border-slate-200">
              <span>Next phase: {(steps[(activeStep + 1) % steps.length] || steps[0]).title}</span>
              <button
                onClick={() => setActiveStep((prev) => (prev + 1) % steps.length)}
                className="flex items-center gap-1 text-red-600 hover:text-red-700 font-bold"
              >
                Advance <ChevronRight className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </GlassPanel>

      {/* Mobile Accordion Steps */}
      <div className="grid gap-4 md:hidden">
        {steps.map((step) => (
          <GlassPanel key={step.num} className="p-5 border border-slate-200 bg-white">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-bold text-red-600">{step.num}</span>
              <h4 className="text-lg font-bold text-slate-900">{step.title}</h4>
            </div>
            <p className="mt-2 text-sm text-slate-600">{step.summary}</p>
          </GlassPanel>
        ))}
      </div>
    </div>
  );
}
