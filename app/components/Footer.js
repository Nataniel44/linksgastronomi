"use client";

import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Twitter, Mail, ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-black text-white pt-20 pb-10 overflow-hidden border-t border-white/10">
      {/* Decorative Gradients */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent"></div>
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-10 h-10 flex items-center justify-center bg-white/5 rounded-xl border border-white/10 group-hover:bg-white/10 transition-colors">
                <Image
                  src="/c.png"
                  alt="Logo Clickcito"
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Clickcito
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Transformamos la manera en que los restaurantes venden online. Sin comisiones, directo a tu WhatsApp.
            </p>
            <div className="flex gap-4">
              <SocialLink href="#" icon={Instagram} label="Instagram" />
              <SocialLink href="#" icon={Facebook} label="Facebook" />
              <SocialLink href="#" icon={Twitter} label="Twitter" />
            </div>
          </div>

          {/* Links Column */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Producto</h3>
            <ul className="space-y-4">
              <FooterLink href="#servicios">Características</FooterLink>
              <FooterLink href="/demo">Demo en vivo</FooterLink>
              <FooterLink href="#precios">Precios</FooterLink>
              <FooterLink href="#faq">Preguntas frecuentes</FooterLink>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Compañía</h3>
            <ul className="space-y-4">
              <FooterLink href="/nosotros">Sobre nosotros</FooterLink>
              <FooterLink href="#contacto">Contacto</FooterLink>
              <FooterLink href="/privacidad">Política de privacidad</FooterLink>
              <FooterLink href="/terminos">Términos y condiciones</FooterLink>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Mantenete al día</h3>
            <p className="text-gray-400 text-sm mb-4">
              Recibí las últimas novedades y tips para potenciar tu negocio.
            </p>
            <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="email"
                  placeholder="Tu email"
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                />
              </div>
              <button className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3 px-4 rounded-lg transition-colors text-sm">
                Suscribirme
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Clickcito. Todos los derechos reservados.
          </p>

          <div className="flex items-center gap-6">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-emerald-400 transition-colors group"
            >
              Volver arriba
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
                <ArrowUp className="w-4 h-4" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ href, icon: Icon, label }) {
  return (
    <a
      href={href}
      aria-label={label}
      className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-white/10 hover:text-white transition-all hover:scale-110"
    >
      <Icon className="w-5 h-5" />
    </a>
  );
}

function FooterLink({ href, children }) {
  return (
    <li>
      <Link
        href={href}
        className="text-gray-400 hover:text-emerald-400 transition-colors text-sm flex items-center gap-2 group"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/0 group-hover:bg-emerald-500 transition-colors"></span>
        {children}
      </Link>
    </li>
  );
}
