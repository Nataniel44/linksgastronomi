import { useState } from 'react';

const Cart = ({ cartItems, updateCart, clearCart, handleOrder, isFormValid, isOpen, toggleCart }) => {
    const totalPrice = cartItems.reduce(
        (acc, item) => acc + item.price * (item.quantity || 1),
        0
    );
    const [isExpanded, setIsExpanded] = useState(false);  // Estado para controlar el tamaño del contenedor

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);  // Cambiar el estado de expandido
    };

    const handleQuantityChange = (item, quantity) => {
        const newQuantity = Math.max(1, quantity); // Evitar que sea menor que 1
        updateCart(item, newQuantity);
    };

    const handleBuy = () => {
        if (isOpen) {
            // Si el carrito está abierto, cerrar el carrito después de la compra
            handleOrder();  // Ejecutar la acción de compra
            toggleCart();   // Cerrar el carrito después de la compra
        } else {
            // Si el carrito está cerrado, proceder con la compra sin abrir el carrito
            handleOrder();  // Ejecutar la acción de compra
        }
    };

    return (
        <div>
            <div
                className={`fixed z-50 bottom-0 w-full bg-black/80 backdrop-blur-md text-white p-4 transition-all duration-500 pb-10 md:max-w-screen-md mx-auto ${isOpen ? "translate-y-0" : "translate-y-full"}`}
            >
                <div className="fixed mx-auto z-50 text-sm left-0 px-2 py-1 -top-10  transform   w-full grid grid-cols-3 gap-2 h-10  bg-black/85 backdrop-blur-md">
                    <div className="text-center bg-white/10 text-white border rounded-full flex justify-center items-center">
                        <div>Total: </div> <span className="font-bold"> ${totalPrice}</span>
                    </div>
                    <button
                        onClick={toggleCart}
                        className="bg-white text-black border rounded-full  gap-1  shadow-lg transition-all duration-300 flex justify-center items-center"
                    >
                        {isOpen ? "▼" : "▲"}
                    </button>
                    <button
                        onClick={handleBuy}
                        disabled={cartItems.length === 0} // Asegurarse de que solo esté habilitado si el carrito tiene artículos
                        className={`bg-green-400 text-black border border-green-700 rounded-full hover:bg-green-400 transition-all duration-300 flex justify-center items-center ${cartItems.length > 0 ? "" : "opacity-50 cursor-not-allowed"}`}
                    >
                        Comprar
                    </button>
                </div>
                {cartItems.length === 0 ? (
                    <div className="text-center text-gray-400">El carrito está vacío.</div>
                ) : (
                    <>
                        <div>
                            <h3 className="font-bold text-xl mb-4">Carrito</h3>
                            <div className={`overflow-y-auto ${isExpanded ? 'max-h-[80vh]' : 'max-h-[20vh]'}`}>
                                <ul className="mb-4">
                                    {cartItems.map((item, index) => (
                                        <li key={index} className="flex justify-between items-center p-2 border-b border-gray-600">
                                            <span >{item.name}</span>
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
                            </div>

                            <button
                                onClick={toggleExpand}
                                className="text-blue-500 underline mt-2"
                            >
                                {isExpanded ? "Ver Menos" : "Ver Todo"}
                            </button>

                            <div className="flex justify-between items-center mt-4">
                                <button
                                    onClick={clearCart}
                                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                >
                                    Vaciar carrito
                                </button>
                                <p className="font-bold text-xl">Total: ${totalPrice}</p>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div >
    );
};

export default Cart;
