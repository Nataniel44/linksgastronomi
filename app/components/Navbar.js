"use client";
import React, { useState, useEffect, useMemo } from 'react';
import Image from "next/image";
import Link from 'next/link';
import { motion, AnimatePresence, LazyMotion, domAnimation, m } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  // 🔹 Verificar sesión al montar
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

  // 🔹 Cerrar sesión
  const handleLogout = async () => {
    await fetch("/api/logout", {
      method: "POST",
      credentials: "include",
    });
    setIsLoggedIn(false);
    window.location.href = "/login";
  };
  // Memoizar variantes para evitar recrearlas en cada render
  const navVariants = useMemo(() => ({
    initial: { y: -80, opacity: 0, scale: 0.9 },
    animate: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.7, ease: [0.25, 0.8, 0.25, 1] }
    }
  }), []);

  const menuItemVariants = useMemo(() => ({
    hidden: { opacity: 0, x: 50 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1 }
    })
  }), []);

  const backdropVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  }), []);

  const menuPanelVariants = useMemo(() => ({
    hidden: { x: '100%' },
    visible: {
      x: 0,
      transition: { type: 'spring', damping: 25, stiffness: 200 }
    },
    exit: { x: '100%' }
  }), []);

  // Handle scroll detection with throttling
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const isScrolled = window.scrollY > 10;
          setScrolled(isScrolled);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle ESC key to close menu
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  const menuItems = [
    { href: '/', label: 'Inicio' },
    { href: '#servicio', label: 'Servicios' },
    { href: '/demo', label: 'Demo interactiva' },
  ];

  return (
    <LazyMotion features={domAnimation}>
      <m.nav
        variants={navVariants}
        initial="initial"
        animate="animate"
        className={`fixed top-3 inset-x-0 z-50 mx-auto transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${scrolled
          ? "w-[90%] md:w-[85%] lg:w-[70%] bg-white/80 dark:bg-gray-900/80 backdrop-blur-2xl shadow-2xl shadow-black/10 scale-95 rounded-full"
          : "w-[95%] bg-transparent scale-100"
          }`}
      >
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo con animación */}
            <Link href="/" className="relative group">
              <m.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-3"
              >
                <div className="relative w-12 h-12 flex items-center justify-center">
                  {/* Removido animate rotate infinito - muy costoso */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 opacity-20 blur-md" />
                  <img
                    src="/c.png"
                    alt="Logo"
                    className="w-8 h-8 relative z-10 drop-shadow-lg"
                  />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent hidden sm:block">
                  Clickcito
                </span>
              </m.div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center justify-center space-x-2">
              {menuItems.map((item, index) => (
                <m.div
                  key={item.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    className="relative px-4 py-2 text-gray-700 dark:text-gray-300 font-medium group overflow-hidden rounded-lg"
                  >
                    <span className="relative z-10 group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors duration-300">
                      {item.label}
                    </span>
                    {/* Simplificado: usar CSS en lugar de motion para hover */}
                    <span className="absolute inset-0 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300" />
                  </Link>
                </m.div>
              ))}

              {/* CTA Button */}
              <m.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
              >
                <Link
                  href="#contacto"
                  className="relative ml-4 group flex justify-center items-center"
                >
                  <m.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative"
                  >
                    {/* Removido animate-pulse - usar CSS animation */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-300" />
                    <div className="relative px-6 py-2.5 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold rounded-full shadow-lg group-hover:shadow-yellow-500/50 transition duration-300">
                      Contáctanos
                    </div>
                  </m.div>
                </Link>
              </m.div>
            </div>

            {/* Mobile Menu Button */}
            <m.button
              whileTap={{ scale: 0.9 }}
              onClick={toggleMenu}
              aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={isOpen}
              className="md:hidden relative w-10 h-10 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-yellow-500 rounded-lg z-[100]"
            >
              <div className="relative w-6 h-5 flex flex-col justify-between">
                <m.span
                  animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`w-full h-0.5 rounded-full transform origin-center ${isOpen ? 'bg-white' : 'bg-gray-800 dark:bg-white'
                    }`}
                />
                <m.span
                  animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  className={`w-full h-0.5 rounded-full ${isOpen ? 'bg-white' : 'bg-gray-800 dark:bg-white'
                    }`}
                />
                <m.span
                  animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`w-full h-0.5 rounded-full transform origin-center ${isOpen ? 'bg-white' : 'bg-gray-800 dark:bg-white'
                    }`}
                />
              </div>
            </m.button>
          </div>
        </div>
      </m.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <m.div
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm md:hidden z-[80]"
              onClick={() => setIsOpen(false)}
            />

            {/* Menu Panel */}
            <m.div
              variants={menuPanelVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed right-0 top-0 h-screen w-full max-w-sm bg-gradient-to-br from-gray-900 via-gray-800 to-black md:hidden z-[90] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Botón Cerrar */}
              <m.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm border border-white/20 transition-colors z-10"
                aria-label="Cerrar menú"
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
              </m.button>

              {/* Decorative elements - estáticos, no animados */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-600/10 rounded-full blur-3xl" />

              <div className="relative h-full flex flex-col justify-between p-8 pt-20">
                {/* Menu Items */}
                <div className="flex-1 flex flex-col justify-center space-y-2">
                  {menuItems.map((item, index) => (
                    <m.div
                      key={item.href}
                      custom={index}
                      variants={menuItemVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="block group"
                      >
                        <m.div
                          whileHover={{ x: 10 }}
                          className="px-6 py-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-yellow-500/50 transition-all duration-300"
                        >
                          <span className="text-2xl font-semibold text-white group-hover:text-yellow-400 transition-colors duration-300">
                            {item.label}
                          </span>
                        </m.div>
                      </Link>
                    </m.div>
                  ))}

                  {/* CTA Button Mobile */}
                  <m.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: menuItems.length * 0.1 }}
                    className="pt-6"
                  >
                    <Link
                      href="#contacto"
                      onClick={() => setIsOpen(false)}
                      className="block group"
                    >
                      <m.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="relative overflow-hidden rounded-xl"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-600 opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="relative px-8 py-4 text-center">
                          <span className="text-xl font-bold text-black">
                            Contáctanos
                          </span>
                        </div>
                      </m.div>
                    </Link>
                  </m.div>
                </div>

                {/* 🔹 Solo mostrar si está logueado */}
                {isLoggedIn && (
                  <button
                    onClick={handleLogout}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-full transition"
                  >
                    Cerrar sesión
                  </button>
                )}
                {/* Footer */}
                <m.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="pt-8 text-center pb-6"
                >
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
                </m.div>
              </div>
            </m.div>
          </>
        )}
      </AnimatePresence>
    </LazyMotion>
  );
}