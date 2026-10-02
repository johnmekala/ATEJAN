import React, { createContext, useContext, useEffect, useState } from "react";
import { services as initialServices, projects as initialProjects, faqs as initialFaqs, site as initialSite } from "@/content/site";

// --- CMS Data Schemas ---

export type SiteInfo = {
  name: string;
  strapline: string;
  email: string;
  phone: string;
  location: string;
  hours: string;
  whatsapp: string;
  mapsUrl: string;
  copyright: string;
  logo: string;
  footerText: string;
};

export type NavItem = {
  id: string;
  label: string;
  to: string;
  order: number;
  visible: boolean;
};

export type HeaderNav = {
  items: NavItem[];
  ctaText: string;
  ctaLink: string;
};

export type SocialLink = {
  id: string;
  platform: string;
  label: string;
  url: string;
  iconName: string;
  visible: boolean;
};

export type ServiceItem = {
  slug: string;
  title: string;
  shortTitle: string;
  summary: string;
  detail: string;
  image: string;
  iconName: string;
  problems: string[];
  deliverables: string[];
  technologies: string[];
  visible: boolean;
  order: number;
};

export type ProjectItem = {
  slug: string;
  title: string;
  category: "Websites" | "Apps" | "AI" | "Branding" | "Marketing" | "Software";
  summary: string;
  image: string;
  videoUrl?: string;
  technologies: string[];
  challenge: string;
  approach: string;
  solution: string;
  result: string;
  featured: boolean;
  visible: boolean;
  order: number;
};

export type TestimonialItem = {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
  avatar: string;
  visible: boolean;
  order: number;
};

export type ClientBrandItem = {
  id: string;
  name: string;
  logo: string;
  category: string;
  visible: boolean;
  order: number;
};

export type MediaItem = {
  id: string;
  name: string;
  url: string;
  type: "image" | "video";
  alt?: string;
  caption?: string;
  createdAt: string;
};

export type FAQItem = {
  id: string;
  question: string;
  answer: string;
  visible: boolean;
  order: number;
};

export type PageSEO = {
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  canonical?: string;
};

export type PageContent = {
  heroEyebrow: string;
  heroTitle: string;
  heroTitleAccent?: string;
  heroCopy: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
  heroImage: string;
  heroVideo: string;
  sectionsVisibility: Record<string, boolean>;
  customTexts: Record<string, string>;
};

export type CMSData = {
  site: SiteInfo;
  navigation: HeaderNav;
  socials: SocialLink[];
  services: ServiceItem[];
  projects: ProjectItem[];
  testimonials: TestimonialItem[];
  clientBrands: ClientBrandItem[];
  mediaLibrary: MediaItem[];
  faqs: FAQItem[];
  pages: Record<string, PageContent>;
  seo: Record<string, PageSEO>;
};

export function formatWhatsAppUrl(input: string): string {
  if (!input) return "https://wa.me/916301106842";
  if (input.startsWith("http://") || input.startsWith("https://")) return input;
  const digits = input.replace(/\D/g, "");
  if (!digits) return "https://wa.me/916301106842";
  if (digits.length === 10) return `https://wa.me/91${digits}`;
  return `https://wa.me/${digits}`;
}

// --- Initial Default CMS State ---

