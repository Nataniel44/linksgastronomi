"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Verificar sesión
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/me", { credentials: "include" });
        const data = await res.json();
        setIsLoggedIn(data.loggedIn);
      } catch {
        setIsLoggedIn(false);
      }
    };
    checkAuth();
  }, []);

  // Cerrar sesión
  const handleLogout = async () => {
    await fetch("/api/logout", {
      method: "POST",
      credentials: "include",
    });
    setIsLoggedIn(false);
    window.location.href = "/login";
  };

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Bloquear scroll cuando el menú está abierto
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
  }, [isOpen]);

  const menuItems = [
    { href: '/', label: 'Inicio' },
    { href: '#servicio', label: 'Servicios' },
    { href: '/demo', label: 'Demo interactiva' },
  ];

  return (
    <>

      <nav
        className={`fixed top-3 inset-x-0 z-50 mx-auto transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${scrolled
          ? "w-[90%] md:w-[85%] lg:w-[70%] bg-white/80 dark:bg-gray-900/80 backdrop-blur-2xl shadow-2xl shadow-black/10 scale-95 rounded-full"
          : "w-[95%] bg-transparent scale-100"
          }`}
      >
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative w-12 h-12 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 opacity-20 blur-md group-hover:opacity-30 transition" />
                <img src="/c.png" alt="Logo" className="w-8 h-8 relative z-10" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent hidden sm:block">
                Clickcito
              </span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-2">
              {menuItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="relative px-4 py-2 text-gray-700 dark:text-gray-300 font-medium group rounded-lg overflow-hidden transition"
                >
                  <span className="relative z-10 group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors duration-300">
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
                  <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-300" />
                  <div className="relative px-6 py-2.5 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold rounded-full shadow-lg group-hover:shadow-yellow-500/50 transition duration-300">
                    Contáctanos
                  </div>
                </div>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={isOpen}
              className="md:hidden relative w-10 h-10 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-yellow-500 rounded-lg z-[100]"
            >
              <div className="relative w-6 h-5 flex flex-col justify-between">
                <span
                  className={`w-full h-0.5 rounded-full transform transition-all duration-300 origin-center ${isOpen
                    ? 'rotate-45 translate-y-2.5 bg-white'
                    : 'rotate-0 bg-gray-800 dark:bg-white'
                    }`}
                />
                <span
                  className={`w-full h-0.5 rounded-full transition-all duration-200 ${isOpen ? 'opacity-0' : 'opacity-100 bg-gray-800 dark:bg-white'
                    }`}
                />
                <span
                  className={`w-full h-0.5 rounded-full transform transition-all duration-300 origin-center ${isOpen
                    ? '-rotate-45 -translate-y-2.5 bg-white'
                    : 'rotate-0 bg-gray-800 dark:bg-white'
                    }`}
                />
              </div>
            </button>
          </div>
        </div>


      </nav>
      {/* Mobile Menu */}
      <div
        className={`fixed top-0 z-[999] -right-5 h-screen w-full max-w-sm bg-gradient-to-br from-gray-900 via-gray-800 to-black transform transition-transform duration-500 ease-in-out md:hidden  ${isOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        {/* Backdrop */}


        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm border border-white/20 transition-colors z-10"
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

        <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-5 left-0 w-64 h-64 bg-yellow-600/10 rounded-full blur-3xl" />

        <div className="relative h-full flex flex-col justify-between p-8 pt-20">
          <div className="flex-1 flex flex-col justify-center space-y-2">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block px-6 py-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-yellow-500/50 transition-all duration-300"
              >
                <span className="text-2xl font-semibold text-white hover:text-yellow-400 transition-colors duration-300">
                  {item.label}
                </span>
              </Link>
            ))}

            <Link
              href="#contacto"
              onClick={() => setIsOpen(false)}
              className="block mt-6 relative overflow-hidden rounded-xl"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-600 opacity-90 hover:opacity-100 transition-opacity duration-300" />
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
              Creado con ❤️ por{' '}
              <Link
                target="_blank"
                href="https://instagram.com/nata.st44"
                className="text-yellow-400 hover:text-yellow-300 font-semibold transition-colors duration-300"
              >
                @nata.st44
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 h-screen bg-black/70 backdrop-blur-sm transition-opacity duration-300 md:hidden z-[40] ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
      />
    </>
  );
}
