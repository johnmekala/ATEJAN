import {
  AppWindow,
  Bot,
  ChartNoAxesCombined,
  CodeXml,
  LayoutTemplate,
  Smartphone,
  type LucideIcon,
} from "lucide-react";
import systemImage from "@/assets/ajetan-system.jpg";
import webImage from "@/assets/ajetan-web.jpg";
import mobileImage from "@/assets/ajetan-mobile.jpg";
import automationImage from "@/assets/ajetan-automation.jpg";

export const site = {
  name: "AJETAN",
  strapline: "Build. Automate. Grow.",
  email: "Email address available on request",
  phone: "Phone number available on request",
  location: "Location available on request",
  hours: "Working hours available on request",
};

export type Service = {
  slug: string;
  title: string;
  shortTitle: string;
  summary: string;
  detail: string;
  image: string;
  icon: LucideIcon;
  problems: string[];
  deliverables: string[];
  technologies: string[];
};

export const services: Service[] = [
  {
    slug: "web-development",
    title: "Website Development",
    shortTitle: "Web platforms",
    summary: "High-performance websites and platforms built around measurable business goals.",
    detail: "From focused landing pages to complex digital platforms, we unite strategy, design and engineering in one delivery system.",
    image: webImage,
    icon: CodeXml,
    problems: ["Outdated digital presence", "Slow or inaccessible experiences", "Disconnected customer journeys"],
    deliverables: ["Experience strategy", "Responsive interface system", "Production development", "Launch support"],
    technologies: ["React", "Next.js", "Modern APIs", "Cloud platforms"],
  },
  {
    slug: "app-development",
    title: "Mobile App Development",
    shortTitle: "Mobile products",
    summary: "Focused mobile products for iOS, Android and cross-platform delivery.",
    detail: "We shape useful, intuitive mobile products from early product definition through launch-ready application engineering.",
    image: mobileImage,
    icon: Smartphone,
    problems: ["Fragmented mobile journeys", "Unclear product scope", "Products that cannot scale"],
    deliverables: ["Product definition", "Interaction design", "Application development", "Release readiness"],
    technologies: ["Flutter", "React Native", "Native APIs", "Cloud services"],
  },
  {
    slug: "ai-automation",
    title: "AI Automation",
    shortTitle: "AI automation",
    summary: "Intelligent workflows that reduce repetitive work and improve operating clarity.",
    detail: "We identify useful automation opportunities, connect fragmented tools and design human-controlled AI workflows.",
    image: automationImage,
    icon: Bot,
    problems: ["Manual repetitive operations", "Scattered business knowledge", "Slow internal response times"],
    deliverables: ["Automation audit", "Workflow architecture", "Assistant interfaces", "Monitoring plan"],
    technologies: ["Python", "AI APIs", "Workflow platforms", "Secure integrations"],
  },
  {
    slug: "ui-ux-design",
    title: "UI/UX Design",
    shortTitle: "Product design",
    summary: "Research-led interfaces and design systems that make complex products feel clear.",
    detail: "We turn product requirements into understandable journeys, expressive interfaces and reusable design foundations.",
    image: webImage,
    icon: LayoutTemplate,
    problems: ["Confusing product journeys", "Inconsistent interfaces", "Slow design-to-build handoff"],
    deliverables: ["User flows", "Interface design", "Interactive prototypes", "Design systems"],
    technologies: ["Figma", "Prototyping systems", "Component libraries", "Accessibility standards"],
  },
  {
    slug: "custom-software",
    title: "Custom Software",
    shortTitle: "Digital systems",
    summary: "Purpose-built dashboards, internal tools and business platforms that fit how you work.",
    detail: "We engineer tailored systems where off-the-shelf software creates friction, duplication or operational limits.",
    image: systemImage,
    icon: AppWindow,
    problems: ["Disconnected internal tools", "Workarounds that limit growth", "Poor operational visibility"],
    deliverables: ["Systems analysis", "Solution architecture", "Custom software", "Long-term evolution plan"],
    technologies: ["React", "Node.js", "Databases", "Cloud infrastructure"],
  },
];

