import { Check, X } from "lucide-react";

const yes = [
  "Je werkt met informatie, tekst of klanten en wil sneller werken",
  "Je hoort steeds over AI maar weet niet waar te beginnen",
  "Je wil concrete tools bouwen, niet alleen begrijpen hoe het werkt",
  "Je hebt geen technische achtergrond nodig",
];

const no = [
  "Je bent developer of bouwt al zelf AI-systemen (niet geschikt)",
];

export function Audience() {
  return (
    <section id="voor-mij" className="py-24">
      <div className="mx-auto max-w-5xl px-5">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-medium uppercase tracking-wider text-primary">Voor wie</span>
          <h2 className="mt-4 font-display text-4xl font-bold leading-tight md:text-5xl">
            Is dit <span className="accent-italic">voor mij?</span>
          </h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-primary/30 bg-primary-tint p-8">
            <div className="text-xs font-medium uppercase tracking-wider text-primary">Wel voor jou</div>
            <ul className="mt-6 space-y-4">
              {yes.map((y) => (
                <li key={y} className="flex gap-3">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-foreground/85">{y}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-border bg-card p-8">
            <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Niet voor jou</div>
            <ul className="mt-6 space-y-4">
              {no.map((n) => (
                <li key={n} className="flex gap-3">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-muted text-muted-foreground">
                    <X className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-foreground/85">{n}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
