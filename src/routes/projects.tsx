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

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — Hafet Media Solutions" },
      { name: "description", content: "Selected LED, signage, kiosk and rental projects delivered across the GCC by Hafet Media Solutions." },
      { property: "og:title", content: "Our Projects — Hafet Media Solutions" },
      { property: "og:description", content: "Flagship installations across UAE, KSA, Qatar and beyond." },
    ],
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
  { img: p2, title: "Corporate HQ Lobby Wall", location: "Muscat, Oman", tag: "Indoor" },
  { img: p3, title: "Mall Interactive Touch Stations", location: "Abu Dhabi, UAE", tag: "Kiosk" },
  { img: p1, title: "Festival Main Stage LED", location: "Dubai, UAE", tag: "Events" },
  { img: p4, title: "Retail Window Adhesive LED", location: "Sharjah, UAE", tag: "Signage" },
  { img: p7, title: "Product Launch Rental Setup", location: "Jeddah, KSA", tag: "Events" },
];

function ProjectsPage() {
  const [filter, setFilter] = useState<"All" | Cat>("All");
  const items = useMemo(
    () => (filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.tag === filter)),
    [filter]
  );

  return (
    <>
      <section className="border-b border-border/60">
        <div className="mx-auto max-w-7xl px-5 py-20 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Our Work</p>
          <h1 className="mt-3 font-display text-4xl font-extrabold sm:text-5xl lg:text-6xl">
            Selected <span className="text-gradient-gold">Projects</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-muted-foreground">
            A snapshot of flagship LED, signage and digital experiences delivered across the GCC.
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

      <section className="mx-auto max-w-7xl px-5 py-16">
        <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
          {items.map((p, i) => (
            <article key={i} className="card-glow group relative break-inside-avoid overflow-hidden rounded-xl border border-border bg-card">
              <img src={p.img} alt={p.title} loading="lazy" className="w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="absolute inset-x-0 bottom-0 translate-y-4 p-5 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <span className="inline-block rounded-full bg-primary px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary-foreground">
                  {p.tag}
                </span>
                <h3 className="mt-3 font-display text-lg font-bold text-foreground">{p.title}</h3>
                <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5 text-gold" /> {p.location}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
