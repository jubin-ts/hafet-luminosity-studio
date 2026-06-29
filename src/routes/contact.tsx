import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { MapPin, Mail, Phone, Send, CheckCircle2, MessageCircle } from "lucide-react";
import { SITE } from "@/lib/site";
import { CATEGORIES } from "@/lib/products";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Hafet Media — LED Display Company Dubai" },
      { name: "description", content: "Contact Hafet Media Solutions at info@hafetmedia.ae or WhatsApp +971 54 512 8212 for LED displays, digital signage, kiosks, ESL labels and signage projects in Dubai and GCC." },
      { property: "og:title", content: "Contact Hafet Media Solutions" },
      { property: "og:description", content: "Speak with Dubai LED display and digital signage experts for UAE and GCC project quotes." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const subject = encodeURIComponent(`Project enquiry from ${form.get("name") || "website visitor"}`);
    const body = encodeURIComponent([
      `Name: ${form.get("name") || ""}`,
      `Company: ${form.get("company") || ""}`,
      `Email: ${form.get("email") || ""}`,
      `Phone: ${form.get("phone") || ""}`,
      `Product Interest: ${form.get("interest") || ""}`,
      "",
      String(form.get("message") || ""),
    ].join("\n"));
    window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <>
      <section className="section-reveal border-b border-border/60">
        <div className="mx-auto max-w-5xl px-5 py-20 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Get in touch</p>
          <h1 className="mt-3 font-display text-4xl font-extrabold sm:text-5xl lg:text-6xl">
            Let's build something <span className="text-gradient-gold">brilliant</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-muted-foreground">
            Tell us about your project — our Dubai team will respond within 24 hours with a tailored proposal.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href={`mailto:${SITE.email}`} className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold uppercase tracking-wider text-primary-foreground hover:brightness-110">
              <Mail className="h-4 w-4" /> Email us
            </a>
            <a href={SITE.social.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-md border border-gold/60 px-5 py-3 text-sm font-semibold uppercase tracking-wider text-gold hover:bg-gold/10">
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
          </div>
        </div>
      </section>

      <section className="section-reveal mx-auto max-w-7xl px-5 py-16">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          {/* FORM */}
          <div className="rounded-2xl border border-border bg-card p-7 sm:p-10">
            {sent ? (
              <div className="grid place-items-center gap-4 py-16 text-center">
                <CheckCircle2 className="h-14 w-14 text-primary" />
                <h2 className="font-display text-2xl font-bold">Message sent</h2>
                <p className="max-w-md text-sm text-muted-foreground">
                  Thanks — our team will get back to you shortly at the email you provided.
                </p>
                <button onClick={() => setSent(false)} className="mt-2 text-xs uppercase tracking-wider text-gold hover:text-primary">
                  Send another message
                </button>
              </div>
            ) : (
              <form
                className="grid gap-5"
                onSubmit={handleSubmit}
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Name" name="name" required />
                  <Field label="Company" name="company" />
                  <Field label="Email" name="email" type="email" required />
                  <Field label="Phone" name="phone" type="tel" />
                </div>

                <label className="grid gap-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Product Interest
                  </span>
                  <select
                    name="interest"
                    className="rounded-md border border-border bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-primary"
                    defaultValue=""
                  >
                    <option value="" disabled>Select a category…</option>
                    {CATEGORIES.map((c) => (
                      <option key={c.slug} value={c.slug}>{c.name}</option>
                    ))}
                    <option value="other">Other / Not sure yet</option>
                  </select>
                </label>

                <label className="grid gap-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Message</span>
                  <textarea
                    name="message"
                    rows={5}
                    required
                    className="rounded-md border border-border bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-primary"
                    placeholder="Tell us about your project, location and timeline…"
                  />
                </label>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 self-start rounded-md bg-primary px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-primary-foreground transition-all hover:brightness-110 hover:shadow-[0_0_30px_-8px_var(--primary)]"
                >
                  Open Email <Send className="h-4 w-4" />
                </button>
              </form>
            )}
          </div>

          {/* INFO */}
          <div className="flex flex-col gap-6">
            <div className="rounded-2xl border border-border bg-card p-7">
              <h2 className="font-display text-xl font-bold text-gold">{SITE.name}</h2>
              <ul className="mt-5 space-y-4 text-sm text-muted-foreground">
                <li className="flex gap-3"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> {SITE.address}</li>
                <li className="flex gap-3"><Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> <a href={`mailto:${SITE.email}`} className="hover:text-primary">{SITE.email}</a></li>
                <li className="flex gap-3"><Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> <a href={`tel:${SITE.phoneRaw}`} className="hover:text-primary">{SITE.phone}</a></li>
                <li className="flex gap-3"><MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> <a href={SITE.social.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-primary">WhatsApp {SITE.phone}</a></li>
              </ul>
            </div>

            <div className="overflow-hidden rounded-2xl border border-border bg-card">
              <iframe
                title="Hafet Media Solutions location"
                src="https://www.google.com/maps?q=Hor+Al+Anz+East,+Dubai&output=embed"
                width="100%"
                height="280"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block grayscale contrast-125"
              />
            </div>

            <div className="rounded-2xl border border-gold/30 bg-gradient-to-br from-gold/5 to-primary/5 p-7">
              <h3 className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">Service Regions</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {SITE.regions.map((r) => (
                  <span key={r} className="rounded-full border border-border bg-background/60 px-3.5 py-1.5 text-xs font-medium text-foreground">
                    {r}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Field({ label, name, type = "text", required }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <label className="grid gap-2">
      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}{required && <span className="text-primary"> *</span>}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        className="rounded-md border border-border bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-primary"
      />
    </label>
  );
}
