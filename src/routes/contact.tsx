import { useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  ExternalLink,
  Facebook,
  Globe,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  Share2,
  ShieldCheck,
  Sparkles,
  Twitter,
  Youtube,
} from "lucide-react";
import { Container } from "@/components/site/shared";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GlassBadge, GlassPanel } from "@/components/site/glass";
import { db, rtdb } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, push } from "firebase/database";
import { useCMS, formatWhatsAppUrl } from "@/context/cms-context";


export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Start a Project — Contact AJETAN" },
      {
        name: "description",
        content:
          "Tell AJETAN about your website, app, automation, design, marketing or custom software project.",
      },
      { property: "og:title", content: "LET'S BUILD WHAT'S NEXT. — AJETAN" },
      {
        property: "og:description",
        content: "Share your ambition, challenge or early idea with AJETAN.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

type Errors = Partial<Record<"name" | "email" | "phone" | "service" | "details", string>>;

function ContactPage() {
  const { data: cmsData } = useCMS();
  const [service, setService] = useState("");
  const [budget, setBudget] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "ready">("idle");
  const [waRedirectUrl, setWaRedirectUrl] = useState("");

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const next: Errors = {};
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const company = String(data.get("company") ?? "").trim();
    const details = String(data.get("details") ?? "").trim();

    if (name.length < 2) next.name = "Please enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(email)) next.email = "Enter a valid email address.";
    if (phone && !/^[+()\d\s-]{7,20}$/.test(phone))
      next.phone = "Enter a valid phone number or leave this blank.";
    if (!service) next.service = "Choose the service closest to your project.";
    if (details.length < 20) next.details = "Tell us a little more — at least 20 characters.";

    setErrors(next);
    if (Object.keys(next).length) return;

    setStatus("loading");
    const payload = {
      name,
      email,
      phone,
      company,
      service,
      budget,
      details,
      timestamp: Date.now(),
    };

    try {
      await addDoc(collection(db, "inquiries"), {
        ...payload,
        createdAt: serverTimestamp(),
      });
    } catch (e) {
      console.warn("Firestore inquiry backup mode:", e);
    }

    try {
      await push(ref(rtdb, "inquiries"), payload);
    } catch (e) {
      console.warn("RTDB inquiry backup mode:", e);
    }

    // Build pre-filled WhatsApp message URL
    const targetWa = cmsData?.site?.whatsapp || "6301106842";
    const baseWa = formatWhatsAppUrl(targetWa);
    const messageLines = [
      `*NEW INQUIRY — AJETAN*`,
      `----------------------------------`,
      `*Name:* ${name}`,
      `*Email:* ${email}`,
      phone ? `*Phone:* ${phone}` : null,
      company ? `*Company:* ${company}` : null,
      `*Service:* ${service}`,
      budget ? `*Budget:* ${budget}` : null,
      `\n*Project Details:*`,
      details,
    ]
      .filter(Boolean)
      .join("\n");

    const finalWaUrl = `${baseWa}${baseWa.includes("?") ? "&" : "?"}text=${encodeURIComponent(messageLines)}`;
    setWaRedirectUrl(finalWaUrl);
    setStatus("ready");

    // Automatically redirect or open WhatsApp tab
    try {
      window.open(finalWaUrl, "_blank");
    } catch (_err) {
      window.location.href = finalWaUrl;
    }
  };

  const fieldClass =
    "h-12 bg-neutral-900 border-neutral-700 text-white placeholder:text-neutral-500 focus:border-red-600 focus:ring-red-600/20";

  return (
    <>
      {/* 1. Hero Header (WHITE) */}
      <section className="relative overflow-hidden bg-white pt-36 pb-20 text-neutral-950 border-b border-neutral-200">
        <div className="glow-orb top-0 left-1/3 size-[600px] bg-red-600/15" />
        <Container className="relative z-10">
          <div className="max-w-3xl animate-rise">
            <GlassBadge icon={Sparkles}>START A CONVERSATION</GlassBadge>
            <h1 className="mt-6 font-display text-5xl font-extrabold leading-tight sm:text-6xl lg:text-7xl text-neutral-950">
              LET'S BUILD <span className="text-gradient-accent">WHAT'S NEXT.</span>
            </h1>
            <p className="mt-6 text-xl leading-relaxed text-neutral-600 font-medium">
              Share your project goals, technical requirements, or early ideas. Our team will review the details to shape a clear path forward.
            </p>
          </div>
        </Container>
      </section>

      {/* 2. Form & Details Section (BLACK) */}
      <section className="section-pad bg-black text-white">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 items-start">
            {/* Left Premium Form Panel */}
            <div className="dark-glass-panel p-8 sm:p-12 border border-neutral-800 bg-neutral-900 rounded-3xl shadow-2xl">
              {/* Header Label & Title */}
              <div className="mb-8 border-b border-neutral-800/80 pb-6">
                <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.25em] text-red-600 flex items-center gap-3">
                  <span className="h-px w-8 bg-red-600 inline-block" />
                  CONTACT INFO
                </p>
                <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-white uppercase leading-tight">
                  Let’s Start a Conversation.
                </h2>
              </div>

              {status === "ready" ? (
                <div className="grid min-h-[34rem] place-items-center text-center" role="status">
                  <div>
                    <div className="mx-auto grid size-16 place-items-center rounded-2xl bg-emerald-600/20 text-emerald-500 shadow-md">
                      <MessageCircle className="size-8" />
                    </div>
                    <h2 className="mt-6 font-display text-3xl font-extrabold text-white">
                      Redirecting to WhatsApp...
                    </h2>
                    <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-neutral-300 font-medium">
                      Your project inquiry has been saved and formatted for WhatsApp direct chat with our engineering team.
                    </p>
                    <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                      <Button
                        asChild
                        className="rounded-xl bg-emerald-600 hover:bg-emerald-700 font-bold text-white shadow-lg shadow-emerald-600/25 px-6 py-3"
                      >
                        <a href={waRedirectUrl} target="_blank" rel="noopener noreferrer">
                          <MessageCircle className="mr-2 size-5" /> Open WhatsApp Chat
                        </a>
                      </Button>
                      <Button
                        variant="outline"
                        className="rounded-xl border-neutral-700 text-neutral-300 hover:bg-neutral-800 font-bold"
                        onClick={() => setStatus("idle")}
                      >
                        Start another inquiry
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <form noValidate onSubmit={submit} className="space-y-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <Field id="name" label="Name" required error={errors.name}>
                      <Input id="name" name="name" autoComplete="name" className={fieldClass} aria-invalid={!!errors.name} />
                    </Field>

                    <Field id="email" label="Email" required error={errors.email}>
                      <Input id="email" name="email" type="email" autoComplete="email" className={fieldClass} aria-invalid={!!errors.email} />
                    </Field>

                    <Field id="phone" label="Phone" error={errors.phone}>
                      <Input id="phone" name="phone" type="tel" autoComplete="tel" className={fieldClass} aria-invalid={!!errors.phone} />
                    </Field>

                    <Field id="company" label="Company">
                      <Input id="company" name="company" autoComplete="organization" className={fieldClass} />
                    </Field>

                    <Field id="service" label="Service Capability" required error={errors.service}>
                      <Select value={service} onValueChange={setService}>
                        <SelectTrigger id="service" className={fieldClass} aria-invalid={!!errors.service}>
                          <SelectValue placeholder="Choose a service" />
                        </SelectTrigger>
                        <SelectContent className="bg-neutral-900 border-neutral-800 text-white">
                          {cmsData.services.filter((s) => s.visible).map((item) => (
                            <SelectItem key={item.slug} value={item.slug} className="focus:bg-neutral-800 focus:text-white">
                              {item.title}
                            </SelectItem>
                          ))}
                          <SelectItem value="other" className="focus:bg-neutral-800 focus:text-white">Other / Custom System</SelectItem>
                        </SelectContent>
                      </Select>
                    </Field>

                    <Field id="budget" label="Budget Range">
                      <Select value={budget} onValueChange={setBudget}>
                        <SelectTrigger id="budget" className={fieldClass}>
                          <SelectValue placeholder="Choose a range" />
                        </SelectTrigger>
                        <SelectContent className="bg-neutral-900 border-neutral-800 text-white">
                          <SelectItem value="exploring" className="focus:bg-neutral-800 focus:text-white">Still exploring</SelectItem>
                          <SelectItem value="starter" className="focus:bg-neutral-800 focus:text-white">Starter engagement</SelectItem>
                          <SelectItem value="growth" className="focus:bg-neutral-800 focus:text-white">Growth engagement</SelectItem>
                          <SelectItem value="complex" className="focus:bg-neutral-800 focus:text-white">Complex enterprise system</SelectItem>
                        </SelectContent>
                      </Select>
                    </Field>
                  </div>

                  <div>
                    <Field id="details" label="Project Details" required error={errors.details}>
                      <Textarea
                        id="details"
                        name="details"
                        rows={6}
                        className="min-h-40 resize-y bg-neutral-900 border-neutral-700 text-white placeholder:text-neutral-500 focus:border-red-600"
                        placeholder="What are you trying to build, automate, or scale?"
                        aria-invalid={!!errors.details}
                      />
                    </Field>
                  </div>

                  <input type="hidden" name="service" value={service} />
                  <input type="hidden" name="budget" value={budget} />

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full sm:w-auto rounded-xl bg-red-600 hover:bg-red-700 font-bold text-white shadow-xl shadow-red-600/25 transition-all duration-300 hover:scale-105"
                    disabled={status === "loading"}
                    data-cursor="SUBMIT"
                  >
                    {status === "loading" ? "Checking details…" : "START A CONVERSATION"}
                    <ArrowRight className="ml-2 size-5" />
                  </Button>
                </form>
              )}
            </div>

            {/* Right Side Interactive Tabbed Panel */}
            <ContactRightTabbedPanel />
          </div>
        </Container>
      </section>
    </>
  );
}

