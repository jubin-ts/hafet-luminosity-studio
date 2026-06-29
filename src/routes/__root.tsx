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
            className="grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_12px_35px_-10px_rgba(37,211,102,0.7)] transition-transform hover:-translate-y-1 hover:brightness-110"
          >
            <svg viewBox="0 0 32 32" aria-hidden="true" className="h-7 w-7" fill="currentColor">
              <path d="M19.11 17.21c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.22 3.08.15.2 2.11 3.22 5.11 4.51.71.31 1.27.49 1.7.63.71.22 1.36.19 1.87.12.57-.08 1.77-.72 2.02-1.41.25-.7.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35z"/>
              <path d="M26.78 5.22A14.94 14.94 0 0 0 16 .75C7.6.75.78 7.57.78 15.97c0 2.83.78 5.6 2.26 8.02L.64 31.25l7.46-2.36a15.16 15.16 0 0 0 7.9 2.17h.01c8.4 0 15.22-6.82 15.22-15.22 0-4.07-1.59-7.9-4.45-10.62zM16 28.5h-.01a12.51 12.51 0 0 1-6.99-2.13l-.5-.32-4.43 1.4 1.42-4.31-.33-.52a12.5 12.5 0 1 1 23.34-6.65A12.52 12.52 0 0 1 16 28.5z"/>
            </svg>
          </a>
          <a
            href={`tel:${SITE.phoneRaw}`}
            aria-label={`Call ${SITE.phone}`}
            className="grid h-14 w-14 place-items-center rounded-full border border-gold/60 bg-background/90 text-gold shadow-lg backdrop-blur transition-transform hover:-translate-y-1 hover:bg-card"
          >
            <Phone className="h-6 w-6" />
          </a>
        </div>
        <Footer />
      </div>
    </QueryClientProvider>
  );
}
