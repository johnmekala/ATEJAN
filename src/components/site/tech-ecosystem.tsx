import { Bot, Cloud, Code, Database, Smartphone, Sparkles, TrendingUp } from "lucide-react";
import { GlassBadge } from "./glass";

const nodes = [
  { name: "WEB PLATFORMS", icon: Code, tech: "React, Next.js, TypeScript", pos: "col-start-1 row-start-1" },
  { name: "MOBILE PRODUCTS", icon: Smartphone, tech: "Flutter, React Native, iOS/Android", pos: "col-start-3 row-start-1" },
  { name: "AI AUTOMATION", icon: Bot, tech: "Python, LLM Agents, PyTorch", pos: "col-start-1 row-start-3" },
  { name: "CLOUD & DATA", icon: Cloud, tech: "AWS, GCP, Node.js, Postgres", pos: "col-start-3 row-start-3" },
  { name: "GROWTH SYSTEMS", icon: TrendingUp, tech: "Analytics, Performance, SEO", pos: "col-start-2 row-start-1" },
  { name: "INTELLIGENT PIPELINES", icon: Database, tech: "GraphQL, REST, Event Buses", pos: "col-start-2 row-start-3" },
];

export function TechEcosystem() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 sm:p-12 shadow-2xl">
      {/* Background Ambient Glow */}
      <div className="glow-orb top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[500px] bg-red-500/10" />

      <div className="relative z-10 flex flex-col items-center">
        {/* Central Core Engine Node */}
        <div className="relative my-8 flex flex-col items-center justify-center">
          <div className="relative z-20 flex size-28 flex-col items-center justify-center rounded-3xl border-2 border-red-600 bg-white p-4 text-center shadow-xl shadow-red-500/20 transition-transform duration-500 hover:scale-110">
            <img src="/favicon.png" alt="AJETAN Engine" className="size-9 object-contain" />
            <span className="mt-2 font-display text-xs font-black tracking-widest text-slate-900">
              AJETAN ENGINE
            </span>
          </div>

          {/* Pulse Ring */}
          <div className="absolute size-40 rounded-full border border-red-500/20 animate-ping opacity-30" />
        </div>

        {/* Surrounding Connected Nodes Grid */}
        <div className="grid w-full max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {nodes.map((node) => {
            const Icon = node.icon;

            return (
              <div
                key={node.name}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/80 p-6 backdrop-blur-md transition-all duration-300 hover:border-red-500/50 hover:bg-white hover:shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="grid size-10 place-items-center rounded-xl bg-red-50 text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors">
                    <Icon className="size-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 tracking-wide">{node.name}</h4>
                    <p className="text-xs text-slate-500">{node.tech}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Supporting Tech Stack Glass Pills */}
        <div className="mt-12 flex flex-wrap justify-center gap-2">
          {["React 19", "Next.js", "TypeScript", "Python", "Flutter", "TailwindCSS", "Node.js", "PostgreSQL", "Docker", "AWS", "Figma", "OpenAI"].map((stack) => (
            <GlassBadge key={stack} icon={Sparkles}>
              {stack}
            </GlassBadge>
          ))}
        </div>
      </div>
    </div>
  );
}
