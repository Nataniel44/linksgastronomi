"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="backdrop-blur-md dark:bg-white/10 rounded-full mx-3 md:mx-0 border border-white/20 sticky top-3 dark:text-white p-4 z-50 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-lg font-bold uppercase hover:text-gray-300 transition duration-300">
        <span className="from-yellow-400 text-2xl via-yellow-300 to-yellow-300 block  bg-clip-text text-transparent bg-gradient-to-br"> GL</span>
        </Link>
        <div className="md:hidden flex justify-center items-center">
          {/* Botón para abrir/cerrar menú en móvil */}
          <button
            onClick={toggleMenu}
            className="focus:outline-none hover:text-gray-300 transition duration-300"
          >
            {isOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
        {/* Menú en dispositivos móviles y grandes */}
        <motion.div
          initial={false}
          animate={isOpen ? "open" : "closed"}
          variants={{
            open: {
              opacity: 1,
              height: "auto",
              transition: { duration: 0.3 },
            },
            closed: {
              opacity: 1,
              height: 0,
              transition: { duration: 0.3 },
            },
          }}
          className={`${
            isOpen ? "block" : "hidden"
          } md:flex md:gap-3 gap-5 justify-center items-center absolute flex flex-col  md:flex-row md:static top-20 left-0 right-0 bg-neutral-800/95  py-5 md:p-0   rounded-lg shadow-none overflow-hidden md:overflow-visible  md:bg-transparent`}
        >
          <Link
            href="/"
            className="block  text-center text-white hover:bg-white/20 rounded-full px-1 py-0 transition duration-300"
          >
            Inicio
          </Link>
          <Link
            href="/login"
            className="block text-center text-white hover:bg-white/20 rounded transition duration-300"
          >
            Iniciar Sesión
          </Link>
          <Link
            href="/register"
            className="block  text-center text-white hover:bg-white/20 rounded transition duration-300"
          >
            Registrarse
          </Link>
        </motion.div>
      </div>
    </nav>
  );
}
