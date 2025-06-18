import Image from "next/image";

const ProductCard = ({ product, addToCart, openModal }) => {
    const priceFormatted = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(product.price);

  return (
    <div
      onClick={openModal}
      className="w-36 h-full flex flex-col items-center justify-between rounded-xl shadow-md overflow-hidden bg-white cursor-pointer transition-transform transform hover:scale-105 hover:shadow-lg"
    >
      <div className="w-full h-36 relative">
      <Image width={144} height={144} className="w-full h-full object-cover rounded-t-xl" src={product.image} alt={product.name} />
      </div>
      <div className="flex flex-col items-center text-center p-4 space-y-1">
        <h2 className="text-base font-bold text-gray-900 uppercase leading-tight">{product.name}</h2>
        <p className="text-xs text-gray-600 leading-snug line-clamp-2">{product.description}</p>
        <var className="text-lg font-bold text-green-600 ">
          {priceFormatted}
        </var>
      </div>
      <button
        onClick={(e) => { e.stopPropagation(); addToCart(product); }}
        className="w-full bg-green-500 text-white text-sm font-semibold py-2 rounded-b-lg transition-colors hover:bg-green-400"
      >
        Agregar al carrito
      </button>
    </div>
  );
};

export default ProductCard;
