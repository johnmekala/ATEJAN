const items = [
  "WEBSITE DEVELOPMENT",
  "MOBILE APPS",
  "AI AUTOMATION",
  "DIGITAL MARKETING",
  "UI/UX DESIGN",
  "CUSTOM SOFTWARE",
  "CLOUD ARCHITECTURE",
  "GROWTH SYSTEMS",
];

export function TrustStrip() {
  return (
    <div className="relative overflow-hidden border-y border-neutral-800 bg-black py-6">
      <div className="animate-marquee flex items-center gap-12 whitespace-nowrap">
        {[...items, ...items, ...items].map((item, index) => (
          <div key={index} className="flex items-center gap-12">
            <span className="font-display text-sm font-extrabold uppercase tracking-[0.2em] text-white transition-colors hover:text-red-500">
              {item}
            </span>
            <span className="size-2 rounded-full bg-red-600 shadow-[0_0_12px_rgba(220,38,38,0.8)]" />
          </div>
        ))}
      </div>
    </div>
  );
}
