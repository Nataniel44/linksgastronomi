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
            <div className="text-center  bg-white/40 font-extrabold leading-4 text-black flex flex-col justify-center items-center  border rounded-full  w-20 h-20 ">
           <span className=' border rounded-full flex flex-col justify-center items-center  w-16 h-16'><span>Click</span> <span className='font-normal italic'>Cito</span> </span> 
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
          <Link href="/about" className="hover:text-gray-300 transition duration-300">
            Nosotros
          </Link>
          <Link href="/demo" className="hover:text-gray-300 transition duration-300">
           Demo interactiva
          </Link>
          {/* Order Button */ }
          <Link  href="#contacto" className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded-full flex items-center gap-2 transition duration-300">
            Hacer pedido
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.38.267l.94 2.844c.166.5.167 1.058.001 1.506-.558 1.564-1.73 2.925-3.698 2.925H2.25a.75.75 0 000 1.5h.25c.804 0 1.58.31 2.165.845l.09.134v.01a.752.752 0 00.005.006c.15.08.31.142.473.186a31.436 31.436 0 012.483 1.078 3.992 3.992 0 00-1.3 1.985v.012a.75.75 0 001.5 0v-.012a2.493 2.493 0 011.278-2.044l1.22-1.243a.75.75 0 00-.656-1.227H12.75a.75.75 0 000 1.5h1.043a3.733 3.733 0 01-.928 1.855l-.16.197a3.733 3.733 0 00-.928 1.855h-1.5a.75.75 0 000 1.5H15.75a.75.75 0 000-1.5h-.125c.41.095.833.146 1.26.146 2.462 0 4.468-2.006 4.468-4.468v-.288c0-2.462-2.006-4.468-4.468-4.468zm0-2.25v.012c0 .376.2.723.528.858l1.42.568.88-2.642a.75.75 0 00-.606-.875h-1.632zm-6.586-1.835a.75.75 0 00-.435.316l-.504.953c-.367-.096-.754-.14-1.151-.14-.398 0-.785.044-1.152.14l-.504-.953a.75.75 0 00-.435-.316c-.684.094-1.34.227-1.942.394v.012c-.016.004-.031.009-.048.014v-.012c.581-.153 1.228-.281 1.92-.372z" />
            </svg>
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
