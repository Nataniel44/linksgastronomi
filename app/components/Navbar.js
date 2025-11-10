"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  // 🔐 Verificar sesión (seguro y sin romper en local)
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const baseUrl =
          process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
        const res = await fetch(`${baseUrl}/api/me`, {
          credentials: "include",
        });
        if (!res.ok) throw new Error("No autenticado");
        const data = await res.json();
        setIsLoggedIn(data?.loggedIn === true);
      } catch {
        setIsLoggedIn(false);
      }
    };
    checkAuth();
  }, []);

  // 🚪 Cerrar sesión
  const handleLogout = async () => {
    try {
      const baseUrl =
        process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
      await fetch(`${baseUrl}/api/logout`, {
        method: "POST",
        credentials: "include",
      });
      setIsLoggedIn(false);
      window.location.href = "/login";
    } catch (err) {
      console.error("Error al cerrar sesión:", err);
    }
  };

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

  // Exponer el estado del navbar globalmente para otros componentes
  useEffect(() => {
    document.documentElement.style.setProperty(
      '--navbar-visible',
      showNavbar ? '1' : '0'
    );
  }, [showNavbar]);

  // 🚫 Bloquear scroll cuando el menú móvil está abierto
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
  }, [isOpen]);

  const menuItems = [
    { href: "/", label: "Inicio" },
    { href: "#servicio", label: "Servicios" },
    { href: "/demo", label: "Demo interactiva" },
  ];

  return (
    <>
      {/* Navbar principal */}
      <nav
        className={`fixed top-3 inset-x-0 z-50 mx-auto transition-all duration-300 ${showNavbar ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative w-12 h-12 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 opacity-20 blur-md group-hover:opacity-30 transition" />
              <Image
                src="/c.png"
                alt="Logo"
                width={32}
                height={32}
                priority
                className="relative z-10 object-contain w-auto h-auto" // ✅ mantiene proporción
              />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent hidden sm:block">
              Clickcito
            </span>
          </Link>


          {/* Menú desktop */}
          <div className="hidden md:flex items-center space-x-2">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative px-4 py-2 text-gray-700 dark:text-gray-300 font-medium group rounded-lg overflow-hidden transition"
              >
                <span className="relative z-10 group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors">
                  {item.label}
                </span>
                <span className="absolute inset-0 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300" />
              </Link>
            ))}

            <Link
              href="#contacto"
              className="relative ml-4 group flex justify-center items-center"
            >
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 rounded-full blur opacity-75 group-hover:opacity-100 transition" />
                <div className="relative px-6 py-2.5 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold rounded-full shadow-lg group-hover:shadow-yellow-500/50 transition">
                  Contáctanos
                </div>
              </div>
            </Link>
          </div>

          {/* Botón móvil */}
          <button
            onClick={toggleMenu}
            aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
            className="md:hidden relative w-10 h-10 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-yellow-500 rounded-lg z-[100]"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span
                className={`h-0.5 rounded-full transition-all duration-300 ${isOpen
                  ? "rotate-45 translate-y-2.5 bg-white"
                  : "bg-gray-800 dark:bg-white"
                  }`}
              />
              <span
                className={`h-0.5 rounded-full transition-all duration-200 ${isOpen ? "opacity-0" : "opacity-100 bg-gray-800 dark:bg-white"
                  }`}
              />
              <span
                className={`h-0.5 rounded-full transition-all duration-300 ${isOpen
                  ? "-rotate-45 -translate-y-2.5 bg-white"
                  : "bg-gray-800 dark:bg-white"
                  }`}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Menú móvil */}
      <div
        className={`fixed top-0 right-0 z-[999] h-screen w-full max-w-sm bg-gradient-to-br from-gray-900 via-gray-800 to-black transform transition-transform duration-500 ease-in-out md:hidden ${isOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-6 z-50 right-6 w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm border border-white/20 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="relative h-full flex flex-col justify-between p-8 pt-20">
          <div className="flex flex-col space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block px-6 py-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-yellow-500/50 transition"
              >
                <span className="text-2xl font-semibold text-white hover:text-yellow-400 transition">
                  {item.label}
                </span>
              </Link>
            ))}

            <Link
              href="#contacto"
              onClick={() => setIsOpen(false)}
              className="block mt-6 relative overflow-hidden rounded-xl"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-600 opacity-90 hover:opacity-100 transition-opacity" />
              <div className="relative px-8 py-4 text-center">
                <span className="text-xl font-bold text-black">
                  Contáctanos
                </span>
              </div>
            </Link>
          </div>

          {isLoggedIn && (
            <button
              onClick={handleLogout}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-full transition"
            >
              Cerrar sesión
            </button>
          )}

          <div className="pt-8 text-center pb-6">
            <p className="text-sm text-gray-400">
              Creado con ❤️ por{" "}
              <Link
                target="_blank"
                href="https://instagram.com/nata.st44"
                className="text-yellow-400 hover:text-yellow-300 font-semibold transition"
              >
                @nata.st44
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Fondo oscuro detrás del menú móvil */}
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300 md:hidden z-[40] ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
      />
    </>
  );
}