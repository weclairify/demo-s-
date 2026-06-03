const days = [
  {
    n: "01",
    tag: "Dag 1, Fysiek",
    title: "Foundations: de tools",
    quote: "Je hoeft geen techneut te zijn om AI te begrijpen. Je hebt het vandaag al gebruikt.",
    tools: ["Microsoft Copilot", "Google Gemini", "Perplexity", "Claude", "ChatGPT"],
    blocks: [
      "AI-landschap: zes toepassingsgebieden",
      "Welke AI voor welke taak?, drie scenario's",
      "Prompttechnieken: RACE-format & chain-of-thought",
      "Deep Research & Reasoning modellen",
      "Jouw persoonlijke AI-plan",
    ],
  },
  {
    n: "02",
    tag: "Dag 2, Hybride",
    title: "Assistenten & visuele output",
    quote: "Van tekst naar beeld, van idee naar systeem.",
    tools: ["Claude Projects", "Custom GPT", "NotebookLM", "Perplexity", "Flux", "Higgsfield", "Runway", "Kling"],
    blocks: [
      "Systemprompts: anatomie van een sterke assistent",
      "Perplexity & NotebookLM, diepe verkenning",
      "Bouw je eerste eigen assistent",
      "Beeldgeneratie: visuele prompts",
      "Stijlgidsen & visuele consistentie",
      "Demo Day briefing kiezen",
    ],
  },
  {
    n: "03",
    tag: "Dag 3, Fysiek",
    title: "Agents & Demo Day",
    quote: "Van kennis naar resultaat.",
    tools: ["GitHub", "n8n", "Zapier", "Make", "Claude"],
    blocks: [
      "Agents bouwen in Claude, drie niveaus",
      "Het ecosysteem van AI-automatisering",
      "Veiligheid: vijf praktische richtlijnen",
      "Eigen agent bouwen n.a.v. briefing",
      "Demo day & borrel",
    ],
  },
];

export function Program() {
  return (
    <section id="programma" className="bg-secondary/50 py-24">
      <div className="mx-auto max-w-7xl px-5">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-medium uppercase tracking-wider text-primary">Het programma</span>
          <h2 className="mt-4 font-display text-4xl font-bold leading-tight md:text-5xl">
            Drie dagen, <span className="accent-italic">één duidelijk pad</span>.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Van begrip naar bouwer. Elke dag bouwt voort op de vorige, met directe praktijkopdrachten en eigen werk centraal.
          </p>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {days.map((d) => (
            <article key={d.n} className="flex flex-col rounded-3xl border border-border bg-card p-8 shadow-card">
              <div className="flex items-center gap-4">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-primary font-display text-lg font-bold text-primary-foreground">
                  {d.n}
                </span>
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{d.tag}</span>
              </div>
              <h3 className="mt-6 font-display text-2xl font-bold">{d.title}</h3>
              <p className="mt-3 text-sm italic text-muted-foreground">"{d.quote}"</p>

              <div className="mt-6">
                <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Tools van de dag</div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {d.tools.map((t) => (
                    <span key={t} className="rounded-full border border-border bg-background px-3 py-1 text-xs font-medium">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <ul className="mt-6 space-y-3 border-t border-border pt-6 text-sm">
                {d.blocks.map((b) => (
                  <li key={b} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <span className="text-foreground/80">{b}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mx-auto mt-16 max-w-3xl rounded-3xl border border-primary/20 bg-primary-tint p-8 text-center">
          <span className="text-xs font-medium uppercase tracking-wider text-primary">Huiswerk tussen de dagen</span>
          <p className="mt-3 font-display text-xl font-semibold md:text-2xl">
            "Tussen de dagen pas je toe wat je geleerd hebt, zodat je op Dag 3 al iets werkends hebt."
          </p>
          <div className="mt-6 grid gap-4 text-left md:grid-cols-2">
            <div className="rounded-2xl bg-background p-5">
              <div className="text-xs font-medium uppercase tracking-wider text-primary">Tussen Dag 1 en 2</div>
              <p className="mt-2 text-sm text-muted-foreground">
                Deelnemers testen hun AI-plan en nemen één vraag mee naar Dag 2.
              </p>
            </div>
            <div className="rounded-2xl bg-background p-5">
              <div className="text-xs font-medium uppercase tracking-wider text-primary">Tussen Dag 2 en 3</div>
              <p className="mt-2 text-sm text-muted-foreground">
                Ze bouwen hun eigen assistent, waarbij ondersteuning mogelijk is.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
