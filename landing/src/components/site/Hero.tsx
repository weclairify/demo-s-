import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Users, MapPin, Wallet } from "lucide-react";
import heroImage from "@/assets/hero.jpg";
import { AuroraBackground } from "@/components/site/AuroraBackground";
import { HandWrittenTitle } from "@/components/site/HandWrittenTitle";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <AuroraBackground className="!min-h-0 !bg-transparent absolute inset-0 !block" showRadialGradient={true}>
        <span />
      </AuroraBackground>
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 md:py-28 lg:grid-cols-2 lg:py-32">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background/60 px-4 py-1.5 text-xs font-medium text-primary backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            TijdperkAI × Weclairify, AI Opleiding 2026
          </span>
          <h1 className="mt-6 font-display text-5xl font-bold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
            Van begrip <br />
            <span className="accent-italic">naar bouwer.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            3-daagse hybride AI-training in Amsterdam. Van foundations en prompttechniek tot het bouwen van je eigen
            assistenten en agents, met <span className="font-semibold text-foreground">docentengids & lesmateriaal</span>.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="rounded-full bg-primary px-6 text-primary-foreground hover:bg-primary/90">
              <a href="#intake">Plan je gratis intake (20 min) <ArrowRight className="ml-1 h-4 w-4" /></a>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full border-foreground/20 bg-background px-6">
              <a href="#programma">Bekijk het programma</a>
            </Button>
          </div>
          <p className="mt-6 max-w-xl text-sm italic text-muted-foreground">
            Niet iedereen wordt toegelaten, we selecteren op motivatie, niet op voorkennis.
          </p>
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-2"><Calendar className="h-4 w-4 text-primary" /> Start juli 2026</span>
            <span className="flex items-center gap-2"><Users className="h-4 w-4 text-primary" /> Max 15 deelnemers</span>
            <span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /> Hybride, Amsterdam</span>
            <span className="flex items-center gap-2"><Wallet className="h-4 w-4 text-primary" /> €2.950 p.p.</span>
          </div>
        </div>
        <div className="relative">
          <div className="aspect-[4/5] w-full overflow-hidden rounded-3xl bg-primary/10 shadow-soft">
            <img
              src={heroImage}
              alt="Weclairify AI opleiding, docent aan de Amsterdamse grachten"
              className="h-full w-full object-cover"
              loading="eager"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 rounded-2xl bg-background py-10 px-8 shadow-card md:-left-10">
            <HandWrittenTitle title="€2.950" subtitle="Investering per deelnemer, incl. lesmateriaal & lunch" />
          </div>
        </div>
      </div>
    </section>
  );
}