const defaultCMSData: CMSData = {
  site: {
    name: "AJETAN",
    strapline: "Build. Automate. Grow.",
    email: "hello@ajetan.com",
    phone: "+91 98765 43210",
    location: "India",
    hours: "Mon - Fri, 9am - 6pm",
    whatsapp: "6301106842",
    mapsUrl: "https://maps.google.com",
    copyright: "© 2026 AJETAN Digital Growth Systems. All rights reserved.",
    logo: "",
    footerText: "Engineering high-impact digital products, mobile platforms, and automated business systems for ambitious enterprises globally.",
  },
  navigation: {
    items: [
      { id: "1", label: "Home", to: "/", order: 1, visible: true },
      { id: "2", label: "About", to: "/about", order: 2, visible: true },
      { id: "3", label: "Services", to: "/services", order: 3, visible: true },
      { id: "4", label: "Portfolio", to: "/portfolio", order: 4, visible: true },
      { id: "5", label: "Contact", to: "/contact", order: 5, visible: true },
    ],
    ctaText: "Start a project",
    ctaLink: "/contact",
  },
  socials: [
    { id: "s1", platform: "Instagram", label: "@ajetan_official", url: "https://instagram.com", iconName: "Instagram", visible: true },
    { id: "s2", platform: "LinkedIn", label: "AJETAN Digital", url: "https://linkedin.com", iconName: "Linkedin", visible: true },
    { id: "s3", platform: "Facebook", label: "AJETAN Systems", url: "https://facebook.com", iconName: "Facebook", visible: true },
    { id: "s4", platform: "Twitter", label: "@ajetan_tech", url: "https://twitter.com", iconName: "Twitter", visible: true },
    { id: "s5", platform: "YouTube", label: "AJETAN Media", url: "https://youtube.com", iconName: "Youtube", visible: true },
    { id: "s6", platform: "WhatsApp", label: "WhatsApp Direct", url: "6301106842", iconName: "MessageCircle", visible: true },
    { id: "s7", platform: "Telegram", label: "Telegram Channel", url: "https://telegram.org", iconName: "Send", visible: true },
  ],
  services: initialServices.map((s, index) => ({
    slug: s.slug,
    title: s.title,
    shortTitle: s.shortTitle,
    summary: s.summary,
    detail: s.detail,
    image: typeof s.image === "string" ? s.image : "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1200&auto=format&fit=crop",
    iconName: s.slug === "web-development" ? "CodeXml" : s.slug === "app-development" ? "Smartphone" : s.slug === "ai-automation" ? "Bot" : s.slug === "ui-ux-design" ? "LayoutTemplate" : "AppWindow",
    problems: s.problems,
    deliverables: s.deliverables,
    technologies: s.technologies,
    visible: true,
    order: index + 1,
  })),
  projects: initialProjects.map((p, index) => ({
    slug: p.slug,
    title: p.title,
    category: p.category,
    summary: p.summary,
    image: typeof p.image === "string" ? p.image : "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
    videoUrl: "",
    technologies: p.technologies,
    challenge: p.challenge,
    approach: p.approach,
    solution: p.solution,
    result: p.result,
    featured: true,
    visible: true,
    order: index + 1,
  })),
  testimonials: [
    {
      id: "t1",
      name: "Marcus Vance",
      role: "Chief Technology Officer",
      company: "Aether Dynamics",
      quote: "AJETAN delivered our core digital engine in record time. Their architectural clarity and execution velocity gave us a distinct market lead.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
      visible: true,
      order: 1,
    },
    {
      id: "t2",
      name: "Sophia Reynolds",
      role: "VP of Product",
      company: "Nexus Financial",
      quote: "The team transformed our legacy customer portal into an ultra-responsive, high-converting product. The ROI was evident within weeks.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop",
      visible: true,
      order: 2,
    },
    {
      id: "t3",
      name: "Elena Rostova",
      role: "Head of AI Operations",
      company: "Synthetix Labs",
      quote: "Working with AJETAN felt like an extension of our internal engineering squad. Flawless AI workflow integrations and top-tier UI aesthetics.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
      visible: true,
      order: 3,
    },
  ],
  clientBrands: [
    {
      id: "b1",
      name: "AURA SYSTEMS",
      category: "AI & CLOUD INFRASTRUCTURE",
      logo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=400&auto=format&fit=crop",
      visible: true,
      order: 1,
    },
    {
      id: "b2",
      name: "NEXUS LUXURY",
      category: "PREMIUM LIFESTYLE & WINE",
      logo: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=400&auto=format&fit=crop",
      visible: true,
      order: 2,
    },
    {
      id: "b3",
      name: "VELOCITY LOGISTICS",
      category: "GLOBAL SUPPLY PLATFORM",
      logo: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=400&auto=format&fit=crop",
      visible: true,
      order: 3,
    },
    {
      id: "b4",
      name: "KINETIC HEALTH",
      category: "BIOTECH & MEDICAL LABS",
      logo: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=400&auto=format&fit=crop",
      visible: true,
      order: 4,
    },
    {
      id: "b5",
      name: "PRISM PRODUCTIONS",
      category: "CINEMATIC MEDIA & BROADCAST",
      logo: "https://images.unsplash.com/photo-1518173946687-a4c8a383392e?q=80&w=400&auto=format&fit=crop",
      visible: true,
      order: 5,
    },
    {
      id: "b6",
      name: "VERTEX CAPITAL",
      category: "GLOBAL BANKING & PAYMENTS",
      logo: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=400&auto=format&fit=crop",
      visible: true,
      order: 6,
    },
    {
      id: "b7",
      name: "ELEVATE REALTY",
      category: "ARCHITECTURAL SPACES",
      logo: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=400&auto=format&fit=crop",
      visible: true,
      order: 7,
    },
    {
      id: "b8",
      name: "ORBIT AI LABS",
      category: "AUTONOMOUS WORKFLOWS",
      logo: "https://images.unsplash.com/photo-1677442136019-21780efad99a?q=80&w=400&auto=format&fit=crop",
      visible: true,
      order: 8,
    },
  ],
  mediaLibrary: [
    {
      id: "m0",
      name: "Hero Background Video (HD 1080p)",
      url: "/hero-video.mp4",
      type: "video",
      alt: "Hero Section HD Video",
      createdAt: new Date().toISOString(),
    },
    {
      id: "m1",
      name: "Web Platform Showcase",
      url: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1200&auto=format&fit=crop",
      type: "image",
      alt: "Web Platform Development",
      createdAt: new Date().toISOString(),
    },
    {
      id: "m2",
      name: "Mobile App Mockup",
      url: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1200&auto=format&fit=crop",
      type: "image",
      alt: "Mobile Product Interface",
      createdAt: new Date().toISOString(),
    },
    {
      id: "m3",
      name: "AI Automation Workflow",
      url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop",
      type: "image",
      alt: "AI Engine",
      createdAt: new Date().toISOString(),
    },
  ],
  faqs: initialFaqs.map(([question, answer], index) => ({
    id: `faq-${index + 1}`,
    question,
    answer,
    visible: true,
    order: index + 1,
  })),
  pages: {
    home: {
      heroEyebrow: "PRECISION ENGINEERING & DIGITAL GROWTH",
      heroTitle: "Build. Automate.",
      heroTitleAccent: "Grow.",
      heroCopy: "AJETAN designs and engineers high-performance web applications, mobile platforms, AI workflows and connected digital growth systems for ambitious businesses globally.",
      primaryCtaText: "Start a project",
      primaryCtaLink: "/contact",
      secondaryCtaText: "Explore our work",
      secondaryCtaLink: "/portfolio",
      heroImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
      heroVideo: "/hero-video.mp4",
      sectionsVisibility: {
        hero: true,
        marquee: true,
        capabilities: true,
        edge: true,
        portfolio: true,
        testimonials: true,
        trustedBrands: true,
        cta: true,
      },
      customTexts: {
        capabilitiesEyebrow: "What we build",
        capabilitiesTitle: "Capability without complexity.",
        capabilitiesCopy: "Focused engineering expertise, united around your core business objective.",
        edgeEyebrow: "THE AJETAN EDGE",
        edgeTitle: "GROW YOUR BUSINESS LOCALLY AND GLOBALLY.",
        portfolioEyebrow: "Selected Work",
        portfolioTitle: "Digital systems built for performance.",
        testimonialsEyebrow: "VOICES OF OUR CLIENTS",
        testimonialsTitle: "CLIENT VALIDATION.",
        trustedBrandsTitle: "TRUSTED BY VISIONARY BRANDS",
      },
    },
    about: {
      heroEyebrow: "ABOUT AJETAN",
      heroTitle: "Focused engineering. Measurable momentum.",
      heroCopy: "We build modern websites, mobile products and automated growth systems for organizations that require speed, quality and long-term capability.",
      primaryCtaText: "Start a conversation",
      primaryCtaLink: "/contact",
      secondaryCtaText: "View our portfolio",
      secondaryCtaLink: "/portfolio",
      heroImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop",
      heroVideo: "",
      sectionsVisibility: {
        hero: true,
        philosophy: true,
        process: true,
        cta: true,
      },
      customTexts: {
        philosophyEyebrow: "ENGINEERING PHILOSOPHY",
        philosophyTitle: "Built for clarity, speed and scale.",
        processEyebrow: "HOW WE WORK",
        processTitle: "A disciplined 7-step delivery system.",
      },
    },
    services: {
      heroEyebrow: "OUR CAPABILITIES",
      heroTitle: "End-to-end digital engineering.",
      heroCopy: "From initial product strategy to custom application development, AI automation and growth marketing systems.",
      primaryCtaText: "Get in touch",
      primaryCtaLink: "/contact",
      secondaryCtaText: "See case studies",
      secondaryCtaLink: "/portfolio",
      heroImage: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1200&auto=format&fit=crop",
      heroVideo: "",
      sectionsVisibility: {
        hero: true,
        serviceList: true,
        cta: true,
      },
      customTexts: {
        servicesHeading: "Core Service Offerings",
      },
    },
    portfolio: {
      heroEyebrow: "OUR PORTFOLIO",
      heroTitle: "Proof over promises.",
      heroCopy: "Explore our recent digital products, web platforms, mobile apps and automated systems.",
      primaryCtaText: "Start a project",
      primaryCtaLink: "/contact",
      secondaryCtaText: "Browse capabilities",
      secondaryCtaLink: "/services",
      heroImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
      heroVideo: "",
      sectionsVisibility: {
        hero: true,
        grid: true,
        trustedBrands: true,
        cta: true,
      },
      customTexts: {
        gridTitle: "Selected Projects & Systems",
      },
    },
    contact: {
      heroEyebrow: "START A CONVERSATION",
      heroTitle: "LET'S BUILD WHAT'S NEXT.",
      heroCopy: "Share your project goals, technical requirements, or early ideas. Our team will review the details to shape a clear path forward.",
      primaryCtaText: "Submit Inquiry",
      primaryCtaLink: "/contact",
      secondaryCtaText: "",
      secondaryCtaLink: "",
      heroImage: "",
      heroVideo: "",
      sectionsVisibility: {
        hero: true,
        form: true,
        rightTabs: true,
        cta: true,
      },
      customTexts: {
        leftLabel: "CONTACT INFO",
        leftHeading: "Let’s Start a Conversation.",
        officesTitle: "Main Office",
        networkTitle: "Digital Footprint",
        processTitle: "Protocol Expectations",
      },
    },
  },
  seo: {
    home: { title: "AJETAN — Build. Automate. Grow. | Digital Agency", description: "AJETAN builds high-performance web applications, mobile apps, AI automation and growth systems." },
    about: { title: "About AJETAN — Engineering & Agency Philosophy", description: "Learn how AJETAN approaches software engineering, design systems and digital growth." },
    services: { title: "Services & Capabilities — AJETAN", description: "Explore AJETAN's core capabilities in Web Development, Mobile Apps, AI Automation, UI/UX and Custom Software." },
    portfolio: { title: "Portfolio & Case Studies — AJETAN", description: "Selected digital products, mobile applications and automation systems built by AJETAN." },
    contact: { title: "Start a Project — Contact AJETAN", description: "Get in touch with AJETAN to build, automate or scale your digital product." },
  },
};

