import { Features } from "../components/Features";
import { Hero } from "../components/Hero";
import { Services } from "../components/Services";
import { WhatsAppContact } from "../components/WhatsAppContact";
import ClickcitoIntro from "../components/ClickcitoIntro"; // Renamed to "HowItWorks" internally but file is same
import About from "../components/About";

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white flex flex-col items-center justify-center relative overflow-x-hidden z-20">
      {/* 1. Hero Principal */}
      <Hero />

      {/* 2. Qué es Clickcito */}
      <About />

      {/* 3. Servicios / Soluciones */}
      <Services />

      {/* 4. Cómo funciona */}
      <ClickcitoIntro />

      {/* 5. Diferencial Local */}
      <Features />

      {/* 6. Llamado a la acción final */}
      <WhatsAppContact />
    </main>
  );
}