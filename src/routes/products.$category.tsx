import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { getCategory } from "@/lib/products";
import { ProductCatalogAccordion } from "@/components/site/ProductCatalogAccordion";

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

      <ProductCatalogAccordion initialCategorySlug={cat.slug} />
    </>
  );
}