function getSocialIcon(platform: string) {
  const p = platform.toLowerCase();
  if (p.includes("instagram")) return Instagram;
  if (p.includes("linkedin")) return Linkedin;
  if (p.includes("facebook")) return Facebook;
  if (p.includes("twitter") || p.includes("x")) return Twitter;
  if (p.includes("youtube")) return Youtube;
  if (p.includes("whatsapp")) return MessageCircle;
  if (p.includes("telegram")) return Send;
  return Share2;
}

function ContactRightTabbedPanel() {
  const [activeTab, setActiveTab] = useState<"offices" | "network" | "process">("offices");
  const { data } = useCMS();

  return (
    <aside className="space-y-6 lg:sticky lg:top-28">
      {/* Top Tab Switcher */}
      <div className="grid grid-cols-3 gap-1.5 p-1.5 rounded-2xl bg-neutral-900/90 border border-neutral-800 backdrop-blur-md">
        <button
          type="button"
          onClick={() => setActiveTab("offices")}
          className={`flex items-center justify-center gap-2 rounded-xl py-3 px-3 text-xs font-mono font-extrabold uppercase tracking-wider transition-all duration-300 ${
            activeTab === "offices"
              ? "bg-neutral-800 text-white border border-neutral-700 shadow-lg"
              : "text-neutral-400 hover:text-white hover:bg-neutral-800/40"
          }`}
        >
          <MapPin className="size-4 text-red-500" />
          <span>Offices</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("network")}
          className={`flex items-center justify-center gap-2 rounded-xl py-3 px-3 text-xs font-mono font-extrabold uppercase tracking-wider transition-all duration-300 ${
            activeTab === "network"
              ? "bg-neutral-800 text-white border border-neutral-700 shadow-lg"
              : "text-neutral-400 hover:text-white hover:bg-neutral-800/40"
          }`}
        >
          <Share2 className="size-4 text-red-500" />
          <span>Network</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("process")}
          className={`flex items-center justify-center gap-2 rounded-xl py-3 px-3 text-xs font-mono font-extrabold uppercase tracking-wider transition-all duration-300 ${
            activeTab === "process"
              ? "bg-neutral-800 text-white border border-neutral-700 shadow-lg"
              : "text-neutral-400 hover:text-white hover:bg-neutral-800/40"
          }`}
        >
          <ShieldCheck className="size-4 text-red-500" />
          <span>Process</span>
        </button>
      </div>

      {/* Tab Panel Body */}
      <div className="dark-glass-panel p-6 sm:p-8 border border-neutral-800 bg-neutral-900 rounded-3xl min-h-[480px] shadow-2xl">
        {/* TAB 1: OFFICES */}
        {activeTab === "offices" && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 border-b border-neutral-800 pb-5">
              <div className="grid size-10 place-items-center rounded-xl bg-red-950/60 border border-red-800/80 text-red-500">
                <Globe className="size-5" />
              </div>
              <h3 className="font-display text-xl font-extrabold uppercase tracking-wider text-white">
                Main Office
              </h3>
            </div>

            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-neutral-950/80 border border-neutral-800 flex items-start gap-4">
                <div className="grid size-9 place-items-center rounded-lg bg-red-600/10 text-red-500 shrink-0 mt-0.5">
                  <Mail className="size-4" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-500 block">ADMINISTRATIVE</span>
                  <a href={`mailto:${data.site.email || "hello@ajetan.com"}`} className="text-sm font-semibold text-neutral-200 hover:text-red-400 transition-colors">
                    {data.site.email || "hello@ajetan.com"}
                  </a>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-neutral-950/80 border border-neutral-800 flex items-start gap-4">
                <div className="grid size-9 place-items-center rounded-lg bg-red-600/10 text-red-500 shrink-0 mt-0.5">
                  <Phone className="size-4" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-500 block">DIRECT LINE</span>
                  <a href={`tel:${data.site.phone || "+919876543210"}`} className="text-sm font-semibold text-neutral-200 hover:text-red-400 transition-colors">
                    {data.site.phone || "+91 98765 43210"}
                  </a>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-neutral-950/80 border border-neutral-800 flex items-start gap-4">
                <div className="grid size-9 place-items-center rounded-lg bg-red-600/10 text-red-500 shrink-0 mt-0.5">
                  <MapPin className="size-4" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-500 block">TERRITORY</span>
                  <span className="text-sm font-semibold text-neutral-200">{data.site.location || "India"}</span>
                </div>
              </div>
            </div>

            {/* Stylized Google Map Preview */}
            <div className="relative mt-4 h-48 w-full overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950 group">
              <iframe
                title="Office Location Map"
                src={data.site.mapsUrl && data.site.mapsUrl.includes("embed") ? data.site.mapsUrl : "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3505.0210740924967!2d77.2140!3d28.5355!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjg8NUIzOC40Ik4gNzc8MTInNTAuNCJF!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"}
                className="h-full w-full border-0 opacity-70 grayscale invert transition-all duration-500 group-hover:opacity-90 group-hover:grayscale-0 group-hover:invert-0"
                loading="lazy"
              />
              <div className="absolute top-3 right-3">
                <a
                  href={data.site.mapsUrl || "https://maps.google.com"}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-black/80 backdrop-blur-md px-3 py-1.5 text-[11px] font-mono font-bold text-white border border-neutral-700 hover:border-red-500 transition-colors"
                >
                  Maps <ExternalLink className="size-3 text-red-500" />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: NETWORK */}
        {activeTab === "network" && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 border-b border-neutral-800 pb-5">
              <div className="grid size-10 place-items-center rounded-xl bg-red-950/60 border border-red-800/80 text-red-500">
                <Share2 className="size-5" />
              </div>
              <h3 className="font-display text-xl font-extrabold uppercase tracking-wider text-white">
                Digital Footprint
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-3.5">
              {data.socials.filter((s) => s.visible).map((net) => {
                const NetIcon = getSocialIcon(net.platform);
                const hrefUrl = net.platform.toLowerCase().includes("whatsapp") ? formatWhatsAppUrl(net.url) : net.url;
                return (
                  <a
                    key={net.id}
                    href={hrefUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center gap-3 p-3.5 rounded-2xl bg-neutral-950/80 border border-neutral-800 hover:border-red-600/60 hover:bg-neutral-800/60 transition-all duration-300"
                  >
                    <div className="grid size-9 place-items-center rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-400 group-hover:text-red-500 group-hover:border-red-600/40 transition-colors shrink-0">
                      <NetIcon className="size-4" />
                    </div>
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-300 truncate group-hover:text-white">
                      {net.platform}
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: PROCESS */}
        {activeTab === "process" && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 border-b border-neutral-800 pb-5">
              <div className="grid size-10 place-items-center rounded-xl bg-red-950/60 border border-red-800/80 text-red-500">
                <ShieldCheck className="size-5" />
              </div>
              <h3 className="font-display text-xl font-extrabold uppercase tracking-wider text-white">
                Protocol Expectations
              </h3>
            </div>

            <ul className="space-y-3.5">
              {[
                "30-minute deep dive into your business",
                "Custom growth strategy recommendations",
                "Competitor analysis insights",
                "Clear roadmap with actionable next steps",
                "Zero obligation — just pure value",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-neutral-950/80 border border-neutral-800">
                  <div className="grid size-7 place-items-center rounded-full bg-red-950/60 border border-red-800/80 text-red-500 shrink-0">
                    <CheckCircle2 className="size-4" />
                  </div>
                  <span className="text-sm font-semibold text-neutral-200">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </aside>
  );
}

function Field({
  id,
  label,
  required,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string | undefined;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm font-bold text-neutral-300">
        {label}
        {required && <span className="text-red-500" aria-hidden="true"> *</span>}
      </Label>
      {children}
      {error && (
        <p id={`${id}-error`} className="text-xs font-semibold text-red-500" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}