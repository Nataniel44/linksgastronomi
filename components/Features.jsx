import Image from "next/image";
import SectionWrapper from "./ui/SectionWrapper";
import { BackgroundBlobs } from "./ui/BackgroundBlobs";
import { ActionButton } from "./ui/ActionButton";

export function Features() {
    return (
        <SectionWrapper className="relative h-[800px] md:h-[500px] flex-col  flex items-start justify-center text-start">
            <BackgroundBlobs

                className="opacity-60"
            />

            <div className="relative z-10 flex flex-col items-start">
                <h2 className="text-black text-3xl md:text-4xl font-extrabold">
                    DESTACA ENTRE LOS DEMÁS
                </h2>
                <p className="text-lg text-gray-700 mt-4 max-w-md text-balance">
                    Convertí tu menú en una experiencia visual atractiva y fácil de usar. Diferenciate de la competencia.
                </p>
                <ActionButton href="#contacto" variant="dark" className="mt-8">
                    PROBALÓ GRATIS
                </ActionButton>
            </div>


            <div className="flex w-full h-full items-center justify-center">

                <Image
                    src="/promo.png"
                    alt="Vista previa de menú digital en una pantalla de movil"
                    width={500} // w-56
                    height={500}
                    className="absolute md:visible invisible bottom-0 right-10 w-96 md:w-72 z-0 drop-shadow-xl animate-fade-up delay-150"
                />

                <Image
                    src="/promo2.png"
                    alt="Vista previa de menú digital en una pantalla de movil"
                    width={500} // w-56
                    height={500}
                    className=" md:invisible visible bottom-0 right-10 w-96 md:w-72 z-0 drop-shadow-xl animate-fade-up delay-150"
                />
            </div>
        </SectionWrapper>
    );
}