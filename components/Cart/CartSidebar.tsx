"use client";
import { useCart, CartItemType } from "./CartProvider";
import { useState, useRef, useEffect } from "react";
import { ConfirmOrderModal } from "./ConfirmOrderModal";
import CartAddIcon from "@/components/Cart/CartAddIcon";

export default function CartSidebar() {
    const { cart, total, clearCart, setCart } = useCart();
    const [open, setOpen] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});
    const sidebarRef = useRef<HTMLDivElement>(null);

    // 🔑 Eliminar ítem por índice único
    const removeByIndex = (index: number) => {
        const newCart = cart.filter((_, i) => i !== index);
        setCart(newCart);
    };

    // 🔑 Agrupación: id + comentario => grupos separados si el comentario difiere
    // ✅ Agrupa por id + comentario, pero diferencia los sin comentario según su orden
    // ✅ Agrupación completamente estable y separada entre comentados y sin comentario
    const groupByIdAndComment = (cart: CartItemType[]) => {
        let noCommentCounter = 0;

        return cart.reduce((acc, item, index) => {
            const commentKey =
                item.comment && item.comment.trim() !== ""
                    ? `comment_${item.comment.trim()}`
                    : `noComment_${noCommentCounter++}`;

            // Clave única y estable por producto
            const key = `${item.id}_${item.price}_${commentKey}`;

            if (!acc[key]) acc[key] = [];
            acc[key].push({ ...item, _index: index });

            return acc;
        }, {} as Record<string, (CartItemType & { _index: number })[]>);
    };


    const groupedItems = groupByIdAndComment(cart);



    // Toggle expand
    const toggleGroup = (key: string) => {
        setExpandedGroups((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    // Cerrar sidebar al clickear afuera
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <>
            {/* Botón flotante */}
            <div className="fixed z-50 bottom-3 flex justify-center items-center w-full">
                <button
                    onClick={() => setOpen(true)}
                    className="flex gap-2 font-semibold justify-center items-center 
             bg-white/95 backdrop-blur-md border border-white/20 
             text-black py-2 px-5 rounded-full shadow-md 
             hover:bg-blue-600 hover:text-white transition-all"
                >
                    <CartAddIcon size={20} stroke={2} variant="plus-circle" />
                    <span>Total:</span> {"$" + total}
                </button>
            </div>

            {/* Overlay */}
            {open && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 animate-fadeIn"
                    onClick={() => setOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div
                ref={sidebarRef}
                className={`fixed top-0 right-0 h-full w-80 
            bg-black/60 backdrop-blur-xl border-l border-white/10 
            text-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out
            ${open ? "translate-x-0" : "translate-x-full"}`}
            >
                {/* Header */}
                <div className="flex justify-between items-center p-4 border-b border-white/10">
                    <h2 className="text-xl font-bold">🛒 Carrito</h2>
                    <button
                        onClick={() => setOpen(false)}
                        className="text-gray-300 hover:text-white transition"
                    >
                        ✕
                    </button>
                </div>

                {/* Lista de items */}
                <div className="p-4 flex flex-col gap-4 h-[calc(100%-150px)] pb-36 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-600 scrollbar-track-transparent">
                    {cart.length === 0 ? (
                        <p className="text-gray-300 text-center mt-8">Tu carrito está vacío</p>
                    ) : (
                        Object.entries(groupedItems).map(([key, items]) => {
                            const isExpanded = expandedGroups[key] || false;

                            // ✅ Si solo hay un ítem en el grupo -> se muestra directo
                            if (items.length === 1) {
                                const item = items[0];
                                return (
                                    <div key={item._index} className="bg-white/5 rounded-lg p-3 border border-white/10 shadow-sm">
                                        <div className="flex justify-between items-center gap-2">
                                            <div>
                                                <p className="font-medium">{item.name}</p>
                                                {item.comment && <p className="text-xs text-blue-300">{item.comment}</p>}
                                                <p className="text-sm">Cantidad: {item.quantity}</p>
                                            </div>
                                            <div className="flex flex-col items-end">
                                                <p className="font-bold text-lg">${item.price * item.quantity}</p>
                                                <button
                                                    onClick={() => removeByIndex(item._index)}
                                                    className="text-red-500 hover:text-red-400 transition"
                                                >
                                                    🗑️
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            }

                            // ✅ Si hay varios (id + mismo comment) -> agrupamos
                            return (
                                <div key={key} className="bg-white/5 rounded-lg p-3 border border-white/10 shadow-sm">
                                    <div className="flex justify-between items-center">
                                        <p className="font-medium">{items[0].name}</p>
                                        <button
                                            onClick={() => toggleGroup(key)}
                                            className="text-blue-400 hover:text-blue-300 text-sm"
                                        >
                                            {isExpanded ? "⬆️" : "⬇️"} ({items.reduce((acc, i) => acc + i.quantity, 0)})
                                        </button>
                                    </div>

                                    {(isExpanded ? items : [items[0]]).map((item) => (
                                        <div key={item._index} className="mt-1 flex justify-between items-center">
                                            <div>
                                                {item.comment && <p className="text-xs text-blue-300">{item.comment}</p>}
                                                <p className="text-sm">Cantidad: {item.quantity}</p>
                                            </div>
                                            <div className="flex flex-col items-end">
                                                <p className="font-bold text-lg">${item.price * item.quantity}</p>
                                                <button
                                                    onClick={() => removeByIndex(item._index)}
                                                    className="text-red-500 hover:text-red-400 transition"
                                                >
                                                    🗑️
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            );
                        })
                    )}
                </div>

                {/* Footer */}
                <div className="border-t border-white/10 py-4 px-4 bg-black/70 backdrop-blur-md sticky bottom-0">
                    <p className="font-bold text-lg flex justify-between">
                        <span>Total:</span> <span>${total}</span>
                    </p>
                    <button
                        onClick={() => cart.length > 0 && setShowConfirm(true)}
                        className={`mt-3 w-full bg-green-600 text-white py-2.5 rounded-lg font-bold shadow-md hover:bg-green-700 transition
                       ${cart.length === 0 ? "opacity-50 pointer-events-none" : ""}`}
                        disabled={cart.length === 0}
                    >
                        Confirmar pedido
                    </button>
                    <button
                        onClick={clearCart}
                        className="mt-2 w-full bg-red-600 text-white py-2.5 rounded-lg font-semibold shadow-md hover:bg-red-700 transition"
                    >
                        Vaciar carrito
                    </button>
                </div>
            </div>

            {/* Modal confirmación */}
            <ConfirmOrderModal
                isOpen={showConfirm}
                onClose={() => setShowConfirm(false)}
                cart={Object.values(groupedItems).flat()}

                total={total}
                onSend={(data) => setShowConfirm(false)}
                onUpdateCart={(newCart) => setCart(newCart)}
            />
        </>
    );
}
