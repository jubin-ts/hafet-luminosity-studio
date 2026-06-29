import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Calendar } from "lucide-react";
import b1 from "@/assets/blog-1.jpg";
import b2 from "@/assets/blog-2.jpg";
import b3 from "@/assets/blog-3.jpg";

export const Route = createFileRoute("/blogs")({
  head: () => ({
    meta: [
      { title: "Blog — Hafet Media Solutions" },
      { name: "description", content: "Insights on LED displays, digital signage trends and smart retail technology from Hafet Media Solutions." },
      { property: "og:title", content: "Blog — Hafet Media Solutions" },
      { property: "og:description", content: "Stories, guides and trends in digital signage." },
    ],
  }),
  component: BlogsPage,
});

const POSTS = [
  {
    img: b1,
    tag: "Installation",
    title: "Choosing the right pixel pitch for your indoor LED wall",
    date: "May 12, 2025",
    excerpt: "Pixel pitch determines clarity and minimum viewing distance. Here's a practical guide for boardrooms, lobbies and control rooms.",
  },
  {
    img: b2,
    tag: "Trends",
    title: "Why 360° immersive LED rooms are the next big brand experience",
    date: "April 28, 2025",
    excerpt: "From showrooms to museum installations, surround LED environments are redefining how brands tell stories at scale.",
  },
  {
    img: b3,
    tag: "Retail",
    title: "Electronic shelf labels: 0.00001% error rate vs 6% manual",
    date: "April 9, 2025",
    excerpt: "ESL systems update 10,000 labels in 10 seconds. We break down ROI for supermarkets, pharmacies and electronics chains.",
  },
  {
    img: b1,
    tag: "Outdoor",
    title: "Engineering LED billboards for UAE summer conditions",
    date: "March 22, 2025",
    excerpt: "IP65, anti-corrosion cabinets and 10,000-nit brightness — what really matters for permanent outdoor displays.",
  },
  {
    img: b3,
    tag: "Events",
    title: "Rental LED for events: what to ask before you book",
    date: "March 5, 2025",
    excerpt: "A checklist for event managers comparing indoor vs outdoor rental series, content workflows and on-site support.",
  },
  {
    img: b2,
    tag: "Signage",
    title: "Naked-eye 3D LED: how the viral effect actually works",
    date: "February 18, 2025",
    excerpt: "Corner installations create depth without glasses. We explain the optical principle and the production pipeline.",
  },
];

function BlogsPage() {
  return (
    <>
      <section className="border-b border-border/60">
        <div className="mx-auto max-w-5xl px-5 py-20 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Insights</p>
          <h1 className="mt-3 font-display text-4xl font-extrabold sm:text-5xl lg:text-6xl">
            From the <span className="text-gradient-gold">Blog</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-muted-foreground">
            Guides, trends and engineering notes from our LED & digital signage team in Dubai.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {POSTS.map((p, i) => (
            <article key={i} className="card-glow group flex flex-col overflow-hidden rounded-xl border border-border bg-card">
              <div className="aspect-[16/10] overflow-hidden">
                <img src={p.img} alt={p.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center gap-3 text-xs">
                  <span className="rounded-full bg-primary/15 px-3 py-1 font-semibold uppercase tracking-wider text-primary">{p.tag}</span>
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5" /> {p.date}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-lg font-bold leading-snug group-hover:text-primary">{p.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{p.excerpt}</p>
                <a href="#" className="mt-auto inline-flex items-center gap-1.5 pt-5 text-xs font-semibold uppercase tracking-wider text-gold hover:text-primary">
                  Read more <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
