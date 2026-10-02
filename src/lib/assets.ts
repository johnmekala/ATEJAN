import systemImage from "@/assets/ajetan-system.jpg";
import webImage from "@/assets/ajetan-web.jpg";
import mobileImage from "@/assets/ajetan-mobile.jpg";
import automationImage from "@/assets/ajetan-automation.jpg";
import { cloudinaryUrl, cloudinaryVideoUrl } from "./cloudinary";

export { cloudinaryUrl, cloudinaryVideoUrl };

export const assets = {
  // Cloudinary Cloud Name & Helpers
  cloudName: "hdabfbwu",

  // Hero Video & Fallback Poster (Cloudinary / YouTube CDN ready)
  heroVideo: "https://youtu.be/S5BJf1e756o",
  heroPoster: cloudinaryUrl("ajetan/hero-poster", {
    width: 1920,
    quality: "auto",
    format: "auto",
  }) || "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1920&auto=format&fit=crop",

  // Service Visual Assets
  services: {
    webDevelopment: {
      image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1200&auto=format&fit=crop",
      fallback: webImage,
      accentColor: "from-red-600 to-rose-500",
      badge: "Performance & Responsive",
    },
    appDevelopment: {
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1200&auto=format&fit=crop",
      fallback: mobileImage,
      accentColor: "from-rose-600 to-red-500",
      badge: "iOS & Android Systems",
    },
    aiAutomation: {
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop",
      fallback: automationImage,
      accentColor: "from-red-500 to-orange-500",
      badge: "Intelligent Agents & Pipelines",
    },
    uiUxDesign: {
      image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=1200&auto=format&fit=crop",
      fallback: webImage,
      accentColor: "from-red-600 to-rose-600",
      badge: "Design Systems & Research",
    },
    customSoftware: {
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
      fallback: systemImage,
      accentColor: "from-rose-600 to-red-700",
      badge: "Tailored Operating Systems",
    },
  },

  // Why AJETAN Visuals
  why: {
    design: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1000&auto=format&fit=crop",
    technology: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop",
    automation: "https://images.unsplash.com/photo-1677442136019-21780efad99a?q=80&w=1000&auto=format&fit=crop",
    growth: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1000&auto=format&fit=crop",
  },

  // About Page Assets
  about: {
    hero: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1600&auto=format&fit=crop",
    mission: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop",
    timeline: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=1200&auto=format&fit=crop",
  },

  // Portfolio Imagery
  portfolio: {
    commerce: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
    operations: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
    workflow: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop",
    business: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1200&auto=format&fit=crop",
  },
};
