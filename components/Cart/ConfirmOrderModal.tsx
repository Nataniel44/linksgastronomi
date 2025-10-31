import React, { useState, useRef } from "react";
import Image from "next/image";
import { findTragoByName } from "@/utils/findTrago";

type ConfirmOrderModalProps = {
    isOpen: boolean;
    onClose: () => void;
    cart: any[];
    total: number;
    onSend: (data: any) => void;
    onUpdateCart: (newCart: any[]) => void;
};

export function ConfirmOrderModal({
    isOpen,
    onClose,
    cart,
    total,
    onSend,
    onUpdateCart
}: ConfirmOrderModalProps) {
    const elysCoords = [-26.9947384444634, -54.4877266104364];

    const [userCoords, setUserCoords] = useState<any[] | null>(null);
    const [distance, setDistance] = useState<string | null>(null);
    const [cost, setCost] = useState<number | null>(null);
    const [geoError, setGeoError] = useState<string | null>(null);
    const [loadingGeo, setLoadingGeo] = useState(false);
    const [showLocationHint, setShowLocationHint] = useState(false);
    const [showCopied, setShowCopied] = useState(false);
    const locationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // datos cliente
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [type, setType] = useState<"delivery" | "retiro">("delivery");
    const [payment, setPayment] = useState<"efectivo" | "qr" | "transferencia">("efectivo");
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    // 👉 detectar tragos en base a category
    const hasTragos = Array.isArray(cart) && cart.some((item) => {
        const name = (item?.name || "").toLowerCase();


        return findTragoByName(name) !== null;
    });



    // carrito sin tragos
    const cartWithoutTragos = Array.isArray(cart)
        ? cart.filter((item) => {
            const cat = (item?.category || "").toString().toLowerCase().trim();
            return !(cat === "tragos" || cat === "trago");
        })
        : [];


    // carrito final según condición
    const finalCart = type === "delivery" ? cartWithoutTragos : cart;

    // Eliminar solo los tragos del carrito
    const handleRemoveTragos = () => {
        const newCart = cart.filter(item => findTragoByName(item.name.toLowerCase()) === null);
        onUpdateCart(newCart);


    };

    // haversine
    const haversineDistance = (coords1: number[], coords2: number[]) => {
        const toRad = (deg: number) => (deg * Math.PI) / 180;
        const [lat1, lon1] = coords1;
        const [lat2, lon2] = coords2;
        const R = 6371;
        const dLat = toRad(lat2 - lat1);
        const dLon = toRad(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) ** 2 +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    };

    // costo delivery
    const calculateDeliveryCost = (km: number) => {
        if (km <= 0.5) return 2000;
        if (km <= 2) return 2000 + Math.ceil((km - 0.5) / 0.5) * 500;
        return 3500 + Math.ceil(km - 2) * 500;
    };

    async function geocodeAddress(address: string) {
        try {
            const res = await fetch(`/api/geocode?q=${encodeURIComponent(address)}`);
            if (!res.ok) throw new Error("Error en geocodificación");
            return await res.json();
        } catch (err) {
            console.error("Error al geocodificar dirección:", err);
            return null;
        }
    }

    const handleCalculate = async () => {
        setLoadingGeo(true);
        setGeoError(null);

        let coords = userCoords;

        if (!coords && address.trim()) {
            const geoResult = await geocodeAddress(address);
            if (!geoResult || geoResult.length === 0) {
                setGeoError("No se encontró la dirección.");
                setLoadingGeo(false);
                return { coords: null, distance: null, cost: null };
            }

            const { lat, lon, display_name } = geoResult[0];
            coords = [parseFloat(lat), parseFloat(lon)];
            setUserCoords(coords);
            if (display_name) setAddress(display_name);
        }

        if (!coords) {
            setGeoError("No hay coordenadas disponibles.");
            setLoadingGeo(false);
            return { coords: null, distance: null, cost: null };
        }

        const km = haversineDistance(coords, elysCoords);
        const calculatedCost = calculateDeliveryCost(km);

        setDistance(km.toFixed(2));
        setCost(calculatedCost);
        setLoadingGeo(false);

        return { coords, distance: km.toFixed(2), cost: calculatedCost };
    };

    const handleUseLocation = () => {
        if (!navigator.geolocation) {
            setGeoError("Geolocalización no soportada.");
            return;
        }
        setLoadingGeo(true);
        setShowLocationHint(false);
        if (locationTimeoutRef.current) clearTimeout(locationTimeoutRef.current);
        locationTimeoutRef.current = setTimeout(() => setShowLocationHint(true), 5000);

        navigator.geolocation.getCurrentPosition(
            async (pos) => {
                if (locationTimeoutRef.current) clearTimeout(locationTimeoutRef.current);
                setShowLocationHint(false);
                const coords = [pos.coords.latitude, pos.coords.longitude];
                setUserCoords(coords);
                const km = haversineDistance(coords, elysCoords);
                setDistance(km.toFixed(2));
                setCost(calculateDeliveryCost(km));
                try {
                    const res = await fetch(
                        `/api/geocode/reverse?lat=${coords[0]}&lon=${coords[1]}`
                    );
                    const data = await res.json();
                    if (data && data.display_name) setAddress(data.display_name);
                } catch { }
                setLoadingGeo(false);
            },
            () => {
                if (locationTimeoutRef.current) clearTimeout(locationTimeoutRef.current);
                setShowLocationHint(false);
                setGeoError("No se pudo obtener la ubicación. Intente activando la ubicación.");
                setLoadingGeo(false);
            }
        );
    };

    // validación
    const isValid =
        name.trim() && phone.trim() && (type === "retiro" || address.trim()) && finalCart.length > 0;

    const formatWhatsappMessage = (coordsToUse = userCoords) => {
        let msg = `*Nuevo pedido Elys*\n`;
        msg += `Nombre: ${name}\nTeléfono: ${phone}\n`;
        msg += `Tipo: ${type === "delivery" ? "Delivery" : "Retiro en el lugar"}\n`;
        msg += `Pago: ${payment}\n`;
        if (type === "delivery") {
            msg += `Dirección: ${address}\n`;
            if (distance && cost) {
                msg += `Distancia: ${distance} km\nCosto delivery: $${cost}\n`;
            }
            if (coordsToUse && coordsToUse.length === 2) {
                const [lat, lon] = coordsToUse;
                msg += `Ubicación: https://maps.google.com/?q=${lat},${lon}\n`;
            }
        }
        msg += `\n*Resumen del pedido:*\n`;
        finalCart.forEach((item) => {
            let detalle = item.comment?.trim() ? ` | ${item.comment.trim()}` : "";
            msg += `- ${item.quantity}x ${item.name}${detalle} ($${item.price * item.quantity})\n`;
        });
        msg += `${type === "delivery" && cost ? `Sub Total: $${cost} + $${total}` : ""}\n`;
        msg += `Total: $${total + (type === "delivery" && cost ? cost : 0)}`;
        return encodeURIComponent(msg);
    };

    const handleSend = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        let coords = userCoords;
        let km = distance;
        let deliveryCost = cost;

        if (type === "delivery") {
            const result = await handleCalculate();
            coords = result.coords;
            km = result.distance;
            deliveryCost = result.cost;
            if (!coords) {
                setGeoError("No se pudo calcular la ubicación. Verifique la dirección o use ubicación.");
                return;
            }
        }

        const msg = formatWhatsappMessage(coords);
        const phoneNumber = "3755348980"; // Número de Elys en formato internacional sin signos ni espacios
        window.open(`https://wa.me/${phoneNumber}?text=${msg}`, "_blank");

        onSend({
            cart: finalCart,
            total,
            address,
            name,
            phone,
            type,
            distance: km,
            cost: deliveryCost,
            userCoords: coords
        });

        // 🔹 Limpiar carrito y mostrar modal de éxito
        onUpdateCart([]);
        setShowSuccessModal(true);

    };


    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                    <div className="w-full max-w-lg mx-auto bg-white shadow-xl relative flex flex-col h-dvh md:rounded-2xl md:h-[90vh] animate-scaleIn">
                        <button
                            onClick={onClose}
                            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-2xl bg-white/80 rounded-full p-1 shadow-sm"
                        >
                            ✕
                        </button>

                        <div className="flex-1 overflow-y-auto px-5 pb-10">
                            <h2 className="text-xl py-4 font-bold text-gray-900 text-center uppercase">
                                Confirmar pedido
                            </h2>

                            {/* 🚫 Aviso si hay tragos en delivery */}
                            {type === "delivery" && hasTragos && (
                                <div className="mt-3 p-3 bg-red-100 border border-red-300 rounded-lg text-red-700 text-sm">
                                    🚫 No se pueden enviar tragos por delivery.
                                    <button
                                        type="button"
                                        onClick={handleRemoveTragos}
                                        className="ml-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs"
                                    >
                                        Eliminar tragos del pedido
                                    </button>
                                </div>
                            )}


                            {/* Datos del cliente */}
                            <div className="space-y-3">
                                <input
                                    type="text"
                                    placeholder="Nombre"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 text-gray-500 focus:ring-blue-500 outline-none"
                                />
                                <input
                                    type="tel"
                                    placeholder="Teléfono"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 text-gray-500 focus:ring-blue-500 outline-none"
                                />
                            </div>

                            {/* Tipo de entrega */}
                            <div>
                                <h3 className="font-semibold text-gray-700 mb-2 mt-4">Tipo de entrega</h3>
                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        type="button"
                                        className={`px-4 py-3 rounded-xl font-semibold shadow transition ${type === "delivery"
                                            ? "bg-blue-600 text-white shadow-md scale-105"
                                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                            }`}
                                        onClick={() => setType("delivery")}
                                    >
                                        Delivery
                                    </button>
                                    <button
                                        type="button"
                                        className={`px-4 py-3 rounded-xl font-semibold shadow transition ${type === "retiro"
                                            ? "bg-blue-600 text-white shadow-md scale-105"
                                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                            }`}
                                        onClick={() => setType("retiro")}
                                    >
                                        Retiro
                                    </button>
                                </div>
                            </div>



                            {/* Dirección si es delivery */}
                            {type === "delivery" && (
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="text"
                                            placeholder="Dirección"
                                            value={address}
                                            onChange={(e) => {
                                                setAddress(e.target.value);
                                                setUserCoords(null);
                                            }}
                                            className="flex-1 mt-4 rounded-lg border text-gray-500 border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                                        />
                                        <button
                                            type="button"
                                            onClick={handleUseLocation}
                                            className="text-sm text-blue-600 underline"
                                        >
                                            Usar ubicación
                                        </button>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={handleCalculate}
                                        className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium shadow hover:bg-blue-700 transition"
                                        disabled={loadingGeo}
                                    >
                                        {loadingGeo ? "Calculando..." : "Calcular delivery"}
                                    </button>
                                    {userCoords && distance && cost && (
                                        <div className="bg-blue-50 p-3 rounded-lg text-sm text-blue-800">
                                            Distancia: <strong>{distance} km</strong> – Costo delivery:{" "}
                                            <strong>${cost}</strong>
                                        </div>
                                    )}
                                    {geoError && <p className="text-red-600 text-sm">{geoError}</p>}
                                </div>
                            )}

                            {/* Pago */}
                            <div>
                                <h3 className="font-semibold text-gray-700 mb-2 mt-4">Método de pago</h3>
                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        type="button"
                                        className={`px-4 py-3 rounded-xl font-semibold shadow transition ${payment === "efectivo"
                                            ? "bg-green-600 text-white shadow-md scale-105"
                                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                            }`}
                                        onClick={() => setPayment("efectivo")}
                                    >
                                        Efectivo
                                    </button>
                                    <button
                                        type="button"
                                        className={`px-4 py-3 rounded-xl font-semibold shadow transition ${payment === "transferencia"
                                            ? "bg-yellow-500 text-white shadow-md scale-105"
                                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                            }`}
                                        onClick={() => setPayment("transferencia")}
                                    >
                                        Transferencia
                                    </button>
                                </div>
                                {payment === "transferencia" && (
                                    <div className="mb-5 flex flex-col items-center mt-3 relative bg-yellow-50 p-4 rounded-xl border border-yellow-200 shadow-sm">
                                        <span className="text-sm text-yellow-800 font-semibold"> Alias de pago: </span>
                                        <div className="flex items-center gap-2 mt-2">
                                            <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-lg font-mono select-all text-sm shadow-sm">
                                                negocio.elys.bar
                                            </span>
                                            <button
                                                type="button"
                                                className="text-xs bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-lg shadow-sm transition focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                                onClick={() => {
                                                    navigator.clipboard.writeText("negocio.elys.bar");
                                                    setShowCopied(true);
                                                    setTimeout(() => setShowCopied(false), 1200);
                                                }}
                                            >
                                                Copiar
                                            </button>
                                        </div>
                                        <p className="text-xs text-yellow-700 mt-2 font-medium text-center">
                                            Por favor enviar comprobante una vez realizado el pago
                                        </p>
                                        {showCopied && (
                                            <div className="absolute -top-6 bg-yellow-500 text-white text-xs px-3 py-1 rounded shadow animate-fade-in">
                                                ✅ Copiado!
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="bg-blue-600 text-white p-5 rounded-t-2xl">
                            <h3 className="text-lg font-bold mb-3">Resumen</h3>
                            <div className="max-h-32 overflow-y-auto mb-2">
                                {finalCart.map((item, idx) => (
                                    <div key={idx} className="flex justify-between text-sm">
                                        <span>{item.quantity}x {item.name}</span>
                                        <span>${item.price * item.quantity}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="text-right">
                                {type === "delivery" && cost && (
                                    <>
                                        <p className="text-sm">Subtotal: ${total}</p>
                                        <p className="text-sm">Delivery: ${cost}</p>
                                    </>
                                )}
                                <p className="text-xl font-bold">
                                    Total: ${total + (type === "delivery" && cost ? cost : 0)}
                                </p>
                            </div>
                            <button
                                onClick={handleSend}
                                disabled={!isValid || (type === "delivery" && hasTragos)}
                                className={`block w-full mt-4 py-3 text-center rounded-xl font-semibold shadow-lg transition ${!isValid || (type === "delivery" && hasTragos)
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-green-500 hover:bg-green-600"
                                    }`}
                            >
                                {type === "delivery" && hasTragos
                                    ? "Elimina los tragos para continuar"
                                    : "Enviar pedido"}
                            </button>
                        </div>
                    </div>


                </div>
            )}
            {showSuccessModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[60] animate-fade-in">
                    <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-sm w-full mx-4">
                        <div className="text-5xl mb-4">✅</div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">¡Pedido enviado!</h3>
                        <p className="text-gray-600 mb-6">
                            Tu pedido fue enviado correctamente a Ely’s.
                            En unos minutos recibirás confirmación por WhatsApp.
                        </p>
                        <button
                            onClick={() => {
                                setShowSuccessModal(false);
                                onClose();
                            }}
                            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg transition"
                        >
                            Aceptar
                        </button>
                    </div>
                </div>
            )}
        </>
    );

}
