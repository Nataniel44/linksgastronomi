"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, MotionProps } from "framer-motion";

type Extra = { name: string; price: number };
export type CartItem = {
    id: number;
    name: string;
    price: number;
    quantity: number;
    extras: Extra[];
    image?: string | null;
};

type Props = {
    cart: CartItem[];
    onClose: () => void;
    removeItem: (index: number) => void;
    whatsapp: string;
    getImageSrc: (src?: string) => string; // 🔥 AGREGA ESTA LÍNEA
};

type MotionDivProps = React.HTMLAttributes<HTMLDivElement> & MotionProps;

const MotionDiv = motion.div as React.FC<MotionDivProps>;


export const CartSidebar: React.FC<Props> = ({ cart, onClose, removeItem, whatsapp, getImageSrc, }) => {
    const [showForm, setShowForm] = useState(false);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [pickupType, setPickupType] = useState<"delivery" | "pickup">("delivery");

    const deliveryFee = pickupType === "delivery" ? 50 : 0;
    const subtotal = cart.reduce(
        (acc, item) =>
            acc +
            item.price * item.quantity +
            item.extras.reduce((s, e) => s + e.price, 0) * item.quantity,
        0
    );
    const total = subtotal + deliveryFee;

    const handleSubmit = () => {
        if (!name || !phone || (pickupType === "delivery" && !address))
            return alert("Completa todos los campos necesarios");

        const mensaje = `Pedido de ${name}
Teléfono: ${phone}
${pickupType === "delivery" ? "Dirección: " + address : "Retiro en local"}

Items:
${cart
                .map(
                    (item) =>
                        `${item.quantity}x ${item.name} ${item.extras.length ? `(Extras: ${item.extras.map((e) => e.name).join(", ")})` : ""
                        } - $${item.price * item.quantity}`
                )
                .join("\n")}

Total: $${total}`;

        window.open(`https://wa.me/${whatsapp}?text=${encodeURIComponent(mensaje)}`, "_blank");
    };

    return (
        <AnimatePresence>
            <MotionDiv
                className="fixed inset-0 z-50 flex justify-end"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                {/* Overlay */}
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm cursor-pointer"
                    onClick={onClose}
                ></div>

                {/* Sidebar */}
                <motion.div
                    className="relative w-full max-w-md bg-gray-900 text-white p-6 flex flex-col rounded-l-2xl shadow-2xl"
                    initial={{ x: "100%" }}
                    animate={{ x: "0" }}
                    exit={{ x: "100%" }}
                    transition={{ type: "spring", stiffness: 260, damping: 30 }}
                >
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-white text-2xl hover:scale-110 transition"
                    >
                        🡰
                    </button>

                    {!showForm ? (
                        <>
                            <h2 className="text-2xl font-bold mb-4">Tu Carrito</h2>
                            {cart.length === 0 ? (
                                <p className="text-center text-white/70">El carrito está vacío</p>
                            ) : (
                                <div className="space-y-4 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700">
                                    {cart.map((item, i) => (
                                        <div
                                            key={i}
                                            className="flex gap-3 items-center bg-white/5 p-2 rounded-lg hover:bg-white/10 transition"
                                        >
                                            <div className="w-16 h-16 relative flex-shrink-0">
                                                {item.image && (
                                                    <Image
                                                        src={item.image}
                                                        alt={item.name}
                                                        fill
                                                        className="object-cover rounded-md"
                                                    />
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-semibold">{item.name}</p>
                                                {item.extras.length > 0 && (
                                                    <p className="text-sm text-white/70">
                                                        Extras: {item.extras.map((e) => e.name).join(", ")}
                                                    </p>
                                                )}
                                                <p className="text-sm text-white/80">
                                                    {item.quantity} x ${item.price}
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => removeItem(i)}
                                                className="text-red-400 hover:text-red-600 text-xl"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div className="mt-4 space-y-2 border-t border-white/10 pt-4">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span>${subtotal}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Envío</span>
                                    <span>${deliveryFee}</span>
                                </div>
                                <div className="flex justify-between font-bold text-lg">
                                    <span>Total</span>
                                    <span>${total}</span>
                                </div>
                                {cart.length > 0 && (
                                    <button
                                        onClick={() => setShowForm(true)}
                                        className="w-full bg-green-500 hover:bg-green-600 p-3 rounded-lg font-bold transition"
                                    >
                                        Pagar
                                    </button>
                                )}
                            </div>
                        </>
                    ) : (
                        <>
                            <h2 className="text-2xl font-bold mb-4">Datos del Cliente</h2>
                            <div className="space-y-3">
                                <input
                                    type="text"
                                    placeholder="Nombre completo"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full p-2 rounded-md bg-white/10 text-white placeholder-white/60"
                                />
                                <input
                                    type="tel"
                                    placeholder="Teléfono"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="w-full p-2 rounded-md bg-white/10 text-white placeholder-white/60"
                                />

                                {/* Selector Delivery / Pickup */}
                                <div className="flex gap-2 mt-2">
                                    {["delivery", "pickup"].map((type) => (
                                        <button
                                            key={type}
                                            onClick={() => setPickupType(type as "delivery" | "pickup")}
                                            className={`flex-1 p-2 rounded-md font-semibold transition ${pickupType === type ? "bg-green-500" : "bg-white/10 hover:bg-white/20"
                                                }`}
                                        >
                                            {type === "delivery" ? "Delivery" : "Retiro en local"}
                                        </button>
                                    ))}
                                </div>

                                {pickupType === "delivery" && (
                                    <input
                                        type="text"
                                        placeholder="Dirección"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        className="w-full p-2 rounded-md bg-white/10 text-white placeholder-white/60"
                                    />
                                )}

                                <button
                                    onClick={handleSubmit}
                                    className="w-full bg-green-500 hover:bg-green-600 p-3 rounded-lg font-bold transition"
                                >
                                    Confirmar y enviar pedido
                                </button>
                                <button
                                    onClick={() => setShowForm(false)}
                                    className="w-full bg-blue-500 hover:bg-blue-600 p-3 rounded-lg font-bold transition"
                                >
                                    🡰 Volver al carrito
                                </button>
                            </div>
                        </>
                    )}
                </motion.div>
            </MotionDiv>
        </AnimatePresence >
    );
};
