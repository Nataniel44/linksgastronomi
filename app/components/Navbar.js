"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  // 🎢 Cambiar estilo con scroll y controlar visibilidad del navbar
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 10);

      // Mostrar navbar cuando se desplaza hacia arriba, ocultar cuando baja
      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        setShowNavbar(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowNavbar(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // 🚫 Bloquear scroll cuando el menú móvil está abierto
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
  }, [isOpen]);

  const menuItems = [
    { href: "/", label: "Inicio" },
    { href: "#servicios", label: "Soluciones" }, // Fixed local link
    { href: "#contacto", label: "Contacto" },
  ];

  return (
    <>
      {/* Navbar principal */}
      <nav
        className={`fixed top-0 inset-x-0 z-50 mx-auto transition-all duration-300 ${showNavbar ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
          } ${scrolled ? 'bg-black/80 backdrop-blur-md border-b border-white/5' : 'bg-transparent'}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative w-10 h-10 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-yellow-500/20 blur-md group-hover:bg-yellow-500/30 transition duration-300" />
              <Image
                src="/c.png"
                alt="Logo"
                width={40}
                height={40}
                priority
                className="relative z-10 object-contain"
              />
            </div>
            <span className="text-xl font-bold text-white hidden sm:block tracking-tight">
              Clickcito
            </span>
          </Link>


          {/* Menú desktop */}
          <div className="hidden md:flex items-center space-x-1">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors rounded-lg hover:bg-white/5"
              >
                {item.label}
              </Link>
            ))}

            <Link
              href="https://wa.me/543755246464"
              target="_blank"
              className="ml-4 px-6 py-2.5 bg-white text-black text-sm font-bold rounded-full hover:bg-gray-100 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] flex items-center gap-2"
            >
              <span>💬</span> Hablemos
            </Link>
          </div>

          {/* Botón móvil */}
          <button
            onClick={toggleMenu}
            aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
            className="md:hidden relative w-10 h-10 flex items-center justify-center text-white focus:outline-none"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span
                className={`h-0.5 w-full bg-white rounded-full transition-all duration-300 ${isOpen ? "rotate-45 translate-y-2.5" : ""}`}
              />
              <span
                className={`h-0.5 w-full bg-white rounded-full transition-all duration-300 ${isOpen ? "opacity-0" : "opacity-100"}`}
              />
              <span
                className={`h-0.5 w-full bg-white rounded-full transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-2" : ""}`}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Menú móvil */}
      <div
        className={`fixed inset-0 z-[60] bg-black transform transition-transform duration-300 ease-open-menu md:hidden flex flex-col ${isOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="p-6 flex justify-between items-center border-b border-white/10">
          <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-2">
            <Image src="/c.png" alt="Logo" width={32} height={32} />
            <span className="text-white font-bold text-lg">Clickcito</span>
          </Link>
          <button
            onClick={() => setIsOpen(false)}
            className="w-10 h-10 flex items-center justify-center text-white/50 hover:text-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>

        <div className="flex-1 flex flex-col p-6 gap-2 overflow-y-auto">
          {menuItems.map((item, idx) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="text-2xl font-bold text-white/90 py-4 border-b border-white/5 hover:text-yellow-400 transition-colors"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              {item.label}
            </Link>
          ))}

          <a
            href="https://wa.me/543755246464"
            target="_blank"
            onClick={() => setIsOpen(false)}
            className="mt-8 bg-green-600 text-white font-bold text-center py-4 rounded-xl text-lg hover:bg-green-500 transition-colors"
          >
            Hablar por WhatsApp
          </a>
        </div>

        <div className="p-6 text-center text-white/30 text-xs">
          © {new Date().getFullYear()} Clickcito. San Vicente.
        </div>
      </div>
    </>
  );
}