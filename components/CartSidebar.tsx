"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, MotionProps } from "framer-motion";
import { ArrowLeft, Loader2, CheckCircle2 } from "lucide-react";
import { OrderStatusTracker } from "./OrderStatusTracker"; // Importar el componente
import { useCustomerPhone } from "./hooks/useCustomerPhone";

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
    restaurantId: number;
    getImageSrc: (src?: string) => string;
    clearCart: () => void; // Función para limpiar el carrito
};

type MotionDivProps = React.HTMLAttributes<HTMLDivElement> & MotionProps;

const MotionDiv = motion.div as React.FC<MotionDivProps>;

export const CartSidebar: React.FC<Props> = ({
    cart,
    onClose,
    removeItem,
    whatsapp,
    restaurantId,
    getImageSrc,
    clearCart
}) => {
    const [showForm, setShowForm] = useState(false);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [pickupType, setPickupType] = useState<"delivery" | "pickup">("delivery");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [orderSuccess, setOrderSuccess] = useState(false);
    const [createdOrderId, setCreatedOrderId] = useState<number | null>(null);
    const [showTracker, setShowTracker] = useState(false);
    const { savePhone } = useCustomerPhone();

    const deliveryFee = pickupType === "delivery" ? 50 : 0;
    const subtotal = cart.reduce(
        (acc, item) =>
            acc +
            item.price * item.quantity +
            item.extras.reduce((s, e) => s + e.price, 0) * item.quantity,
        0
    );
    const total = subtotal + deliveryFee;

    const handleSubmit = async () => {
        if (!name || !phone || (pickupType === "delivery" && !address)) {
            alert("Completa todos los campos necesarios");
            return;
        }

        setIsSubmitting(true);

        try {
            // Preparar datos del pedido
            const orderData = {
                restaurantId,
                customerName: name,
                customerPhone: phone,
                deliveryType: pickupType,
                address: pickupType === "delivery" ? address : null,
                items: cart.map(item => ({
                    productId: item.id,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                    options: item.extras.length > 0 ? { extras: item.extras } : null,
                    subtotal: (item.price + item.extras.reduce((s, e) => s + e.price, 0)) * item.quantity
                })),
                subtotal,
                deliveryCost: deliveryFee,
                discount: 0,
                total
            };

            // Guardar en la base de datos
            const response = await fetch('/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData),
            });

            if (!response.ok) {
                throw new Error('Error al guardar el pedido');
            }

            const savedOrder = await response.json();
            setCreatedOrderId(savedOrder.id);
            savePhone(phone);

            // 🔹 Guardar el número en localStorage
            if (typeof window !== "undefined") {
                localStorage.setItem("customerPhone", phone);
            }

            // Preparar mensaje de WhatsApp
            const mensaje = `🛒 *Nuevo Pedido #${savedOrder.id}*

👤 *Cliente:* ${name}
📱 *Teléfono:* ${phone}
${pickupType === "delivery" ? `📍 *Dirección:* ${address}` : "🏪 *Retiro en local*"}

*Items:*
${cart
                    .map(
                        (item) =>
                            `• ${item.quantity}x ${item.name}${item.extras.length
                                ? `\n  _Extras: ${item.extras.map((e) => e.name).join(", ")}_`
                                : ""
                            }
  $${(item.price + item.extras.reduce((s, e) => s + e.price, 0)) * item.quantity}`
                    )
                    .join("\n")}

💰 *Subtotal:* $${subtotal}
🚚 *Envío:* $${deliveryFee}
━━━━━━━━━━━━━━━
✅ *TOTAL: $${total}*`;

            // Enviar por WhatsApp
            const whatsappUrl = `https://wa.me/${whatsapp}?text=${encodeURIComponent(mensaje)}`;
            window.open(whatsappUrl, "_blank");

            // Marcar como enviado por WhatsApp
            await fetch(`/api/orders/${savedOrder.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ whatsappSent: true }),
            });

            // Mostrar pantalla de éxito
            setOrderSuccess(true);
            clearCart();

        } catch (error) {
            console.error('Error al procesar el pedido:', error);
            alert('Hubo un error al procesar tu pedido. Por favor intenta nuevamente.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleViewStatus = () => {
        setShowTracker(true);
    };

    const handleCloseAndReset = () => {
        setOrderSuccess(false);
        setShowForm(false);
        setName("");
        setPhone("");
        setAddress("");
        setCreatedOrderId(null);
        onClose();
    };

    return (
        <>
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
                        onClick={!isSubmitting && !orderSuccess ? onClose : undefined}
                    />

                    {/* Sidebar */}
                    <motion.div
                        className="relative w-full max-w-md bg-gray-900 text-white p-6 flex flex-col rounded-l-2xl shadow-2xl overflow-hidden"
                        initial={{ x: "100%" }}
                        animate={{ x: "0" }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", stiffness: 260, damping: 30 }}
                    >
                        {!orderSuccess ? (
                            <>
                                <button
                                    onClick={onClose}
                                    className="absolute top-6 right-6 text-white text-2xl hover:scale-110 transition"
                                    disabled={isSubmitting}
                                >
                                    <ArrowLeft className="w-8" />
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
                                                                    src={getImageSrc(item.image)}
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
                                                    Continuar
                                                </button>
                                            )}
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <h2 className="text-2xl font-bold mb-4">Datos de Envío</h2>
                                        <div className="space-y-3 flex-1 overflow-y-auto">
                                            <input
                                                type="text"
                                                placeholder="Nombre completo"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                disabled={isSubmitting}
                                                className="w-full p-3 rounded-lg bg-white/10 text-white placeholder-white/60 border border-white/20 focus:border-green-500 focus:outline-none transition"
                                            />
                                            <input
                                                type="tel"
                                                placeholder="Teléfono"
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                                disabled={isSubmitting}
                                                className="w-full p-3 rounded-lg bg-white/10 text-white placeholder-white/60 border border-white/20 focus:border-green-500 focus:outline-none transition"
                                            />

                                            <div className="flex gap-2 mt-2">
                                                {["delivery", "pickup"].map((type) => (
                                                    <button
                                                        key={type}
                                                        onClick={() => setPickupType(type as "delivery" | "pickup")}
                                                        disabled={isSubmitting}
                                                        className={`flex-1 p-3 rounded-lg font-semibold transition ${pickupType === type
                                                            ? "bg-green-500"
                                                            : "bg-white/10 hover:bg-white/20"
                                                            } ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                                                    >
                                                        {type === "delivery" ? "🚚 Delivery" : "🏪 Retiro"}
                                                    </button>
                                                ))}
                                            </div>

                                            {pickupType === "delivery" && (
                                                <input
                                                    type="text"
                                                    placeholder="Dirección de entrega"
                                                    value={address}
                                                    onChange={(e) => setAddress(e.target.value)}
                                                    disabled={isSubmitting}
                                                    className="w-full p-3 rounded-lg bg-white/10 text-white placeholder-white/60 border border-white/20 focus:border-green-500 focus:outline-none transition"
                                                />
                                            )}

                                            <button
                                                onClick={handleSubmit}
                                                disabled={isSubmitting}
                                                className="w-full bg-green-500 hover:bg-green-600 p-3 rounded-lg font-bold transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                {isSubmitting ? (
                                                    <>
                                                        <Loader2 className="w-5 h-5 animate-spin" />
                                                        Procesando...
                                                    </>
                                                ) : (
                                                    "Confirmar y enviar pedido"
                                                )}
                                            </button>
                                            <button
                                                onClick={() => setShowForm(false)}
                                                disabled={isSubmitting}
                                                className="w-full bg-white/10 hover:bg-white/20 p-3 rounded-lg font-bold transition disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                ← Volver al carrito
                                            </button>
                                        </div>
                                    </>
                                )}
                            </>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex flex-col items-center justify-center h-full text-center space-y-6"
                            >
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.2, type: "spring" }}
                                >
                                    <CheckCircle2 className="w-24 h-24 text-green-400" />
                                </motion.div>

                                <div className="space-y-2">
                                    <h2 className="text-3xl font-bold">¡Pedido confirmado!</h2>
                                    <p className="text-white/70">Pedido #{createdOrderId}</p>
                                    <p className="text-white/80">
                                        Tu pedido ha sido enviado correctamente
                                    </p>
                                </div>

                                <div className="space-y-3 w-full">
                                    <button
                                        onClick={handleViewStatus}
                                        className="w-full bg-green-500 hover:bg-green-600 p-3 rounded-lg font-bold transition"
                                    >
                                        Ver estado del pedido
                                    </button>
                                    <button
                                        onClick={handleCloseAndReset}
                                        className="w-full bg-white/10 hover:bg-white/20 p-3 rounded-lg font-bold transition"
                                    >
                                        Cerrar
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </motion.div>
                </MotionDiv>
            </AnimatePresence>

            {/* Order Status Tracker Modal */}
            {showTracker && createdOrderId && (
                <OrderStatusTracker
                    orderId={createdOrderId}
                    onClose={() => {
                        setShowTracker(false);
                        handleCloseAndReset();
                    }}
                />
            )}
        </>
    );
}; 