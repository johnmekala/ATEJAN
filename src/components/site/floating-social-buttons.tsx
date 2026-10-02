import { useState } from "react";
import { Phone } from "lucide-react";
import { useCMS, formatWhatsAppUrl } from "@/context/cms-context";

// Official WhatsApp Icon SVG
function WhatsAppIcon({ className = "size-6" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.461c-1.854 0-3.665-.497-5.256-1.439l-.377-.223-3.908 1.024 1.042-3.808-.247-.393c-1.034-1.646-1.58-3.56-1.58-5.524 0-5.698 4.636-10.334 10.334-10.334 2.76 0 5.353 1.076 7.304 3.028 1.95 1.952 3.025 4.546 3.025 7.306 0 5.698-4.637 10.335-10.334 10.335m0-19.334c-4.96 0-8.999 4.039-8.999 8.999 0 1.968.636 3.791 1.725 5.279l.108.147-.68 2.484 2.544-.667.143.085c1.428.85 3.085 1.3 4.759 1.3 4.96 0 8.999-4.039 8.999-8.999 0-4.961-4.039-9-8.999-9" />
    </svg>
  );
}

// Official Instagram Icon SVG
function InstagramIcon({ className = "size-6" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

export function FloatingSocialButtons() {
  const [hovered, setHovered] = useState<string | null>(null);
  const { data } = useCMS();

  const whatsappSocial = data.socials.find((s) => s.platform.toLowerCase().includes("whatsapp"));
  const instagramSocial = data.socials.find((s) => s.platform.toLowerCase().includes("instagram"));

  const rawWa = whatsappSocial?.url || data.site.whatsapp || "6301106842";
  const whatsappUrl = formatWhatsAppUrl(rawWa);
  const instagramUrl = instagramSocial?.url || "https://instagram.com";
  const phoneUrl = `tel:${data.site.phone || "+919876543210"}`;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3 pointer-events-auto">
      {/* 1. WHATSAPP FLOATING BUTTON */}
      <div className="relative flex items-center animate-float-slow">
        {/* Tooltip */}
        <span
          className={`mr-2.5 rounded-md bg-neutral-900 px-2.5 py-1 font-mono text-[11px] font-bold text-white shadow-xl border border-neutral-800 transition-all duration-300 whitespace-nowrap ${
            hovered === "whatsapp"
              ? "opacity-100 translate-x-0"
              : "opacity-0 translate-x-2 pointer-events-none"
          }`}
        >
          Chat on WhatsApp
        </span>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setHovered("whatsapp")}
          onMouseLeave={() => setHovered(null)}
          aria-label="WhatsApp"
          className="group relative flex size-10 sm:size-11 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/25 transition-all duration-300 hover:scale-110 hover:bg-emerald-600 hover:shadow-xl hover:shadow-emerald-500/40"
        >
          {/* Animated Pulsing Ring */}
          <span className="absolute inset-0 rounded-full bg-emerald-500 opacity-70 animate-ping group-hover:animate-none pointer-events-none" />
          <WhatsAppIcon className="relative z-10 size-5 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110" />
        </a>
      </div>

      {/* 2. INSTAGRAM FLOATING BUTTON */}
      <div className="relative flex items-center animate-float-slow-delayed">
        {/* Tooltip */}
        <span
          className={`mr-2.5 rounded-md bg-neutral-900 px-2.5 py-1 font-mono text-[11px] font-bold text-white shadow-xl border border-neutral-800 transition-all duration-300 whitespace-nowrap ${
            hovered === "instagram"
              ? "opacity-100 translate-x-0"
              : "opacity-0 translate-x-2 pointer-events-none"
          }`}
        >
          Follow on Instagram
        </span>

        <a
          href={instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setHovered("instagram")}
          onMouseLeave={() => setHovered(null)}
          aria-label="Instagram"
          className="group relative flex size-10 sm:size-11 items-center justify-center rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white shadow-lg shadow-rose-500/25 transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-rose-500/40"
        >
          <InstagramIcon className="size-5 transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110" />
        </a>
      </div>

      {/* 3. PHONE FLOATING BUTTON (BLUE) */}
      <div className="relative flex items-center animate-float-slow-alt">
        {/* Tooltip */}
        <span
          className={`mr-2.5 rounded-md bg-neutral-900 px-2.5 py-1 font-mono text-[11px] font-bold text-white shadow-xl border border-neutral-800 transition-all duration-300 whitespace-nowrap ${
            hovered === "phone"
              ? "opacity-100 translate-x-0"
              : "opacity-0 translate-x-2 pointer-events-none"
          }`}
        >
          Call Us Direct
        </span>

        <a
          href={phoneUrl}
          onMouseEnter={() => setHovered("phone")}
          onMouseLeave={() => setHovered(null)}
          aria-label="Call Us"
          className="group relative flex size-10 sm:size-11 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg shadow-blue-600/30 transition-all duration-300 hover:scale-110 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/50"
        >
          <Phone className="size-4.5 sm:size-5 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
        </a>
      </div>
    </div>
  );
}
