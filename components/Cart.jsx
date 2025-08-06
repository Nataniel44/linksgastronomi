export default function Cart({ cart, removeFromCart, onConfirm, onClose }) {
  const subtotal = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

  return (
    <aside
      className="md:w-80 w-full bg-white/80 backdrop-blur-md rounded-xl shadow p-4 relative"
      style={{
        maxHeight: '70vh',
        overflowY: 'auto',
        WebkitOverflowScrolling: 'touch'
      }}
    >
      {/* Botón cerrar */}
      {onClose && (
        <button
          type="button"
          className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-red-500 z-20"
          onClick={onClose}
          aria-label="Cerrar"
        >
          ×
        </button>
      )}
      <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
        Mi pedido
      </h3>
      {cart.length === 0 ? (
        <div className="text-gray-400 text-center py-8">
          <img src="/cart-close.svg" alt="Carrito vacío" className="mx-auto mb-2 w-20 opacity-60" />
          <div>Tu carrito está vacío</div>
        </div>
      ) : (
        <>
          <ul className="divide-y">
            {cart.map((item, idx) => (
              <li key={idx} className="py-2 flex justify-between items-center">
                <div>
                  <span className="text-sm font-semibold">{item.name}</span>
                  <span className="block text-xs text-gray-400">(x{item.quantity || 1})</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-[#D58A17] font-bold">
                    ${item.price * (item.quantity || 1)}
                  </span>
                  <button onClick={() => removeFromCart(idx)} className="text-gray-400 hover:text-red-500">
                    🗑️
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="my-4 border-t pt-2">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>${subtotal}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-400">
              <span>Costo de envío</span>
              <span>$0</span>
            </div>
            <div className="flex justify-between font-bold mt-2 text-lg">
              <span>Total</span>
              <span className="text-[#FF3B00]">${subtotal}</span>
            </div>
          </div>
          <button
            className="w-full bg-[#D58A17] text-white px-4 py-2 rounded font-semibold mt-2 hidden md:block"
            onClick={onConfirm}
          >
            Confirmar pedido
          </button>
        </>
      )}
    </aside>
  );
}