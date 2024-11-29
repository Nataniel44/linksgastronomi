export const Header = ({ openModal }) => (
  <header className="text-black bg-yellow-400 rounded-b-2xl  p-6 text-center h-64 flex justify-center items-center flex-col text-black gap-5">
    <div>
      <span className="text-2xl md:text-4xl font-normal uppercase">Carta de</span>
      <h1 className="uppercase text-3xl md:text-5xl font-bold leading-8">TOP ONE BURGERS</h1>
    </div>
    <button
      onClick={openModal}
      className=" bottom-3 left-4 uppercase  "
    >
      <h4 className="flex gap-1 items-center justify-center ">
        <span className="font-extrabold text-green-700  hover:bg-green-500/65  hover:text-opacity-50 group-hover:text-opacity-50 bg-green-400/65 rounded-full px-4 py-2 font-bold border-green-700/50 border text-black">
          ver horarios {" "}
        </span>
        - Oberá, MISIONES
      </h4>
    </button>
  </header>
);
