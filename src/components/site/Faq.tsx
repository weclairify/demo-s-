import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const items = [
  { q: "Heb ik technische voorkennis nodig?", a: "Nee. Als je e-mail en een browser kunt gebruiken, kun je deze opleiding volgen. We beginnen bij de basis en bouwen stap voor stap op." },
  { q: "Welke laptop / accounts moet ik meenemen?", a: "Een laptop met internetverbinding. Je krijgt vooraf instructies welke (gratis) accounts handig zijn om aan te maken. Voor het bouwen van een agent is het nuttig een betaald account van Claude aan te schaffen (Pro, $20/maand)." },
  { q: "Wat is precies 'hybride'?", a: "Dag 1 en Dag 3 zijn fysiek in Amsterdam. Dag 2 is volledig online via Zoom, zo houden we de drempel laag en de focus hoog." },
  { q: "Voor welke functies is deze opleiding geschikt?", a: "Voor iedereen die in zijn of haar werk met taal, kennis of beeld werkt: marketing, HR, communicatie, consultancy, opleidingen, sales, operations en directie." },
  { q: "Krijg ik lesmateriaal mee?", a: "Ja. Je krijgt toegang tot het leerdomein, waar het lesmateriaal inclusief introductievideo's te vinden zijn." },
  { q: "Kan dit ook in-company?", a: "Ja. Vanaf 6 deelnemers verzorgen we de opleiding op locatie, met cases uit jouw eigen organisatie. Vraag een offerte aan." },
  { q: "Wat als ik na inschrijving toch niet kan?", a: "Je kunt kosteloos verzetten naar een volgende editie, of je plek doorgeven aan een collega." },
  { q: "Hoeveel deelnemers per editie?", a: "Maximaal 15. Zo kunnen we iedereen persoonlijk begeleiden tijdens oefeningen en de Demo Day." },
];

export function Faq() {
  return (
    <section id="faq" className="py-24">
      <div className="mx-auto max-w-3xl px-5">
        <div className="text-center">
          <span className="text-sm font-medium uppercase tracking-wider text-primary">FAQ</span>
          <h2 className="mt-4 font-display text-4xl font-bold leading-tight md:text-5xl">
            Veelgestelde <span className="accent-italic">vragen</span>
          </h2>
        </div>
        <Accordion type="single" collapsible className="mt-12 w-full">
          {items.map((i, idx) => (
            <AccordionItem key={idx} value={`item-${idx}`} className="border-b border-border">
              <AccordionTrigger className="text-left font-display text-lg font-semibold">{i.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{i.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
