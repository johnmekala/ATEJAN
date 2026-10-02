import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { ArrowLeft, RotateCcw } from "lucide-react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteFooter, SiteHeader } from "@/components/site/shell";
import { Button } from "@/components/ui/button";
import { Container, Eyebrow } from "@/components/site/shared";
import { Preloader } from "@/components/site/preloader";
import { CustomCursor } from "@/components/site/custom-cursor";
import { FloatingSocialButtons } from "@/components/site/floating-social-buttons";

function NotFoundComponent() {
  return (
    <section className="relative grid min-h-[82svh] place-items-center overflow-hidden bg-slate-50 text-slate-900 pb-20 pt-36">
      <Container>
        <div className="relative z-10 mx-auto max-w-4xl text-center animate-rise">
          <Eyebrow>404 · Route unavailable</Eyebrow>
          <p aria-hidden="true" className="text-[clamp(7rem,24vw,18rem)] font-extrabold leading-[.72] text-red-600/10">
            404
          </p>
          <h1 className="mt-10 text-balance text-4xl font-extrabold sm:text-6xl text-slate-900">
            Looks like this page took a different route.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-slate-600">
            The destination may have moved, but the way back is clear.
          </p>
          <Button asChild size="lg" className="mt-9 rounded-xl bg-red-600 font-bold text-white shadow-lg shadow-red-500/20">
            <Link to="/">
              <ArrowLeft /> Back home
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 text-slate-900">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-bold tracking-tight text-slate-900">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="rounded-xl bg-red-600 font-bold text-white"
          >
            <RotateCcw /> Try again
          </Button>
          <Button asChild variant="outline" className="rounded-xl border-slate-300 text-slate-700">
            <Link to="/">Go home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "AJETAN — Build. Automate. Grow." },
      { name: "description", content: "AJETAN builds digital products, automation systems and growth experiences for ambitious businesses." },
      { name: "author", content: "AJETAN" },
      { property: "og:title", content: "AJETAN — Build. Automate. Grow." },
      { property: "og:description", content: "Digital products and systems designed to move businesses forward." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.ico", sizes: "any" },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "icon", href: "/favicon.png", type: "image/png" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;600;700&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        {/* Instant preloader styles — inlined so they render before any JS */}
        <style dangerouslySetInnerHTML={{ __html: `
          body { background: #ffffff; margin: 0; }
          #html-preloader {
            position: fixed;
            inset: 0;
            z-index: 999999;
            background: #ffffff;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            transition: opacity 0.3s ease;
          }
          #html-preloader.pl-fade {
            opacity: 0;
            pointer-events: none;
          }
          .pl-wordmark {
            font-family: 'Space Grotesk', 'Manrope', Arial, sans-serif;
            font-weight: 900;
            font-size: clamp(2rem, 6vw, 3.6rem);
            letter-spacing: 0.16em;
            text-transform: uppercase;
            color: #0d5c5c;
            line-height: 1;
            user-select: none;
          }
          .pl-line {
            margin-top: 10px;
            height: 2px;
            width: 80%;
            border-radius: 999px;
            background: linear-gradient(90deg, transparent 0%, #4ecdc4 30%, #0d5c5c 65%, transparent 100%);
          }
          .pl-tag {
            margin-top: 24px;
            font-family: monospace;
            font-weight: 700;
            font-size: clamp(8px, 1.2vw, 11px);
            letter-spacing: 0.4em;
            text-transform: uppercase;
            color: #94a3b8;
          }
        `}} />
      </head>
      <body>
        {/* Pure HTML+CSS preloader — renders INSTANTLY before JS, no white flash */}
        <div id="html-preloader">
          <div className="pl-wordmark">AJETAN</div>
          <div className="pl-line" />
          <p className="pl-tag">Build · Automate · Grow</p>
        </div>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

import { CMSProvider } from "@/context/cms-context";

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const router = useRouter();
  const isAdmin = router.state.location.pathname.startsWith("/admin");

  if (isAdmin) {
    return (
      <CMSProvider>
        <QueryClientProvider client={queryClient}>
          <Outlet />
        </QueryClientProvider>
      </CMSProvider>
    );
  }

  return (
    <CMSProvider>
      <QueryClientProvider client={queryClient}>
        <Preloader />
        <CustomCursor />
        <FloatingSocialButtons />
        <div className="min-h-screen overflow-x-clip bg-slate-50 text-slate-900 selection:bg-red-600/15 selection:text-red-900">
          <SiteHeader />
          <main>
            <Outlet />
          </main>
          <SiteFooter />
        </div>
      </QueryClientProvider>
    </CMSProvider>
  );
}
