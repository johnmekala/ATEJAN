import { Link } from "@tanstack/react-router";
import { Eye, Zap, Globe, Lock, Clock, Award } from "lucide-react";
import { Container } from "./shared";

const principles = [
  { id: "transparency", title: "TRANSPARENCY", icon: Eye },
  { id: "results", title: "RESULTS", icon: Zap },
  { id: "global-reach", title: "GLOBAL REACH", icon: Globe },
  { id: "security", title: "SECURITY", icon: Lock },
  { id: "speed", title: "SPEED", icon: Clock },
  { id: "excellence", title: "EXCELLENCE", icon: Award },
];

export function AboutCorePrinciplesAndCTA() {
  return (
    <div className="bg-white text-neutral-950 relative overflow-hidden py-10 sm:py-14">
      {/* Background Light Grid */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <Container className="relative z-10 space-y-8 sm:space-y-10">
        {/* 1. OUR CORE principles. SECTION */}
        <div>
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-neutral-950 uppercase">
              OUR CORE <span className="text-red-600 italic font-serif lowercase">principles.</span>
            </h2>
          </div>

          {/* Horizontal Principles Bar */}
          <div className="rounded-3xl overflow-hidden bg-neutral-950 border border-neutral-900 divide-y md:divide-y-0 md:divide-x divide-neutral-800/80 shadow-2xl grid grid-cols-2 md:grid-cols-6">
            {principles.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.id}
                  className="group relative flex flex-col items-center justify-center p-6 sm:p-8 text-center bg-neutral-950 text-neutral-400 transition-all duration-300 hover:bg-neutral-900/90 hover:text-white cursor-pointer"
                >
                  {/* Icon Container */}
                  <div className="mb-3 flex size-11 items-center justify-center rounded-2xl bg-neutral-900 border border-neutral-800 text-neutral-400 transition-all duration-300 group-hover:scale-110 group-hover:bg-red-950/80 group-hover:border-red-800 group-hover:text-red-500 group-hover:shadow-lg group-hover:shadow-red-600/20">
                    <Icon className="size-5 transition-transform duration-300 group-hover:rotate-6" />
                  </div>

                  {/* Title */}
                  <span className="font-mono text-xs sm:text-sm font-extrabold uppercase tracking-widest transition-colors duration-300 group-hover:text-white">
                    {item.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. READY TO ARCHITECT YOUR GROWTH? CTA SECTION */}
        <div className="relative rounded-3xl bg-neutral-950 p-10 sm:p-16 text-center border border-neutral-900 shadow-2xl overflow-hidden flex flex-col items-center justify-center">
          {/* Ambient Red Glow in Card */}
          <div className="glow-orb top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[500px] bg-red-600/15 pointer-events-none" />

          <h2 className="relative z-10 font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-white max-w-3xl leading-tight">
            READY TO ARCHITECT YOUR GROWTH?
          </h2>

          <div className="relative z-10 mt-8">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-lg border border-neutral-700 bg-transparent px-8 py-4 text-xs sm:text-sm font-bold uppercase tracking-widest text-white shadow-xl transition-all duration-300 hover:border-red-600 hover:bg-red-600 hover:shadow-red-600/30 hover:scale-105"
            >
              Initiate Consultation
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
