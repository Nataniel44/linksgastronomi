export const ProductCard = ({ product, addToCart }) => (
  <div className=" w-52 h-full  justify-between  text-center   rounded-lg flex flex-col items-center text-balance">
    <img className="w-32 h-32 object-cover" src={product.image} alt={product.name} />

    <h2 className="text-xl font-semibold mt-2 ">{product.name}</h2>
    <p className="text-gray-500 mt-1  flex">{product.description}</p>
    <var className="text-xl font-bold text-green-600 mt-2">
      {new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(product.price)}
    </var>

    <button
      onClick={() => addToCart(product)}
      className="bg-green-500 text-white text-sm rounded-full px-4 py-2 mt-4 hover:bg-green-400"
    >
      Agregar al carrito
    </button>
  </div>
);
