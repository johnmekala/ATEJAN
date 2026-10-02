import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "./shared";
import { useCMS } from "@/context/cms-context";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const { data } = useCMS();

  const navItems = data.navigation.items.filter((item) => item.visible).sort((a, b) => a.order - b.order);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className={`site-header ${scrolled ? "site-header-compact" : ""}`}>
        <Container className="grid h-full grid-cols-[minmax(0,1fr)_auto] items-center gap-4 lg:grid-cols-[auto_1fr_auto]">
          {/* Brand Logo */}
          <Link to="/" className="flex min-w-0 items-center gap-3 group" aria-label={`${data.site.name} home`}>
            <img
              src={data.site.logo || "/favicon.png"}
              alt={`${data.site.name} logo`}
              className="size-9 rounded-xl object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <span className="truncate text-xl font-extrabold tracking-[0.2em] text-neutral-950">
              {data.site.name}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav aria-label="Primary navigation" className="hidden justify-center lg:flex gap-1">
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={item.to}
                activeOptions={item.to === "/" ? { exact: true } : undefined}
                className="nav-link text-neutral-700 hover:text-neutral-950 font-semibold"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Header Action Button */}
          <div className="hidden lg:flex items-center gap-4">
            <Button
              asChild
              size="lg"
              className="group rounded-xl bg-red-600 hover:bg-red-700 font-bold text-white shadow-lg shadow-red-600/25 transition-all duration-300 hover:scale-105"
              data-cursor="START"
            >
              <Link to={data.navigation.ctaLink || "/contact"}>
                {data.navigation.ctaText || "Start a project"}
                <ArrowUpRight className="ml-1 size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </Button>
          </div>

          {/* Mobile Toggle Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-neutral-950 hover:bg-neutral-100"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="size-6 text-red-600" /> : <Menu className="size-6 text-neutral-950" />}
          </Button>
        </Container>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu ${open ? "mobile-menu-open" : ""}`} aria-hidden={!open}>
        <Container className="flex h-full flex-col justify-between pb-10 pt-32">
          <nav className="flex flex-col space-y-2">
            {navItems.map((item, index) => (
              <Link
                key={item.id}
                to={item.to}
                className="mobile-nav-link text-neutral-950 hover:text-red-600"
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <span>{item.label}</span>
                <ArrowUpRight className="size-8 text-red-600" />
              </Link>
            ))}
          </nav>
          <div>
            <p className="mb-5 text-sm text-neutral-500 font-medium">{data.site.strapline}</p>
            <Button asChild size="lg" className="w-full rounded-xl bg-red-600 font-bold text-white shadow-lg shadow-red-600/25">
              <Link to={data.navigation.ctaLink || "/contact"}>
                {data.navigation.ctaText || "Start a project"} <ArrowUpRight className="ml-2 size-5" />
              </Link>
            </Button>
          </div>
        </Container>
      </div>
    </>
  );
}

export function SiteFooter() {
  const { data } = useCMS();
  const navItems = data.navigation.items.filter((item) => item.visible).sort((a, b) => a.order - b.order);
  const activeServices = data.services.filter((s) => s.visible).sort((a, b) => a.order - b.order);

  return (
    <footer className="relative overflow-hidden bg-black text-white border-t border-neutral-800 pt-20 pb-12">
      {/* Background Ambient Red Glow */}
      <div className="glow-orb -bottom-20 left-1/2 -translate-x-1/2 size-[600px] bg-red-600/10" />

      <Container className="relative z-10">
        <div className="grid gap-14 border-b border-neutral-800 pb-16 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Link to="/" className="text-3xl font-black tracking-[0.25em] text-white">
              {data.site.name}
            </Link>
            <p className="mt-4 text-gradient-accent font-display text-2xl font-extrabold tracking-wide uppercase">
              {data.site.strapline}
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-neutral-400 font-medium">
              {data.site.footerText}
            </p>
          </div>

          <div>
            <p className="footer-title text-red-500">Navigate</p>
            <div className="space-y-1">
              {navItems.map((item) => (
                <Link key={item.id} to={item.to} className="footer-link text-neutral-400 hover:text-white">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="footer-title text-red-500">Services</p>
            <div className="space-y-1">
              {activeServices.map((service) => (
                <Link
                  key={service.slug}
                  to="/services/$slug"
                  params={{ slug: service.slug }}
                  className="footer-link text-neutral-400 hover:text-white"
                >
                  {service.title}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5 pt-8 text-xs text-neutral-400 sm:flex-row sm:items-center sm:justify-between">
          <p>{data.site.copyright}</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}