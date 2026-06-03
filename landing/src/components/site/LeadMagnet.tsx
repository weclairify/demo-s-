import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download, BookOpen, CheckCircle2, FileText } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
  first_name: z.string().trim().min(1, "Vul je voornaam in").max(100),
  email: z.string().trim().email("Ongeldig e-mailadres").max(255),
});

interface LeadMagnetProps {
  variant?: "default" | "compact";
  id?: string;
}

const highlights = [
  "Overzicht van de 3 trainingsdagen",
  "Welke tools we behandelen",
  "Opbouw van het programma",
  "Uitleg over de huiswerkopdrachten",
  "Briefings en opdrachten",
  "Wat je aan het einde hebt gebouwd",
  "Veelgestelde vragen",
];

export function LeadMagnet({ variant = "default", id }: LeadMagnetProps) {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse({ first_name: firstName, email });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setLoading(true);
    const { error } = await supabase
      .from("lead_magnet_signups")
      .insert({ first_name: parsed.data.first_name, email: parsed.data.email });
    setLoading(false);
    if (error) {
      toast.error("Er ging iets mis, probeer het opnieuw.");
      return;
    }
    setSuccess(true);
    setFirstName("");
    setEmail("");
    toast.success("Check je inbox, de gids is onderweg.");
  };

  return (
    <section id={id} className={variant === "compact" ? "py-16" : "py-24"}>
      <div className="mx-auto max-w-6xl px-5">
        <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-card">
          <div className="grid gap-0 lg:grid-cols-5">
            <div className="gradient-hero relative p-8 md:p-12 lg:col-span-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background/60 px-4 py-1.5 text-xs font-medium text-primary backdrop-blur">
                <BookOpen className="h-3.5 w-3.5" />
                Gratis lead magnet, PDF
              </span>
              <h2 className="mt-5 font-display text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
                Ontvang de <span className="accent-italic">gratis gids</span>
              </h2>
              <p className="mt-4 max-w-xl text-base text-muted-foreground md:text-lg">
                Ontdek stap voor stap hoe het programma is opgebouwd en wat je tijdens de drie dagen gaat leren.
              </p>
              <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                {highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2 text-sm text-foreground/80">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-t border-border bg-background p-8 md:p-12 lg:col-span-2 lg:border-l lg:border-t-0">
              {success ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                    <CheckCircle2 className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="mt-5 font-display text-2xl font-bold">Gids onderweg!</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    We hebben je inschrijving ontvangen. Je krijgt de gids zo in je inbox.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex h-full flex-col justify-center">
                  <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-display text-lg font-semibold">Download de gids</div>
                      <div className="text-xs text-muted-foreground">Direct in je inbox, geen spam.</div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <label htmlFor={`lm-name-${id ?? "x"}`} className="mb-1.5 block text-xs font-medium text-foreground/80">
                        Voornaam
                      </label>
                      <Input
                        id={`lm-name-${id ?? "x"}`}
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="Bijv. Sara"
                        required
                        maxLength={100}
                      />
                    </div>
                    <div>
                      <label htmlFor={`lm-email-${id ?? "x"}`} className="mb-1.5 block text-xs font-medium text-foreground/80">
                        E-mailadres
                      </label>
                      <Input
                        id={`lm-email-${id ?? "x"}`}
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="sara@bedrijf.nl"
                        required
                        maxLength={255}
                      />
                    </div>
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    disabled={loading}
                    className="mt-5 w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    {loading ? "Verzenden..." : (<>Download de gids <Download className="ml-1 h-4 w-4" /></>)}
                  </Button>
                  <p className="mt-3 text-center text-[11px] text-muted-foreground">
                    Door te downloaden ga je akkoord met onze e-mails. Uitschrijven kan altijd.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
