import { createFileRoute, Link, Outlet, useMatches } from "@tanstack/react-router";
import { ArrowRight, Monitor, Tv, Sparkles, Tag } from "lucide-react";
import { CATEGORIES } from "@/lib/products";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Products — Hafet Media Solutions" },
      { name: "description", content: "Explore our full catalog: LED displays, LCD video walls & kiosks, 3D & neon signage, and electronic shelf solutions." },
      { property: "og:title", content: "Products — Hafet Media Solutions" },
      { property: "og:description", content: "Premium LED, signage and digital retail solutions across the GCC." },
    ],
  }),
  component: ProductsLayout,
});

const ICONS = { monitor: Monitor, tv: Tv, sparkles: Sparkles, tag: Tag } as const;

function ProductsLayout() {
  const matches = useMatches();
  const hasChild = matches.some((m) => m.routeId === "/products/$category");
  if (hasChild) return <Outlet />;
  return <ProductsIndex />;
}

function ProductsIndex() {
  return (
    <>
      <section className="border-b border-border/60">
        <div className="mx-auto max-w-7xl px-5 py-20 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Catalog</p>
          <h1 className="mt-3 font-display text-4xl font-extrabold sm:text-5xl lg:text-6xl">
            Our <span className="text-gradient-gold">Products</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-muted-foreground">
            Four product families covering every digital visual need — from billboard-scale outdoor LED
            to e-ink shelf labels and immersive 360° rooms.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20">
        <div className="grid gap-8 lg:grid-cols-2">
          {CATEGORIES.map((c) => {
            const Icon = ICONS[c.icon as keyof typeof ICONS] ?? Monitor;
            return (
              <Link
                key={c.slug}
                to="/products/$category"
                params={{ category: c.slug }}
                className="card-glow group relative grid overflow-hidden rounded-2xl border border-border bg-card sm:grid-cols-[1fr_1.1fr]"
              >
                <div className="relative aspect-[4/3] overflow-hidden sm:aspect-auto">
                  <img src={c.image} alt={c.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-r from-card via-transparent to-transparent" />
                </div>
                <div className="flex flex-col p-7">
                  <div className="grid h-12 w-12 place-items-center rounded-lg bg-primary/15 text-primary">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h2 className="mt-5 font-display text-2xl font-bold group-hover:text-primary">{c.name}</h2>
                  <p className="mt-2 text-sm text-muted-foreground">{c.short}</p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {c.subcategories.slice(0, 5).map((s) => (
                      <li key={s.slug} className="rounded-full border border-border bg-background/40 px-3 py-1 text-xs text-muted-foreground">
                        {s.name}
                      </li>
                    ))}
                    {c.subcategories.length > 5 && (
                      <li className="rounded-full border border-gold/40 px-3 py-1 text-xs text-gold">
                        +{c.subcategories.length - 5} more
                      </li>
                    )}
                  </ul>
                  <span className="mt-auto inline-flex items-center gap-2 pt-6 text-xs uppercase tracking-wider text-gold">
                    Explore category <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}
