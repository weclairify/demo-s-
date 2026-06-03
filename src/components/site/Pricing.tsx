import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Open Inschrijving",
    price: "€2.950",
    sub: "p.p., incl. BTW",
    desc: "Voor individuele professionals die in 3 dagen van begrip naar bouwer willen.",
    features: [
      "3-daagse hybride opleiding",
      "Volledige docentengids & lesmateriaal",
      "Lunch & koffie inbegrepen",
    ],
    cta: "Plan je gratis intake (20 min)",
    featured: false,
  },
  {
    name: "Team, In-company",
    price: "Op aanvraag",
    sub: "vanaf 6 deelnemers",
    desc: "De volledige opleiding op locatie, aangepast aan de tools en cases van jouw organisatie.",
    features: [
      "Programma op maat van jouw sector",
      "Eigen cases & data als oefenmateriaal",
      "Maatwerk Demo Day briefings",
      "Volledige lesmaterialen voor het team",
      "Optionele follow-up sessie",
    ],
    cta: "Vraag een offerte aan",
    featured: true,
  },
  {
    name: "Docent / Train-de-trainer",
    price: "€4.950",
    sub: "incl. licentie",
    desc: "Voor opleiders en consultants die zelf de Weclairify-opleiding willen geven.",
    features: [
      "Volledige docentengids met lesplannen",
      "Licentie voor onbeperkt gebruik",
      "Alle slides, werkbladen & oefeningen",
      "Updates van het lesmateriaal",
      "Train-de-trainer begeleidingsdag",
    ],
    cta: "Plan je gratis intake (20 min)",
    featured: false,
  },
];

export function Pricing() {
  return (
    <section id="pakketten" className="bg-secondary/50 py-24">
      <div className="mx-auto max-w-7xl px-5">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-medium uppercase tracking-wider text-primary">Pakketten</span>
          <h2 className="mt-4 font-display text-4xl font-bold leading-tight md:text-5xl">
            Eenmalige investering, <span className="accent-italic">levenslang profijt</span>.
          </h2>
        </div>
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`flex flex-col rounded-3xl border p-8 ${
                p.featured
                  ? "border-primary bg-primary text-primary-foreground shadow-soft"
                  : "border-border bg-card shadow-card"
              }`}
            >
              {p.featured && (
                <span className="mb-4 self-start rounded-full bg-primary-foreground/15 px-3 py-1 text-xs font-medium">
                  Meest gekozen
                </span>
              )}
              <div className="text-sm font-medium uppercase tracking-wider opacity-80">{p.name}</div>
              <div className="mt-4 font-display text-5xl font-bold">{p.price}</div>
              <div className={`mt-1 text-sm ${p.featured ? "opacity-80" : "text-muted-foreground"}`}>{p.sub}</div>
              <p className={`mt-4 text-sm ${p.featured ? "opacity-90" : "text-muted-foreground"}`}>{p.desc}</p>
              <ul className="mt-6 flex-1 space-y-3 border-t border-current/15 pt-6 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-3">
                    <Check className={`mt-0.5 h-4 w-4 shrink-0 ${p.featured ? "" : "text-primary"}`} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Button
                asChild
                className={`mt-8 rounded-full ${
                  p.featured
                    ? "bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                    : "bg-primary text-primary-foreground hover:bg-primary/90"
                }`}
              >
                <a href="#intake">{p.cta}</a>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
