import { useState } from "react";
import ShoppingCartIcon from "./ShoppingCartIcon ";

const Cart = ({ cartItems, updateCart, clearCart, handleOrder, isFormValid }) => {
    const [isOpen, setIsOpen] = useState(false);

    const totalPrice = cartItems.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);

    const toggleCart = () => setIsOpen(!isOpen);
    const toggleCartProsses = () => setIsOpen(false);

    const handleQuantityChange = (item, quantity) => {
        const newQuantity = Math.max(1, quantity); // Evitar que sea menor que 1
        updateCart(item, newQuantity);
    };

    return (
        <div>
            <div
                className={`fixed z-50 bottom-0 w-full bg-black/80 backdrop-blur-md text-white p-4 transition-all duration-500 pb-10 md:max-w-screen-md mx-auto ${isOpen ? "translate-y-0" : "translate-y-full"
                    }`}
            >
                <div className="fixed md:mx-auto z-50 text-sm -top-10 left-1/2 transform -translate-x-1/2 rounded-t-lg w-full grid grid-cols-3 gap-2 h-10 px-2 bg-black/85 backdrop-blur-md py-1">
                    <div className="text-center bg-white/10 text-white border rounded-full flex justify-center items-center">
                        <div>Total: </div> <span className="font-bold"> ${totalPrice}</span>
                    </div>
                    <button
                        onClick={toggleCart}
                        className="bg-white text-black border rounded-full flex  gap-1 ps-3 shadow-lg transition-all duration-300 flex justify-center items-center"
                    >
                        <ShoppingCartIcon size={18} color="#555" />
                        {isOpen ? "▼" : "▲"}
                    </button>
                    <button
                        onClick={() => {
                            handleOrder(); // Ejecutar la acción de compra
                            toggleCartProsses();  // Cerrar el carrito
                        }}
                        disabled={cartItems.length === 0}
                        className={`bg-green-400 text-black border border-green-700 rounded-full hover:bg-green-400 transition-all duration-300 flex justify-center items-center ${cartItems.length > 0 ? "" : "opacity-50 cursor-not-allowed"
                            }`}
                    >
                        Comprar
                    </button>

                </div>
                {cartItems.length === 0 ? (
                    <div className="text-center text-gray-400">El carrito está vacío.</div>
                ) : (
                    <>
                        <h3 className="font-bold text-xl mb-4">Carrito</h3>
                        <ul className="mb-4">
                            {cartItems.map((item, index) => (
                                <li key={index} className="flex justify-between items-center py-2 border-b border-gray-600">
                                    <span>{item.name}</span>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => updateCart(item, Math.max((item.quantity || 1) - 1, 0))}
                                            className="bg-gray-200 text-black px-2 py-1 rounded hover:bg-gray-300"
                                        >
                                            -
                                        </button>
                                        <input
                                            type="number"
                                            value={item.quantity || 1}
                                            min="1"
                                            onChange={(e) => handleQuantityChange(item, parseInt(e.target.value))}
                                            className="w-12 text-center border text-black border-gray-400 rounded"
                                        />
                                        <button
                                            onClick={() => updateCart(item, (item.quantity || 1) + 1)}
                                            className="bg-gray-200 text-black px-2 py-1 rounded hover:bg-gray-300"
                                        >
                                            +
                                        </button>
                                        <button
                                            onClick={() => updateCart(item, 0)}
                                            className="text-red-500 hover:text-red-300 ml-2"
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div className="flex justify-between items-center">
                            <button
                                onClick={clearCart}
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                            >
                                Vaciar carrito
                            </button>
                            <p className="font-bold text-xl">Total: ${totalPrice}</p>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Cart;
