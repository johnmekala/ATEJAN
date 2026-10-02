import { useState, useRef, useEffect, type ChangeEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  LayoutDashboard,
  FileText,
  Layers,
  Type,
  Briefcase,
  FolderGit2,
  MessageSquareQuote,
  Navigation as NavIcon,
  Contact,
  Image as ImageIcon,
  HelpCircle,
  Search,
  Plus,
  Trash2,
  Edit,
  Save,
  RotateCcw,
  Download,
  Upload,
  Eye,
  CheckCircle2,
  ExternalLink,
  ShieldAlert,
  Sparkles,
  Video,
  Copy,
  Check,
  Globe,
  Settings,
  Lock,
  KeyRound,
  LogOut,
  Menu,
  X,
  Home,
} from "lucide-react";
import { useCMS, type ServiceItem, type ProjectItem, type TestimonialItem, type ClientBrandItem, type FAQItem, type MediaItem, type SocialLink } from "@/context/cms-context";
import { handleFileUpload } from "@/lib/media-upload";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "CMS Admin Panel — AJETAN Digital Growth Systems" },
      { name: "robots", content: "noindex, nofollow" },
    ],
    links: [{ rel: "canonical", href: "/admin" }],
  }),
  component: AdminPage,
});

type TabType =
  | "dashboard"
  | "pages"
  | "sections"
  | "text"
  | "services"
  | "projects"
  | "testimonials"
  | "navigation"
  | "contact"
  | "media"
  | "faqs"
  | "seo"
  | "security";

const PASSCODE_STORAGE_KEY = "AJETAN_CMS_PASSCODE_V1";

function getStoredPasscode(): string {
  if (typeof window !== "undefined") {
    try {
      const saved = localStorage.getItem(PASSCODE_STORAGE_KEY);
      if (saved) return saved;
    } catch (_e) {}
  }
  return "ajetan2026";
}