// --- CMS Context Definition ---

type CMSContextType = {
  data: CMSData;
  updateSiteInfo: (info: Partial<SiteInfo>) => void;
  updateNavigation: (nav: Partial<HeaderNav>) => void;
  updatePageContent: (pageKey: string, updates: Partial<PageContent>) => void;
  updateCustomText: (pageKey: string, textKey: string, value: string) => void;
  toggleSectionVisibility: (pageKey: string, sectionKey: string) => void;
  updateService: (service: ServiceItem) => void;
  addService: (service: ServiceItem) => void;
  deleteService: (slug: string) => void;
  updateProject: (project: ProjectItem) => void;
  addProject: (project: ProjectItem) => void;
  deleteProject: (slug: string) => void;
  updateTestimonial: (testimonial: TestimonialItem) => void;
  addTestimonial: (testimonial: TestimonialItem) => void;
  deleteTestimonial: (id: string) => void;
  updateClientBrand: (brand: ClientBrandItem) => void;
  addClientBrand: (brand: ClientBrandItem) => void;
  deleteClientBrand: (id: string) => void;
  addMediaItem: (media: MediaItem) => void;
  deleteMediaItem: (id: string) => void;
  updateFAQ: (faq: FAQItem) => void;
  addFAQ: (faq: FAQItem) => void;
  deleteFAQ: (id: string) => void;
  updateSEO: (pageKey: string, seo: Partial<PageSEO>) => void;
  updateSocialLink: (social: SocialLink) => void;
  addSocialLink: (social: SocialLink) => void;
  deleteSocialLink: (id: string) => void;
  exportCMSData: () => string;
  importCMSData: (jsonString: string) => boolean;
  resetToDefaultCMS: () => void;
};

