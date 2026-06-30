import { Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { ArrowRight, ChevronDown, Monitor, Sparkles, Tag, Tv } from "lucide-react";
import { CATEGORIES, type Category, type Product, type Subcategory } from "@/lib/products";
import { productImageByName } from "@/lib/productImages";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  monitor: Monitor,
  tv: Tv,
  sparkles: Sparkles,
  tag: Tag,
};

type ProductCatalogAccordionProps = {
  initialCategorySlug?: string;
};

export function ProductCatalogAccordion({ initialCategorySlug }: ProductCatalogAccordionProps) {
  const initialSlug = useMemo(
    () => initialCategorySlug ?? CATEGORIES[0]?.slug ?? "",
    [initialCategorySlug],
  );
  const [openSlug, setOpenSlug] = useState(initialSlug);

  useEffect(() => {
    if (initialCategorySlug) setOpenSlug(initialCategorySlug);
  }, [initialCategorySlug]);

  useEffect(() => {
    const openFromHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (!hash) return;
      const match = CATEGORIES.find(
        (category) =>
          category.slug === hash || category.subcategories.some((subcategory) => subcategory.slug === hash),
      );
      if (!match) return;
      setOpenSlug(match.slug);
      window.requestAnimationFrame(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    };

    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, []);

  const toggleCategory = (slug: string) => {
    setOpenSlug((current) => {
      const next = current === slug ? "" : slug;
      if (next) {
        window.history.replaceState(null, "", `#${next}`);
        window.requestAnimationFrame(() => {
          document.getElementById(next)?.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      }
      return next;
    });
  };

  return (
    <section className="section-reveal mx-auto max-w-7xl px-4 py-10">
      <div className="space-y-3">
        {CATEGORIES.map((category) => (
          <CategoryAccordionItem
            key={category.slug}
            category={category}
            open={openSlug === category.slug}
            onToggle={() => toggleCategory(category.slug)}
          />
        ))}
      </div>
    </section>
  );
}

function CategoryAccordionItem({
  category,
  open,
  onToggle,
}: {
  category: Category;
  open: boolean;
  onToggle: () => void;
}) {
  const Icon = ICONS[category.icon] ?? Monitor;

  return (
    <article
      id={category.slug}
      className={`overflow-hidden rounded-xl border bg-card/80 scroll-mt-28 transition-colors ${
        open ? "border-primary/60 shadow-[0_20px_60px_-30px_var(--primary)]" : "border-border"
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className={`grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-3 p-3 text-left transition-colors hover:bg-secondary/50 sm:p-4 lg:p-5 ${
          open ? "bg-secondary/40" : ""
        }`}
      >
        <span className="flex min-w-0 items-center gap-3">
          <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg border border-border bg-background sm:h-16 sm:w-20">
            <img src={category.image} alt="" loading="lazy" className="h-full w-full object-cover opacity-85" />
            <span className="absolute inset-0 bg-gradient-to-tr from-background/70 to-transparent" />
            <span className="absolute bottom-1.5 left-1.5 grid h-6 w-6 place-items-center rounded-md bg-background/80 text-gold backdrop-blur">
              <Icon className="h-3.5 w-3.5" />
            </span>
          </span>
          <span className="min-w-0">
            <span className="block font-display text-lg font-extrabold text-foreground sm:text-xl">
              {category.name}
            </span>
            <span className="mt-0.5 block text-sm leading-snug text-muted-foreground">{category.short}</span>
          </span>
        </span>
        <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-md border transition-colors ${
          open ? "border-primary bg-primary/15 text-primary" : "border-border text-gold"
        }`}>
          <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
        </span>
      </button>

      {open && (
        <div className="animate-accordion-down border-t border-border/60 bg-background/40">
          <div className="grid gap-4 px-3 py-5 sm:px-4 md:grid-cols-2 lg:px-6 lg:py-7">
            {category.subcategories.map((subcategory) => (
              <section
                key={subcategory.slug}
                id={subcategory.slug}
                className={`flex h-full scroll-mt-32 flex-col rounded-xl border border-border/70 bg-card/80 p-3 shadow-[0_14px_40px_-30px_var(--foreground)] sm:p-4 ${
                  subcategory.products.length > 2 ? "md:col-span-2" : ""
                }`}
              >
                <header className="mb-3 grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3 border-b border-border/50 pb-3">
                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-primary">{category.name}</p>
                    <h2 className="mt-1 font-display text-lg font-bold text-foreground sm:text-xl">
                      {subcategory.name}
                    </h2>
                  </div>
                  <div className="relative h-14 w-18 shrink-0 overflow-hidden rounded-lg border border-border bg-background sm:h-16 sm:w-20">
                    <img src={subcategory.image} alt="" loading="lazy" className="h-full w-full object-cover opacity-90" />
                    <div className="absolute inset-0 bg-gradient-to-t from-card/70 to-transparent" />
                  </div>
                </header>
                <ProductGrid categoryName={category.name} subcategory={subcategory} products={subcategory.products} />
              </section>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}

function ProductGrid({
  categoryName,
  subcategory,
  products,
}: {
  categoryName: string;
  subcategory: Subcategory;
  products: Product[];
}) {
  const layoutClass =
    products.length === 1
      ? "grid-cols-1"
      : products.length === 2
        ? "grid-cols-1 sm:grid-cols-2"
        : "justify-center [grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),320px))]";

  return (
    <div className={`grid h-full flex-1 gap-4 ${layoutClass}`}>
      {products.map((product) => (
        <ProductCard key={product.name} categoryName={categoryName} subcategory={subcategory} product={product} />
      ))}
    </div>
  );
}

function ProductCard({
  categoryName,
  subcategory,
  product,
}: {
  categoryName: string;
  subcategory: Subcategory;
  product: Product;
}) {
  const isMobileLcdDisplay = product.name === "Mobile LCD Display";

  return (
    <article className="card-glow flex h-full min-h-[360px] flex-col overflow-hidden rounded-lg border border-border bg-background/80">
      <div className="relative aspect-video overflow-hidden bg-card">
        <img
          src={productImageByName[product.name] ?? subcategory.image}
          alt={`${product.name} for ${categoryName}`}
          loading="lazy"
          width={960}
          height={540}
          className={`h-full w-full opacity-95 transition-all duration-500 hover:opacity-100 ${
            isMobileLcdDisplay ? "object-contain p-3 hover:scale-[1.02]" : "object-cover hover:scale-105"
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
        <span className="absolute left-2.5 top-2.5 max-w-[calc(100%-1.25rem)] rounded-full bg-background/85 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-gold backdrop-blur">
          {subcategory.name}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="min-h-[2.5rem] font-display text-base font-bold leading-snug text-foreground line-clamp-2">
          {product.name}
        </h3>
        <p className="mt-1.5 text-sm leading-snug text-muted-foreground line-clamp-2">{product.description}</p>
        <ul className="mt-3 grid content-start grid-cols-1 gap-1.5 sm:grid-cols-2">
          {product.specs.slice(0, 6).map((spec) => (
            <li key={spec} className="flex min-h-8 items-center rounded-md border border-primary/25 bg-primary/5 px-2 py-1 text-[11px] font-medium leading-snug text-primary">
              {spec}
            </li>
          ))}
        </ul>
        <p className="mt-3 text-xs leading-snug text-muted-foreground line-clamp-3">
          <span className="font-semibold uppercase tracking-wider text-gold">Applications: </span>
          {product.applications}
        </p>
        <div className="mt-auto pt-4">
          <Link
            to="/contact"
            className="inline-flex w-fit items-center gap-2 rounded-md bg-primary px-3 py-2 text-xs font-semibold uppercase tracking-wider text-primary-foreground transition-all hover:brightness-110 hover:shadow-[0_0_25px_-8px_var(--primary)]"
          >
            Get Quote <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}