import { Star } from "lucide-react";

const reviews = [
  {
    client: "Albert Heijn",
    note: "10+ trainingen bij verschillende teams",
    score: "9",
    quote:
      "Ze deed het echt goed, vlot mens en kon ons goed helpen met AH GPT en het maken van een eerste agent. Wat helemaal niet zo moeilijk blijkt te zijn. Ik had niet verwacht dat we dat zouden gaan leren maar het was een mega eye opener. Ik heb veel aan de training gehad.",
  },
  {
    client: "Albert Heijn",
    score: "10",
    quote:
      "Super persoonlijke en gerichte training. Goed afgestemd op het niveau van de groep en veel momenten van interactie, waardoor ook minder snelle deelnemers goed aanhaken! Klasse werk.",
  },
  {
    client: "Albert Heijn",
    score: "9,3",
    quote:
      "Goede training en ze deed het heel leuk. Een echte professional die weet waar ze het over heeft.",
  },
  {
    client: "Albert Heijn",
    score: "9",
    quote:
      "Goede introductie over AI. Heeft mijn ogen geopend. Claire wist de aandacht goed vast te houden en kon op het moment dat er vragen kwamen die niet persé onderdeel waren van de presentatie alsnog met goede voorbeelden komen.",
  },
  {
    client: "SMEG",
    score: "9",
    quote:
      "Claire is echt een expert, dat merkte je aan alles! Ze heeft ontzettend veel kennis van (gen) AI en wist ons team echt te inspireren.",
  },
  {
    client: "Vivantus Groep",
    score: "—",
    quote:
      "Als nieuwbouwspecialisten worden wij dagelijks geconfronteerd met de razendsnelle ontwikkelingen op het gebied van AI. De uitdaging is daarbij niet alleen om overzicht te houden, maar vooral ook om het hele team mee te nemen in deze transitie. Dankzij de training van Claire hebben we hierin een belangrijke stap gezet. In één dag neemt zij je mee langs de essentie van AI, met een sterke focus op praktische toepasbaarheid en direct rendement in de dagelijkse werkzaamheden. Haar praktijkgerichte aanpak, heldere uitleg en enthousiasme zorgen ervoor dat de drempel om AI daadwerkelijk te gebruiken snel verdwijnt. Het resultaat was direct merkbaar: meer inzicht, meer vertrouwen binnen het team en een hogere efficiëntie in onze werkzaamheden. Een waardevolle investering en absoluut een aanrader voor organisaties die AI concreet willen inzetten.",
  },
];

export function Reviews() {
  return (
    <section id="reviews" className="bg-secondary/50 py-24">
      <div className="mx-auto max-w-7xl px-5">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-medium uppercase tracking-wider text-primary">Recente reviews</span>
          <h2 className="mt-4 font-display text-4xl font-bold leading-tight md:text-5xl">
            Wat deelnemers <span className="accent-italic">teruggeven</span>.
          </h2>
        </div>
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r, i) => (
            <figure key={i} className="flex flex-col rounded-3xl border border-border bg-card p-7 shadow-card">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-display text-lg font-bold">{r.client}</div>
                  {r.note && <div className="text-xs text-muted-foreground">{r.note}</div>}
                </div>
                <div className="flex items-center gap-1 rounded-full bg-primary-tint px-3 py-1 text-sm font-semibold text-primary">
                  <Star className="h-3.5 w-3.5 fill-primary text-primary" /> {r.score}
                </div>
              </div>
              <blockquote className="mt-5 text-sm italic text-foreground/85">"{r.quote}"</blockquote>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
