import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Bot, Brain, Cpu, MessageSquare, Image as ImageIcon, Github } from "lucide-react";

const logos = [
  { name: "ChatGPT", icon: <MessageSquare className="h-5 w-5" /> },
  { name: "Claude", icon: <Brain className="h-5 w-5" /> },
  { name: "Gemini", icon: <Sparkles className="h-5 w-5" /> },
  { name: "Copilot", icon: <Bot className="h-5 w-5" /> },
  { name: "Perplexity", icon: <Cpu className="h-5 w-5" /> },
  { name: "Flux", icon: <ImageIcon className="h-5 w-5" /> },
  { name: "GitHub", icon: <Github className="h-5 w-5" /> },
];

export function HeroSection02() {
  return (
    <section className="relative overflow-hidden py-24">
      <div className="mx-auto max-w-7xl px-5">
        <div className="flex flex-col items-center text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background/60 px-4 py-1.5 text-xs font-medium text-primary backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" />
            
          </span>

          <h2 className="mt-6 font-display text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
            Toolset
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Ontdek de AI-tools en workflows die je leert beheersen. Van prompttechniek tot het bouwen van je eigen assistenten en agents.
          </p>

          {/* Logos row */}
          <div className="mt-10 flex flex-col items-center gap-4">
            <div className="flex flex-wrap items-center justify-center gap-6 text-muted-foreground">
              {logos.map((l) => (
                <span key={l.name} className="flex items-center gap-2 text-sm">
                  {l.icon}
                  <span>{l.name}</span>
                </span>
              ))}
            </div>
            <span className="text-xs uppercase tracking-wider text-muted-foreground">Creatieve & productieve tools</span>
          </div>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" className="rounded-full bg-primary px-6 text-primary-foreground hover:bg-primary/90">
              <a href="#programma">Leer & bouw <ArrowRight className="ml-1 h-4 w-4" /></a>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full border-foreground/20 bg-background px-6">
              <a href="#tools">Bekijk de tools</a>
            </Button>
          </div>
        </div>

      </div>
    </section>
  );
}
