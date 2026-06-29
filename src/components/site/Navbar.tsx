import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, ChevronDown, Monitor, Tv, Sparkles, Tag } from "lucide-react";
import logoAsset from "@/assets/logo.png.asset.json";
const logo = logoAsset.url;
import { CATEGORIES } from "@/lib/products";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  monitor: Monitor, tv: Tv, sparkles: Sparkles, tag: Tag,
};

type NavItem =
  | { to: "/" | "/about" | "/projects" | "/products" | "/blogs" | "/contact"; label: string; mega?: boolean }
  | { to: "/products/$category"; params: { category: string }; label: string; mega?: boolean };

const NAV: NavItem[] = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/products", label: "Products", mega: true },
  { to: "/products/$category", params: { category: "led-screen-displays" }, label: "LED" },
  { to: "/products/$category", params: { category: "lcd-screens-kiosks" }, label: "LCD" },
  { to: "/products/$category", params: { category: "3d-neon-signage" }, label: "Signage" },
  { to: "/products/$category", params: { category: "electronic-shelf-solutions" }, label: "Shelf" },
  { to: "/projects", label: "Projects" },
  { to: "/blogs", label: "Blogs" },
  { to: "/contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/90 backdrop-blur-md border-b border-border/60" : "bg-background/40 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-3 lg:py-4">
        <Link to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <img src={logo} alt="Hafet Media Solutions" width={180} height={50} className="h-10 w-auto lg:h-12" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) =>
            item.mega ? (
              <div
                key={item.to}
                className="relative"
                onMouseEnter={() => setMegaOpen(true)}
                onMouseLeave={() => setMegaOpen(false)}
              >
                <Link
                  to={item.to}
                  className="flex items-center gap-1 rounded-md px-4 py-2 text-sm font-medium uppercase tracking-wider text-muted-foreground transition-colors hover:text-primary"
                  activeProps={{ className: "text-primary" }}
                >
                  {item.label}
                  <ChevronDown className="h-3.5 w-3.5" />
                </Link>
                {megaOpen && (
                  <div className="absolute left-1/2 top-full w-[min(90vw,1100px)] -translate-x-1/2 pt-3">
                    <div className="rounded-xl border border-border bg-popover/95 p-6 shadow-2xl backdrop-blur-xl">
                      <div className="grid grid-cols-4 gap-6">
                        {CATEGORIES.map((c) => {
                          const Icon = ICONS[c.icon] ?? Monitor;
                          return (
                            <div key={c.slug}>
                              <Link
                                to="/products/$category"
                                params={{ category: c.slug }}
                                className="group flex items-center gap-2 text-sm font-semibold text-foreground"
                              >
                                <span className="grid h-8 w-8 place-items-center rounded-md bg-primary/10 text-primary group-hover:bg-primary/20">
                                  <Icon className="h-4 w-4" />
                                </span>
                                <span className="group-hover:text-primary">{c.name}</span>
                              </Link>
                              <ul className="mt-3 space-y-1.5 border-l border-border/60 pl-4">
                                {c.subcategories.slice(0, 8).map((s) => (
                                  <li key={s.slug}>
                                    <Link
                                      to="/products/$category"
                                      params={{ category: c.slug }}
                                      hash={s.slug}
                                      className="text-xs text-muted-foreground transition-colors hover:text-gold"
                                    >
                                      {s.name}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : "params" in item ? (
              <Link
                key={item.label}
                to={item.to}
                params={item.params}
                className="rounded-md px-3 py-2 text-sm font-medium uppercase tracking-wider text-muted-foreground transition-colors hover:text-primary"
                activeProps={{ className: "text-primary" }}
              >
                {item.label}
              </Link>
            ) : (
              <Link
                key={item.to}
                to={item.to}
                className="rounded-md px-3 py-2 text-sm font-medium uppercase tracking-wider text-muted-foreground transition-colors hover:text-primary"
                activeProps={{ className: "text-primary" }}
                activeOptions={{ exact: item.to === "/" }}
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        <div className="hidden lg:block">
          <Link
            to="/contact"
            className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-semibold uppercase tracking-wider text-primary-foreground transition-all hover:brightness-110 hover:shadow-[0_0_25px_-5px_var(--primary)]"
          >
            Get a Quote
          </Link>
        </div>

        <button
          aria-label="Open menu"
          className="grid h-10 w-10 place-items-center rounded-md border border-border text-foreground lg:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile full-screen overlay */}
      {open && (
        <div className="fixed inset-0 top-[68px] z-40 overflow-y-auto bg-background lg:hidden">
          <nav className="flex flex-col gap-1 px-6 py-8">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="border-b border-border/60 py-4 text-xl font-medium uppercase tracking-wide text-foreground hover:text-primary"
                activeProps={{ className: "text-primary" }}
                activeOptions={{ exact: item.to === "/" }}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-6 inline-flex items-center justify-center rounded-md bg-primary px-5 py-3.5 text-base font-semibold uppercase tracking-wider text-primary-foreground"
            >
              Get a Quote
            </Link>
            <div className="mt-8 space-y-1 text-sm text-muted-foreground">
              <p>+971 54 512 8212</p>
              <p>info@hafetmedia.ae</p>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
