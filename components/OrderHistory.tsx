"use client";
import { useEffect, useState } from "react";

export default function OrderHistory({ phone, restaurantId }: { phone: string; restaurantId?: number }) {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!phone) return;

        const fetchOrders = async () => {
            try {
                const url = `/api/customers/orders?phone=${phone}${restaurantId ? `&restaurantId=${restaurantId}` : ""
                    }`;
                const res = await fetch(url);
                const data = await res.json();

                if (res.ok) {
                    setOrders(data);
                } else {
                    console.error("Error:", data.error);
                }
            } catch (error) {
                console.error("Error al cargar pedidos:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [phone, restaurantId]);

    if (loading) return <p className="text-center py-4">Cargando pedidos...</p>;

    if (orders.length === 0)
        return <p className="text-center py-4">No hay pedidos anteriores.</p>;

    return (
        <div className="p-4 space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">Historial de pedidos</h2>
            <div className="space-y-3">
                {orders.map((order) => (
                    <div
                        key={order.id}
                        className="border rounded-lg p-4 bg-white shadow-sm"
                    >
                        <div className="flex justify-between">
                            <span className="font-medium text-gray-700">
                                Pedido #{order.id}
                            </span>
                            <span className="text-sm text-gray-500">
                                {new Date(order.createdAt).toLocaleString()}
                            </span>
                        </div>

                        <div className="mt-2 text-sm text-gray-600">
                            {order.items.map((item: any, i: number) => (
                                <div key={i} className="flex justify-between">
                                    <span>{item.name}</span>
                                    <span>${item.price}</span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-2 border-t pt-2 text-right font-semibold text-gray-800">
                            Total: ${order.total}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
