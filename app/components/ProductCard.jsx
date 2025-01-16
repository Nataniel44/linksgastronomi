export const ProductCard = ({ product, addToCart }) => (
  <div openModal={() => setIsModalOpen(true)} className=" w-32 h-full  justify-between  text-center   rounded-lg flex flex-col items-center text-balance">
    <img className="w-32 h-32 object-cover  rounded-t-lg shadow-md" src={product.image} alt={product.name} />

    <h2 className="text-md font-extrabold black leading-5 uppercase text-center">
      {product.name}
    </h2>

    <p className="text-gray-500 mt-1  flex leading-5">{product.description}</p>
    <var className="text-xl font-bold text-green-600 D">
      {new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(product.price)}
    </var>

    <button
      onClick={() => addToCart(product)}
      className="bg-green-500 text-white leading-4 text-sm rounded-b-lg px-4 py-2  hover:bg-green-400"
    >
      Agregar al carrito
    </button>
  </div>
);
