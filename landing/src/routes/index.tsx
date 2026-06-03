import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { Stats } from "@/components/site/Stats";
import { Compare } from "@/components/site/Compare";
import { Program } from "@/components/site/Program";
import { Tools } from "@/components/site/Tools";
import { Outcomes } from "@/components/site/Outcomes";
import { Audience } from "@/components/site/Audience";
import { Pricing } from "@/components/site/Pricing";
import { Teacher } from "@/components/site/Teacher";
import { Reviews } from "@/components/site/Reviews";
import { Faq } from "@/components/site/Faq";
import { Cta } from "@/components/site/Cta";
import { Footer } from "@/components/site/Footer";
import { LeadMagnet } from "@/components/site/LeadMagnet";
import { HeroSection02 } from "@/components/site/HeroSection02";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Stats />
        <Compare />
        <Program />
        <HeroSection02 />
        <Tools />
        <Outcomes />
        <Audience />
        <Pricing />
        <LeadMagnet id="gids" />
        <Teacher />
        <Reviews />
        <Faq />
        <Cta />
      </main>
      <Footer />
    </div>
  );
}
