import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { MapPin } from "lucide-react";
import p1 from "@/assets/project-1.jpg";
import p2 from "@/assets/project-2.jpg";
import p3 from "@/assets/project-3.jpg";
import p4 from "@/assets/project-4.jpg";
import p5 from "@/assets/project-5.jpg";
import p6 from "@/assets/project-6.jpg";
import p7 from "@/assets/project-7.jpg";
import p8 from "@/assets/project-8.jpg";
import p9 from "@/assets/project-9.jpg";
import p10 from "@/assets/project-10.jpg";
import p11 from "@/assets/project-11.jpg";
import p12 from "@/assets/project-12.jpg";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "LED Display Projects in Dubai & GCC — Hafet Media" },
      { name: "description", content: "Explore Hafet Media LED display, digital signage, kiosk, transparent LED, stadium screen and rental LED projects across Dubai, UAE, Saudi Arabia, Qatar, Kuwait, Oman and Bahrain." },
      { property: "og:title", content: "LED Display & Digital Signage Projects — Hafet Media" },
      { property: "og:description", content: "Flagship indoor LED walls, outdoor billboards, kiosks, signage and event rental screens delivered across the GCC." },
      { property: "og:url", content: "/projects" },
    ],
    links: [{ rel: "canonical", href: "/projects" }],
  }),
  component: ProjectsPage,
});

type Cat = "Indoor" | "Outdoor" | "Kiosk" | "Signage" | "Events" | "Rental";

const FILTERS: ("All" | Cat)[] = ["All", "Indoor", "Outdoor", "Kiosk", "Signage", "Events", "Rental"];

const PROJECTS: { img: string; title: string; location: string; tag: Cat }[] = [
  { img: p1, title: "Sheikh Zayed Road Tower Billboard", location: "Dubai, UAE", tag: "Outdoor" },
  { img: p2, title: "Marina Hotel Curved Video Wall", location: "Dubai, UAE", tag: "Indoor" },
  { img: p3, title: "DXB Airport Wayfinding Kiosks", location: "Dubai, UAE", tag: "Kiosk" },
  { img: p4, title: "Boutique Transparent Glass Display", location: "Riyadh, KSA", tag: "Signage" },
  { img: p5, title: "Stadium Perimeter LED System", location: "Doha, Qatar", tag: "Outdoor" },
  { img: p6, title: "Hospitality Neon Flex Installation", location: "Kuwait City, Kuwait", tag: "Signage" },
  { img: p7, title: "Outdoor Concert Rental Screen", location: "Manama, Bahrain", tag: "Rental" },
  { img: p8, title: "Corporate HQ Lobby LED Wall", location: "Muscat, Oman", tag: "Indoor" },
  { img: p9, title: "Mall Interactive Touch Stations", location: "Abu Dhabi, UAE", tag: "Kiosk" },
  { img: p10, title: "Festival Main Stage LED", location: "Dubai, UAE", tag: "Events" },
  { img: p11, title: "Retail Window Adhesive LED", location: "Sharjah, UAE", tag: "Signage" },
  { img: p12, title: "Product Launch Rental Setup", location: "Jeddah, KSA", tag: "Events" },
];

function ProjectsPage() {
  const [filter, setFilter] = useState<"All" | Cat>("All");
  const items = useMemo(
    () => (filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.tag === filter)),
    [filter]
  );

  return (
    <>
      <section className="section-reveal border-b border-border/60">
        <div className="mx-auto max-w-7xl px-5 py-20 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Our Work</p>
          <h1 className="mt-3 font-display text-4xl font-extrabold sm:text-5xl lg:text-6xl">
            Selected <span className="text-gradient-gold">Projects</span>
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-muted-foreground">
            A balanced portfolio of indoor LED video walls, outdoor LED billboards, digital kiosks,
            transparent LED glass, neon signage and event rental screens delivered across the GCC.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-full border px-5 py-2 text-xs font-semibold uppercase tracking-wider transition-all ${
                  filter === f
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-muted-foreground hover:border-gold hover:text-gold"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="section-reveal mx-auto max-w-7xl px-5 py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p, i) => (
            <article key={p.title} className="card-glow group overflow-hidden rounded-xl border border-border bg-card">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={p.img} alt={p.title} loading="lazy" width={1280} height={960} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between gap-3">
                  <span className="inline-block rounded-full bg-primary/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary">
                    {p.tag}
                  </span>
                  <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5 text-gold" /> {p.location}
                  </p>
                </div>
                <h3 className="mt-4 font-display text-lg font-bold text-foreground">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  A tailored {p.tag.toLowerCase()} display installation focused on brightness, durability, content clarity and long-term service access.
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
