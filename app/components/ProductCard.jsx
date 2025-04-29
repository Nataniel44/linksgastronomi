import Image from "next/image";

const ProductCard = ({ product, addToCart, openModal }) => {
  return (
    <div
      onClick={openModal}
      className="w-36 h-full flex flex-col items-center rounded-lg shadow-lg overflow-hidden border border-black/50  bg-white cursor-pointer "
    >
      <Image width={144} height={144} className="w-full h-36 object-cover rounded-t-lg" src={product.image} alt={product.name} />
      <div className="flex flex-col items-center text-center p-3 space-y-2">
        <h2 className="text-sm font-extrabold text-gray-900 uppercase leading-tight">{product.name}</h2>
        <p className="text-xs text-gray-500 leading-snug line-clamp-2">{product.description}</p>
        <var className="text-lg font-bold text-green-600">
          {new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(product.price)}
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