function AdminPage() {
  const [activeTab, setActiveTab] = useState<TabType>("dashboard");
  const [authorized, setAuthorized] = useState<boolean>(true);
  const [passcode, setPasscode] = useState("");
  const [storedPasscode, setStoredPasscode] = useState<string>(getStoredPasscode);
  const [authError, setAuthError] = useState<string>("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const {
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
  } = useCMS();

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (passcode.trim() === storedPasscode) {
      setAuthorized(true);
      setAuthError("");
    } else {
      setAuthError("Incorrect passcode. Please enter the valid admin passcode.");
    }
  };

  const handleUpdatePasscode = (newPass: string) => {
    setStoredPasscode(newPass);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(PASSCODE_STORAGE_KEY, newPass);
      } catch (_e) {}
    }
  };

  if (!authorized) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-6 text-white font-sans">
        <form onSubmit={handleLogin} className="w-full max-w-md bg-neutral-900 border border-neutral-800 p-8 rounded-3xl shadow-2xl text-center space-y-6">
          <div className="mx-auto size-16 rounded-2xl bg-red-950/60 border border-red-800/80 grid place-items-center text-red-500">
            <Lock className="size-8" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold uppercase font-display">AJETAN CMS Access</h1>
            <p className="text-sm text-neutral-400 mt-2">Enter admin passcode to unlock workspace</p>
          </div>
          {authError && (
            <div className="p-3 rounded-xl bg-red-950/80 border border-red-800 text-red-400 text-xs font-bold">
              {authError}
            </div>
          )}
          <Input
            type="password"
            placeholder="Enter passcode..."
            value={passcode}
            onChange={(e) => setPasscode(e.target.value)}
            className="bg-neutral-950 border-neutral-800 text-white text-center h-12 rounded-xl font-mono text-base"
          />
          <Button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold h-12 rounded-xl shadow-lg shadow-red-600/25"
          >
            Access Admin Dashboard
          </Button>
        </form>
      </div>
    );
  }

  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Close sidebar on route change / tab change on mobile
  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    setSidebarOpen(false);
  };

  const navItems = [
    { id: "dashboard",    label: "Dashboard",           icon: LayoutDashboard },
    { id: "pages",        label: "Pages & Hero",         icon: FileText },
    { id: "sections",     label: "Sections",             icon: Layers },
    { id: "text",         label: "Text",                 icon: Type },
    { id: "services",     label: "Services",             icon: Briefcase,          count: data.services.length },
    { id: "projects",     label: "Projects",             icon: FolderGit2,         count: data.projects.length },
    { id: "testimonials", label: "Testimonials",         icon: MessageSquareQuote },
    { id: "navigation",   label: "Header & Footer",      icon: NavIcon },
    { id: "contact",      label: "Contact & Socials",    icon: Contact },
    { id: "media",        label: "Media Library",        icon: ImageIcon,          count: data.mediaLibrary.length },
    { id: "faqs",         label: "FAQs",                 icon: HelpCircle,         count: data.faqs.length },
    { id: "seo",          label: "SEO & Meta",           icon: Globe },
    { id: "security",     label: "Security",             icon: KeyRound },
  ] as const;

  // Bottom nav quick-access items (most used)
  const bottomNavItems = [
    { id: "dashboard",  label: "Home",     icon: LayoutDashboard },
    { id: "pages",      label: "Pages",    icon: FileText },
    { id: "services",   label: "Services", icon: Briefcase },
    { id: "media",      label: "Media",    icon: ImageIcon },
    { id: "security",   label: "Security", icon: KeyRound },
  ] as const;

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col font-sans">

      {/* ── TOP HEADER ─────────────────────────────────── */}
      <header className="h-14 sm:h-16 border-b border-neutral-800 bg-neutral-900/95 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between sticky top-0 z-50">
        {/* Left: Hamburger (mobile) + Logo */}
        <div className="flex items-center gap-3">
          {/* Hamburger — only on mobile */}
          <button
            className="lg:hidden grid place-items-center size-9 rounded-xl bg-neutral-800 border border-neutral-700 text-white hover:bg-neutral-700 transition-colors"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open navigation"
          >
            <Menu className="size-5" />
          </button>

          <Link to="/" className="flex items-center gap-2">
            <img src="/favicon.png" alt="AJETAN" className="size-7 rounded-lg" />
            <span className="font-extrabold tracking-wider font-display text-base sm:text-lg hidden xs:block">AJETAN CMS</span>
          </Link>

          <span className="hidden sm:inline-flex px-2.5 py-1 rounded-full bg-red-950/80 border border-red-800/60 text-red-400 text-[10px] font-mono font-bold uppercase tracking-widest">
            LIVE SYNC
          </span>
        </div>

        {/* Right: Action buttons — hidden on small mobile, shown on sm+ */}
        <div className="flex items-center gap-2">
          {/* Export — hidden on mobile, shown on md+ */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const json = exportCMSData();
              const blob = new Blob([json], { type: "application/json" });
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = `ajetan-cms-backup-${Date.now()}.json`;
              a.click();
              triggerToast("CMS Backup Exported!");
            }}
            className="hidden md:inline-flex border-neutral-700 bg-neutral-950 text-xs font-bold text-neutral-300 hover:text-white"
          >
            <Download className="size-3.5 mr-1" /> Export
          </Button>

          {/* Import — hidden on mobile */}
          <label className="hidden md:inline-flex cursor-pointer">
            <input
              type="file" accept=".json" className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = (ev) => {
                    const text = ev.target?.result as string;
                    if (importCMSData(text)) triggerToast("CMS Data Restored!");
                    else triggerToast("Failed to parse CMS JSON.");
                  };
                  reader.readAsText(file);
                }
              }}
            />
            <span className="inline-flex items-center justify-center px-3 py-1.5 rounded-lg border border-neutral-700 bg-neutral-950 text-xs font-bold text-neutral-300 hover:text-white transition-colors">
              <Upload className="size-3.5 mr-1" /> Import
            </span>
          </label>

          {/* Log Out */}
          <Button
            variant="outline" size="sm"
            onClick={() => { setAuthorized(false); setPasscode(""); triggerToast("Logged out."); }}
            className="border-neutral-700 bg-neutral-950 text-xs font-bold text-neutral-300 hover:text-white"
          >
            <LogOut className="size-3.5 sm:mr-1.5" />
            <span className="hidden sm:inline">Log Out</span>
          </Button>

          {/* View site */}
          <Link
            to="/" target="_blank"
            className="inline-flex items-center gap-1.5 rounded-lg bg-red-600 px-2.5 sm:px-3.5 py-1.5 text-xs font-bold text-white hover:bg-red-700 shadow-md shadow-red-600/20"
          >
            <ExternalLink className="size-3.5" />
            <span className="hidden sm:inline">Live Site</span>
          </Link>
        </div>
      </header>

      {/* ── MOBILE SIDEBAR DRAWER OVERLAY ──────────────── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-[200] lg:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

          {/* Drawer panel */}
          <div
            className="absolute left-0 top-0 bottom-0 w-72 bg-neutral-900 border-r border-neutral-800 flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer header */}
            <div className="h-14 border-b border-neutral-800 px-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img src="/favicon.png" alt="AJETAN" className="size-6 rounded-md" />
                <span className="font-extrabold text-sm font-display">AJETAN CMS</span>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="grid place-items-center size-8 rounded-lg bg-neutral-800 text-neutral-400 hover:text-white"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Nav items */}
            <nav className="flex-1 overflow-y-auto p-3 space-y-1">
              <p className="px-3 py-2 text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-500">Navigation</p>
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleTabChange(item.id as TabType)}
                    className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-bold transition-all ${
                      isActive
                        ? "bg-red-600 text-white shadow-lg shadow-red-600/25"
                        : "text-neutral-400 hover:text-white hover:bg-neutral-800/60"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="size-4" />
                      <span>{item.label}</span>
                    </div>
                    {"count" in item && item.count !== undefined && (
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                        isActive ? "bg-white/20 text-white" : "bg-neutral-800 text-neutral-400"
                      }`}>{item.count}</span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Drawer footer actions */}
            <div className="border-t border-neutral-800 p-3 space-y-2">
              <label className="flex items-center gap-2 w-full px-3 py-2.5 rounded-xl border border-neutral-700 bg-neutral-950 text-xs font-bold text-neutral-300 hover:text-white cursor-pointer">
                <Upload className="size-4" /> Import JSON backup
                <input type="file" accept=".json" className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (ev) => {
                        const text = ev.target?.result as string;
                        if (importCMSData(text)) triggerToast("CMS Data Restored!");
                        else triggerToast("Failed to parse CMS JSON.");
                      };
                      reader.readAsText(file);
                    }
                    setSidebarOpen(false);
                  }}
                />
              </label>
              <button
                onClick={() => {
                  const json = exportCMSData();
                  const blob = new Blob([json], { type: "application/json" });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = `ajetan-cms-backup-${Date.now()}.json`;
                  a.click();
                  triggerToast("CMS Backup Exported!");
                  setSidebarOpen(false);
                }}
                className="flex items-center gap-2 w-full px-3 py-2.5 rounded-xl border border-neutral-700 bg-neutral-950 text-xs font-bold text-neutral-300 hover:text-white"
              >
                <Download className="size-4" /> Export JSON backup
              </button>
              <button
                onClick={() => {
                  if (window.confirm("Reset all CMS content to defaults?")) {
                    resetToDefaultCMS();
                    triggerToast("Reset to default settings.");
                  }
                  setSidebarOpen(false);
                }}
                className="flex items-center gap-2 w-full px-3 py-2.5 rounded-xl border border-red-900/60 bg-red-950/30 text-xs font-bold text-red-400 hover:bg-red-900/50"
              >
                <RotateCcw className="size-4" /> Reset to Defaults
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── MAIN CONTENT LAYOUT ─────────────────────────── */}
      <div className="flex-1 flex overflow-hidden">

        {/* Desktop Sidebar — hidden on mobile (lg:flex) */}
        <aside className="hidden lg:flex lg:w-64 border-r border-neutral-800 bg-neutral-900/50 flex-col p-4 space-y-1 overflow-y-auto">
          <div className="px-3 py-2 text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-500">
            ADMIN NAVIGATION
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as TabType)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? "bg-red-600 text-white shadow-lg shadow-red-600/25"
                    : "text-neutral-400 hover:text-white hover:bg-neutral-800/60"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="size-4" />
                  <span>{item.label}</span>
                </div>
                {"count" in item && item.count !== undefined && (
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                    isActive ? "bg-white/20 text-white" : "bg-neutral-800 text-neutral-400"
                  }`}>{item.count}</span>
                )}
              </button>
            );
          })}
        </aside>

        {/* Main workspace */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-neutral-950 pb-24 lg:pb-8">
          {activeTab === "dashboard" && <DashboardOverview data={data} setActiveTab={setActiveTab} />}
          {activeTab === "pages" && <PagesManager data={data} updatePageContent={updatePageContent} updateSEO={updateSEO} triggerToast={triggerToast} />}
          {activeTab === "sections" && <SectionsManager data={data} toggleSectionVisibility={toggleSectionVisibility} triggerToast={triggerToast} />}
          {activeTab === "text" && <TextElementsManager data={data} updateCustomText={updateCustomText} updateSiteInfo={updateSiteInfo} triggerToast={triggerToast} />}
          {activeTab === "services" && <ServicesManager services={data.services} updateService={updateService} addService={addService} deleteService={deleteService} triggerToast={triggerToast} />}
          {activeTab === "projects" && <ProjectsManager projects={data.projects} updateProject={updateProject} addProject={addProject} deleteProject={deleteProject} triggerToast={triggerToast} />}
          {activeTab === "testimonials" && <TestimonialsManager testimonials={data.testimonials} clientBrands={data.clientBrands} updateTestimonial={updateTestimonial} addTestimonial={addTestimonial} deleteTestimonial={deleteTestimonial} updateClientBrand={updateClientBrand} addClientBrand={addClientBrand} deleteClientBrand={deleteClientBrand} triggerToast={triggerToast} />}
          {activeTab === "navigation" && <NavigationFooterManager data={data} updateNavigation={updateNavigation} updateSiteInfo={updateSiteInfo} triggerToast={triggerToast} />}
          {activeTab === "contact" && (
            <ContactSocialsManager
              data={data}
              updateSiteInfo={updateSiteInfo}
              updateSocialLink={updateSocialLink}
              addSocialLink={addSocialLink}
              deleteSocialLink={deleteSocialLink}
              triggerToast={triggerToast}
            />
          )}
          {activeTab === "media" && <MediaLibraryManager mediaLibrary={data.mediaLibrary} addMediaItem={addMediaItem} deleteMediaItem={deleteMediaItem} triggerToast={triggerToast} />}
          {activeTab === "faqs" && <FAQsManager faqs={data.faqs} updateFAQ={updateFAQ} addFAQ={addFAQ} deleteFAQ={deleteFAQ} triggerToast={triggerToast} />}
          {activeTab === "seo" && <SEOManager seo={data.seo} updateSEO={updateSEO} triggerToast={triggerToast} />}
          {activeTab === "security" && (
            <SecurityManager
              currentPasscode={storedPasscode}
              onUpdatePasscode={handleUpdatePasscode}
              onLogout={() => { setAuthorized(false); setPasscode(""); triggerToast("Logged out."); }}
              triggerToast={triggerToast}
            />
          )}
        </main>
      </div>

      {/* ── MOBILE BOTTOM NAV BAR ── visible on mobile only ── */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-neutral-900/95 backdrop-blur-md border-t border-neutral-800 flex items-stretch">
        {bottomNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleTabChange(item.id as TabType)}
              className={`flex-1 flex flex-col items-center justify-center gap-1 py-2.5 transition-all ${
                isActive
                  ? "text-red-500 bg-red-950/30 border-t-2 border-red-500"
                  : "text-neutral-500 hover:text-neutral-300 border-t-2 border-transparent"
              }`}
            >
              <Icon className="size-5" />
              <span className="text-[9px] font-bold uppercase tracking-wider">{item.label}</span>
            </button>
          );
        })}
        {/* "More" button opens drawer */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="flex-1 flex flex-col items-center justify-center gap-1 py-2.5 text-neutral-500 hover:text-neutral-300 border-t-2 border-transparent transition-all"
        >
          <Menu className="size-5" />
          <span className="text-[9px] font-bold uppercase tracking-wider">More</span>
        </button>
      </nav>

      {/* ── GLOBAL TOAST ─────────────────────────────────── */}
      {toastMessage && (
        <div className="fixed bottom-20 lg:bottom-6 right-4 lg:right-6 z-50 flex items-center gap-2 rounded-xl bg-red-600 px-4 py-3 text-xs font-bold text-white shadow-2xl">
          <CheckCircle2 className="size-4" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}

// --- MODULE 1: Dashboard Overview ---

function DashboardOverview({ data, setActiveTab }: { data: any; setActiveTab: (tab: TabType) => void }) {
  return (
    <div className="space-y-8 max-w-6xl">
      <div>
        <h1 className="font-display text-3xl font-extrabold uppercase text-white">System Overview</h1>
        <p className="text-sm text-neutral-400 mt-1">
          Complete website CMS management hub for AJETAN Digital Growth Systems.
        </p>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: "Active Services", count: data.services.length, tab: "services", color: "text-red-500" },
          { title: "Projects & Portfolio", count: data.projects.length, tab: "projects", color: "text-red-400" },
          { title: "Testimonials & Reviews", count: data.testimonials.length, tab: "testimonials", color: "text-neutral-200" },
          { title: "Media Library Assets", count: data.mediaLibrary.length, tab: "media", color: "text-neutral-300" },
        ].map((card, i) => (
          <button
            key={i}
            onClick={() => setActiveTab(card.tab as TabType)}
            className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 text-left hover:border-red-600/60 transition-all duration-300 group"
          >
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-500 block">
              {card.title}
            </span>
            <span className={`text-4xl font-extrabold font-display mt-2 block ${card.color}`}>
              {card.count}
            </span>
            <span className="text-[11px] text-red-500 font-bold mt-4 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              Manage Items →
            </span>
          </button>
        ))}
      </div>

      {/* Quick Action Shortcuts */}
      <div className="p-8 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-4">
        <h2 className="font-display text-xl font-extrabold uppercase text-white">Quick Content Controls</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Button
            onClick={() => setActiveTab("pages")}
            className="h-14 justify-start rounded-2xl bg-neutral-950 border border-neutral-800 text-white hover:border-red-600 px-5"
          >
            <FileText className="size-5 text-red-500 mr-3" />
            <div className="text-left">
              <div className="text-xs font-bold">Edit Hero & Page Content</div>
              <div className="text-[10px] text-neutral-400">Home, About, Services, Portfolio, Contact</div>
            </div>
          </Button>

          <Button
            onClick={() => setActiveTab("contact")}
            className="h-14 justify-start rounded-2xl bg-neutral-950 border border-neutral-800 text-white hover:border-red-600 px-5"
          >
            <Contact className="size-5 text-red-500 mr-3" />
            <div className="text-left">
              <div className="text-xs font-bold">Edit Contact & Socials</div>
              <div className="text-[10px] text-neutral-400">Email, Phone, Territory, Links</div>
            </div>
          </Button>

          <Button
            onClick={() => setActiveTab("media")}
            className="h-14 justify-start rounded-2xl bg-neutral-950 border border-neutral-800 text-white hover:border-red-600 px-5"
          >
            <ImageIcon className="size-5 text-red-500 mr-3" />
            <div className="text-left">
              <div className="text-xs font-bold">Upload Images & Media</div>
              <div className="text-[10px] text-neutral-400">Manage site-wide media library</div>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
}

