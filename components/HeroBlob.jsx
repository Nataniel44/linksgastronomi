"use client";

import Image from "next/image";
import { Code2, Sparkles, Palette } from "lucide-react";
import { useEffect, useState } from "react";

export function HeroBlob() {
  const [particles] = useState(
    Array.from({ length: 5 }, (_, i) => ({
      left: `${15 + i * 18}%`,
      top: `${30 + i * 10}%`,
      delay: `${i * 0.8}s`,
      duration: `${5 + i * 1.5}s`,
    }))
  );

  return (
    <section className="relative w-full pb-16 flex flex-col items-center justify-center pt-16 overflow-hidden bg-gradient-to-b from-white via-yellow-50/30 to-white">
      {/* Partículas flotantes */}
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute w-8 h-8 bg-blue-400 rounded-full blur-sm animate-float"
          style={{
            left: p.left,
            top: p.top,
            animationDelay: p.delay,
            animationDuration: p.duration,
          }}
        />
      ))}

      {/* Contenido */}
      <div className="relative z-10 flex flex-col items-center text-center gap-8 px-4 mx-auto animate-fade-in">
        <div className="flex flex-col items-center gap-3">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-gray-900">
            Hola, soy{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-yellow-500">
                Nataniel Soto
              </span>
              <span className="absolute bottom-2 left-0 h-3 bg-yellow-300/40 -z-10 animate-underline"></span>
            </span>
          </h1>
        </div>

        {/* Card principal */}
        <div className="w-full max-w-4xl animate-scale-in">
          <div className="relative flex flex-col md:flex-row items-center bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-lg overflow-hidden shadow-2xl border border-yellow-500/20 group">
            {/* Efecto brillo */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-500/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-[1000ms]" />

            {/* Imagen */}
            <div className="relative w-full md:w-2/5 h-64 md:h-80 overflow-hidden transform transition-transform duration-300 group-hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
              <Image
                src="/nata.jpeg"
                alt="Nataniel - Desarrollador Web"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Texto */}
            <div className="flex-1 p-8 md:p-10 space-y-6">
              <p className="text-white text-lg md:text-xl lg:text-2xl leading-relaxed">
                Desarrollador autodidacta de 21 años, desde Oberá, Misiones.
                Creo experiencias digitales que combinan diseño elegante con{" "}
                <span className="font-bold text-yellow-400 relative inline-block">
                  tecnología moderna
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-400 origin-left animate-line"></span>
                </span>
                .
              </p>

              {/* Iconos */}
              <div className="flex flex-wrap gap-4 pt-4">
                {[
                  { icon: Code2, text: "Desarrollo" },
                  { icon: Palette, text: "Diseño UX/UI" },
                  { icon: Sparkles, text: "Innovación" },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/30 rounded-full px-4 py-2 hover:scale-110 hover:-translate-y-1 transition-transform duration-300 opacity-0 animate-slide-in"
                    style={{ animationDelay: `${0.8 + idx * 0.2}s` }}
                  >
                    <item.icon className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm font-medium text-yellow-100">
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes float {
          0%,
          100% {
            transform: translate(0, 0);
            opacity: 0.3;
          }
          50% {
            transform: translate(var(--tx, 20px), -100px);
            opacity: 0.6;
          }
        }
        .animate-float {
          animation: float infinite ease-in-out;
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease forwards;
        }

        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-scale-in {
          animation: scale-in 0.8s ease forwards;
        }

        @keyframes underline {
          from {
            width: 0;
          }
          to {
            width: 100%;
          }
        }
        .animate-underline {
          animation: underline 0.8s ease forwards 0.5s;
        }

        @keyframes line {
          0% {
            transform: scaleX(0);
          }
          50% {
            transform: scaleX(1);
          }
          100% {
            transform: scaleX(0);
          }
        }
        .animate-line {
          animation: line 8s ease-in-out infinite;
        }

        @keyframes slide-in {
          0% {
            opacity: 0;
            transform: translateX(-20px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-slide-in {
          animation: slide-in 0.6s ease forwards;
        }
      `}</style>
    </section>
  );
}
