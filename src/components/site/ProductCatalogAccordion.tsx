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
      if (next) window.history.replaceState(null, "", `#${next}`);
      return next;
    });
  };

  return (
    <section className="section-reveal mx-auto max-w-7xl px-5 py-16">
      <div className="space-y-5">
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
    <article id={category.slug} className="overflow-hidden rounded-xl border border-border bg-card/70 scroll-mt-28">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-4 p-4 text-left transition-colors hover:bg-secondary/50 sm:p-5 lg:p-6"
      >
        <span className="flex min-w-0 items-center gap-4">
          <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-border bg-background sm:h-20 sm:w-24">
            <img src={category.image} alt="" loading="lazy" className="h-full w-full object-cover opacity-85" />
            <span className="absolute inset-0 bg-gradient-to-tr from-background/70 to-transparent" />
            <span className="absolute bottom-2 left-2 grid h-7 w-7 place-items-center rounded-md bg-background/80 text-gold backdrop-blur">
              <Icon className="h-4 w-4" />
            </span>
          </span>
          <span className="min-w-0">
            <span className="block font-display text-xl font-extrabold text-foreground sm:text-2xl">
              {category.name}
            </span>
            <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">{category.short}</span>
          </span>
        </span>
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md border border-border text-gold">
          <ChevronDown className={`h-5 w-5 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
        </span>
      </button>

      <div
        className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="grid auto-rows-fr gap-6 border-t border-border/60 bg-background/25 px-4 py-8 sm:px-6 md:grid-cols-2 lg:px-8 lg:py-10">
            {category.subcategories.map((subcategory) => (
              <section
                key={subcategory.slug}
                id={subcategory.slug}
                className={`flex h-full scroll-mt-32 flex-col rounded-xl border border-border/70 bg-card/80 p-4 shadow-[0_18px_50px_-38px_var(--foreground)] sm:p-5 ${
                  subcategory.products.length > 2 ? "md:col-span-2" : ""
                }`}
              >
                <header className="mb-5 grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 border-b border-border/50 pb-4">
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">{category.name}</p>
                    <h2 className="mt-2 font-display text-xl font-bold text-foreground sm:text-2xl">
                      {subcategory.name}
                    </h2>
                  </div>
                  <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-lg border border-border bg-background sm:h-20 sm:w-24">
                    <img src={subcategory.image} alt="" loading="lazy" className="h-full w-full object-cover opacity-90" />
                    <div className="absolute inset-0 bg-gradient-to-t from-card/70 to-transparent" />
                  </div>
                </header>
                <ProductGrid categoryName={category.name} subcategory={subcategory} products={subcategory.products} />
              </section>
            ))}
          </div>
        </div>
      </div>
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
  return (
    <div className="grid flex-1 auto-rows-fr gap-5 [grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr))]">
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
  return (
    <article className="card-glow flex h-full min-h-[500px] flex-col overflow-hidden rounded-lg border border-border bg-background/80">
      <div className="relative aspect-[4/3] overflow-hidden bg-card">
        <img
          src={productImageByName[product.name] ?? subcategory.image}
          alt={`${product.name} for ${categoryName}`}
          loading="lazy"
          width={960}
          height={720}
          className="h-full w-full object-cover opacity-95 transition-all duration-500 hover:scale-105 hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
        <span className="absolute left-3 top-3 max-w-[calc(100%-1.5rem)] rounded-full bg-background/85 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-gold backdrop-blur">
          {subcategory.name}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="min-h-[3.25rem] font-display text-lg font-bold leading-snug text-foreground line-clamp-2">
          {product.name}
        </h3>
        <p className="mt-2 min-h-[3.25rem] text-sm leading-relaxed text-muted-foreground line-clamp-2">{product.description}</p>
        <ul className="mt-4 grid min-h-[7.25rem] content-start grid-cols-1 gap-1.5 sm:grid-cols-2">
          {product.specs.slice(0, 6).map((spec) => (
            <li key={spec} className="flex min-h-9 items-center rounded-md border border-primary/25 bg-primary/5 px-2.5 py-1 text-[11px] font-medium leading-snug text-primary">
              {spec}
            </li>
          ))}
        </ul>
        <p className="mt-4 min-h-[3rem] text-xs leading-relaxed text-muted-foreground line-clamp-3">
          <span className="font-semibold uppercase tracking-wider text-gold">Applications: </span>
          {product.applications}
        </p>
        <div className="mt-auto pt-6">
          <Link
            to="/contact"
            className="inline-flex w-fit items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-primary-foreground transition-all hover:brightness-110 hover:shadow-[0_0_25px_-8px_var(--primary)]"
          >
            Get Quote <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}