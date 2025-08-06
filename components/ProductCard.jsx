export default function ProductCard({ product, onClick }) {
  return (
    <div
      className="bg-white rounded-xl shadow p-4 flex flex-col justify-between hover:shadow-lg transition cursor-pointer"
      onClick={onClick}
    >
      <div>
        {/* Imagen si existe */}
        {product.image && (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-32 object-cover rounded mb-2"
          />
        )}
        <h2 className="text-lg font-bold">{product.name}</h2>
        <p className="text-sm text-gray-500 mt-1">{product.description}</p>
        {/* Extras opcionales */}
        {product.extras && product.extras.length > 0 && (
          <div className="mt-2">
            <span className="text-xs font-semibold text-[#D58A17]">
              Extras disponibles:
            </span>
            <ul className="list-disc ml-4 text-xs text-gray-600">
              {product.extras.map((extra, idx) => (
                <li key={idx}>
                  {extra.name}
                  {extra.price > 0 && <> (+${extra.price})</>}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="mt-4 flex justify-between items-center">
        <span className="text-lg font-semibold text-[#D58A17]">
          ${product.price}
        </span>
        <span className="text-xs text-gray-400">Ver más</span>
      </div>
    </div>
  );
}