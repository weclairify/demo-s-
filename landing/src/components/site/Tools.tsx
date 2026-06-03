const tools = [
  { n: "Microsoft Copilot", s: "Integratie met Office 365, vergadering notuleren", w: "Je al in de Microsoft-omgeving werkt" },
  { n: "Google Gemini", s: "Multimodale input, NotebookLM, Workspace", w: "Je documenten diep doorzoekt of Google gebruikt" },
  { n: "Perplexity", s: "Real-time zoeken met bronvermeldingen, Deep Research", w: "Je actuele informatie met bronnen nodig hebt" },
  { n: "Claude", s: "Lange documenten, redeneren, privacy, schrijven", w: "Kwaliteit van denken en schrijven cruciaal is" },
  { n: "ChatGPT", s: "Custom GPT's, deelbaar, brede community", w: "Je een assistent wilt delen met collega's" },
  { n: "Flux / Higgsfield / Runway / Kling", s: "Beeld- en videogeneratie", w: "Je visuele output in jouw stijl wilt produceren" },
  { n: "n8n / Zapier / Make", s: "Workflow-automatisering en integraties", w: "Je herhalende processen wil koppelen en automatiseren" },
  { n: "GitHub", s: "Versiebeheer voor agents, prompts en projecten", w: "Je serieus wil bouwen en samenwerken aan AI-projecten" },
];

export function Tools() {
  return (
    <section id="tools" className="py-24">
      <div className="mx-auto max-w-7xl px-5">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-medium uppercase tracking-wider text-primary">De toolset</span>
          <h2 className="mt-4 font-display text-4xl font-bold leading-tight md:text-5xl">
            Alle tools die ertoe doen, <span className="accent-italic">zonder ruis</span>.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Je leert niet één tool. Je leert kiezen welke tool jouw probleem het beste oplost, en hoe je ze laat samenwerken.
          </p>
        </div>
        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {tools.map((t) => (
            <div key={t.n} className="rounded-2xl border border-border bg-card p-6 transition hover:border-primary/40 hover:shadow-card">
              <div className="font-display text-xl font-bold">{t.n}</div>
              <div className="mt-3 text-sm">
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Sterk in</div>
                <p className="mt-1 text-foreground/80">{t.s}</p>
              </div>
              <div className="mt-3 text-sm">
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Gebruik wanneer</div>
                <p className="mt-1 text-foreground/80">{t.w}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
