"use client";
import React, { useState, useEffect } from 'react';
import Image from "next/image";
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const navClasses = `fixed w-full z-50 top-0 mx-auto max-w-screen-md dark:text-white px-4 py-0 transition duration-300 ${
    scrolled ? 'bg-white/65' : ''
  }`;

  return (    
    <nav className={navClasses}>
      <div className="container mx-auto flex justify-center w-full items-center p-3">
        <div className="z-50  flex items-center w-full justify-between">
          {/* Logo */ }
          <Link href="/" className="text-sm font-bold">
            <div className="text-center  font-extrabold leading-4 text-black flex flex-col justify-center items-center  w-20 h-20 ">
           <span className=' flex flex-col justify-center items-center  '> <img className='w-10 ' src="./c.png" alt="" /> </span> 
            </div>
          </Link>        
          {/* Mobile Menu Button */ }
          <div className="md:hidden ">
            <button
              aria-label="Toggle Mobile Menu"
              onClick={toggleMenu}
              className=" w-10 h-10 flex items-center dark:text-black text-white  justify-center bg-transparent focus:outline-none rounded-md"
            >
              {isOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"                  
                    strokeWidth={3}                
                    d="M6 18L18 6M6 6l12 12"
                    className=' text-white'
                  />
                </svg>
              ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                 fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                   strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
                </svg>
              )}
            </button>
          </div>
            {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-black">
          <Link href="/" className="hover:text-gray-300 transition duration-300">
            Inicio
          </Link>
          <Link href="#servicio" className="hover:text-gray-300 transition duration-300">
            Servicios
          </Link>
          <Link href="/demo" className="hover:text-gray-300 transition duration-300">
           Demo interactiva
          </Link>
          {/* Order Button */ }
          <Link  href="#contacto" className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded-full flex items-center gap-2 transition duration-300">
            Contáctanos
        
          </Link>
        </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={isOpen ? 'open' : 'closed'}
          className={`fixed top-0 right-0 w-full h-screen md:hidden backdrop-blur-sm flex flex-col justify-center items-center  z-40 bg-black/60`}
          variants={{
            open: {
              x: 0,
              opacity: 1,
              transition: { duration: 0.3 },
            },
            closed: {
              x: '100%',
              opacity: 0,
              transition: { duration: 0.3 },
            },
          }}
          
        >
          <div className="flex flex-col gap-8 text-center">
            <Link href="/" className="text-white hover:text-gray-400 transition duration-300 py-2 px-4"
              onClick={() => setIsOpen(false)}>
              Inicio
            </Link>
            <Link href="/about" className="text-white hover:text-gray-400 transition duration-300 py-2 px-4"
              onClick={() => setIsOpen(false)}>
              Nosotros
            </Link>
            <Link href="/login" className="text-white hover:text-gray-400 transition duration-300 py-2 px-4"
              onClick={() => setIsOpen(false)}>
              Acceder
            </Link>
          </div>
          <div className='fixed text-white/50  bottom-0 left-0 w-full text-center'>
            <span>Create by <Link target='_blanck' href='https://instagram.com/nata.st44' className='text-white font-serif'>@nata.st44</Link></span>
          </div>
          
        </motion.div>
        
        </div>
      </nav>
  );
}
