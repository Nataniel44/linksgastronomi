import BentoGrid from "./components/BentoGrid";
import Link from "next/link";

export default function Home() {
  return (
    
    <main className="min-h-screen   dark:text-white flex flex-col items-center justify-center">
      {/* Fondo decorativo blop */}
      <div className="absolute z-40 top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <svg width="100%" height="100%" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <defs>
            <filter id="blurfondo" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="60" />
            </filter>
          </defs>
          <ellipse cx="600" cy="100" rx="220" ry="120" fill="#fde047" fillOpacity="0.50" filter="url(#blurfondo)" />
          <ellipse cx="200" cy="300" rx="180" ry="100" fill="#facc15" fillOpacity="0.50" filter="url(#blurfondo)" />
          <ellipse className="z-[100]" cx="700" cy="500" rx="90" ry="60" fill="#fbbf24" fillOpacity="0.25" filter="url(#blurfondo)" />
        </svg>
      </div>
      <section className="w-full max-w-4xl mx-auto py-14 mt-10 px-4 flex flex-col items-center gap-10">
        <div className="flex flex-col items-center gap-4 mt-10">
  
          <img className="w-72 md:w-96" src="./log.png"alt="1" />
          <h2 className="text-xl  text-balance md:text-3xl font-semibold text-yellow-500 text-center mt-2">
            Menús Digitales y Apps para Gastronomía
          </h2>
          
          <Link
            href="/demo"
            className="relative group bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 text-white font-extrabold px-10 py-4 rounded-full shadow-xl text-xs md:text-sm transition hover:scale-105 border-0 focus:outline-none focus:ring-4 focus:ring-yellow-200 overflow-hidden"
            style={{ letterSpacing: '0.04em' }}
          >
            <span className="absolute inset-0  bg-yellow-300/75  group-hover:opacity-0 transition rounded-full"></span>
            <span className="flex items-center text-black gap-2 relative z-10">
              <svg className="w-6 h-6 animate-bounce " fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
              Ver carta de Top One Burgers
            </span>
          </Link>
       
          <Link href="#contacto" className="text-green-500 hover:underline"> 
          Contáctanos para más info
          <svg className="w-6 h-6 inline-block ml-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5  l7 7-7 7" />
          </svg>  
          </Link>
     
        </div>
       <section className="relative w-full max-w-5xl mx-auto py-10 px-4 h-screen ">
  {/* Fondo degradado */}
      <div className="absolute -z-10 top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <svg width="100%" height="100%" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <defs>
            <filter id="blurfondo" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="60" />
            </filter>
          </defs>
          <ellipse cx="600" cy="200" rx="220" ry="120" fill="#005afda6" fillOpacity="0.90" filter="url(#blurfondo)" />
          <ellipse cx="200" cy="500" rx="180" ry="100" fill="#005afda6" fillOpacity="0.90" filter="url(#blurfondo)" />
          <ellipse cx="700" cy="500" rx="90" ry="60" fill="#005afda6" fillOpacity="0.90" filter="url(#blurfondo)" />
        </svg>
      </div>
<div className="flex flex-col items-center justify-start relative z-[100]">

  {/* Título */}
  <h2 className="text-black text-3xl text-center font-extrabold relative z-10">DESTACA ENTRE LOS DEMÁS</h2>
  <p className="text-lg text-center text-gray-700 mt-4 max-w-md z-10 relative">
    Convertí tu menú en una experiencia visual atractiva y fácil de usar. Diferenciate de la competencia.
  </p>

  {/* Botón CTA */}
  <button  className="mt-6 px-6 py-3 bg-black text-white font-semibold rounded-full hover:bg-gray-900 transition z-10 relative">
    <a href="#contacto" className="flex items-center gap-2">
    PROBALÓ GRATIS
  </a>
  </button>
</div>

  {/* Imágenes */}
  <img src="cc.png" className="absolute top-50 right-0 w-72  md:w-[40rem] z-50 sm:invisible   animate-fade-up" alt="Menú digital en celular" />
  <img src="vc.png" className="absolute bottom-10 right-0 w-52 md:w-[50rem] sm:invisible z-50 drop-shadow-xl animate-fade-up" alt="Menú digital en celular" />
  <img src="b.png" className="absolute bottom-10 right-0 w-80 sm:w-[40rem] z-20 sm:visible  invisible drop-shadow-xl animate-fade-up" alt="Menú digital en celular" />
  <img src="a.png" className="absolute bottom-10 left-0 w-56 z-10 drop-shadow-xl  animate-fade-up delay-150" alt="Menú digital en desktop" />
</section>

           <div className="  text-center">
          <p className="text-lg md:text-xl pb-5 text-balance text-gray-700 text-center max-w-2xl mt-2">Lleva tu <span className="font-bold"> restaurante</span>,
          <span className="font-bold">  hamburguesería</span>, 
          <span className="font-bold"> pizzería</span> o 
          <span className="font-bold">bar</span> al 
          <span className="font-bold"> siguiente nivel.
             </span></p>
         
        <BentoGrid />
        </div>
        <div id="servicio" className="flex flex-col md:flex-row gap-4 justify-center items-center mt-8">
          <a
            href="#contacto"
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold px-10 py-4 rounded-full shadow-xl text-lg transition border-2 border-yellow-400"
          >
            Solicita tu demo
          </a>
          <a
            href="#servicios"
            className="bg-white border-2 border-yellow-400 text-yellow-600 font-bold px-10 py-4 rounded-full shadow text-lg hover:bg-yellow-100 transition"
          >
            Ver servicios
          </a>
        </div>
      </section>
      <section id="servicios" className=" w-full max-w-5xl mx-auto px-4 pb-10">
        <h2 className="text-3xl font-bold text-yellow-600 mb-8 text-center tracking-wide drop-shadow">
          ¿Qué ofrecemos?
        </h2>
        <ul className="grid grid-cols-2 md:grid-cols-3 gap-8 ">
          <li className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-yellow-400 flex flex-col items-center">
            <span className="text-3xl mb-2">📱</span>
            <h3 className="font-bold text-xl mb-2 text-center text-yellow-600">
              Cartas Digitales
            </h3>
            <p className="text-gray-700 text-center text-balance">
              Menús online, QR, visuales y fáciles de actualizar para tu local.
            </p>
          </li>
          <li className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-yellow-400 flex flex-col items-center">
            <span className="text-3xl mb-2">🛒</span>
            <h3 className="font-bold text-xl mb-2 text-center text-yellow-600">
              Apps Personalizadas
            </h3>
            <p className="text-gray-700 text-center text-balance">
              Desarrollo de apps para pedidos, reservas y promociones a medida.
            </p>
          </li>
          <li className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-yellow-400 flex flex-col items-center">
            <span className="text-3xl mb-2">🚚</span>
            <h3 className="font-bold text-xl mb-2 text-yellow-600 text-center">
              Soluciones para Delivery
            </h3>
            <p className="text-gray-700 text-center text-balance">
              Optimiza tu delivery y take away con tecnología moderna y fácil de
              usar.
            </p>
          </li>
        </ul>
      </section>

      <section id="contacto" className="w-full   py-14 px-4   ">
      <form
  action="https://formspree.io/f/xdkdejvr"  // reemplazá por tu URL real
  method="POST"
  className="flex flex-col gap-4 bg-white rounded-2xl shadow-xl p-8 border-t-4 border-yellow-400 text-black"
>
  <h2 className="text-3xl font-bold text-yellow-600 mb-6 text-center drop-shadow">
    ¿Listo para digitalizar tu carta?
  </h2>

  <input
    type="text"
    name="local"
    placeholder="Nombre del local"
    required
    className="p-4 border rounded focus:ring-2 focus:ring-yellow-400 text-lg"
  />

  <input
    type="email"
    name="email"
    placeholder="Email de contacto"
    required
    className="p-4 border rounded focus:ring-2 focus:ring-yellow-400 text-lg"
  />

  <textarea
    name="mensaje"
    placeholder="¿Qué tipo de solución buscas?"
    required
    className="p-4 border rounded focus:ring-2 focus:ring-yellow-400 text-lg"
    rows={3}
  ></textarea>

  <button
    type="submit"
    className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold px-8 py-4 rounded-full shadow-lg mt-2 transition text-lg border-2 border-yellow-400"
  >
    Contactar
  </button>
</form>

      </section>
    </main>
  );
}
