import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function Cta() {
  return (
    <section id="intake" className="bg-primary py-24 text-primary-foreground">
      <div className="mx-auto max-w-4xl px-5 text-center">
        <h2 className="font-display text-4xl font-bold leading-tight md:text-6xl">
          Klaar om <span className="italic">te bouwen?</span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg opacity-90">
          Plan een gratis, vrijblijvende intake van 20 minuten. We kijken samen of de opleiding bij je past, en welke editie het beste werkt.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg" className="rounded-full bg-primary-foreground px-7 text-primary hover:bg-primary-foreground/90">
            <a href="mailto:hello@weclairify.com">Plan je gratis intake (20 min) <ArrowRight className="ml-1 h-4 w-4" /></a>
          </Button>
          <Button asChild size="lg" variant="outline" className="rounded-full border-primary-foreground/40 bg-transparent px-7 text-primary-foreground hover:bg-primary-foreground/10">
            <a href="#programma">Bekijk het programma</a>
          </Button>
        </div>
        <p className="mt-8 text-sm italic opacity-80">
          Niet iedereen wordt toegelaten, we selecteren op motivatie, niet op voorkennis.
        </p>
      </div>
    </section>
  );
}
