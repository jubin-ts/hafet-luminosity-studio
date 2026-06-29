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
import { Phone } from "lucide-react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { SITE } from "@/lib/site";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-gradient-gold">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:brightness-110"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:brightness-110"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
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
      { title: "Hafet Media Solutions — Premium LED & Digital Signage in Dubai" },
      { name: "description", content: "Dubai's premium LED displays, digital signage, kiosks, 3D & neon signage, and electronic shelf solutions across the UAE and GCC." },
      { name: "author", content: "Hafet Media Solutions" },
      { property: "og:title", content: "Hafet Media Solutions — Premium LED & Digital Signage" },
      { property: "og:description", content: "Premium LED & digital signage solutions across UAE, KSA, Qatar, Kuwait, Oman & Bahrain." },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Hafet Media Solutions" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700;800;900&family=Poppins:wght@300;400;500;600;700&display=swap" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: SITE.name,
          slogan: SITE.tagline,
          description: "LED display, digital signage, LCD kiosk, 3D signage, neon signage and electronic shelf label supplier in Dubai serving UAE and GCC projects.",
          address: SITE.address,
          email: SITE.email,
          telephone: SITE.phone,
          areaServed: SITE.regions,
          url: "/",
          sameAs: [SITE.social.instagram, SITE.social.linkedin, SITE.social.youtube],
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen flex-col bg-background">
        <Navbar />
        <main className="flex-1 pt-[68px] lg:pt-[80px]">
          <Outlet />
        </main>
        <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2">
          <a
            href={SITE.social.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="grid h-12 w-12 place-items-center rounded-full bg-primary text-primary-foreground shadow-[0_12px_35px_-12px_var(--primary)] transition-transform hover:-translate-y-1 hover:brightness-110"
          >
            <MessageCircle className="h-5 w-5" />
          </a>
          <a
            href={`tel:${SITE.phoneRaw}`}
            aria-label={`Call ${SITE.phone}`}
            className="grid h-12 w-12 place-items-center rounded-full border border-gold/60 bg-background/90 text-gold shadow-lg backdrop-blur transition-transform hover:-translate-y-1 hover:bg-card"
          >
            <Phone className="h-5 w-5" />
          </a>
        </div>
        <Footer />
      </div>
    </QueryClientProvider>
  );
}
