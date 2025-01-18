export const Header = ({ openModal }) => (
  <header className="text-black py-10 via-yellow-300/75 to-white from-50% from-yellow-300 bg-gradient-to-b  text-center h-80 flex justify-center items-center flex-col text-black gap-5">

    <span className="text-md md:text-md font-normal uppercase">¡bienvenidos a nuestro menú - (DEMO)!</span>
    <h1 className="uppercase text-5xl md:text-5xl font-bold leading-9">TOP ONE BURGERS</h1>


    <button onClick={openModal} className="font-extrabold uppercase text-green-700  hover:bg-green-500/65  hover:text-opacity-50 group-hover:text-opacity-50 bg-green-400/65 rounded-full px-2 py-1 font-light border-green-700/50 border text-black">
      Ver horarios
    </button>
  </header>
);
