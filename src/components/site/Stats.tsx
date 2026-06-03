const stats = [
  { v: "3 dagen", l: "Intensief programma" },
  { v: "15", l: "Deelnemers maximum" },
  { v: "10+", l: "AI-tools behandeld" },
  { v: "1", l: "Demo Day eindpresentatie" },
];

export function Stats() {
  return (
    <section className="border-y border-border/60 bg-secondary/50">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-5 py-14 md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.l} className="text-center">
            <div className="font-display text-4xl font-bold text-primary md:text-5xl">{s.v}</div>
            <div className="mt-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">{s.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
