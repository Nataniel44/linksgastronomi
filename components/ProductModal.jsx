import { useState } from 'react';

export default function ProductModal({ product, onClose, onAdd }) {
  const [quantity, setQuantity] = useState(1);
  // Estado para cada extra: array de cantidades
  const [extrasQty, setExtrasQty] = useState(
    product.extras ? product.extras.map(() => 0) : []
  );

  // Calcula el total de extras
  const extrasTotal = product.extras
    ? product.extras.reduce((sum, extra, idx) => sum + (extrasQty[idx] || 0) * extra.price, 0)
    : 0;

  const total = product.price * quantity + extrasTotal;

  // Construye el array de extras seleccionados para el carrito
  const selectedExtras = product.extras
    ? product.extras
        .map((extra, idx) =>
          extrasQty[idx] > 0
            ? { name: extra.name, price: extra.price, qty: extrasQty[idx] }
            : null
        )
        .filter(Boolean)
    : [];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative">
        <button
          className="absolute top-3 right-3 text-2xl text-gray-400 hover:text-gray-700"
          onClick={onClose}
        >×</button>
             {/* Imagen UX/UI */}
        {product.image && (
          <div className="flex justify-center mb-4">
            <img
              src={product.image}
              alt={product.name}
              className="w-32 h-32 object-cover rounded-full shadow"
            />
          </div>
        )}
        <h2 className="text-xl font-bold text-center">{product.name}</h2>
        <div className="text-[#FF3B00] font-bold text-lg mb-2 text-center">${product.price}</div>
        <div className="text-gray-500 mb-4 text-center">{product.description}</div>
        {/* Cantidad */}
        <div className="flex items-center justify-between bg-gray-100 rounded-lg px-4 py-2 mb-4">
          <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="text-2xl px-2">-</button>
          <span className="font-bold text-lg">{quantity}</span>
          <button onClick={() => setQuantity(q => q + 1)} className="text-2xl px-2">+</button>
        </div>
        {/* Extras dinámicos */}
        {product.extras && product.extras.length > 0 && (
          <div className="mb-4">
            <div className="font-semibold mb-2">Extras <span className="text-xs text-gray-400">(opcional)</span></div>
            {product.extras.map((extra, idx) => (
              <div key={extra.name} className="flex items-center gap-2 mb-2">
                <span className="text-sm">{extra.name}</span>
                {extra.price > 0 && (
                  <span className="text-[#FF3B00] font-bold text-sm">+${extra.price}</span>
                )}
                <button
                  onClick={() =>
                    setExtrasQty(qty =>
                      qty.map((q, i) => i === idx ? Math.max(0, q - 1) : q)
                    )
                  }
                  className="text-2xl px-2"
                >-</button>
                <span className="font-bold">{extrasQty[idx]}</span>
                <button
                  onClick={() =>
                    setExtrasQty(qty =>
                      qty.map((q, i) => i === idx ? q + 1 : q)
                    )
                  }
                  className="text-2xl px-2"
                >+</button>
              </div>
            ))}
          </div>
        )}
        {/* Botón agregar */}
        <button
          className="w-full bg-[#5fb333] text-white rounded-full py-3 font-bold text-lg mt-4"
          onClick={() => onAdd(product, quantity, selectedExtras)}
        >
          Agregar a mi pedido &nbsp; ${total}
        </button>
      </div>
    </div>
  );
}