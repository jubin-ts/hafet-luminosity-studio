import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ShieldCheck, Sun, Wrench, Headphones, Sparkles, Monitor, Tv, Tag } from "lucide-react";
import heroImg from "@/assets/hero-led.jpg";
import { CATEGORIES } from "@/lib/products";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Hafet Media Solutions — Dubai's Premium LED & Digital Signage" },
      { name: "description", content: "Premium LED displays, digital signage, kiosks and electronic shelf solutions in Dubai, UAE and across the GCC." },
      { property: "og:title", content: "Hafet Media Solutions — Premium LED & Digital Signage" },
      { property: "og:description", content: "5+ years, 500+ projects, 50+ clients across UAE, KSA, Qatar, Kuwait, Oman & Bahrain." },
    ],
  }),
  component: Index,
});

const STATS = [
  { value: "5+", label: "Years of Excellence" },
  { value: "500+", label: "Projects Delivered" },
  { value: "50+", label: "Trusted Clients" },
  { value: "MENA", label: "Regional Coverage" },
];

const REASONS = [
  { icon: ShieldCheck, title: "3-Year Warranty", desc: "Long-term peace of mind on every panel we install." },
  { icon: Sun, title: "High Brightness", desc: "Engineered for full daylight visibility up to 10,000 nits." },
  { icon: Wrench, title: "Custom Modules", desc: "Curved, transparent, flexible and bespoke configurations." },
  { icon: Headphones, title: "24/7 Support", desc: "Dedicated MENA-wide technical and content support." },
];

const CAT_ICONS = { monitor: Monitor, tv: Tv, sparkles: Sparkles, tag: Tag } as const;

const CLIENTS = ["EMAAR", "MERAAS", "NAKHEEL", "ALDAR", "ETISALAT", "DU", "DEWA", "ENOC", "MAJID AL FUTTAIM", "JUMEIRAH", "RTA", "ADNOC"];

function Index() {
  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img src={heroImg} alt="" width={1920} height={1080} className="h-full w-full object-cover opacity-40" />
          <div className="absolute inset-0 led-glow opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
        </div>

        <div className="mx-auto flex min-h-[88vh] max-w-7xl flex-col items-center justify-center px-5 py-24 text-center">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-gold">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse-glow" />
            Based in Dubai · Serving GCC
          </span>
          <h1 className="max-w-4xl text-balance font-display text-4xl font-extrabold leading-[1.05] sm:text-6xl lg:text-7xl">
            Dubai's <span className="text-gradient-gold">Premium LED</span> &amp; Digital Signage Solutions
          </h1>
          <p className="mt-6 max-w-2xl text-balance text-base leading-relaxed text-muted-foreground sm:text-lg">
            From iconic outdoor billboards to immersive 360° LED rooms — we design,
            engineer and install end-to-end visual experiences for brands across the MENA region.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/products"
              className="group inline-flex items-center gap-2 rounded-md bg-primary px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-primary-foreground transition-all hover:brightness-110 hover:shadow-[0_0_40px_-8px_var(--primary)]"
            >
              Explore Products
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-md border border-gold/60 bg-transparent px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-gold transition-all hover:bg-gold/10"
            >
              Get a Free Quote
            </Link>
          </div>

          <div className="mt-20 grid w-full max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="rounded-lg border border-border/60 bg-card/40 px-4 py-5 backdrop-blur-sm">
                <div className="font-display text-3xl font-extrabold text-gradient-gold sm:text-4xl">{s.value}</div>
                <div className="mt-1 text-[11px] uppercase tracking-wider text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCT CATEGORIES */}
      <section className="mx-auto max-w-7xl px-5 py-24">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Our Solutions</p>
            <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold sm:text-4xl lg:text-5xl">
              Four pillars of <span className="text-gradient-gold">visual excellence</span>
            </h2>
          </div>
          <Link to="/products" className="text-sm uppercase tracking-wider text-gold hover:text-primary">
            View all →
          </Link>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((c) => {
            const Icon = CAT_ICONS[c.icon as keyof typeof CAT_ICONS] ?? Monitor;
            return (
              <Link
                key={c.slug}
                to="/products/$category"
                params={{ category: c.slug }}
                className="card-glow group relative overflow-hidden rounded-xl border border-border bg-card"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={c.image} alt={c.name} loading="lazy" width={1024} height={768} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
                  <div className="absolute left-4 top-4 grid h-10 w-10 place-items-center rounded-md bg-primary/90 text-primary-foreground backdrop-blur">
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-lg font-bold text-foreground group-hover:text-primary">{c.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{c.short}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs uppercase tracking-wider text-gold">
                    Explore <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="border-y border-border/60 bg-card/20">
        <div className="mx-auto max-w-7xl px-5 py-24">
          <div className="mb-14 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Why Hafet</p>
            <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl lg:text-5xl">
              Engineered for <span className="text-gradient-gold">performance</span>
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {REASONS.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="card-glow rounded-xl border border-border bg-card p-6">
                <div className="grid h-12 w-12 place-items-center rounded-lg bg-primary/15 text-primary">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-display text-lg font-bold">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CLIENTS MARQUEE */}
      <section className="py-16">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
          Trusted by leading brands across the GCC
        </p>
        <div className="relative mt-8 overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
          <div className="flex w-max marquee">
            {[...CLIENTS, ...CLIENTS].map((c, i) => (
              <span key={i} className="mx-10 whitespace-nowrap font-display text-xl font-bold uppercase tracking-widest text-muted-foreground/60 hover:text-gold">
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="px-5 pb-24">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-2xl border border-primary/40 bg-gradient-to-br from-primary/90 via-primary to-[oklch(0.6_0.18_45)] p-10 text-center sm:p-16">
          <div className="absolute inset-0 opacity-20 mix-blend-overlay" style={{ backgroundImage: "radial-gradient(circle at 30% 20%, white, transparent 40%), radial-gradient(circle at 70% 80%, white, transparent 40%)" }} />
          <h2 className="relative font-display text-3xl font-extrabold text-primary-foreground sm:text-4xl lg:text-5xl">
            Ready to light up your brand?
          </h2>
          <p className="relative mx-auto mt-4 max-w-2xl text-base text-primary-foreground/90">
            Tell us about your project — we'll send a tailored proposal within 24 hours.
          </p>
          <div className="relative mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link to="/contact" className="rounded-md bg-background px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-foreground transition-all hover:bg-foreground hover:text-background">
              Get a Free Quote
            </Link>
            <a href="tel:+971545128212" className="rounded-md border border-background/80 px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-background hover:bg-background/10">
              Call +971 54 512 8212
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
