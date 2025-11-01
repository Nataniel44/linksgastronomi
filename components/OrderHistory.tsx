"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, List, Loader2 } from "lucide-react";
import { OrderStatusTracker } from "./OrderStatusTracker";

export default function OrderHistory({
    phone,
    restaurantId,
}: {
    phone: string;
    restaurantId?: number;
}) {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);

    const fetchOrders = async () => {
        if (!phone) return;
        setLoading(true);
        try {
            const url = `/api/customers/orders?phone=${phone}${restaurantId ? `&restaurantId=${restaurantId}` : ""
                }`;
            const res = await fetch(url);
            const data = await res.json();

            if (res.ok) setOrders(data);
            else console.error("Error:", data.error);
        } catch (error) {
            console.error("Error al cargar pedidos:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (open) fetchOrders();
    }, [open, phone]);

    return (
        <>
            {/* 🔘 Botón flotante */}
            <button
                onClick={() => setOpen(true)}
                className="group flex items-center justify-center bg-blue-500/90 hover:bg-blue-600 backdrop-blur-md w-14 h-14 rounded-full shadow-lg hover:shadow-xl text-white transition-all duration-200 border border-blue-400/30 hover:scale-110 active:scale-95"
            >
                <List className="w-6 h-6" />
            </button>

            {/* 🪟 Modal de pedidos */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
                        onClick={() => setOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white dark:bg-gray-900 rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden"
                        >
                            <div className="flex justify-between items-center bg-blue-500 text-white p-4">
                                <h2 className="text-lg font-semibold">Historial de pedidos</h2>
                                <button
                                    onClick={() => setOpen(false)}
                                    className="hover:opacity-80 text-sm"
                                >
                                    ✕
                                </button>
                            </div>

                            <div className="p-6 max-h-[70vh] overflow-y-auto">
                                {loading ? (
                                    <div className="flex items-center justify-center py-8 text-gray-600">
                                        <Loader2 className="w-6 h-6 animate-spin mr-2" />
                                        Cargando pedidos...
                                    </div>
                                ) : orders.length === 0 ? (
                                    <p className="text-center py-4 text-gray-500">
                                        No hay pedidos anteriores.
                                    </p>
                                ) : (
                                    <div className="space-y-3">
                                        {orders.map((order) => (
                                            <div
                                                key={order.id}
                                                onClick={() => setSelectedOrderId(order.id)}
                                                className="border border-gray-200 dark:border-gray-800 p-4 rounded-lg bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition cursor-pointer"
                                            >
                                                <div className="flex justify-between items-center">
                                                    <span className="font-medium text-gray-800 dark:text-white">
                                                        Pedido #{order.id}
                                                    </span>
                                                    <span className="text-sm text-gray-500">
                                                        {new Date(order.createdAt).toLocaleString()}
                                                    </span>
                                                </div>
                                                <div className="mt-2 flex justify-between text-sm text-gray-600 dark:text-gray-400">
                                                    <span>{order.items.length} productos</span>
                                                    <span className="font-semibold text-gray-800 dark:text-white">
                                                        ${order.total}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* 📦 Modal de seguimiento (OrderStatusTracker) */}
            {selectedOrderId && (
                <OrderStatusTracker
                    orderId={selectedOrderId}
                    onClose={() => setSelectedOrderId(null)}
                />
            )}
        </>
    );
}
