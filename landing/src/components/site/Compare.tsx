import { Check, X } from "lucide-react";

const left = [
  { t: "Eindeloos prompten zonder resultaat", d: "Je probeert wat, maar weet niet waarom iets wel of niet werkt." },
  { t: "AI als losse tool", d: "Je gebruikt ChatGPT incidenteel, zonder dat het in je werk geïntegreerd is." },
  { t: "Bang om achter te lopen", d: "Het tempo voelt hoog en je weet niet meer waar te beginnen." },
];

const right = [
  { t: "Bewezen prompttechnieken", d: "RACE-format, chain-of-thought en persona-prompts die structureel werken." },
  { t: "Eigen assistenten & agents", d: "Bouw werkende tools voor je herhalende taken, in Claude, ChatGPT en meer." },
  { t: "Inzicht in het AI-landschap", d: "Weet precies welke tool je inzet voor welke taak, en waarom." },
];

export function Compare() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-5">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-medium uppercase tracking-wider text-primary">Het verschil</span>
          <h2 className="mt-4 font-display text-4xl font-bold leading-tight md:text-5xl">
            Stop met <span className="accent-italic">losse prompts</span>, bouw een AI-systeem.
          </h2>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-border bg-card p-8">
            <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Huidige situatie</div>
            <ul className="mt-6 space-y-6">
              {left.map((i) => (
                <li key={i.t} className="flex gap-4">
                  <span className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-muted text-muted-foreground"><X className="h-3.5 w-3.5" /></span>
                  <div>
                    <div className="font-semibold">{i.t}</div>
                    <p className="mt-1 text-sm text-muted-foreground">{i.d}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-primary/30 bg-primary-tint p-8 shadow-soft">
            <div className="text-xs font-medium uppercase tracking-wider text-primary">Na deze opleiding</div>
            <ul className="mt-6 space-y-6">
              {right.map((i) => (
                <li key={i.t} className="flex gap-4">
                  <span className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground"><Check className="h-3.5 w-3.5" /></span>
                  <div>
                    <div className="font-semibold">{i.t}</div>
                    <p className="mt-1 text-sm text-muted-foreground">{i.d}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
