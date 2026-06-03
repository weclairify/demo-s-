const items = [
  { t: "Eigen AI-stack", d: "Je weet welke 3 tot 5 tools je in jouw werk standaard inzet, en waarom." },
  { t: "Werkende assistent", d: "Minimaal één eigen assistent (Claude Project of Custom GPT) live in gebruik." },
  { t: "Visuele output", d: "Een mini-stijlgids en de skills om consistent beeld te genereren." },
  { t: "Werkende agent", d: "Een meerstappige workflow-agent voor een herhalende taak uit jouw werk." },
  { t: "Prompt-discipline", d: "RACE-format, chain-of-thought en persona-prompts als tweede natuur." },
  { t: "Demo Day prototype", d: "Een live gedemonstreerd prototype dat je morgen kunt doorontwikkelen." },
];

export function Outcomes() {
  return (
    <section className="bg-secondary/50 py-24">
      <div className="mx-auto max-w-7xl px-5">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-medium uppercase tracking-wider text-primary">Wat je meeneemt</span>
          <h2 className="mt-4 font-display text-4xl font-bold leading-tight md:text-5xl">
            Concrete <span className="accent-italic">resultaten</span>, geen vage beloften.
          </h2>
        </div>
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {items.map((i, idx) => (
            <div key={i.t} className="rounded-2xl border border-border bg-card p-6">
              <div className="font-display text-2xl font-bold text-primary">0{idx + 1}</div>
              <div className="mt-3 font-semibold">{i.t}</div>
              <p className="mt-2 text-sm text-muted-foreground">{i.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
