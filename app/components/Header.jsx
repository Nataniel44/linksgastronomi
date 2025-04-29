import Image from "next/image";

const scrollToPedidos = () => {
  const pedidosSection = document.getElementById("pedidos");
  if (pedidosSection) {
    pedidosSection.scrollIntoView({ behavior: "smooth" });
  }
};
export const Header = ({ openmodal }) => (
  <>
    <header className="relative text-black text-center flex gap-5 items-center justify-center flex-col min-h-96 z-10 py-28">
      {/* Contenedor de la imagen de fondo con degradado */}
      <div className="absolute inset-0 w-full h-full z-[-10]">
        <Image
          width={1920}
          height="1080"
          src="./cheese.jpeg"
          className="w-full h-full object-cover object-[50%_80%] opacity-80"
          alt="Fondo"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-yellow-500/65 to-transparent"></div>
      </div>

      <nav className="bg-white/50 fixed top-0 max-w-screen-md rounded-b-lg backdrop-blur-sm overflow-hidden w-full flex justify-start items-center p-3 z-50">
        <div className="text-center bg-white/40 text-white border rounded-full flex justify-center items-center p-3">
          <Image width={12} height={12} src="./logo.png" className="w-12" alt="top one burgers" />
        </div>
      </nav>

      <div className="flex flex-col gap-5 rounded-lg">
        <h1
          translate="no"
          lang="es"
          className="uppercase text-6xl sm:text-6xl md:text-7xl font-black text-black leading-none"
        >
          TOP ONE <br /> <span className="">BURGERS</span>
        </h1>

        <span className="text-md md:text-md font-thin uppercase text-black">
          ¡Bienvenidos a nuestro menú!
        </span>
      </div>
      <div className="flex flex-col sm:flex-row gap-5">

        <button
          onClick={scrollToPedidos}
          className="bg-black text-white px-4 font-bold py-2 uppercase rounded-full hover:bg-blue-700 transition"
        >
          ¡ Haz tu pedido !
        </button>
        <button
          onClick={openmodal}
          className="flex justify-center items-center gap-3 uppercase  hover:bg-green-500/65 hover:text-opacity-50 group-hover:text-opacity-50 bg-green-400/65 rounded-full px-4 py-2 font-light border-green-700/50 border text-black"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            id="pedidos"
          >
            <circle cx="100" cy="100" r="90" stroke="#333" strokeWidth="10" fill="none" />
            <line x1="100" y1="100" x2="100" y2="50" stroke="#333" strokeWidth="8" strokeLinecap="round" />
            <line x1="100" y1="100" x2="140" y2="120" stroke="#333" strokeWidth="8" strokeLinecap="round" />
            <circle cx="100" cy="100" r="5" fill="#333" />
          </svg>
          <span className="font-bold"> Ver horarios</span>
        </button>
      </div>
    </header>
  </>
);
