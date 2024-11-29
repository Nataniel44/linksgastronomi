import { Button } from "./components/Button";

export default function Home() {
  return (
    <>
      <div className="flex flex-col items-center justify-cente uppercase py-10 gap-3">
        <div className="flex flex-col justify-center items-center">

          <h1 className="text-4xl md:text-7xl font-extrabold dark:text-white ">Gastro<span className="text-yellow-400">link</span> </h1>
          <p className="dark:text-gray-300 text-lg text-center text-balance md:text-md text-xs max-w-xl px-10">
            Regístrate y gestiona el menú de tu negocio fácilmente. <br />
          </p>
        </div>
        <Button />

        <h3 className="text-xl text-center text-balance">
          Publica tu menú y compártelo con tus clientes
          mediante un <span className="text-yellow-300"> enlace personalizado</span>.
        </h3>
        <div className="grid grid-cols-2 grid-rows-4 h-full w-full p-3 gap-3 h-96 w-96 aspect-square ">
          <div className="row-span-4 bg-white/25 rounded-lg flex justify-center items-center"><img className="object-cover w-full h-full" src="./1.png" alt="1" /></div>
          <div className="bg-white/25 col-span-1 row-span-2 rounded-tr-lg flex justify-center items-center "><img className="object-cover w-full h-full" src="./3.png" alt="1" /></div>
          <div className="bg-white/25 row-span-2 rounded-br-lg flex justify-center items-center"><img className="object-cover w-full h-full" src="./2.png" alt="1" /></div>
        </div>

      </div>

    </>
  );
}
