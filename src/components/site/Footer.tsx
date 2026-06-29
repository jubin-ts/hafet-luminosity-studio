import { Link } from "@tanstack/react-router";
import { Instagram, Linkedin, Youtube, Phone, Mail, MapPin } from "lucide-react";
import logoAsset from "@/assets/logo.png.asset.json";
const logo = logoAsset.url;
import { SITE } from "@/lib/site";
import { CATEGORIES } from "@/lib/products";

const WhatsApp = (props: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={props.className} aria-hidden>
    <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 018.413 3.488 11.82 11.82 0 013.48 8.414c-.003 6.554-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.516 5.26l-.999 3.648 3.972-1.607zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.296-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.71.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z" />
  </svg>
);

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-5 py-16">
        <div className="grid gap-10 text-center md:grid-cols-3 md:items-start md:text-left lg:grid-cols-4 lg:gap-12">
          <div className="lg:col-span-1">
            <img src={logo} alt={SITE.name} width={200} height={56} className="mx-auto h-12 w-auto md:mx-0" />
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              Premium LED displays, digital signage and electronic shelf solutions across the GCC.
            </p>
          </div>

          <div className="hidden lg:block">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gold">Quick Links</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              {[
                ["Home", "/"],
                ["About", "/about"],
                ["Projects", "/projects"],
                ["Products", "/products"],
                ["Blogs", "/blogs"],
                ["Contact", "/contact"],
              ].map(([label, to]) => (
                <li key={to}>
                  <Link to={to} className="transition-colors hover:text-primary">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="hidden lg:block">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gold">Products</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              {CATEGORIES.map((c) => (
                <li key={c.slug}>
                  <Link
                    to="/products/$category"
                    params={{ category: c.slug }}
                    className="transition-colors hover:text-primary"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:order-3 lg:order-none">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gold">Social</h4>
            <div className="mt-4 flex justify-center gap-2 md:justify-start">
              {[
                { href: SITE.social.instagram, Icon: Instagram, label: "Instagram" },
                { href: SITE.social.linkedin, Icon: Linkedin, label: "LinkedIn" },
                { href: SITE.social.whatsapp, Icon: WhatsApp, label: "WhatsApp" },
                { href: SITE.social.youtube, Icon: Youtube, label: "YouTube" },
              ].map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid h-9 w-9 place-items-center rounded-md border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gold">Contact</h4>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li className="flex justify-center gap-3 md:justify-start">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>{SITE.address}</span>
              </li>
              <li className="flex justify-center gap-3 md:justify-start">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <a href={`mailto:${SITE.email}`} className="hover:text-primary">{SITE.email}</a>
              </li>
              <li className="flex justify-center gap-3 md:justify-start">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <a href={`tel:${SITE.phoneRaw}`} className="hover:text-primary">{SITE.phone}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-6 text-xs text-muted-foreground md:flex-row">
          <p>© 2025 {SITE.name}. All rights reserved.</p>
          <p className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
            {SITE.regions.map((r, i) => (
              <span key={r} className="flex items-center gap-3">
                <span>{r}</span>
                {i < SITE.regions.length - 1 && <span className="text-gold">•</span>}
              </span>
            ))}
          </p>
        </div>
      </div>
    </footer>
  );
}
