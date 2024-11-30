export const Header = ({ openModal }) => (
  <header className="text-black bg-yellow-400   p-6 text-center h-64 flex justify-center items-center flex-col text-black gap-5">
    <div>
      <span className="text-2xl md:text-4xl font-normal uppercase">Carta de</span>
      <h1 className="uppercase text-3xl md:text-5xl font-bold leading-8">TOP ONE BURGERS</h1>
    </div>

    <button onClick={openModal} className="font-extrabold uppercase text-green-700  hover:bg-green-500/65  hover:text-opacity-50 group-hover:text-opacity-50 bg-green-400/65 rounded-full px-2 py-1 font-light border-green-700/50 border text-black">
      Ver horarios
    </button>
  </header>
);