const CMSContext = createContext<CMSContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = "AJETAN_CMS_DATA_V2";

export function CMSProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<CMSData>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (saved) {
          return JSON.parse(saved);
        }
      } catch (err) {
        console.warn("Failed to load saved CMS data from localStorage:", err);
      }
    }
    return defaultCMSData;
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
      } catch (err) {
        console.warn("Failed to save CMS data to localStorage:", err);
      }
    }
  }, [data]);

  const updateSiteInfo = (info: Partial<SiteInfo>) => {
    setData((prev) => ({
      ...prev,
      site: { ...prev.site, ...info },
    }));
  };

  const updateNavigation = (nav: Partial<HeaderNav>) => {
    setData((prev) => ({
      ...prev,
      navigation: { ...prev.navigation, ...nav },
    }));
  };

  const updatePageContent = (pageKey: string, updates: Partial<PageContent>) => {
    setData((prev) => ({
      ...prev,
      pages: {
        ...prev.pages,
        [pageKey]: {
          ...(prev.pages[pageKey] || defaultCMSData.pages[pageKey] || {
            heroEyebrow: "",
            heroTitle: "",
            heroTitleAccent: "",
            heroCopy: "",
            primaryCtaText: "",
            primaryCtaLink: "",
            secondaryCtaText: "",
            secondaryCtaLink: "",
            heroImage: "",
            heroVideo: "",
            sectionsVisibility: {},
            customTexts: {},
          }),
          ...updates,
        },
      },
    }));
  };

  const updateCustomText = (pageKey: string, textKey: string, value: string) => {
    setData((prev) => {
      const page = prev.pages[pageKey] || {
        heroEyebrow: "",
        heroTitle: "",
        heroTitleAccent: "",
        heroCopy: "",
        primaryCtaText: "",
        primaryCtaLink: "",
        secondaryCtaText: "",
        secondaryCtaLink: "",
        heroImage: "",
        heroVideo: "",
        sectionsVisibility: {},
        customTexts: {},
      };
      return {
        ...prev,
        pages: {
          ...prev.pages,
          [pageKey]: {
            ...page,
            customTexts: {
              ...(page.customTexts || {}),
              [textKey]: value,
            },
          },
        },
      };
    });
  };

  const toggleSectionVisibility = (pageKey: string, sectionKey: string) => {
    setData((prev) => {
      const page = prev.pages[pageKey];
      if (!page) return prev;
      const current = page.sectionsVisibility?.[sectionKey] ?? true;
      return {
        ...prev,
        pages: {
          ...prev.pages,
          [pageKey]: {
            ...page,
            sectionsVisibility: {
              ...(page.sectionsVisibility || {}),
              [sectionKey]: !current,
            },
          },
        },
      };
    });
  };

  const updateService = (updated: ServiceItem) => {
    setData((prev) => ({
      ...prev,
      services: prev.services.map((s) => (s.slug === updated.slug ? updated : s)),
    }));
  };

  const addService = (newItem: ServiceItem) => {
    setData((prev) => ({
      ...prev,
      services: [...prev.services, newItem],
    }));
  };

  const deleteService = (slug: string) => {
    setData((prev) => ({
      ...prev,
      services: prev.services.filter((s) => s.slug !== slug),
    }));
  };

  const updateProject = (updated: ProjectItem) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.map((p) => (p.slug === updated.slug ? updated : p)),
    }));
  };

  const addProject = (newItem: ProjectItem) => {
    setData((prev) => ({
      ...prev,
      projects: [...prev.projects, newItem],
    }));
  };

  const deleteProject = (slug: string) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.slug !== slug),
    }));
  };

  const updateTestimonial = (updated: TestimonialItem) => {
    setData((prev) => ({
      ...prev,
      testimonials: prev.testimonials.map((t) => (t.id === updated.id ? updated : t)),
    }));
  };

  const addTestimonial = (newItem: TestimonialItem) => {
    setData((prev) => ({
      ...prev,
      testimonials: [...prev.testimonials, newItem],
    }));
  };

  const deleteTestimonial = (id: string) => {
    setData((prev) => ({
      ...prev,
      testimonials: prev.testimonials.filter((t) => t.id !== id),
    }));
  };

  const updateClientBrand = (updated: ClientBrandItem) => {
    setData((prev) => ({
      ...prev,
      clientBrands: prev.clientBrands.map((b) => (b.id === updated.id ? updated : b)),
    }));
  };

  const addClientBrand = (newItem: ClientBrandItem) => {
    setData((prev) => ({
      ...prev,
      clientBrands: [...prev.clientBrands, newItem],
    }));
  };

  const deleteClientBrand = (id: string) => {
    setData((prev) => ({
      ...prev,
      clientBrands: prev.clientBrands.filter((b) => b.id !== id),
    }));
  };

  const addMediaItem = (item: MediaItem) => {
    setData((prev) => ({
      ...prev,
      mediaLibrary: [item, ...prev.mediaLibrary],
    }));
  };

  const deleteMediaItem = (id: string) => {
    setData((prev) => ({
      ...prev,
      mediaLibrary: prev.mediaLibrary.filter((m) => m.id !== id),
    }));
  };

  const updateFAQ = (updated: FAQItem) => {
    setData((prev) => ({
      ...prev,
      faqs: prev.faqs.map((f) => (f.id === updated.id ? updated : f)),
    }));
  };

  const addFAQ = (newItem: FAQItem) => {
    setData((prev) => ({
      ...prev,
      faqs: [...prev.faqs, newItem],
    }));
  };

  const deleteFAQ = (id: string) => {
    setData((prev) => ({
      ...prev,
      faqs: prev.faqs.filter((f) => f.id !== id),
    }));
  };

  const updateSEO = (pageKey: string, seo: Partial<PageSEO>) => {
    setData((prev) => ({
      ...prev,
      seo: {
        ...prev.seo,
        [pageKey]: {
          ...(prev.seo[pageKey] || { title: "", description: "" }),
          ...seo,
        },
      },
    }));
  };

  const updateSocialLink = (updated: SocialLink) => {
    setData((prev) => ({
      ...prev,
      socials: prev.socials.map((s) => (s.id === updated.id ? updated : s)),
    }));
  };

  const addSocialLink = (newItem: SocialLink) => {
    setData((prev) => ({
      ...prev,
      socials: [...prev.socials, newItem],
    }));
  };

  const deleteSocialLink = (id: string) => {
    setData((prev) => ({
      ...prev,
      socials: prev.socials.filter((s) => s.id !== id),
    }));
  };

  const exportCMSData = () => {
    return JSON.stringify(data, null, 2);
  };

  const importCMSData = (jsonString: string) => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed && typeof parsed === "object" && parsed.site) {
        setData(parsed);
        return true;
      }
    } catch (err) {
      console.error("Invalid CMS JSON backup:", err);
    }
    return false;
  };

  const resetToDefaultCMS = () => {
    setData(defaultCMSData);
    if (typeof window !== "undefined") {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
  };

  return (
    <CMSContext.Provider
      value={{
        data,
        updateSiteInfo,
        updateNavigation,
        updatePageContent,
        updateCustomText,
        toggleSectionVisibility,
        updateService,
        addService,
        deleteService,
        updateProject,
        addProject,
        deleteProject,
        updateTestimonial,
        addTestimonial,
        deleteTestimonial,
        updateClientBrand,
        addClientBrand,
        deleteClientBrand,
        addMediaItem,
        deleteMediaItem,
        updateFAQ,
        addFAQ,
        deleteFAQ,
        updateSEO,
        updateSocialLink,
        addSocialLink,
        deleteSocialLink,
        exportCMSData,
        importCMSData,
        resetToDefaultCMS,
      }}
    >
      {children}
    </CMSContext.Provider>
  );
}

export function useCMS() {
  const context = useContext(CMSContext);
  if (!context) {
    throw new Error("useCMS must be used within a CMSProvider");
  }
  return context;
}
