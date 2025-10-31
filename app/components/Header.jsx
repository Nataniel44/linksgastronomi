import { useState } from "react";
import Image from "next/image";
import HorarioModal from "./HorarioModal";

export const Header = ({ openmodal }) => {
  const [isHorarioOpen, setIsHorarioOpen] = useState(false);

  return (
    <>
      <header className="relative flex flex-col sm:flex-row items-center gap-5 px-8 sm:justify-between min-h-56 rounded-b-2xl overflow-hidden z-10 py-8 px-4 max-w-4xl mx-auto">
        {/* Fondo de imagen y decorativo */}
        <div className="absolute inset-0 w-full h-full z-[-10]">
          <Image
            width={1920}
            height="1080"
            src="/class.jpeg"
            className="w-full h-full object-cover object-[50%_80%] opacity-80"
            alt="Fondo"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/90 to-transparent"></div>
        </div>
        {/* Nombre y slogan */}
        <div className="flex flex-col gap-2 sm:gap-4 items-start sm:items-start">
          <h1
            translate="no"
            lang="es"
            className="uppercase text-5xl sm:text-5xl md:text-6xl font-black text-black tracking-tight drop-shadow-xl"
          >
            TOP ONE <br /> <span className="font-black ">BURGERS</span>
          </h1>
          <span className="hidden sm:block text-sm sm:text-base font-light uppercase text-black/80 tracking-wider">
            Menú digital minimalista
          </span>
        </div>
        {/* Botones de redes y acción creativa */}
        <div className="flex flex-col items-center gap-5 items-end sm:items-end  sm:mt-0">

          <button
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-3 py-1 rounded-full shadow transition text-xs flex items-center gap-2"
            onClick={() => window.location.href = '/demo'}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
            Ver menú
          </button>
          <button
            className="bg-white hover:bg-yellow-100 text-yellow-600 font-bold px-3 py-1 rounded-full shadow transition text-xs flex items-center gap-2 border border-yellow-400"
            onClick={() => setIsHorarioOpen(true)}
          >
            <svg className="w-4 h-4" fill="none" stroke="#facc15" strokeWidth="2" viewBox="0 0 24 24">
              <rect x="4" y="4" width="16" height="16" rx="4" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h8M8 14h6" />
            </svg>
            Horario
          </button>
          <div className="flex gap-2">
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-pink-100 hover:bg-pink-200 text-pink-600 font-bold px-3 py-1 rounded-full shadow transition text-xs"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm4.25 3.25a5.25 5.25 0 1 1 0 10.5 5.25 5.25 0 0 1 0-10.5zm0 1.5a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5zm5.25.75a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
              </svg>
            </a>
            <a
              href="https://wa.me/3755538503"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-green-100 hover:bg-green-200 text-green-700 font-bold px-3 py-1 rounded-full shadow transition text-xs"
            >
              <svg
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path
                  fill="#25D366"
                  d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"
                />
              </svg>
            </a>
            <a
              href="https://facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-blue-100 hover:bg-blue-200 text-blue-700 font-bold px-3 py-1 rounded-full shadow transition text-xs"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0z" />
              </svg>
            </a>
          </div>
        </div>
      </header>
      <HorarioModal
        isOpen={isHorarioOpen}
        closeModal={() => setIsHorarioOpen(false)}
      />
    </>
  );
};
