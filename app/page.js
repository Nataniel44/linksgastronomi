import PricingSection from "@/components/PricingSection";

import { Features } from "../components/Features";
import { Hero } from "../components/Hero";
import { HeroBlob } from "../components/HeroBlob";
import { Services } from "../components/Services";
import { WhatsAppContact } from "../components/WhatsAppContact";

export default function Home() {

  return (

    <main className="min-h-screen bg-white/90 md:border-l md:border-r border-white/95 dark:text-white flex flex-col items-center justify-center relative overflow-x-hidden z-20 ">
      <Hero />


      <Features />




      <Services />
      <WhatsAppContact />
    </main>
  );
}