export type Project = {
  slug: string;
  title: string;
  category: "Websites" | "Apps" | "AI" | "Branding" | "Marketing" | "Software";
  summary: string;
  image: string;
  technologies: string[];
  challenge: string;
  approach: string;
  solution: string;
  result: string;
};

export const projects: Project[] = [
  { slug: "commerce-platform-concept", title: "Commerce Platform Concept", category: "Websites", summary: "Replaceable concept demonstrating an editorial commerce experience.", image: webImage, technologies: ["Experience design", "Web platform"], challenge: "Show how a fragmented catalogue could become a focused, credible buying journey.", approach: "Map the essential decisions, remove visual noise and create a reusable interface language.", solution: "A responsive commerce concept connecting discovery, product context and conversion in one system.", result: "Concept outcome only — verified client results can replace this field when supplied." },
  { slug: "operations-app-concept", title: "Operations App Concept", category: "Apps", summary: "Replaceable concept for a focused mobile operations workflow.", image: mobileImage, technologies: ["Product design", "Mobile"], challenge: "Make frequent operational tasks faster to understand and easier to complete on the move.", approach: "Prioritize the highest-value actions and structure the experience around real working contexts.", solution: "A compact mobile product concept with clear status, actions and operational visibility.", result: "Concept outcome only — verified client results can replace this field when supplied." },
  { slug: "workflow-system-concept", title: "Workflow System Concept", category: "AI", summary: "Replaceable concept visualizing a controlled automation system.", image: automationImage, technologies: ["Automation", "AI integration"], challenge: "Reduce repetitive handoffs without removing the judgment people need to retain.", approach: "Separate repeatable work from decision points, then design visible controls and review stages.", solution: "A human-controlled automation concept that makes workflow status and exceptions easy to inspect.", result: "Concept outcome only — verified client results can replace this field when supplied." },
  { slug: "business-platform-concept", title: "Business Platform Concept", category: "Software", summary: "Replaceable concept for connected business intelligence and operations.", image: systemImage, technologies: ["Custom software", "Cloud"], challenge: "Bring scattered business signals into one useful operating view.", approach: "Define the decisions the system must support before shaping information and interactions.", solution: "A modular business platform concept connecting performance, workflow and next actions.", result: "Concept outcome only — verified client results can replace this field when supplied." },
];

export const process = ["Discover", "Plan", "Design", "Build", "Test", "Launch", "Optimize"];

export const faqs = [
  ["What services does AJETAN provide?", "AJETAN brings together website development, mobile products, AI automation, digital marketing, UI/UX design and custom software."],
  ["How does a project start?", "We begin with a focused conversation about the business goal, users, constraints and the result you need."],
  ["How long does a website take?", "Timing depends on scope, content and integrations. A realistic delivery plan is defined after discovery rather than guessed upfront."],
  ["Can AJETAN build custom applications?", "Yes. We design and engineer tailored mobile products, dashboards, internal tools and connected business platforms."],
  ["Can AJETAN integrate AI?", "Yes. We focus on practical, human-controlled AI workflows that solve a specific operational or customer problem."],
  ["Do you provide maintenance?", "Ongoing support and optimization can be shaped around the product, release cycle and internal team."],
  ["Do you work with startups?", "AJETAN can support both emerging and established businesses when the ambition, problem and delivery model are aligned."],
  ["Do you provide digital marketing?", "Yes. Strategy can include content, search, performance campaigns, social channels and measurement."],
  ["How can I start a project?", "Use the project inquiry form and share what you are trying to achieve. We will use that context to begin a useful conversation."],
] as const;

export const serviceBySlug = (slug: string) => services.find((service) => service.slug === slug);
export const projectBySlug = (slug: string) => projects.find((project) => project.slug === slug);