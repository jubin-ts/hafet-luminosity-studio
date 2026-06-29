import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { ArrowRight, ChevronRight } from "lucide-react";
import { CATEGORIES, getCategory, type Subcategory, type Product } from "@/lib/products";
import { productImageByName } from "@/lib/productImages";

export const Route = createFileRoute("/products/$category")({
  loader: ({ params }) => {
    const cat = getCategory(params.category);
    if (!cat) throw notFound();
    return { cat };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.cat.name ?? "Products"} — Hafet Media Solutions` },
      { name: "description", content: `${loaderData?.cat.short ?? "Premium LED and signage products in Dubai."} Available for UAE and GCC projects with consultation, supply, installation and support from Hafet Media Solutions.` },
      { property: "og:title", content: `${loaderData?.cat.name ?? "Products"} — Hafet Media Solutions` },
      { property: "og:description", content: `${loaderData?.cat.short ?? "Premium LED and signage products in Dubai."} Installed across UAE and GCC.` },
      { property: "og:image", content: loaderData?.cat.image },
      { property: "og:url", content: `/products/${loaderData?.cat.slug ?? ""}` },
    ],
    links: [{ rel: "canonical", href: `/products/${loaderData?.cat.slug ?? ""}` }],
  }),
  component: CategoryPage,
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-5 py-32 text-center">
      <h1 className="font-display text-4xl font-bold">Category not found</h1>
      <Link to="/products" className="mt-6 inline-block text-gold hover:text-primary">← Back to products</Link>
    </div>
  ),
});

function CategoryPage() {
  const { cat } = Route.useLoaderData();
  const [active, setActive] = useState(cat.subcategories[0]?.slug ?? "");

  // Re-init when category changes
  useEffect(() => {
    setActive(cat.subcategories[0]?.slug ?? "");
    // honor hash from mega-dropdown
    const hash = typeof window !== "undefined" ? window.location.hash.replace("#", "") : "";
    if (hash && cat.subcategories.some((s: Subcategory) => s.slug === hash)) setActive(hash);
  }, [cat.slug]);

  const sub = cat.subcategories.find((s: Subcategory) => s.slug === active) ?? cat.subcategories[0];

  return (
    <>
      {/* HERO */}
      <section className="section-reveal relative overflow-hidden border-b border-border/60">
        <div className="absolute inset-0">
          <img src={cat.image} alt="" className="h-full w-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/85 to-background" />
        </div>
        <div className="relative mx-auto max-w-7xl px-5 py-20">
          <nav className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
            <Link to="/products" className="hover:text-primary">Products</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-gold">{cat.name}</span>
          </nav>
          <h1 className="mt-5 max-w-3xl font-display text-4xl font-extrabold sm:text-5xl lg:text-6xl">
            {cat.name.split(" ").slice(0, -1).join(" ")} <span className="text-gradient-gold">{cat.name.split(" ").slice(-1)}</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base text-muted-foreground">{cat.short}</p>
        </div>
      </section>

      {/* SUBCATEGORY TABS */}
      <section className="sticky top-[68px] z-30 border-b border-border/60 bg-background/85 backdrop-blur-md lg:top-[80px]">
        <div className="mx-auto max-w-7xl overflow-x-auto px-5">
          <div className="flex min-w-max gap-1 py-3">
            {cat.subcategories.map((s: Subcategory) => (
              <button
                key={s.slug}
                onClick={() => {
                  setActive(s.slug);
                  if (typeof window !== "undefined") history.replaceState(null, "", `#${s.slug}`);
                }}
                className={`whitespace-nowrap rounded-md px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all ${
                  active === s.slug
                    ? "bg-primary text-primary-foreground shadow-[0_0_20px_-6px_var(--primary)]"
                    : "text-muted-foreground hover:bg-card hover:text-gold"
                }`}
              >
                {s.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCT GRID */}
      <section className="section-reveal mx-auto max-w-7xl px-5 py-16">
        <header className="mb-10">
          <h2 className="font-display text-2xl font-bold sm:text-3xl">{sub?.name}</h2>
          <div className="mt-3 h-[2px] w-16 bg-gradient-to-r from-primary to-gold" />
        </header>

        <div className="grid auto-rows-fr gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sub?.products.map((p: Product) => (
            <article key={p.name} className="card-glow flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card">
              <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-background to-card">
                <img
                  src={productImageByName[p.name] ?? sub?.image ?? cat.image}
                  alt={p.name}
                  loading="lazy"
                  width={960}
                  height={720}
                  className="h-full w-full object-cover opacity-90 transition-all duration-500 hover:scale-105 hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
                <span className="absolute left-3 top-3 rounded-full bg-background/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-gold backdrop-blur">
                  {sub.name}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-lg font-bold text-foreground line-clamp-2 min-h-[3.5rem]">{p.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-3 min-h-[3.75rem]">{p.description}</p>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {p.specs.map((s: string) => (
                    <li key={s} className="rounded-full border border-primary/30 bg-primary/5 px-2.5 py-1 text-[11px] font-medium text-primary">
                      {s}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-xs leading-relaxed text-muted-foreground line-clamp-3">
                  <span className="font-semibold uppercase tracking-wider text-gold">Applications: </span>
                  {p.applications}
                </p>
                <Link
                  to="/contact"
                  className="mt-auto inline-flex w-fit items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-primary-foreground transition-all hover:brightness-110 hover:shadow-[0_0_25px_-8px_var(--primary)]"
                >
                  Get Quote <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Related categories */}
      <section className="section-reveal border-t border-border/60 bg-card/20">
        <div className="mx-auto max-w-7xl px-5 py-16">
          <h2 className="font-display text-xl font-bold">Explore other categories</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.filter((c) => c.slug !== cat.slug).map((c) => (
              <Link
                key={c.slug}
                to="/products/$category"
                params={{ category: c.slug }}
                className="card-glow flex items-center gap-4 rounded-xl border border-border bg-card p-5"
              >
                <img src={c.image} alt="" loading="lazy" className="h-16 w-16 rounded-md object-cover" />
                <div>
                  <div className="font-display font-bold">{c.name}</div>
                  <div className="text-xs text-muted-foreground line-clamp-1">{c.short}</div>
                </div>
                <ArrowRight className="ml-auto h-4 w-4 text-gold" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
