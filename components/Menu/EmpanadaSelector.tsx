import React, { useState } from "react";

interface EmpanadaSelectorProps {
    sabores: string[];
    precios: { unidad: number; docena: number };
    onAdd: (pedido: { cantidad: number; tipo: "unidad" | "docena"; sabores: string[] }) => void;
}

export const EmpanadaSelector: React.FC<EmpanadaSelectorProps> = ({ sabores, precios, onAdd }) => {
    const [tipo, setTipo] = useState<"unidad" | "docena">("unidad");
    const [cantidad, setCantidad] = useState(1);
    const [saboresSeleccionados, setSaboresSeleccionados] = useState<string[]>([]);

    const maxSabores = tipo === "unidad" ? 1 : 12;

    const handleSaborClick = (sabor: string) => {
        if (saboresSeleccionados.includes(sabor)) {
            setSaboresSeleccionados(saboresSeleccionados.filter(s => s !== sabor));
        } else if (saboresSeleccionados.length < maxSabores) {
            setSaboresSeleccionados([...saboresSeleccionados, sabor]);
        }
    };

    const handleAdd = () => {
        onAdd({ cantidad: tipo === "unidad" ? cantidad : 12, tipo, sabores: saboresSeleccionados });
        setSaboresSeleccionados([]);
        setCantidad(1);
        setTipo("unidad");
    };

    return (
        <div className="flex flex-col col-span-3 gap-3 p-4 bg-white rounded-lg border border-gray-200 shadow-sm max-w-md mx-auto">
            {/* Selector unidad/docena */}
            <div className="flex gap-3 mb-2 justify-center">
                <button
                    className={`px-4 py-2 rounded-lg border text-sm font-medium transition ${tipo === "unidad"
                            ? "bg-blue-600 text-white border-blue-600"
                            : "bg-gray-100 text-blue-700 border-gray-300"
                        }`}
                    onClick={() => setTipo("unidad")}
                >
                    Unidad <span className="text-xs font-normal">(${precios.unidad})</span>
                </button>
                <button
                    className={`px-4 py-2 rounded-lg border text-sm font-medium transition ${tipo === "docena"
                            ? "bg-blue-600 text-white border-blue-600"
                            : "bg-gray-100 text-blue-700 border-gray-300"
                        }`}
                    onClick={() => setTipo("docena")}
                >
                    Docena <span className="text-xs font-normal">(${precios.docena})</span>
                </button>
            </div>

            {/* Cantidad (solo en unidad) */}
            {tipo === "unidad" && (
                <div className="flex items-center gap-2 justify-center mb-2">
                    <span className="text-sm text-blue-700 font-medium">Cantidad</span>
                    <button
                        className="px-3 py-1 rounded bg-gray-100 text-blue-700 font-bold text-lg border border-gray-300"
                        onClick={() => setCantidad(c => Math.max(1, c - 1))}
                        disabled={cantidad <= 1}
                    >
                        −
                    </button>
                    <span className="px-4 py-1 rounded border border-gray-300 bg-white text-blue-700 font-bold min-w-[2rem] text-center">
                        {cantidad}
                    </span>
                    <button
                        className="px-3 py-1 rounded bg-gray-100 text-blue-700 font-bold text-lg border border-gray-300"
                        onClick={() => setCantidad(c => Math.min(12, c + 1))}
                        disabled={cantidad >= 12}
                    >
                        +
                    </button>
                </div>
            )}

            {/* Sabores */}
            <div className="flex flex-wrap gap-2 mb-2 justify-center">
                {sabores.map((sabor) => (
                    <button
                        key={sabor}
                        type="button"
                        className={`px-3 py-1 rounded-lg border text-sm font-medium transition ${saboresSeleccionados.includes(sabor)
                                ? "bg-blue-600 text-white border-blue-600"
                                : "bg-white text-blue-700 border-gray-300"
                            }`}
                        onClick={() => handleSaborClick(sabor)}
                        disabled={saboresSeleccionados.length >= maxSabores && !saboresSeleccionados.includes(sabor)}
                        aria-pressed={saboresSeleccionados.includes(sabor)}
                    >
                        {sabor}
                    </button>
                ))}
            </div>

            {/* Mensaje guía */}
            <span className="text-xs text-center text-blue-600 font-medium">
                {tipo === "unidad"
                    ? "👉 Elegí 1 sabor por unidad."
                    : "👉 Elegí hasta 12 sabores distintos para tu docena. Podés elegir solo 1 sabor y aplicar la docena completa o combinar hasta 12 distintos."}
            </span>

            {/* Botón agregar */}
            <button
                className="mt-3 px-5 py-2 rounded-lg bg-blue-600 text-white font-semibold text-sm shadow hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleAdd}
                disabled={saboresSeleccionados.length === 0}
            >
                Agregar al pedido
            </button>
        </div>
    );
};
