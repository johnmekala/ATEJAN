import { useState } from "react";
import { Quote, ShieldCheck } from "lucide-react";
import { Container } from "./shared";
import { useCMS } from "@/context/cms-context";

export function ClientValidationSection() {
  const { data } = useCMS();
  const testimonials = data.testimonials.filter((t) => t.visible).sort((a, b) => a.order - b.order);
  const [activeTab, setActiveTab] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const activeTestimonial = testimonials[activeTab] ?? testimonials[0] ?? {
    name: "GREAT OAKS PLAY SCHOOL",
    role: "EDUCATION CLIENT",
    company: "Great Oaks",
    quote: "AJETAN transformed our digital presence completely.",
    avatar: "GO",
  };

  const handleTabClick = (index: number) => {
    if (index === activeTab) return;
    setIsAnimating(true);
    setActiveTab(index);
    setTimeout(() => {
      setIsAnimating(false);
    }, 400);
  };

  return (
    <section className="relative overflow-hidden bg-white text-neutral-950 py-20 sm:py-28 border-b border-neutral-200">
      {/* Background Light Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <Container className="relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.25em] text-red-600 flex items-center gap-3">
            <span className="h-px w-8 bg-red-600 inline-block" />
            VOICES // CLIENT VALIDATION
            <span className="h-px w-8 bg-red-600 inline-block" />
          </p>

          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-neutral-950 uppercase">
            CLIENT VALIDATION.
          </h2>
        </div>

        {/* 2-Column Split: Interactive List on Left, Animated Card on Right */}
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          {/* Left: Client List */}
          <div className="space-y-3">
            {testimonials.map((item, index) => {
              const isActive = index === activeTab;

              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(index)}
                  className={`w-full text-left transition-all duration-300 rounded-2xl p-5 border flex items-center justify-between group ${
                    isActive
                      ? "bg-neutral-50/90 border-neutral-300 shadow-md translate-x-1"
                      : "bg-white/50 border-neutral-100 hover:bg-neutral-50 hover:border-neutral-200"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span
                      className={`font-mono text-xs font-bold ${
                        isActive ? "text-red-600" : "text-neutral-400"
                      }`}
                    >
                      [{item.id}]
                    </span>
                    <div>
                      <h3
                        className={`font-display text-sm sm:text-base font-extrabold tracking-wide uppercase transition-colors ${
                          isActive
                            ? "text-neutral-950"
                            : "text-neutral-500 group-hover:text-neutral-800"
                        }`}
                      >
                        {item.name}
                      </h3>
                      <p className="font-mono text-[11px] text-neutral-400 uppercase tracking-wider mt-0.5">
                        {item.role}
                      </p>
                    </div>
                  </div>

                  {isActive && (
                    <span className="size-2.5 rounded-full bg-red-600 animate-pulse shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right: Validation Card with Fade-In Animation */}
          <div className="relative">
            <div
              className={`relative overflow-hidden rounded-3xl bg-neutral-950 p-8 sm:p-12 border border-neutral-900 shadow-2xl transition-all duration-400 transform ${
                isAnimating
                  ? "opacity-0 translate-y-4 scale-[0.98]"
                  : "opacity-100 translate-y-0 scale-100"
              }`}
            >
              {/* Bottom Red Accent Line */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-rose-500 to-red-600" />

              {/* Watermark Shield Icon Background */}
              <ShieldCheck className="absolute top-6 right-6 size-32 text-neutral-900/60 pointer-events-none stroke-[1]" />

              {/* Quote Mark Icon */}
              <div className="mb-6 flex items-center gap-2">
                <Quote className="size-10 text-red-600 fill-red-600/20" />
              </div>

              {/* Testimonial Quote */}
              <blockquote className="relative z-10 font-display text-xl sm:text-2xl font-extrabold leading-relaxed text-white tracking-tight">
                "{activeTestimonial.quote}"
              </blockquote>

              {/* Divider */}
              <div className="my-8 h-px w-full bg-neutral-900" />

              {/* Author Footer */}
              <div className="relative z-10 flex items-center gap-4">
                <div className="flex size-11 items-center justify-center rounded-full bg-red-950/80 border border-red-800 text-red-500 font-extrabold text-sm tracking-wider">
                  {activeTestimonial.avatar}
                </div>
                <div>
                  <div className="font-display text-base font-extrabold uppercase tracking-wide text-white">
                    {activeTestimonial.name}
                  </div>
                  <div className="font-mono text-xs text-neutral-500 tracking-widest uppercase mt-0.5">
                    {activeTestimonial.role}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
