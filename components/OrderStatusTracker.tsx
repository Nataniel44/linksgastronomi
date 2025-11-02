import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, CheckCircle2, Clock, Truck, Package, XCircle, ChefHat } from 'lucide-react';

type OrderStatus = 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled';

type Order = {
    id: number;
    customerName: string;
    status: OrderStatus;
    total: number;
    createdAt: string;
    items: Array<{
        name: string;
        quantity: number;
    }>;
};

type Props = {
    orderId: number;
    onClose: () => void;
};

const statusConfig: Record<OrderStatus, {
    icon: React.ReactNode;
    label: string;
    color: string;
    bgColor: string;
}> = {
    pending: {
        icon: <Clock className="w-6 h-6" />,
        label: 'Pedido recibido',
        color: 'text-yellow-400',
        bgColor: 'bg-yellow-500/20'
    },
    confirmed: {
        icon: <CheckCircle2 className="w-6 h-6" />,
        label: 'Confirmado',
        color: 'text-blue-400',
        bgColor: 'bg-blue-500/20'
    },
    preparing: {
        icon: <ChefHat className="w-6 h-6" />,
        label: 'En preparación',
        color: 'text-orange-400',
        bgColor: 'bg-orange-500/20'
    },
    ready: {
        icon: <Package className="w-6 h-6" />,
        label: 'Listo para retirar',
        color: 'text-purple-400',
        bgColor: 'bg-purple-500/20'
    },
    delivered: {
        icon: <Truck className="w-6 h-6" />,
        label: 'Entregado',
        color: 'text-green-400',
        bgColor: 'bg-green-500/20'
    },
    cancelled: {
        icon: <XCircle className="w-6 h-6" />,
        label: 'Cancelado',
        color: 'text-red-400',
        bgColor: 'bg-red-500/20'
    }
};

const statusOrder: OrderStatus[] = ['pending', 'confirmed', 'preparing', 'ready', 'delivered'];

export const OrderStatusTracker: React.FC<Props> = ({ orderId, onClose }) => {
    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchOrderStatus();

        // Polling cada 10 segundos para actualizar el estado
        const interval = setInterval(fetchOrderStatus, 10000);

        return () => clearInterval(interval);
    }, [orderId]);

    const fetchOrderStatus = async () => {
        try {
            const response = await fetch(`/api/orders/${orderId}`);

            if (!response.ok) {
                throw new Error('Error al obtener el pedido');
            }

            const data = await response.json();
            console.log('Order data received:', data); // Debug
            setOrder(data);
            setError(null);
        } catch (err) {
            setError('No se pudo cargar el estado del pedido');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const getCurrentStepIndex = () => {
        if (!order) return 0;
        const index = statusOrder.indexOf(order.status);
        return index === -1 ? 0 : index;
    };

    // Validar que el estado existe en la configuración
    const currentStatus = order && statusConfig[order.status]
        ? statusConfig[order.status]
        : statusConfig.pending;

    if (loading) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-white dark:bg-gray-900 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl"
                >
                    <div className="flex flex-col items-center gap-4">
                        <Loader2 className="w-12 h-12 text-green-500 animate-spin" />
                        <p className="text-gray-700 dark:text-gray-300 font-medium">
                            Cargando estado del pedido...
                        </p>
                    </div>
                </motion.div>
            </div>
        );
    }

    if (error || !order) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-white dark:bg-gray-900 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl"
                >
                    <div className="text-center space-y-4">
                        <XCircle className="w-16 h-16 text-red-500 mx-auto" />
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                            Error al cargar el pedido
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">{error}</p>
                        <button
                            onClick={onClose}
                            className="w-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-900 dark:text-white px-6 py-3 rounded-lg font-semibold transition"
                        >
                            Cerrar
                        </button>
                    </div>
                </motion.div>
            </div>
        );
    }

    const currentStepIndex = getCurrentStepIndex();

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-white dark:bg-gray-900 rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden"
                >
                    {/* Header */}
                    <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 text-white">
                        <h2 className="text-2xl font-bold mb-2">Pedido #{order.id}</h2>
                        <p className="text-green-100">
                            {order.customerName} • ${order.total}
                        </p>
                    </div>

                    {/* Estado actual destacado */}
                    <div className="p-6 border-b border-gray-200 dark:border-gray-800">
                        <div className={`flex items-center gap-4 p-4 rounded-xl ${currentStatus.bgColor}`}>
                            <motion.div
                                animate={{ rotate: [0, 360] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                className={currentStatus.color}
                            >
                                {currentStatus.icon}
                            </motion.div>
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Estado actual</p>
                                <p className={`text-xl font-bold ${currentStatus.color}`}>
                                    {currentStatus.label}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Timeline */}
                    <div className="p-6 space-y-4">
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                            Seguimiento del pedido
                        </h3>

                        {statusOrder.map((status, index) => {
                            const config = statusConfig[status];
                            const isCompleted = index <= currentStepIndex;
                            const isCurrent = index === currentStepIndex;

                            return (
                                <motion.div
                                    key={status}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex items-center gap-4"
                                >
                                    <div className={`flex items-center justify-center w-10 h-10 rounded-full transition-all ${isCompleted
                                        ? `${config.bgColor} ${config.color}`
                                        : 'bg-gray-200 dark:bg-gray-800 text-gray-400'
                                        } ${isCurrent ? 'ring-4 ring-green-500/30' : ''}`}>
                                        {config.icon}
                                    </div>

                                    <div className="flex-1">
                                        <p className={`font-medium ${isCompleted
                                            ? 'text-gray-900 dark:text-white'
                                            : 'text-gray-400 dark:text-gray-600'
                                            }`}>
                                            {config.label}
                                        </p>
                                    </div>

                                    {isCompleted && (
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="text-green-500"
                                        >
                                            <CheckCircle2 className="w-5 h-5" />
                                        </motion.div>
                                    )}
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Items del pedido */}
                    <div className="p-6 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-800">
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                            Productos
                        </h3>
                        <div className="space-y-2">
                            {order.items.map((item, index) => (
                                <div key={index} className="flex justify-between text-sm">
                                    <span className="text-gray-600 dark:text-gray-400">
                                        {item.quantity}x {item.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="p-6 flex gap-3">
                        <button
                            onClick={fetchOrderStatus}
                            className="flex-1 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-900 dark:text-white px-6 py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2"
                        >
                            <Loader2 className="w-4 h-4" />
                            Actualizar
                        </button>
                        <button
                            onClick={onClose}
                            className="flex-1 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition"
                        >
                            Cerrar
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};