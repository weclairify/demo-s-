import teacherImage from "@/assets/teacher.jpg";

export function Teacher() {
  return (
    <section id="docent" className="py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-2">
        <div className="order-2 lg:order-1">
          <div className="aspect-[4/5] overflow-hidden rounded-3xl bg-primary/10 shadow-soft">
            <img
              src={teacherImage}
              alt="Claire, oprichter Weclairify"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
        <div className="order-1 lg:order-2">
          <span className="text-sm font-medium uppercase tracking-wider text-primary">Leuk je te ontmoeten!</span>
          <h2 className="mt-4 font-display text-4xl font-bold leading-tight md:text-5xl">
            Claire, <span className="accent-italic">oprichter Weclairify</span>
          </h2>
          <a
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-block text-sm font-medium text-primary underline-offset-4 hover:underline"
          >
            LinkedIn
          </a>
          <div className="mt-6 space-y-4 text-muted-foreground">
            <p>
              Claire werkt sinds eind 2022 dagelijks als generatieve AI-expert in training en advies. Na drie jaar is het
              tijd om die kennis door te geven, niet als losse workshop of YouTube-cursus, maar als een structureel
              programma. Drie dagen die niet stoppen bij begrip, maar doorlopen tot je daadwerkelijk iets gebouwd hebt
              met de juiste hulp.
            </p>
            <p>
              Haar missie: generatieve AI begrijpelijk maken voor wie er mee wil werken. Praktisch en transparant. Ze
              vertelt je wat AI kan en net zo goed wat niet.
            </p>
            <p>
              Wat ze onderweg ontdekte: AI verandert continu, maar wie begrijpt hoe het werkt, pikt nieuwe tools en
              toepassingen snel op. Niet elke tool opnieuw van nul leren, maar bouwen op een basis die blijft. Dat
              fundament leggen is de kern van dit programma.
            </p>
            <p>
              Of je nu zzp'er bent of corporate medewerker, iedereen staat op hetzelfde startpunt als het om AI gaat. De
              tool maakt geen onderscheid. Wat telt is niet je functietitel, maar je bereidheid om te leren. En in een
              wereld vol hype wil iedereen hetzelfde: iemand die het eerlijk uitlegt, laat zien wat echt werkt en je niet
              verliest in jargon.
            </p>
          </div>

          <blockquote className="my-10 text-center">
            <p className="font-display text-2xl italic leading-snug text-foreground md:text-3xl">
              "Wat me het meest bijblijft na een training zijn niet de tools die mensen geleerd hebben, maar het moment
              waarop iemand zegt: ik begrijp nu hoe ik dit in mijn dagelijkse werk kan inzetten. Dat is het moment
              waarom ik het doe."
            </p>
            <footer className="mt-4 text-sm uppercase tracking-wider text-muted-foreground">, Claire</footer>
          </blockquote>

          <div className="space-y-4 text-muted-foreground">
            <p>
              Loopt iemand vast? Dan pakt Claire diegene persoonlijker op, zonder dat de rest van de groep hoeft te
              wachten. Elke groep bestaat uit mensen op verschillende niveaus. Dat is geen probleem, dat is gewoon de
              realiteit. Ze neemt de tijd voor iedereen.
            </p>
            <p>
              De AI-wereld verandert razendsnel. Maar dat is precies waarom dit vakgebied zoveel perspectief biedt. Wie
              nu leert bewegen in dit landschap, bouwt een voorsprong die alleen maar groter wordt.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
