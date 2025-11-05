"use client";

import { useState } from "react";

type Props = {
    sabores: string[];
    onSelect: (saboresSeleccionados: { sabor: string; cantidad: number }[]) => void;
};

export default function SelectorEmpanadas({ sabores, onSelect }: Props) {
    const [seleccion, setSeleccion] = useState<{ sabor: string; cantidad: number }[]>(
        sabores.map((s) => ({ sabor: s, cantidad: 0 }))
    );

    const handleChange = (sabor: string, cantidad: number) => {
        const actualizado = seleccion.map((item) =>
            item.sabor === sabor ? { ...item, cantidad } : item
        );
        setSeleccion(actualizado);
        onSelect(actualizado);
    };

    const totalSeleccionadas = seleccion.reduce((acc, s) => acc + s.cantidad, 0);

    return (
        <div className="space-y-4">
            <p className="text-white font-semibold text-sm uppercase tracking-wide">
                Seleccioná tus empanadas ({totalSeleccionadas})
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {seleccion.map(({ sabor, cantidad }) => (
                    <div
                        key={sabor}
                        className="bg-white/5 border border-white/10 rounded-xl p-3 flex flex-col items-center text-center transition hover:bg-white/10"
                    >
                        <p className="text-sm text-gray-200 mb-2">{sabor}</p>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => handleChange(sabor, Math.max(0, cantidad - 1))}
                                className="px-2 py-1 bg-white/10 hover:bg-white/20 text-white rounded transition"
                            >
                                -
                            </button>
                            <span className="w-6 text-center text-white font-semibold">
                                {cantidad}
                            </span>
                            <button
                                onClick={() => handleChange(sabor, cantidad + 1)}
                                className="px-2 py-1 bg-green-600 hover:bg-green-700 text-white rounded transition"
                            >
                                +
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
