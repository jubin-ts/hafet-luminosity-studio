import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, ChevronDown, Monitor, Tv, Sparkles, Tag } from "lucide-react";
import logo from "@/assets/hafet-logo-white.png";
import { CATEGORIES } from "@/lib/products";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  monitor: Monitor, tv: Tv, sparkles: Sparkles, tag: Tag,
};

type NavItem = { to: "/" | "/about" | "/products" | "/projects" | "/blogs" | "/contact"; label: string; mega?: boolean };

const NAV: NavItem[] = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/products", label: "Products", mega: true },
  { to: "/projects", label: "Projects" },
  { to: "/blogs", label: "Blogs" },
  { to: "/contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const closeMenus = () => {
    setOpen(false);
    setMegaOpen(false);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/90 backdrop-blur-md border-b border-border/60" : "bg-background/40 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:gap-5 sm:px-5 lg:py-5">
        <Link to="/" className="flex min-w-0 items-center gap-2 sm:gap-3" onClick={closeMenus}>
          <img src={logo} alt="Hafet Media Solutions" width={280} height={79} className="h-10 w-auto shrink-0 sm:h-14 lg:h-20" />
          <span className="flex min-w-0 flex-col font-display text-[11px] font-extrabold uppercase leading-tight tracking-wide text-foreground sm:text-base">
            <span className="truncate">Hafet Media</span>
            <span className="truncate text-gradient-gold">Solutions</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex xl:gap-2">
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
                  onClick={() => setMegaOpen(false)}
                  className="flex items-center gap-1 rounded-md px-2.5 py-2.5 text-xs font-medium uppercase tracking-wider text-muted-foreground transition-colors hover:text-primary xl:px-4 xl:text-sm"
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
                                hash={c.slug}
                                onClick={() => setMegaOpen(false)}
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
                                      onClick={() => setMegaOpen(false)}
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
            ) : (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMegaOpen(false)}
                className="rounded-md px-2.5 py-2.5 text-xs font-medium uppercase tracking-wider text-muted-foreground transition-colors hover:text-primary xl:px-4 xl:text-sm"
                activeProps={{ className: "text-primary" }}
                activeOptions={{ exact: item.to === "/" }}
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        <div className="hidden xl:block">
          <Link
            to="/contact"
            className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-semibold uppercase tracking-wider text-primary-foreground transition-all hover:brightness-110 hover:shadow-[0_0_25px_-5px_var(--primary)]"
          >
            Get a Quote
          </Link>
        </div>

        <button
          aria-label="Open menu"
          className="grid h-10 w-10 place-items-center rounded-md border border-border text-foreground min-[900px]:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile full-screen overlay */}
      {open && (
        <div className="fixed inset-0 z-40 overflow-y-auto bg-background/98 pt-[92px] min-[900px]:hidden">
          <nav className="flex min-h-[calc(100svh-92px)] flex-col gap-1 px-6 pb-8">
            <Link
              to="/"
              onClick={closeMenus}
              className="border-b border-border/60 py-4 text-lg font-semibold uppercase tracking-wide text-foreground hover:text-primary"
              activeProps={{ className: "text-primary" }}
              activeOptions={{ exact: true }}
            >
              Home
            </Link>
            <Link
              to="/about"
              onClick={closeMenus}
              className="border-b border-border/60 py-4 text-lg font-semibold uppercase tracking-wide text-foreground hover:text-primary"
              activeProps={{ className: "text-primary" }}
            >
              About Us
            </Link>
            <Link
              to="/projects"
              onClick={closeMenus}
              className="border-b border-border/60 py-4 text-lg font-semibold uppercase tracking-wide text-foreground hover:text-primary"
              activeProps={{ className: "text-primary" }}
            >
              Projects
            </Link>

            <div className="border-b border-border/60">
              <button
                type="button"
                onClick={() => setMobileProductsOpen((value) => !value)}
                aria-expanded={mobileProductsOpen}
                className="flex w-full items-center justify-between py-4 text-lg font-semibold uppercase tracking-wide text-foreground hover:text-primary"
              >
                Products
                <ChevronDown className={`h-5 w-5 text-gold transition-transform ${mobileProductsOpen ? "rotate-180" : ""}`} />
              </button>
              <div
                className={`grid transition-[grid-template-rows,opacity] duration-300 ${
                  mobileProductsOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden pb-4">
                  <Link
                    to="/products"
                    onClick={closeMenus}
                    className="block rounded-md px-3 py-3 text-sm font-semibold uppercase tracking-wider text-gold hover:bg-card"
                  >
                    All Products
                  </Link>
                  {CATEGORIES.map((category) => {
                    const Icon = ICONS[category.icon] ?? Monitor;
                    return (
                      <Link
                        key={category.slug}
                        to="/products/$category"
                        params={{ category: category.slug }}
                        hash={category.slug}
                        onClick={closeMenus}
                        className="flex items-center gap-3 rounded-md px-3 py-3 text-sm font-medium text-muted-foreground hover:bg-card hover:text-primary"
                      >
                        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-primary/10 text-primary">
                          <Icon className="h-4 w-4" />
                        </span>
                        {category.name}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>

            <Link
              to="/blogs"
              onClick={closeMenus}
              className="border-b border-border/60 py-4 text-lg font-semibold uppercase tracking-wide text-foreground hover:text-primary"
              activeProps={{ className: "text-primary" }}
            >
              Blogs
            </Link>
            <Link
              to="/contact"
              onClick={closeMenus}
              className="border-b border-border/60 py-4 text-lg font-semibold uppercase tracking-wide text-foreground hover:text-primary"
              activeProps={{ className: "text-primary" }}
            >
              Contact Us
            </Link>

            <div className="mt-auto pt-8">
              <Link
                to="/contact"
                onClick={closeMenus}
                className="inline-flex w-full items-center justify-center rounded-md bg-primary px-5 py-3.5 text-base font-semibold uppercase tracking-wider text-primary-foreground"
              >
                Get a Quote
              </Link>
              <div className="mt-6 space-y-1 text-sm text-muted-foreground">
                <p>+971 54 512 8212</p>
                <p>info@hafetmedia.ae</p>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

