import { useState } from 'react';

const Cart = ({ cartItems, updateCart, clearCart, handleOrder, isFormValid, isOpen, toggleCart }) => {
    const totalPrice = cartItems.reduce(
        (acc, item) => acc + item.price * (item.quantity || 1),
        0
    );
     const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => setIsExpanded(!isExpanded);
    const handleQuantityChange = (item, quantity) => {
        const newQuantity = Math.max(1, quantity);
        updateCart(item, newQuantity);
    };
    const handleBuy = () => {
        if (isOpen) {
            handleOrder();
            toggleCart();
        } else {
            handleOrder();
        }
    };

    return (
        <div>
            {/* Overlay para fondo difuminado */}
            <div
                className={`fixed inset-0 z-50 bg-black/40 transition-opacity duration-500 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                onClick={toggleCart}
            />
            {/* Carrito flotante */}
            <aside
                className={`fixed z-[100] right-0 top-0 h-full w-full sm:w-[400px] bg-white shadow-2xl border-l border-yellow-300 flex flex-col transition-transform duration-500 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
                aria-label="Carrito de compras"
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-yellow-200 bg-yellow-50">
                    <h2 className="text-2xl font-extrabold text-yellow-500 tracking-wide">Tu Carrito</h2>
                    <button onClick={toggleCart} className="text-yellow-500 hover:text-yellow-700 text-2xl font-bold">×</button>
                </div>
                {/* Productos con scroll y degradado */}
                <div className="relative flex-1 flex flex-col min-h-0">
                    <div className="flex-1 overflow-y-auto px-4 py-2 space-y-4 min-h-0" style={{maxHeight: '100%'}}>
                        {cartItems.length === 0 ? (
                            <div className="text-center text-gray-400 py-16 text-lg">El carrito está vacío.</div>
                        ) : (
                            cartItems.map((item, index) => (
                                <div key={index} className="flex items-center bg-yellow-50 rounded-xl shadow p-3 gap-3 animate-fade-in">
                                    {/* Imagen si existe */}
                                    {item.image && (
                                        <img src={item.image} alt={item.name} className="w-14 h-14 object-cover rounded-lg border border-yellow-200" />
                                    )}
                                    <div className="flex-1">
                                        <div className="font-bold text-gray-800 text-base truncate">{item.name}</div>
                                        <div className="flex items-center gap-2 mt-1">
                                            <button onClick={() => updateCart(item, Math.max((item.quantity || 1) - 1, 1))} className="bg-yellow-200 text-yellow-700 rounded-full w-7 h-7 flex items-center justify-center font-bold text-lg hover:bg-yellow-300">-</button>
                                            <input
                                                type="number"
                                                value={item.quantity || 1}
                                                min="1"
                                                onChange={(e) => handleQuantityChange(item, parseInt(e.target.value))}
                                                className="w-10 text-center border border-yellow-300 rounded font-semibold text-yellow-700 bg-white"
                                            />
                                            <button onClick={() => updateCart(item, (item.quantity || 1) + 1)} className="bg-yellow-200 text-yellow-700 rounded-full w-7 h-7 flex items-center justify-center font-bold text-lg hover:bg-yellow-300">+</button>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <span className="text-green-600 font-bold text-lg">${item.price * (item.quantity || 1)}</span>
                                        <button onClick={() => updateCart(item, 0)} className="text-red-400 hover:text-red-600 text-xs mt-2">Eliminar</button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                    {/* Degradado visual en la parte inferior para indicar scroll */}
                    <div className="pointer-events-none absolute bottom-0 left-0 w-full h-10 bg-gradient-to-t from-white to-transparent" />
                </div>
                {/* Footer */}
                <div className="border-t border-yellow-200 bg-white px-6 py-4 flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-gray-700">Total:</span>
                        <span className="text-2xl font-extrabold text-green-600">${totalPrice}</span>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={clearCart}
                            className="flex-1 bg-red-100 text-red-600 font-bold py-2 rounded-full hover:bg-red-200 transition shadow"
                        >
                            Vaciar
                        </button>
                        <button
                            onClick={handleBuy}
                            disabled={cartItems.length === 0}
                            className={`flex-1 bg-green-500 text-white font-bold py-2 rounded-full shadow hover:bg-green-600 transition ${cartItems.length > 0 ? '' : 'opacity-50 cursor-not-allowed'}`}
                        >
                            Comprar
                        </button>
                    </div>
                </div>
            </aside>
        </div>
    );
};

export default Cart;
