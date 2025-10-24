import BentoGrid from "@/components/BentoGrid";
import { ContactForm } from "@/components/ContactForm";
import { Features } from "@/components/Features";
import { Hero } from "@/components/Hero";
import { HeroBlob } from "@/components/HeroBlob";
import { Services } from "@/components/Services";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { WhatsAppContact } from "@/components/WhatsAppContact";

export default function Home() {
  return (
    <main className="min-h-screen dark:text-white flex flex-col items-center justify-center relative overflow-x-hidden">
      <Hero />

      <BentoGrid />
      <Features />

      <SectionWrapper id="info" className="text-center pt-5">
        <p className="text-lg md:text-xl pb-5 text-balance text-gray-700 max-w-2xl mx-auto">
          Lleva tu <span className="font-bold">restaurante</span>,
          <span className="font-bold"> hamburguesería</span>,
          <span className="font-bold"> pizzería</span> o
          <span className="font-bold"> bar</span> al
          <span className="font-bold"> siguiente nivel.</span>

          <span className="font-bold"> la competencia ya arrancó.</span>
        </p>

      </SectionWrapper>
      < HeroBlob />
      <Services />
      <WhatsAppContact />
    </main>
  );
}