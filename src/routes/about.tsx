import { createFileRoute, Link } from "@tanstack/react-router";
import { Target, Eye, Heart, MapPin } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Hafet Media Solutions" },
      { name: "description", content: "Hafet Media Solutions is a Dubai-based LED display and digital signage company serving the GCC with premium visual technology." },
      { property: "og:title", content: "About Hafet Media Solutions" },
      { property: "og:description", content: "5+ years, 500+ projects across UAE & the GCC." },
    ],
  }),
  component: AboutPage,
});

const PILLARS = [
  { icon: Target, title: "Our Mission", text: "To empower brands across the GCC with visual experiences that captivate audiences and deliver measurable impact." },
  { icon: Eye, title: "Our Vision", text: "To be the region's most trusted partner for LED, digital signage and smart retail technology." },
  { icon: Heart, title: "Our Values", text: "Engineering excellence, transparency, long-term partnerships and obsessive attention to detail." },
];

const STATS = [
  ["5+", "Years of Excellence"],
  ["500+", "Projects Delivered"],
  ["50+", "Trusted Clients"],
  ["MENA", "Regional Coverage"],
];

function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border/60">
        <div className="absolute inset-0 led-glow opacity-50" />
        <div className="relative mx-auto max-w-5xl px-5 py-24 text-center sm:py-32">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">About Us</p>
          <h1 className="mt-4 font-display text-4xl font-extrabold sm:text-5xl lg:text-6xl">
            Visual technology, <span className="text-gradient-gold">crafted in Dubai</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Hafet Media Solutions is a full-service LED display and digital signage company headquartered
            in Dubai. We combine specialist engineering, premium hardware and end-to-end project management
            to deliver flagship installations across the GCC.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20">
        <div className="grid gap-6 md:grid-cols-3">
          {PILLARS.map(({ icon: Icon, title, text }) => (
            <div key={title} className="card-glow rounded-xl border border-border bg-card p-8">
              <div className="grid h-12 w-12 place-items-center rounded-lg bg-primary/15 text-primary">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-display text-xl font-bold text-gold">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-border/60 bg-card/20">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-5 py-16 md:grid-cols-4">
          {STATS.map(([v, l]) => (
            <div key={l} className="text-center">
              <div className="font-display text-4xl font-extrabold text-gradient-gold sm:text-5xl">{v}</div>
              <div className="mt-2 text-xs uppercase tracking-wider text-muted-foreground">{l}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-24">
        <div className="rounded-2xl border border-border bg-card p-10 text-center">
          <MapPin className="mx-auto h-8 w-8 text-primary" />
          <h2 className="mt-4 font-display text-2xl font-bold sm:text-3xl">Visit our Dubai office</h2>
          <p className="mt-3 text-muted-foreground">
            Office No. 102, RKM Building, 28th Street, Hor Al Anz East, Dubai, UAE
          </p>
          <Link to="/contact" className="mt-7 inline-flex rounded-md bg-primary px-6 py-3 text-sm font-semibold uppercase tracking-wider text-primary-foreground hover:brightness-110">
            Get in touch
          </Link>
        </div>
      </section>
    </>
  );
}
