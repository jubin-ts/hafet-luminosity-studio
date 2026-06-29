import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Calendar } from "lucide-react";
import b1 from "@/assets/blog-1.jpg";
import b2 from "@/assets/blog-2.jpg";
import b3 from "@/assets/blog-3.jpg";
import b4 from "@/assets/blog-4.jpg";
import b5 from "@/assets/blog-5.jpg";
import b6 from "@/assets/blog-6.jpg";

export const Route = createFileRoute("/blogs")({
  head: () => ({
    meta: [
      { title: "LED Display & Digital Signage Blog — Hafet Media" },
      { name: "description", content: "Expert LED display, digital signage, electronic shelf label, outdoor billboard, rental LED and naked-eye 3D LED guides for Dubai, UAE and GCC projects." },
      { property: "og:title", content: "LED Display & Digital Signage Blog — Hafet Media" },
      { property: "og:description", content: "Practical guides and trends for LED walls, signage, kiosks, ESL systems and visual technology across the GCC." },
      { property: "og:url", content: "/blogs" },
    ],
    links: [{ rel: "canonical", href: "/blogs" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "Hafet Media Solutions Blog",
          description: "LED display and digital signage insights for Dubai, UAE and GCC businesses.",
          blogPost: POSTS.map((post) => ({
            "@type": "BlogPosting",
            headline: post.title,
            datePublished: post.date,
            description: post.excerpt,
          })),
        }),
      },
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
    excerpt: "Pixel pitch determines clarity, viewing distance and budget. For boardrooms, lobbies and control rooms, the right choice balances sharp text, smooth video and comfortable viewing from the closest seat.",
    points: ["Fine-pixel LED for close viewing", "Higher brightness for atriums", "Service access planned before installation"],
  },
  {
    img: b2,
    tag: "Trends",
    title: "Why 360° immersive LED rooms are the next big brand experience",
    date: "April 28, 2025",
    excerpt: "From real estate showrooms to museums and launch events, immersive LED rooms surround visitors with synchronized content and create memorable, camera-ready experiences.",
    points: ["Floor-to-wall content continuity", "High refresh rate for cameras", "Ideal for premium brand storytelling"],
  },
  {
    img: b3,
    tag: "Retail",
    title: "Electronic shelf labels: 0.00001% error rate vs 6% manual",
    date: "April 9, 2025",
    excerpt: "Electronic shelf labels reduce manual price changes, improve pricing accuracy and help supermarkets, pharmacies and electronics chains update thousands of displays in seconds.",
    points: ["Central price updates", "Lower staff workload", "Better promo compliance"],
  },
  {
    img: b4,
    tag: "Outdoor",
    title: "Engineering LED billboards for UAE summer conditions",
    date: "March 22, 2025",
    excerpt: "Outdoor LED billboards in the UAE need more than high brightness. IP-rated cabinets, thermal design, corrosion protection and service-safe structures all affect long-term reliability.",
    points: ["IP65 weather protection", "10,000-nit daylight visibility", "Heat-managed cabinet design"],
  },
  {
    img: b5,
    tag: "Events",
    title: "Rental LED for events: what to ask before you book",
    date: "March 5, 2025",
    excerpt: "Event teams should compare pixel pitch, rigging method, processor setup, backup panels and on-site support before choosing indoor or outdoor rental LED screens.",
    points: ["Indoor vs outdoor cabinet choice", "Backup signal planning", "Fast assembly and dismantling"],
  },
  {
    img: b6,
    tag: "Signage",
    title: "Naked-eye 3D LED: how the viral effect actually works",
    date: "February 18, 2025",
    excerpt: "Naked-eye 3D LED relies on corner geometry, viewing angle and anamorphic content production to create depth without glasses on landmark building displays.",
    points: ["Corner LED geometry", "Anamorphic content mapping", "High contrast outdoor playback"],
  },
];

const FAQS = [
  {
    q: "What LED display is best for indoor retail and corporate spaces?",
    a: "Fine-pixel indoor LED displays are best for close viewing in showrooms, offices, hotels and control rooms because they keep text, product visuals and video content sharp from short distances.",
  },
  {
    q: "Can outdoor LED screens work reliably in Dubai weather?",
    a: "Yes. Outdoor LED screens for Dubai and GCC conditions should use high-brightness panels, IP-rated cabinets, heat-managed power systems and corrosion-resistant structures.",
  },
  {
    q: "Do electronic shelf labels improve retail operations?",
    a: "Electronic shelf labels help retailers update prices centrally, reduce manual errors, improve promotion speed and keep shelf pricing aligned with POS systems.",
  },
  {
    q: "What makes naked-eye 3D LED different from a normal LED billboard?",
    a: "Naked-eye 3D LED uses a corner display, exact viewing angle and custom anamorphic content so visuals appear to extend beyond the screen without special glasses.",
  },
];

function BlogsPage() {
  return (
    <>
      <section className="section-reveal border-b border-border/60">
        <div className="mx-auto max-w-5xl px-5 py-20 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Insights</p>
          <h1 className="mt-3 font-display text-4xl font-extrabold sm:text-5xl lg:text-6xl">
            From the <span className="text-gradient-gold">Blog</span>
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-muted-foreground">
            Practical LED display, digital signage, electronic shelf label and signage guides for
            businesses planning high-impact visual technology projects in Dubai, UAE and across the GCC.
          </p>
        </div>
      </section>

      <section className="section-reveal mx-auto max-w-7xl px-5 py-16">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {POSTS.map((p, i) => (
            <article key={i} className="card-glow group flex flex-col overflow-hidden rounded-xl border border-border bg-card">
              <div className="aspect-[16/10] overflow-hidden">
                <img src={p.img} alt={p.title} loading="lazy" width={1280} height={900} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
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
                <ul className="mt-4 space-y-2 text-xs text-muted-foreground">
                  {p.points.map((point) => (
                    <li key={point} className="flex gap-2"><span className="text-gold">•</span><span>{point}</span></li>
                  ))}
                </ul>
                <a href="mailto:info@hafetmedia.ae" className="mt-auto inline-flex items-center gap-1.5 pt-5 text-xs font-semibold uppercase tracking-wider text-gold hover:text-primary">
                  Ask our team <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-reveal border-t border-border/60 bg-card/20">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">FAQ</p>
            <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">Digital signage questions buyers ask</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Clear answers for decision-makers comparing LED screens, LCD kiosks, electronic shelf labels,
              3D signage and rental LED solutions for GCC environments.
            </p>
          </div>
          <div className="grid gap-4">
            {FAQS.map((item) => (
              <article key={item.q} className="rounded-xl border border-border bg-card p-6">
                <h3 className="font-display text-lg font-bold text-gold">{item.q}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.a}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