// --- MODULE 2: Pages & Hero Manager ---

function PagesManager({
  data,
  updatePageContent,
  updateSEO,
  triggerToast,
}: {
  data: any;
  updatePageContent: any;
  updateSEO: any;
  triggerToast: any;
}) {
  const [selectedPage, setSelectedPage] = useState<string>("home");
  const page = data.pages[selectedPage] || {};

  const handleChange = (key: string, val: string) => {
    updatePageContent(selectedPage, { [key]: val });
  };

  const handleSave = () => {
    triggerToast(`Saved changes for ${selectedPage.toUpperCase()} page!`);
  };

  return (
    <div className="space-y-8 max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-extrabold uppercase text-white">Pages & Hero Manager</h1>
          <p className="text-sm text-neutral-400 mt-1">Edit page titles, hero text, images, videos, and CTAs.</p>
        </div>
        <Button
          onClick={handleSave}
          className="bg-red-600 hover:bg-red-700 text-white font-bold h-11 px-6 rounded-xl shadow-lg shadow-red-600/20"
        >
          <Save className="size-4 mr-2" /> Save Changes
        </Button>
      </div>

      {/* Page Selector Tabs */}
      <div className="flex gap-2 p-1.5 rounded-2xl bg-neutral-900 border border-neutral-800">
        {["home", "about", "services", "portfolio", "contact"].map((p) => (
          <button
            key={p}
            onClick={() => setSelectedPage(p)}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
              selectedPage === p ? "bg-red-600 text-white shadow-md" : "text-neutral-400 hover:text-white"
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      {/* Page Content Form Fields */}
      <div className="p-8 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-6">
        <h2 className="text-lg font-bold text-white uppercase border-b border-neutral-800 pb-4">
          Hero Section Configuration — {selectedPage.toUpperCase()}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-neutral-300">Hero Eyebrow Label</label>
            <Input
              value={page.heroEyebrow || ""}
              onChange={(e) => handleChange("heroEyebrow", e.target.value)}
              className="bg-neutral-950 border-neutral-800 text-white"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-neutral-300">Hero Main Title</label>
            <Input
              value={page.heroTitle || ""}
              onChange={(e) => handleChange("heroTitle", e.target.value)}
              className="bg-neutral-950 border-neutral-800 text-white"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-neutral-300">Hero Title Accent / Highlight</label>
            <Input
              value={page.heroTitleAccent || ""}
              onChange={(e) => handleChange("heroTitleAccent", e.target.value)}
              className="bg-neutral-950 border-neutral-800 text-white"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-neutral-300">Primary CTA Text</label>
            <Input
              value={page.primaryCtaText || ""}
              onChange={(e) => handleChange("primaryCtaText", e.target.value)}
              className="bg-neutral-950 border-neutral-800 text-white"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-neutral-300">Primary CTA Link URL</label>
            <Input
              value={page.primaryCtaLink || ""}
              onChange={(e) => handleChange("primaryCtaLink", e.target.value)}
              className="bg-neutral-950 border-neutral-800 text-white"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-neutral-300">Secondary CTA Text</label>
            <Input
              value={page.secondaryCtaText || ""}
              onChange={(e) => handleChange("secondaryCtaText", e.target.value)}
              className="bg-neutral-950 border-neutral-800 text-white"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-neutral-300">Hero Description Copy</label>
          <Textarea
            rows={3}
            value={page.heroCopy || ""}
            onChange={(e) => handleChange("heroCopy", e.target.value)}
            className="bg-neutral-950 border-neutral-800 text-white"
          />
        </div>

        {/* Media Option: Hero Image & Video */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-neutral-800">
          <MediaUploadField
            label="Hero Image URL / Upload"
            value={page.heroImage || ""}
            onChange={(val) => handleChange("heroImage", val)}
          />

          <MediaUploadField
            label="Hero Video URL / Upload"
            value={page.heroVideo || ""}
            onChange={(val) => handleChange("heroVideo", val)}
            isVideo
          />
        </div>

        {/* Bottom Save Changes Button */}
        <div className="flex justify-end pt-6 border-t border-neutral-800">
          <Button
            onClick={handleSave}
            className="bg-red-600 hover:bg-red-700 text-white font-bold h-11 px-8 rounded-xl shadow-lg shadow-red-600/20"
          >
            <Save className="size-4 mr-2" /> Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}

// --- MODULE 3: Section Manager ---

function SectionsManager({ data, toggleSectionVisibility, triggerToast }: { data: any; toggleSectionVisibility: any; triggerToast: any }) {
  const [selectedPage, setSelectedPage] = useState<string>("home");
  const page = data.pages[selectedPage] || {};
  const vis = page.sectionsVisibility || {};

  const handleSave = () => {
    triggerToast(`Saved section visibility changes for ${selectedPage.toUpperCase()} page!`);
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-extrabold uppercase text-white">Section Visibility Manager</h1>
          <p className="text-sm text-neutral-400 mt-1">Enable or disable specific sections per page in real-time.</p>
        </div>
        <Button
          onClick={handleSave}
          className="bg-red-600 hover:bg-red-700 text-white font-bold h-11 px-6 rounded-xl shadow-lg shadow-red-600/20"
        >
          <Save className="size-4 mr-2" /> Save Changes
        </Button>
      </div>

      <div className="flex gap-2 p-1.5 rounded-2xl bg-neutral-900 border border-neutral-800">
        {["home", "about", "services", "portfolio", "contact"].map((p) => (
          <button
            key={p}
            onClick={() => setSelectedPage(p)}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
              selectedPage === p ? "bg-red-600 text-white shadow-md" : "text-neutral-400 hover:text-white"
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      <div className="p-8 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-4">
        <h2 className="text-lg font-bold text-white uppercase mb-4">
          Visible Sections — {selectedPage.toUpperCase()} Page
        </h2>

        {Object.keys(vis).length === 0 ? (
          <p className="text-sm text-neutral-500">All standard sections active for this page.</p>
        ) : (
          Object.entries(vis).map(([sectionKey, isVisible]) => (
            <div
              key={sectionKey}
              className="flex items-center justify-between p-4 rounded-2xl bg-neutral-950 border border-neutral-800"
            >
              <div>
                <span className="text-sm font-bold text-white capitalize">{sectionKey} Section</span>
                <span className="text-xs text-neutral-500 block">Controls rendering of the {sectionKey} component</span>
              </div>
              <Button
                size="sm"
                onClick={() => {
                  toggleSectionVisibility(selectedPage, sectionKey);
                  triggerToast(`Updated visibility for ${sectionKey} section.`);
                }}
                className={isVisible ? "bg-green-600 hover:bg-green-700 text-white font-bold" : "bg-neutral-800 text-neutral-400 font-bold"}
              >
                {isVisible ? "Active" : "Hidden"}
              </Button>
            </div>
          ))
        )}

        <div className="flex justify-end pt-6 border-t border-neutral-800 mt-6">
          <Button
            onClick={handleSave}
            className="bg-red-600 hover:bg-red-700 text-white font-bold h-11 px-8 rounded-xl shadow-lg shadow-red-600/20"
          >
            <Save className="size-4 mr-2" /> Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}

// --- MODULE 4: Text Elements Manager ---

function TextElementsManager({
  data,
  updateCustomText,
  updateSiteInfo,
  triggerToast,
}: {
  data: any;
  updateCustomText: any;
  updateSiteInfo: any;
  triggerToast: any;
}) {
  const [query, setQuery] = useState("");

  const handleSave = () => {
    triggerToast("Saved text & content changes successfully!");
  };

  return (
    <div className="space-y-8 max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-extrabold uppercase text-white">Text & Content Elements</h1>
          <p className="text-sm text-neutral-400 mt-1">Granular CMS editing for headings, subheadings, labels, and badges.</p>
        </div>
        <Button
          onClick={handleSave}
          className="bg-red-600 hover:bg-red-700 text-white font-bold h-11 px-6 rounded-xl shadow-lg shadow-red-600/20"
        >
          <Save className="size-4 mr-2" /> Save Changes
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-3.5 size-5 text-neutral-500" />
        <Input
          placeholder="Filter text elements..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-12 h-12 bg-neutral-900 border-neutral-800 text-white rounded-2xl"
        />
      </div>

      <div className="p-8 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-6">
        <h2 className="text-lg font-bold text-white uppercase border-b border-neutral-800 pb-4">
          Global Brand & Footer Texts
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-neutral-300">Brand Name</label>
            <Input
              value={data.site.name}
              onChange={(e) => updateSiteInfo({ name: e.target.value })}
              className="bg-neutral-950 border-neutral-800 text-white"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-neutral-300">Brand Strapline</label>
            <Input
              value={data.site.strapline}
              onChange={(e) => updateSiteInfo({ strapline: e.target.value })}
              className="bg-neutral-950 border-neutral-800 text-white"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-neutral-300">Footer Description Text</label>
          <Textarea
            rows={2}
            value={data.site.footerText}
            onChange={(e) => updateSiteInfo({ footerText: e.target.value })}
            className="bg-neutral-950 border-neutral-800 text-white"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-neutral-300">Footer Copyright Text</label>
          <Input
            value={data.site.copyright}
            onChange={(e) => updateSiteInfo({ copyright: e.target.value })}
            className="bg-neutral-950 border-neutral-800 text-white"
          />
        </div>

        <div className="flex justify-end pt-6 border-t border-neutral-800">
          <Button
            onClick={handleSave}
            className="bg-red-600 hover:bg-red-700 text-white font-bold h-11 px-8 rounded-xl shadow-lg shadow-red-600/20"
          >
            <Save className="size-4 mr-2" /> Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}

// --- MODULE 5: Services Manager ---

function ServicesManager({
  services,
  updateService,
  addService,
  deleteService,
  triggerToast,
}: {
  services: ServiceItem[];
  updateService: any;
  addService: any;
  deleteService: any;
  triggerToast: any;
}) {
  const [editing, setEditing] = useState<ServiceItem | null>(null);

  const handleSave = () => {
    triggerToast("Saved services changes successfully!");
  };

  return (
    <div className="space-y-8 max-w-6xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-extrabold uppercase text-white">Services CMS Manager</h1>
          <p className="text-sm text-neutral-400 mt-1">Add, edit, reorder, or toggle website service offerings.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            onClick={() => {
              const newSlug = `service-${Date.now()}`;
              const newItem: ServiceItem = {
                slug: newSlug,
                title: "New Custom Service",
                shortTitle: "New Service",
                summary: "High-performance service offering.",
                detail: "Detailed operational capability description.",
                image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1200&auto=format&fit=crop",
                iconName: "CodeXml",
                problems: ["Initial Problem 1"],
                deliverables: ["Initial Deliverable 1"],
                technologies: ["Tech 1", "Tech 2"],
                visible: true,
                order: services.length + 1,
              };
              addService(newItem);
              setEditing(newItem);
              triggerToast("Created new service item!");
            }}
            variant="outline"
            className="border-neutral-700 bg-neutral-900 text-white font-bold h-11 px-5 rounded-xl"
          >
            <Plus className="size-4 mr-2" /> Add New Service
          </Button>

          <Button
            onClick={handleSave}
            className="bg-red-600 hover:bg-red-700 text-white font-bold h-11 px-6 rounded-xl shadow-lg shadow-red-600/20"
          >
            <Save className="size-4 mr-2" /> Save Changes
          </Button>
        </div>
      </div>

      {/* Services List Table */}
      <div className="space-y-4">
        {services.map((item) => (
          <div
            key={item.slug}
            className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
          >
            <div className="flex items-center gap-4">
              <img src={item.image} alt={item.title} className="size-16 rounded-2xl object-cover border border-neutral-800" />
              <div>
                <h3 className="text-lg font-bold text-white">{item.title}</h3>
                <span className="text-xs font-mono text-neutral-500">/{item.slug}</span>
                <p className="text-xs text-neutral-400 mt-1 line-clamp-1">{item.summary}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setEditing(item)}
                className="border-neutral-700 bg-neutral-950 text-xs font-bold text-white"
              >
                <Edit className="size-3.5 mr-1.5" /> Edit Service
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  if (window.confirm(`Delete service "${item.title}"?`)) {
                    deleteService(item.slug);
                    triggerToast(`Deleted service ${item.title}`);
                  }
                }}
                className="border-red-900/60 bg-red-950/40 text-xs font-bold text-red-400 hover:bg-red-900"
              >
                <Trash2 className="size-3.5" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end pt-4">
        <Button
          onClick={handleSave}
          className="bg-red-600 hover:bg-red-700 text-white font-bold h-11 px-8 rounded-xl shadow-lg shadow-red-600/20"
        >
          <Save className="size-4 mr-2" /> Save Changes
        </Button>
      </div>

      {/* Edit Modal Dialog */}
      {editing && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6 overflow-y-auto">
          <div className="w-full max-w-2xl bg-neutral-900 border border-neutral-800 p-8 rounded-3xl shadow-2xl space-y-6 my-8">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
              <h2 className="text-xl font-bold font-display uppercase text-white">Edit Service: {editing.title}</h2>
              <button onClick={() => setEditing(null)} className="text-neutral-400 hover:text-white text-sm font-bold">
                ✕ Close
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-neutral-300">Service Title</label>
                  <Input
                    value={editing.title}
                    onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                    className="bg-neutral-950 border-neutral-800 text-white mt-1"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-neutral-300">Short Title</label>
                  <Input
                    value={editing.shortTitle}
                    onChange={(e) => setEditing({ ...editing, shortTitle: e.target.value })}
                    className="bg-neutral-950 border-neutral-800 text-white mt-1"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-neutral-300">Summary</label>
                <Input
                  value={editing.summary}
                  onChange={(e) => setEditing({ ...editing, summary: e.target.value })}
                  className="bg-neutral-950 border-neutral-800 text-white mt-1"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-neutral-300">Detailed Description</label>
                <Textarea
                  rows={3}
                  value={editing.detail}
                  onChange={(e) => setEditing({ ...editing, detail: e.target.value })}
                  className="bg-neutral-950 border-neutral-800 text-white mt-1"
                />
              </div>

              <MediaUploadField
                label="Service Image URL / Upload"
                value={editing.image}
                onChange={(val) => setEditing({ ...editing, image: val })}
              />
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-neutral-800">
              <Button variant="outline" onClick={() => setEditing(null)} className="border-neutral-700 bg-neutral-950 text-white">
                Cancel
              </Button>
              <Button
                onClick={() => {
                  updateService(editing);
                  setEditing(null);
                  triggerToast(`Updated service ${editing.title}!`);
                }}
                className="bg-red-600 hover:bg-red-700 text-white font-bold"
              >
                Save Service
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// --- MODULE 6: Projects Manager ---

function ProjectsManager({
  projects,
  updateProject,
  addProject,
  deleteProject,
  triggerToast,
}: {
  projects: ProjectItem[];
  updateProject: any;
  addProject: any;
  deleteProject: any;
  triggerToast: any;
}) {
  const [editing, setEditing] = useState<ProjectItem | null>(null);

  const handleSave = () => {
    triggerToast("Saved portfolio projects changes successfully!");
  };

  return (
    <div className="space-y-8 max-w-6xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-extrabold uppercase text-white">Portfolio Projects Manager</h1>
          <p className="text-sm text-neutral-400 mt-1">Add, edit, duplicate, and toggle portfolio case studies.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            onClick={() => {
              const newSlug = `project-${Date.now()}`;
              const newItem: ProjectItem = {
                slug: newSlug,
                title: "New Client Project Concept",
                category: "Websites",
                summary: "Editorial digital experience and custom system architecture.",
                image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
                videoUrl: "",
                technologies: ["React", "Experience Design"],
                challenge: "Detailed project challenge statement.",
                approach: "Strategic approach and decision framework.",
                solution: "Engineering solution and system delivery.",
                result: "Verified client outcomes and ROI metrics.",
                featured: true,
                visible: true,
                order: projects.length + 1,
              };
              addProject(newItem);
              setEditing(newItem);
              triggerToast("Added new project item!");
            }}
            variant="outline"
            className="border-neutral-700 bg-neutral-900 text-white font-bold h-11 px-5 rounded-xl"
          >
            <Plus className="size-4 mr-2" /> Add New Project
          </Button>

          <Button
            onClick={handleSave}
            className="bg-red-600 hover:bg-red-700 text-white font-bold h-11 px-6 rounded-xl shadow-lg shadow-red-600/20"
          >
            <Save className="size-4 mr-2" /> Save Changes
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((item) => (
          <div key={item.slug} className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-4">
            <img src={item.image} alt={item.title} className="h-44 w-full rounded-2xl object-cover border border-neutral-800" />
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-red-500">{item.category}</span>
                <span className="text-[10px] font-mono font-bold text-neutral-500">/{item.slug}</span>
              </div>
              <h3 className="text-lg font-bold text-white mt-1">{item.title}</h3>
              <p className="text-xs text-neutral-400 mt-1 line-clamp-2">{item.summary}</p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-neutral-800/80">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setEditing(item)}
                className="border-neutral-700 bg-neutral-950 text-xs font-bold text-white"
              >
                <Edit className="size-3.5 mr-1.5" /> Edit Project
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  if (window.confirm(`Delete project "${item.title}"?`)) {
                    deleteProject(item.slug);
                    triggerToast(`Deleted project ${item.title}`);
                  }
                }}
                className="border-red-900/60 bg-red-950/40 text-xs font-bold text-red-400 hover:bg-red-900"
              >
                <Trash2 className="size-3.5" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end pt-4">
        <Button
          onClick={handleSave}
          className="bg-red-600 hover:bg-red-700 text-white font-bold h-11 px-8 rounded-xl shadow-lg shadow-red-600/20"
        >
          <Save className="size-4 mr-2" /> Save Changes
        </Button>
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6 overflow-y-auto">
          <div className="w-full max-w-3xl bg-neutral-900 border border-neutral-800 p-8 rounded-3xl shadow-2xl space-y-6 my-8">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
              <h2 className="text-xl font-bold font-display uppercase text-white">Edit Project: {editing.title}</h2>
              <button onClick={() => setEditing(null)} className="text-neutral-400 hover:text-white text-sm font-bold">
                ✕ Close
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-neutral-300">Project Title</label>
                  <Input
                    value={editing.title}
                    onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                    className="bg-neutral-950 border-neutral-800 text-white mt-1"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-neutral-300">Category</label>
                  <Input
                    value={editing.category}
                    onChange={(e) => setEditing({ ...editing, category: e.target.value as any })}
                    className="bg-neutral-950 border-neutral-800 text-white mt-1"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-neutral-300">Summary</label>
                <Input
                  value={editing.summary}
                  onChange={(e) => setEditing({ ...editing, summary: e.target.value })}
                  className="bg-neutral-950 border-neutral-800 text-white mt-1"
                />
              </div>

              <MediaUploadField
                label="Project Image URL / Upload"
                value={editing.image}
                onChange={(val) => setEditing({ ...editing, image: val })}
              />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-neutral-300">Challenge</label>
                  <Textarea
                    rows={2}
                    value={editing.challenge}
                    onChange={(e) => setEditing({ ...editing, challenge: e.target.value })}
                    className="bg-neutral-950 border-neutral-800 text-white mt-1"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-neutral-300">Solution</label>
                  <Textarea
                    rows={2}
                    value={editing.solution}
                    onChange={(e) => setEditing({ ...editing, solution: e.target.value })}
                    className="bg-neutral-950 border-neutral-800 text-white mt-1"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-neutral-800">
              <Button variant="outline" onClick={() => setEditing(null)} className="border-neutral-700 bg-neutral-950 text-white">
                Cancel
              </Button>
              <Button
                onClick={() => {
                  updateProject(editing);
                  setEditing(null);
                  triggerToast(`Updated project ${editing.title}!`);
                }}
                className="bg-red-600 hover:bg-red-700 text-white font-bold"
              >
                Save Project
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// --- MODULE 7: Testimonials & Brands Manager ---

function TestimonialsManager({
  testimonials,
  clientBrands,
  updateTestimonial,
  addTestimonial,
  deleteTestimonial,
  updateClientBrand,
  addClientBrand,
  deleteClientBrand,
  triggerToast,
}: any) {
  const handleSave = () => {
    triggerToast("Saved testimonials & client brands successfully!");
  };

  return (
    <div className="space-y-12 max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-extrabold uppercase text-white">Testimonials & Visionary Brands</h1>
          <p className="text-sm text-neutral-400 mt-1">Manage client validation quotes and auto-scrolling brand marquee logos.</p>
        </div>
        <Button
          onClick={handleSave}
          className="bg-red-600 hover:bg-red-700 text-white font-bold h-11 px-6 rounded-xl shadow-lg shadow-red-600/20"
        >
          <Save className="size-4 mr-2" /> Save Changes
        </Button>
      </div>

      {/* Testimonials List */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
          <h2 className="text-xl font-bold font-display uppercase text-white">Client Validation Testimonials</h2>
          <Button
            onClick={() => {
              const newItem: TestimonialItem = {
                id: `t-${Date.now()}`,
                name: "Client Executive",
                role: "Managing Director",
                company: "Enterprise Partner",
                quote: "AJETAN transformed our operational velocity.",
                rating: 5,
                avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
                visible: true,
                order: testimonials.length + 1,
              };
              addTestimonial(newItem);
              triggerToast("Added new testimonial quote!");
            }}
            variant="outline"
            className="border-neutral-700 bg-neutral-900 text-white font-bold h-10 px-4 rounded-xl"
          >
            <Plus className="size-4 mr-2" /> Add Testimonial
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {testimonials.map((t: TestimonialItem) => (
            <div key={t.id} className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-4">
              <p className="text-sm italic text-neutral-300">"{t.quote}"</p>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm font-bold text-white block">{t.name}</span>
                  <span className="text-xs text-neutral-500 block">{t.role}, {t.company}</span>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    deleteTestimonial(t.id);
                    triggerToast("Deleted testimonial quote.");
                  }}
                  className="border-red-900/60 bg-red-950/40 text-red-400"
                >
                  <Trash2 className="size-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end pt-4 border-t border-neutral-800">
          <Button
            onClick={handleSave}
            className="bg-red-600 hover:bg-red-700 text-white font-bold h-11 px-8 rounded-xl shadow-lg shadow-red-600/20"
          >
            <Save className="size-4 mr-2" /> Save Changes
          </Button>
        </div>
      </div>

      {/* 2. OUR CLIENTELE / TRUSTED BY VISIONARY BRANDS MARQUEE MANAGER */}
      <div className="space-y-6 pt-10 border-t border-neutral-800">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-neutral-800 pb-4">
          <div>
            <h2 className="text-xl font-bold font-display uppercase text-white flex items-center gap-2">
              <span className="size-2 rounded-full bg-red-600 inline-block" />
              Our Clientele — Visionary Brands
            </h2>
            <p className="text-xs text-neutral-400 mt-0.5">
              Add, edit, or remove client brand logos, titles, and taglines displayed in the auto-scrolling clientele marquee on the Portfolio page.
            </p>
          </div>
          <Button
            onClick={() => {
              const newBrand: ClientBrandItem = {
                id: `b-${Date.now()}`,
                name: "NEW VISIONARY BRAND",
                category: "INDUSTRY & TAGLINE",
                logo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=400&auto=format&fit=crop",
                visible: true,
                order: (clientBrands?.length || 0) + 1,
              };
              addClientBrand(newBrand);
              triggerToast("Added new visionary brand!");
            }}
            variant="outline"
            className="border-neutral-700 bg-neutral-900 text-white font-bold h-10 px-4 rounded-xl"
          >
            <Plus className="size-4 mr-2" /> Add Client Brand
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {(clientBrands || []).map((brand: ClientBrandItem) => (
            <div
              key={brand.id}
              className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-4 shadow-xl"
            >
              <div className="flex items-center justify-between border-b border-neutral-800/80 pb-3">
                <div className="flex items-center gap-3">
                  <div className="size-12 rounded-2xl overflow-hidden border border-neutral-700 bg-neutral-950 shrink-0">
                    <img
                      src={brand.logo || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=400&auto=format&fit=crop"}
                      alt={brand.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-white">{brand.name || "Untitled Brand"}</h3>
                    <span className="text-xs font-mono text-red-500 font-bold uppercase">{brand.category || "No Tagline"}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      updateClientBrand({ ...brand, visible: !brand.visible });
                      triggerToast(brand.visible ? "Hidden brand from website" : "Made brand visible on website");
                    }}
                    className={brand.visible ? "border-emerald-800/60 bg-emerald-950/40 text-emerald-400" : "border-neutral-700 bg-neutral-800 text-neutral-400"}
                  >
                    <Eye className="size-3.5 mr-1" /> {brand.visible ? "Visible" : "Hidden"}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      if (window.confirm(`Delete ${brand.name}?`)) {
                        deleteClientBrand(brand.id);
                        triggerToast("Deleted brand card.");
                      }
                    }}
                    className="border-red-900/60 bg-red-950/40 text-red-400"
                  >
                    <Trash2 className="size-3.5" />
                  </Button>
                </div>
              </div>

              {/* Form Input Controls */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-bold text-neutral-400 block mb-1">Brand Name</label>
                  <Input
                    value={brand.name}
                    onChange={(e) => updateClientBrand({ ...brand, name: e.target.value })}
                    className="h-10 bg-neutral-950 border-neutral-800 text-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-neutral-400 block mb-1">Tagline / Industry</label>
                  <Input
                    value={brand.category}
                    onChange={(e) => updateClientBrand({ ...brand, category: e.target.value })}
                    className="h-10 bg-neutral-950 border-neutral-800 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-neutral-400 block mb-1">Logo / Brand Image URL</label>
                <div className="flex gap-2">
                  <Input
                    value={brand.logo}
                    onChange={(e) => updateClientBrand({ ...brand, logo: e.target.value })}
                    className="h-10 bg-neutral-950 border-neutral-800 text-white flex-1"
                    placeholder="https://images.unsplash.com/..."
                  />
                  <label className="cursor-pointer shrink-0">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          try {
                            triggerToast("Uploading image to Cloudinary...");
                            const uploadedUrl = await uploadToCloudinary(file);
                            updateClientBrand({ ...brand, logo: uploadedUrl });
                            triggerToast("Cloudinary Logo Uploaded Successfully!");
                          } catch (_err) {
                            triggerToast("Failed to upload image to Cloudinary.");
                          }
                        }
                      }}
                    />
                    <span className="inline-flex items-center h-10 px-3 rounded-xl border border-neutral-700 bg-neutral-800 text-xs font-bold text-neutral-200 hover:text-white transition-colors">
                      <Upload className="size-3.5 mr-1" /> Upload Logo
                    </span>
                  </label>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end pt-4 border-t border-neutral-800">
          <Button
            onClick={handleSave}
            className="bg-red-600 hover:bg-red-700 text-white font-bold h-11 px-8 rounded-xl shadow-lg shadow-red-600/20"
          >
            <Save className="size-4 mr-2" /> Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}

// --- MODULE 8: Navigation & Footer Manager ---

function NavigationFooterManager({ data, updateNavigation, updateSiteInfo, triggerToast }: any) {
  const handleSave = () => {
    triggerToast("Saved navigation & footer settings successfully!");
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-extrabold uppercase text-white">Navigation & Footer Manager</h1>
          <p className="text-sm text-neutral-400 mt-1">Manage top navigation links, logo, header CTA, and footer options.</p>
        </div>
        <Button
          onClick={handleSave}
          className="bg-red-600 hover:bg-red-700 text-white font-bold h-11 px-6 rounded-xl shadow-lg shadow-red-600/20"
        >
          <Save className="size-4 mr-2" /> Save Changes
        </Button>
      </div>

      <div className="p-8 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-6">
        <h2 className="text-lg font-bold text-white uppercase border-b border-neutral-800 pb-4">
          Header Action Button (CTA)
        </h2>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-neutral-300">Button Text</label>
            <Input
              value={data.navigation.ctaText}
              onChange={(e) => updateNavigation({ ctaText: e.target.value })}
              className="bg-neutral-950 border-neutral-800 text-white mt-1"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-neutral-300">Button Target URL</label>
            <Input
              value={data.navigation.ctaLink}
              onChange={(e) => updateNavigation({ ctaLink: e.target.value })}
              className="bg-neutral-950 border-neutral-800 text-white mt-1"
            />
          </div>
        </div>

        <div className="flex justify-end pt-6 border-t border-neutral-800">
          <Button
            onClick={handleSave}
            className="bg-red-600 hover:bg-red-700 text-white font-bold h-11 px-8 rounded-xl shadow-lg shadow-red-600/20"
          >
            <Save className="size-4 mr-2" /> Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}

// --- MODULE 9: Contact & Socials Manager ---

function ContactSocialsManager({
  data,
  updateSiteInfo,
  updateSocialLink,
  addSocialLink,
  deleteSocialLink,
  triggerToast,
}: {
  data: any;
  updateSiteInfo: any;
  updateSocialLink: any;
  addSocialLink: any;
  deleteSocialLink: any;
  triggerToast: any;
}) {
  const handleSave = () => {
    triggerToast("Saved contact info, location links & network channels successfully!");
  };

  return (
    <div className="space-y-8 max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-extrabold uppercase text-white">Centralized Contact, Location & Network</h1>
          <p className="text-sm text-neutral-400 mt-1">Updates email, phone, location maps, working hours, and social media network links across the website.</p>
        </div>
        <Button
          onClick={handleSave}
          className="bg-red-600 hover:bg-red-700 text-white font-bold h-11 px-6 rounded-xl shadow-lg shadow-red-600/20"
        >
          <Save className="size-4 mr-2" /> Save Changes
        </Button>
      </div>

      {/* 1. Office Location & Contact Details */}
      <div className="p-8 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-6">
        <h2 className="text-lg font-bold text-white uppercase border-b border-neutral-800 pb-4 flex items-center justify-between">
          <span>Office Location & Contact Details</span>
          <span className="text-xs font-mono text-red-500 font-bold uppercase">OFFICES TAB SOURCE</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-xs font-bold text-neutral-300">Email Address</label>
            <Input
              value={data.site.email || ""}
              onChange={(e) => updateSiteInfo({ email: e.target.value })}
              className="bg-neutral-950 border-neutral-800 text-white mt-1"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-neutral-300">Phone / Direct Line</label>
            <Input
              value={data.site.phone || ""}
              onChange={(e) => updateSiteInfo({ phone: e.target.value })}
              className="bg-neutral-950 border-neutral-800 text-white mt-1"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-neutral-300">WhatsApp Redirection Number</label>
            <Input
              value={data.site.whatsapp || "6301106842"}
              onChange={(e) => {
                const num = e.target.value;
                updateSiteInfo({ whatsapp: num });
                // Also update WhatsApp entry in socials array if present
                const waSocial = data.socials?.find((s: any) => s.platform.toLowerCase().includes("whatsapp"));
                if (waSocial) {
                  updateSocialLink({ ...waSocial, url: num });
                }
              }}
              className="bg-neutral-950 border-neutral-800 text-white font-mono font-bold mt-1"
              placeholder="e.g. 6301106842"
            />
            <span className="text-[11px] text-neutral-500 block mt-1">
              Enter your WhatsApp number (e.g. <code className="text-red-400">6301106842</code>). The system automatically converts it into a working <code className="text-red-400">wa.me</code> WhatsApp link!
            </span>
          </div>

          <div>
            <label className="text-xs font-bold text-neutral-300">Territory / Location Name</label>
            <Input
              value={data.site.location || ""}
              onChange={(e) => updateSiteInfo({ location: e.target.value })}
              className="bg-neutral-950 border-neutral-800 text-white mt-1"
              placeholder="e.g. India, London, New York..."
            />
          </div>

          <div>
            <label className="text-xs font-bold text-neutral-300">Working Hours</label>
            <Input
              value={data.site.hours || ""}
              onChange={(e) => updateSiteInfo({ hours: e.target.value })}
              className="bg-neutral-950 border-neutral-800 text-white mt-1"
            />
          </div>
        </div>

        <div className="space-y-2 pt-2">
          <label className="text-xs font-bold text-neutral-300">Google Maps URL / Embed Link</label>
          <Input
            value={data.site.mapsUrl || ""}
            onChange={(e) => updateSiteInfo({ mapsUrl: e.target.value })}
            className="bg-neutral-950 border-neutral-800 text-white font-mono text-xs"
            placeholder="Paste Google Maps link or Embed URL (e.g. https://maps.google.com)..."
          />
          <span className="text-[11px] text-neutral-500 block">Controls the "Maps" button and map view under Offices tab on the Contact page.</span>
        </div>
      </div>

      {/* 2. Network & Social Links Manager */}
      <div className="p-8 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-6">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
          <div>
            <h2 className="text-lg font-bold text-white uppercase">Network & Social Media Links</h2>
            <p className="text-xs text-neutral-400 mt-0.5">Controls links for Instagram, WhatsApp, Twitter, LinkedIn, Facebook, YouTube, Telegram, etc.</p>
          </div>
          <Button
            onClick={() => {
              const newSocial: SocialLink = {
                id: `s-${Date.now()}`,
                platform: "New Network",
                label: "@handle",
                url: "https://",
                iconName: "Share2",
                visible: true,
              };
              addSocialLink(newSocial);
              triggerToast("Added new network social channel!");
            }}
            variant="outline"
            className="border-neutral-700 bg-neutral-950 text-white font-bold h-10 px-4 rounded-xl text-xs"
          >
            <Plus className="size-4 mr-1.5" /> Add Network Link
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(data.socials || []).map((s: SocialLink) => (
            <div key={s.id} className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-extrabold uppercase text-red-500 tracking-wider">
                  {s.platform}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      updateSocialLink({ ...s, visible: !s.visible });
                      triggerToast(`Toggled ${s.platform} visibility`);
                    }}
                    className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                      s.visible ? "bg-green-950 text-green-400 border border-green-800" : "bg-neutral-800 text-neutral-500"
                    }`}
                  >
                    {s.visible ? "Active" : "Hidden"}
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm(`Delete network link for ${s.platform}?`)) {
                        deleteSocialLink(s.id);
                        triggerToast(`Deleted ${s.platform} link.`);
                      }
                    }}
                    className="text-neutral-500 hover:text-red-400 p-1"
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold text-neutral-400">Platform Name</label>
                  <Input
                    value={s.platform}
                    onChange={(e) => updateSocialLink({ ...s, platform: e.target.value })}
                    className="bg-neutral-900 border-neutral-800 text-white text-xs h-9 mt-0.5 font-bold"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-neutral-400">Label / Handle</label>
                  <Input
                    value={s.label}
                    onChange={(e) => updateSocialLink({ ...s, label: e.target.value })}
                    className="bg-neutral-900 border-neutral-800 text-white text-xs h-9 mt-0.5"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-neutral-400">Target URL</label>
                <Input
                  value={s.url}
                  onChange={(e) => updateSocialLink({ ...s, url: e.target.value })}
                  className="bg-neutral-900 border-neutral-800 text-white font-mono text-xs h-9 mt-0.5"
                  placeholder="https://..."
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end pt-6 border-t border-neutral-800">
          <Button
            onClick={handleSave}
            className="bg-red-600 hover:bg-red-700 text-white font-bold h-11 px-8 rounded-xl shadow-lg shadow-red-600/20"
          >
            <Save className="size-4 mr-2" /> Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}

// --- MODULE 10: Media Library Manager ---

function MediaLibraryManager({ mediaLibrary, addMediaItem, deleteMediaItem, triggerToast }: any) {
  const [urlInput, setUrlInput] = useState("");

  const handleSave = () => {
    triggerToast("Saved media library changes successfully!");
  };

  return (
    <div className="space-y-8 max-w-6xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-extrabold uppercase text-white">Central Media Library</h1>
          <p className="text-sm text-neutral-400 mt-1">Upload images/videos or paste URLs for site-wide media reuse.</p>
        </div>
        <Button
          onClick={handleSave}
          className="bg-red-600 hover:bg-red-700 text-white font-bold h-11 px-6 rounded-xl shadow-lg shadow-red-600/20"
        >
          <Save className="size-4 mr-2" /> Save Changes
        </Button>
      </div>

      <div className="p-8 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-4">
        <h2 className="text-lg font-bold text-white uppercase">Upload or Add Media URL</h2>
        <div className="flex gap-4">
          <Input
            placeholder="Paste image or video URL..."
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            className="flex-1 bg-neutral-950 border-neutral-800 text-white h-12 rounded-xl"
          />
          <Button
            onClick={() => {
              if (urlInput) {
                const newItem: MediaItem = {
                  id: `media-${Date.now()}`,
                  name: "External Asset",
                  url: urlInput,
                  type: urlInput.match(/\.(mp4|webm)$/i) ? "video" : "image",
                  createdAt: new Date().toISOString(),
                };
                addMediaItem(newItem);
                setUrlInput("");
                triggerToast("Added media URL to library!");
              }
            }}
            className="bg-red-600 hover:bg-red-700 text-white font-bold h-12 px-6 rounded-xl"
          >
            Add URL
          </Button>

          <label className="cursor-pointer">
            <input
              type="file"
              accept="image/*,video/*"
              className="hidden"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const item = await handleFileUpload(file);
                  addMediaItem(item);
                  triggerToast(`Uploaded ${file.name} to Media Library!`);
                }
              }}
            />
            <span className="h-12 px-6 rounded-xl bg-neutral-800 border border-neutral-700 text-white font-bold text-xs inline-flex items-center justify-center hover:bg-neutral-700 transition-colors">
              <Upload className="size-4 mr-2" /> Upload File
            </span>
          </label>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {mediaLibrary.map((item: MediaItem) => (
          <div key={item.id} className="group relative rounded-2xl bg-neutral-900 border border-neutral-800 overflow-hidden">
            {item.type === "video" ? (
              <video src={item.url} className="h-40 w-full object-cover" />
            ) : (
              <img src={item.url} alt={item.name} className="h-40 w-full object-cover" />
            )}
            <div className="p-3 flex items-center justify-between">
              <span className="text-[11px] text-neutral-400 font-mono truncate max-w-[120px]">{item.name}</span>
              <button
                onClick={() => {
                  deleteMediaItem(item.id);
                  triggerToast("Deleted asset from library.");
                }}
                className="text-red-500 hover:text-red-400 p-1"
              >
                <Trash2 className="size-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end pt-4">
        <Button
          onClick={handleSave}
          className="bg-red-600 hover:bg-red-700 text-white font-bold h-11 px-8 rounded-xl shadow-lg shadow-red-600/20"
        >
          <Save className="size-4 mr-2" /> Save Changes
        </Button>
      </div>
    </div>
  );
}

// --- MODULE 11: FAQs Manager ---

function FAQsManager({ faqs, updateFAQ, addFAQ, deleteFAQ, triggerToast }: any) {
  const handleSave = () => {
    triggerToast("Saved FAQ changes successfully!");
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-extrabold uppercase text-white">FAQ Manager</h1>
          <p className="text-sm text-neutral-400 mt-1">Manage frequently asked questions displayed across website pages.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            onClick={() => {
              const newItem: FAQItem = {
                id: `faq-${Date.now()}`,
                question: "New FAQ Question?",
                answer: "Detailed answer explaining the solution.",
                visible: true,
                order: faqs.length + 1,
              };
              addFAQ(newItem);
              triggerToast("Added new FAQ entry!");
            }}
            variant="outline"
            className="border-neutral-700 bg-neutral-900 text-white font-bold h-11 px-5 rounded-xl"
          >
            <Plus className="size-4 mr-2" /> Add New FAQ
          </Button>

          <Button
            onClick={handleSave}
            className="bg-red-600 hover:bg-red-700 text-white font-bold h-11 px-6 rounded-xl shadow-lg shadow-red-600/20"
          >
            <Save className="size-4 mr-2" /> Save Changes
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {faqs.map((faq: FAQItem) => (
          <div key={faq.id} className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-4">
            <Input
              value={faq.question}
              onChange={(e) => updateFAQ({ ...faq, question: e.target.value })}
              className="bg-neutral-950 border-neutral-800 text-white font-bold"
            />
            <Textarea
              rows={2}
              value={faq.answer}
              onChange={(e) => updateFAQ({ ...faq, answer: e.target.value })}
              className="bg-neutral-950 border-neutral-800 text-white text-sm"
            />
            <div className="flex justify-end">
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  deleteFAQ(faq.id);
                  triggerToast("Deleted FAQ entry.");
                }}
                className="border-red-900/60 bg-red-950/40 text-red-400 text-xs font-bold"
              >
                <Trash2 className="size-3.5 mr-1" /> Delete FAQ
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end pt-4">
        <Button
          onClick={handleSave}
          className="bg-red-600 hover:bg-red-700 text-white font-bold h-11 px-8 rounded-xl shadow-lg shadow-red-600/20"
        >
          <Save className="size-4 mr-2" /> Save Changes
        </Button>
      </div>
    </div>
  );
}

// --- MODULE 12: SEO Manager ---

function SEOManager({ seo, updateSEO, triggerToast }: any) {
  const [selectedPage, setSelectedPage] = useState<string>("home");
  const meta = seo[selectedPage] || { title: "", description: "" };

  const handleSave = () => {
    triggerToast(`Saved SEO metadata for ${selectedPage.toUpperCase()} page!`);
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-extrabold uppercase text-white">SEO & Meta Tags Manager</h1>
          <p className="text-sm text-neutral-400 mt-1">Manage search engine titles, descriptions, and OpenGraph social cards.</p>
        </div>
        <Button
          onClick={handleSave}
          className="bg-red-600 hover:bg-red-700 text-white font-bold h-11 px-6 rounded-xl shadow-lg shadow-red-600/20"
        >
          <Save className="size-4 mr-2" /> Save Changes
        </Button>
      </div>

      <div className="flex gap-2 p-1.5 rounded-2xl bg-neutral-900 border border-neutral-800">
        {["home", "about", "services", "portfolio", "contact"].map((p) => (
          <button
            key={p}
            onClick={() => setSelectedPage(p)}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
              selectedPage === p ? "bg-red-600 text-white shadow-md" : "text-neutral-400 hover:text-white"
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      <div className="p-8 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-4">
        <div>
          <label className="text-xs font-bold text-neutral-300">Page Meta Title</label>
          <Input
            value={meta.title || ""}
            onChange={(e) => updateSEO(selectedPage, { title: e.target.value })}
            className="bg-neutral-950 border-neutral-800 text-white mt-1"
          />
        </div>

        <div>
          <label className="text-xs font-bold text-neutral-300">Page Meta Description</label>
          <Textarea
            rows={3}
            value={meta.description || ""}
            onChange={(e) => updateSEO(selectedPage, { description: e.target.value })}
            className="bg-neutral-950 border-neutral-800 text-white mt-1"
          />
        </div>

        <div className="flex justify-end pt-6 border-t border-neutral-800 mt-6">
          <Button
            onClick={handleSave}
            className="bg-red-600 hover:bg-red-700 text-white font-bold h-11 px-8 rounded-xl shadow-lg shadow-red-600/20"
          >
            <Save className="size-4 mr-2" /> Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}

// --- HELPER COMPONENT: Media Upload & URL Input Field ---

function MediaUploadField({
  label,
  value,
  onChange,
  isVideo = false,
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
  isVideo?: boolean;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { data, addMediaItem } = useCMS();

  const handleFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const item = await handleFileUpload(file);
      addMediaItem(item);
      onChange(item.url);
    }
  };

  const relevantMedia = (data.mediaLibrary || []).filter((m) =>
    isVideo ? m.type === "video" || m.url.match(/\.(mp4|webm)$/i) || m.url.includes("youtube") || m.url.includes("youtu.be") : m.type === "image"
  );

  return (
    <div className="space-y-2">
      <label className="text-xs font-bold text-neutral-300">{label}</label>
      <div className="flex gap-2">
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={isVideo ? "Video URL (e.g. /hero-video.mp4 or YouTube)..." : "Image URL..."}
          className="bg-neutral-950 border-neutral-800 text-white flex-1"
        />
        <input
          type="file"
          ref={fileInputRef}
          accept={isVideo ? "video/*" : "image/*"}
          className="hidden"
          onChange={handleFile}
        />
        <Button
          type="button"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          className="border-neutral-700 bg-neutral-950 text-white text-xs font-bold px-3 shrink-0"
        >
          <Upload className="size-3.5 mr-1" /> Upload
        </Button>
      </div>

      {/* Select from Media Library if available */}
      {relevantMedia.length > 0 && (
        <div className="flex items-center gap-2 pt-1">
          <span className="text-[10px] text-neutral-500 font-mono font-bold uppercase">Select from Media:</span>
          <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="bg-neutral-950 border border-neutral-800 text-xs text-neutral-300 rounded-lg px-2 py-1 flex-1"
          >
            <option value="">-- Choose asset --</option>
            {relevantMedia.map((m) => (
              <option key={m.id} value={m.url}>
                {m.name} ({m.url.slice(-25)})
              </option>
            ))}
          </select>
        </div>
      )}

      {value && (
        <div className="relative mt-2 rounded-xl overflow-hidden border border-neutral-800 h-28 w-full bg-neutral-950 flex items-center justify-center">
          {isVideo ? (
            value.includes("youtube") || value.includes("youtu.be") ? (
              <div className="text-xs text-red-400 font-mono p-4 text-center">
                YouTube Video Selected: <span className="text-white block mt-1">{value}</span>
              </div>
            ) : (
              <video src={value} className="h-full w-full object-cover" autoPlay muted loop />
            )
          ) : (
            <img src={value} alt="Preview" className="h-full w-full object-cover" />
          )}
        </div>
      )}
    </div>
  );
}

// --- MODULE 13: Security & Passcode Manager ---

function SecurityManager({
  currentPasscode,
  onUpdatePasscode,
  onLogout,
  triggerToast,
}: {
  currentPasscode: string;
  onUpdatePasscode: (newPasscode: string) => void;
  onLogout: () => void;
  triggerToast: (msg: string) => void;
}) {
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (oldPass !== currentPasscode) {
      setErrorMsg("Current passcode is incorrect.");
      return;
    }

    if (newPass.length < 4) {
      setErrorMsg("New passcode must be at least 4 characters long.");
      return;
    }

    if (newPass !== confirmPass) {
      setErrorMsg("New passcode and confirmation do not match.");
      return;
    }

    onUpdatePasscode(newPass);
    setOldPass("");
    setNewPass("");
    setConfirmPass("");
    triggerToast("Admin passcode updated successfully!");
  };

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="font-display text-3xl font-extrabold uppercase text-white">Security & Passcode Manager</h1>
        <p className="text-sm text-neutral-400 mt-1">Manage admin access security credentials and CMS passcode settings.</p>
      </div>

      <div className="p-8 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-6">
        <h2 className="text-lg font-bold text-white uppercase border-b border-neutral-800 pb-4 flex items-center gap-2">
          <KeyRound className="size-5 text-red-500" /> Change Admin Passcode
        </h2>

        {errorMsg && (
          <div className="p-3.5 rounded-xl bg-red-950/80 border border-red-800 text-red-400 text-xs font-bold">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="text-xs font-bold text-neutral-300">Current Passcode</label>
            <Input
              type="password"
              placeholder="Enter current passcode..."
              value={oldPass}
              onChange={(e) => setOldPass(e.target.value)}
              className="bg-neutral-950 border-neutral-800 text-white font-mono"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-neutral-300">New Passcode</label>
              <Input
                type="password"
                placeholder="Enter new passcode..."
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
                className="bg-neutral-950 border-neutral-800 text-white font-mono"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-neutral-300">Confirm New Passcode</label>
              <Input
                type="password"
                placeholder="Confirm new passcode..."
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
                className="bg-neutral-950 border-neutral-800 text-white font-mono"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-neutral-800">
            <Button
              type="button"
              variant="outline"
              onClick={onLogout}
              className="border-neutral-700 bg-neutral-950 text-neutral-400 hover:text-white font-bold text-xs"
            >
              <LogOut className="size-3.5 mr-1.5" /> Log Out Session
            </Button>

            <Button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white font-bold h-11 px-8 rounded-xl shadow-lg shadow-red-600/20"
            >
              <Save className="size-4 mr-2" /> Update Passcode
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
