import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowDown, ArrowRight } from "lucide-react";
import { assets } from "@/lib/assets";
import { Button } from "@/components/ui/button";
import { useCMS } from "@/context/cms-context";

function getYouTubeId(url?: string): string | null {
  if (!url) return null;
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  return match && match[1] ? match[1] : null;
}

export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { data } = useCMS();
  const homeHero: Record<string, any> = data.pages["home"] || {};

  const heroVideoSrc = (homeHero["heroVideo"] as string) || "/hero-video.mp4";
  const heroImageSrc = (homeHero["heroImage"] as string) || assets.heroPoster;
  const ytId = getYouTubeId(heroVideoSrc);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 1024) return;
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 20;
      const y = (e.clientY / innerHeight - 0.5) * 20;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative flex min-h-screen w-full flex-col justify-between overflow-hidden bg-white pt-28 pb-12 text-neutral-950 sm:pt-36 border-b border-neutral-200">
      {/* Background Video & Fallback Poster */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {ytId ? (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <iframe
              src={`https://www.youtube.com/embed/${ytId}?autoplay=1&mute=1&loop=1&playlist=${ytId}&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&playsinline=1&enablejsapi=1`}
              title="Hero Background Video"
              allow="autoplay; fullscreen; picture-in-picture"
              className="h-[150%] w-[150%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-cover opacity-20 pointer-events-none border-0"
              style={{
                transform: `translate3d(-50%, -50%, 0) scale(1.3)`,
              }}
            />
          </div>
        ) : !videoError && heroVideoSrc ? (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            poster={heroImageSrc}
            onCanPlay={() => setVideoLoaded(true)}
            onError={() => setVideoError(true)}
            className={`h-full w-full object-cover transition-opacity duration-1000 ${
              videoLoaded ? "opacity-75 scale-105" : "opacity-30 scale-100"
            }`}
            style={{
              transform: `translate3d(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px, 0)`,
            }}
          >
            <source src={heroVideoSrc} type="video/mp4" />
          </video>
        ) : (
          <img
            src={heroImageSrc}
            alt="Hero Background"
            className="h-full w-full object-cover opacity-40 scale-105 transition-transform duration-1000"
            style={{
              transform: `translate3d(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px, 0)`,
            }}
          />
        )}

        {/* Clean Light Overlay for Text Readability without Beige Tint */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/30 to-white/90" />
        <div className="absolute inset-0 bg-white/20 backdrop-blur-[1px]" />

        {/* Subtle Ambient Red Accent Glow */}
        <div
          className="glow-orb -top-20 -left-20 size-[500px] bg-red-600/10"
          style={{ transform: `translate3d(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px, 0)` }}
        />
        <div
          className="glow-orb top-1/3 -right-20 size-[600px] bg-red-500/5"
          style={{ transform: `translate3d(${-mousePos.x * 0.4}px, ${-mousePos.y * 0.4}px, 0)` }}
        />
      </div>

      {/* Main Hero Content */}
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl flex flex-col items-center text-center animate-rise">
          {/* Eyebrow */}
          {homeHero["heroEyebrow"] && (
            <p className="mb-4 text-xs font-mono font-extrabold uppercase tracking-[0.25em] text-red-600">
              {homeHero["heroEyebrow"]}
            </p>
          )}

          {/* Editorial Large Responsive Typography */}
          <h1 className="max-w-3xl font-display text-3xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl md:text-5xl lg:text-6xl text-neutral-950">
            <span className="block">{homeHero["heroTitle"] || "BUILD DIGITAL SYSTEMS"}</span>
            <span className="block text-gradient-accent">{homeHero["heroTitleAccent"] || "THAT MOVE BUSINESS"}</span>
            <span className="block text-red-600 font-extrabold">FORWARD.</span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-neutral-600 sm:text-lg font-medium">
            {homeHero["heroCopy"] || "AJETAN turns ambitious business goals into custom web platforms, mobile apps, AI workflows, and connected digital growth engines."}
          </p>

          {/* Magnetic CTA Buttons */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="group relative overflow-hidden rounded-xl bg-red-600 hover:bg-red-700 px-8 py-6 text-base font-bold text-white shadow-xl shadow-red-600/25 transition-all duration-300 hover:scale-105"
              data-cursor="START"
            >
              <Link to={homeHero["primaryCtaLink"] || "/contact"}>
                {homeHero["primaryCtaText"] || "Start a project"}
                <ArrowRight className="ml-2 size-5 transition-transform duration-300 group-hover:translate-x-1.5" />
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-xl border-neutral-300 bg-white/90 px-8 py-6 text-base font-bold text-neutral-900 backdrop-blur-md shadow-sm transition-all duration-300 hover:border-red-600 hover:bg-red-50 hover:text-red-600"
              data-cursor="WORK"
            >
              <Link to={homeHero["secondaryCtaLink"] || "/portfolio"}>
                {homeHero["secondaryCtaText"] || "Explore our work"}
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="relative z-10 mt-12 flex flex-col items-center justify-center">
        <a
          href="#intro"
          className="group flex flex-col items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-neutral-500 transition-colors hover:text-red-600"
          aria-label="Scroll to explore website contents"
        >
          <span>Scroll to explore</span>
          <div className="grid size-9 place-items-center rounded-full border border-neutral-300 bg-white shadow-sm backdrop-blur-md transition-transform duration-300 group-hover:translate-y-1 group-hover:border-red-600">
            <ArrowDown className="size-4 animate-bounce text-red-600" />
          </div>
        </a>
      </div>
    </section>
  );
}
