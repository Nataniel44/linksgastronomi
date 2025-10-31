"use client";
import React, { useState, useRef, useEffect } from "react";
import { Price } from "./Price";
import { DotSep } from "./DotSep";
import { useCart, CartItemType } from "../Cart/CartProvider";
import Modal from "../Modal/Modal";
import Image from "next/image";
import { Notification } from "../Notification";


export function ItemCart({
    name,
    desc,
    price,
    image,
    options,
    guarniciones,
    extras,
    viewMode = "pills",
    salsas,
}: {
    name: string;
    desc?: string;
    price?: number | string;
    image?: string;
    options?: { portion?: string; price: number | string }[];
    guarniciones?: string[];
    salsas?: string[];
    extras?: { name: string; price: number }[];
    viewMode?: "cards" | "pills";
}) {
    const { addToCart } = useCart();
    const [showNotif, setShowNotif] = useState(false);
    const hasOptions = Array.isArray(options) && options.length > 0;
    const priceOptions = hasOptions
        ? options.map(opt => opt.price)
        : (typeof price === "string" && price.includes("/")
            ? price.split("/").map((p) => p.trim())
            : [price]);
    const [selectedIdx, setSelectedIdx] = useState(0);
    const selectedPrice = priceOptions[selectedIdx] ?? 0;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [comment, setComment] = useState("");
    const [selectedGuarniciones, setSelectedGuarniciones] = useState<string[]>([]);
    const [selectedSalsa, setSelectedSalsa] = useState<string>("");
    const [showWarning, setShowWarning] = useState(false);
    const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [imgError, setImgError] = useState(false);

    const modalContentRef = useRef<HTMLDivElement>(null);

    // Calcular precio final con extras
    const extrasPrice = selectedExtras.reduce((acc, e) => {
        const extra = extras?.find(x => x.name === e);
        return acc + (extra?.price ?? 0);
    }, 0);

    const finalPrice =
        (typeof selectedPrice === "string"
            ? parseInt(selectedPrice.replace(/\D/g, "")) || 0
            : selectedPrice) + extrasPrice;

    // Scroll al abrir modal
    useEffect(() => {
        if (isModalOpen && modalContentRef.current) {
            modalContentRef.current.scrollTop = 0;
        }
    }, [isModalOpen]);

    const handleAdd = () => {
        if ((guarniciones && guarniciones.length > 0 && selectedGuarniciones.length === 0) ||
            (salsas && salsas.length > 0 && !selectedSalsa) ||
            (hasOptions && typeof selectedIdx !== "number")) {
            setShowWarning(true);
            setTimeout(() => setShowWarning(false), 1600);
            setIsModalOpen(true);
            return;
        }

        let optionLabel = "";
        if (hasOptions && options && options[selectedIdx]?.portion) {
            optionLabel = `Opción: ${options[selectedIdx].portion}`;
        } else if (hasOptions && priceOptions.length > 1) {
            optionLabel = `Opción: ${priceOptions[selectedIdx]}`;
        }

        const item: CartItemType = {
            id: name + finalPrice + selectedExtras.join("-") + optionLabel,
            name,
            price: finalPrice,
            quantity: 1,
            image: image || "/notfound.png",
            comment: [
                comment,
                optionLabel,
                selectedGuarniciones.length ? `Guarniciones: ${selectedGuarniciones.join(", ")}` : "",
                selectedSalsa ? `Salsa: ${selectedSalsa}` : "",
                selectedExtras.length ? `Extras: ${selectedExtras.join(", ")}` : "",
            ].filter(Boolean).join(" | "),
        };

        addToCart(item);
        setComment("");
        setSelectedGuarniciones([]);
        setSelectedSalsa("");
        setSelectedExtras([]);

        setShowNotif(true);
        setTimeout(() => setShowNotif(false), 1800);
    };

    return (
        <>
            <Notification message="Agregado al carrito" show={showNotif} />

            {/* 🔹 Vista Pills Mejorada */}
            {viewMode === "pills" && (
                <div
                    onClick={() => setIsModalOpen(true)}
                    className="group relative p-4 w-full md:w-auto rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 cursor-pointer overflow-hidden "
                >
                    {/* Efecto de brillo al hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />

                    <div className="relative flex gap-4 items-center">
                        {/* Imagen mejorada */}
                        <div className="flex-shrink-0 relative">
                            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-xl overflow-hidden ring-2 ring-white/10 group-hover:ring-blue-500/50 transition-all duration-300 shadow-lg">
                                {isLoading && (
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 animate-pulse" />
                                )}
                                <Image
                                    src={imgError || !image ? "/notfound.png" : image}
                                    alt={name}
                                    width={128}
                                    height={128}
                                    className={`rounded-xl object-cover w-full h-full group-hover:scale-110 transition-transform duration-500 ${isLoading ? "opacity-0" : "opacity-100"}`}
                                    onLoad={() => setIsLoading(false)}
                                    onError={() => setImgError(true)}
                                />
                            </div>
                            {/* Badge de precio flotante */}
                            <div className="absolute -top-2 -right-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white px-2.5 py-1 rounded-full text-xs sm:text-sm font-bold shadow-lg">
                                <Price value={finalPrice} />
                            </div>
                        </div>

                        {/* Contenido mejorado */}
                        <div className="flex-1 flex flex-col justify-center min-w-0">
                            <h4 className="font-bold text-lg sm:text-xl md:max-w-52 text-white group-hover:text-blue-400 transition-colors leading-tight mb-1">
                                {name}
                            </h4>

                            {desc && (
                                <p className="text-white/60 md:max-w-82 text-sm leading-relaxed line-clamp-2 mb-2">
                                    {desc}
                                </p>
                            )}

                            <DotSep />

                            {/* Tags de opciones */}
                            <div className="flex flex-wrap gap-1.5 mb-2 mt-1">
                                {extras && extras.length > 0 && (
                                    <span className="text-xs bg-green-500/20 text-green-300 px-2 py-0.5 rounded-full border border-green-500/30">
                                        +{extras.length} extras
                                    </span>
                                )}
                                {guarniciones && guarniciones.length > 0 && (
                                    <span className="text-xs bg-orange-500/20 text-orange-300 px-2 py-0.5 rounded-full border border-orange-500/30">
                                        {guarniciones.length} guarniciones
                                    </span>
                                )}
                                {options && options.length > 1 && (
                                    <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full border border-purple-500/30">
                                        {options.length} tamaños
                                    </span>
                                )}
                            </div>

                            {/* Botones de acción */}
                            <div className="flex justify-end items-center gap-2 sm:gap-3">
                                <button
                                    onClick={(e) => { e.stopPropagation(); setIsModalOpen(true); }}
                                    className="text-xs sm:text-sm text-blue-400 hover:text-blue-300 font-semibold transition-colors"
                                >
                                    Ver detalles →
                                </button>
                                <button
                                    onClick={(e) => { e.stopPropagation(); setIsModalOpen(true); }}
                                    className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white px-4 sm:px-5 py-2 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-blue-500/50 hover:scale-105 text-sm sm:text-base"
                                >
                                    Agregar +
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* 🔹 Vista Cards Mejorada */}
            {viewMode === "cards" && (
                <div
                    onClick={() => setIsModalOpen(true)}
                    className="group relative rounded-2xl overflow-hidden bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 cursor-pointer flex flex-col"
                >
                    {/* Imagen */}
                    <div className="relative w-full h-48 overflow-hidden">
                        {isLoading && (
                            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 animate-pulse" />
                        )}
                        <Image
                            src={imgError || !image ? "/notfound.png" : image}
                            alt={name}
                            fill
                            className={`object-cover group-hover:scale-110 transition-transform duration-500 ${isLoading ? "opacity-0" : "opacity-100"}`}
                            onLoad={() => setIsLoading(false)}
                            onError={() => setImgError(true)}
                        />
                        {/* Overlay gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent opacity-60" />

                        {/* Badge de precio */}
                        <div className="absolute top-3 right-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white px-3 py-1.5 rounded-full font-bold shadow-xl">
                            <Price value={finalPrice} />
                        </div>
                    </div>

                    {/* Contenido */}
                    <div className="p-4 flex flex-col flex-1">
                        <h4 className="font-bold text-lg text-white group-hover:text-blue-400 transition-colors mb-2 leading-tight">
                            {name}
                        </h4>

                        {desc && (
                            <p className="text-white/60 text-sm line-clamp-2 mb-3 flex-1">
                                {desc}
                            </p>
                        )}

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1.5 mb-3">
                            {extras && extras.length > 0 && (
                                <span className="text-xs bg-green-500/20 text-green-300 px-2 py-0.5 rounded-full">
                                    Extras
                                </span>
                            )}
                            {options && options.length > 1 && (
                                <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full">
                                    {options.length} tamaños
                                </span>
                            )}
                        </div>

                        {/* Botón */}
                        <button
                            onClick={(e) => { e.stopPropagation(); setIsModalOpen(true); }}
                            className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white py-2.5 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-blue-500/50 hover:scale-105"
                        >
                            Ver opciones
                        </button>
                    </div>
                </div>
            )}

            {/* Modal Mejorado */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={name}
            >
                <div ref={modalContentRef} className="flex flex-col gap-4 relative max-h-[100vh] overflow-y-auto p-1 md:p-2">
                    {/* Imagen */}
                    <div className="w-full h-40 md:h-52 relative rounded-xl shadow-2xl overflow-hidden ring-2 ring-white/10">
                        {isLoading && (
                            <div className="absolute inset-0 bg-white/10 animate-pulse rounded-xl" />
                        )}
                        <Image
                            src={imgError || !image ? "/notfound.png" : image}
                            alt={name}
                            fill
                            sizes="(max-width: 768px) 100vw, 600px"
                            className={`object-cover rounded-xl transition-opacity duration-500 ${isLoading ? "opacity-0" : "opacity-100"}`}
                            priority={false}
                            onError={() => setImgError(true)}
                            onLoadingComplete={() => setIsLoading(false)}
                        />
                    </div>

                    {/* Precio destacado */}
                    {selectedPrice != null && (
                        <div className="flex justify-between items-center bg-white/5 rounded-xl p-3 border border-white/10">
                            <span className="text-white/60 font-semibold text-sm">Precio total:</span>
                            <div className="text-xl font-bold">
                                <Price value={finalPrice} />
                            </div>
                        </div>
                    )}

                    {/* Opciones de tamaño */}
                    {priceOptions.length > 1 && (
                        <div>
                            <label className="text-sm font-bold text-white/80 mb-2 block">Tamaño:</label>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                {priceOptions.map((p, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedIdx(idx)}
                                        className={`px-4 py-3 rounded-xl text-sm font-bold border-2 transition-all ${selectedIdx === idx
                                            ? "bg-blue-600 text-white border-blue-500 shadow-lg scale-105"
                                            : "bg-white/5 text-white/70 border-white/20 hover:border-blue-400/50 hover:bg-white/10"
                                            }`}
                                    >
                                        <div className="text-xs opacity-80 mb-1">{hasOptions && options[idx]?.portion ? options[idx].portion : `Opción ${idx + 1}`}</div>
                                        <div className="font-bold">${p}</div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Extras */}
                    {extras && extras.length > 0 && (
                        <div>
                            <label className="text-sm font-bold text-white/80 mb-2 block">Extras opcionales:</label>
                            <div className="flex flex-wrap gap-2">
                                {extras.map((extra) => (
                                    <button
                                        key={extra.name}
                                        type="button"
                                        className={`px-4 py-2 rounded-xl text-sm font-semibold border-2 transition-all ${selectedExtras.includes(extra.name)
                                            ? "bg-green-600 text-white border-green-500 shadow-lg"
                                            : "bg-white/5 text-white/70 border-white/20 hover:border-green-400/50"
                                            }`}
                                        onClick={() => {
                                            setSelectedExtras(prev =>
                                                prev.includes(extra.name)
                                                    ? prev.filter(e => e !== extra.name)
                                                    : [...prev, extra.name]
                                            );
                                        }}
                                    >
                                        {extra.name} <span className="text-xs opacity-80">(+${extra.price})</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Guarniciones */}
                    {guarniciones && guarniciones.length > 0 && (
                        <div>
                            <label className="text-sm font-bold text-white/80 mb-2 block">Guarniciones (máx 2):</label>
                            <div className="grid grid-cols-2 gap-2">
                                {guarniciones.map((g) => (
                                    <button
                                        key={g}
                                        type="button"
                                        className={`px-4 py-2 rounded-xl text-sm font-semibold border-2 transition-all ${selectedGuarniciones.includes(g)
                                            ? "bg-blue-600 text-white border-blue-500 shadow-lg"
                                            : selectedGuarniciones.length >= 2
                                                ? "bg-white/5 text-white/30 border-white/10 cursor-not-allowed"
                                                : "bg-white/5 text-white/70 border-white/20 hover:border-blue-400/50"
                                            }`}
                                        onClick={() => {
                                            let newSelected;
                                            if (selectedGuarniciones.includes(g)) {
                                                newSelected = selectedGuarniciones.filter(x => x !== g);
                                            } else if (selectedGuarniciones.length < 2) {
                                                newSelected = [...selectedGuarniciones, g];
                                            } else {
                                                newSelected = selectedGuarniciones;
                                            }
                                            setSelectedGuarniciones(newSelected);
                                        }}
                                        disabled={selectedGuarniciones.length >= 2 && !selectedGuarniciones.includes(g)}
                                    >
                                        {g}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Salsas */}
                    {salsas && salsas.length > 0 && (
                        <div>
                            <label className="text-sm font-bold text-white/80 mb-2 block">Salsa:</label>
                            <div className="grid grid-cols-2 gap-2">
                                {salsas.map((s) => (
                                    <button
                                        key={s}
                                        type="button"
                                        className={`px-4 py-2 rounded-xl text-sm font-semibold border-2 transition-all ${selectedSalsa === s
                                            ? "bg-orange-600 text-white border-orange-500 shadow-lg"
                                            : "bg-white/5 text-white/70 border-white/20 hover:border-orange-400/50"
                                            }`}
                                        onClick={() => setSelectedSalsa(s)}
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Comentario */}
                    <div>
                        <label className="text-sm font-bold text-white/80 mb-2 block">Comentarios especiales:</label>
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Ej: sin cebolla, bien cocido, etc."
                            className="w-full p-3 rounded-xl bg-black/30 text-white border-2 border-white/10 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-all placeholder:text-white/40"
                            rows={3}
                        />
                    </div>

                    {/* Botones */}
                    <div className="flex gap-3 pt-2 relative">
                        <button
                            onClick={e => { e.stopPropagation(); setIsModalOpen(false); }}
                            className="flex-1 px-4 py-3 rounded-xl bg-white/10 text-white/80 hover:bg-white/20 font-semibold transition-all"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={e => {
                                e.stopPropagation();
                                if ((guarniciones && guarniciones.length > 0 && selectedGuarniciones.length === 0) ||
                                    (salsas && salsas.length > 0 && !selectedSalsa) ||
                                    (hasOptions && typeof selectedIdx !== "number")) {
                                    setShowWarning(true);
                                    setTimeout(() => setShowWarning(false), 1600);
                                    return;
                                }
                                handleAdd();
                                setIsModalOpen(false);
                            }}
                            className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold transition-all shadow-lg hover:shadow-blue-500/50 hover:scale-105"
                        >
                            Agregar ${finalPrice}
                        </button>

                        {/* Warning mejorado */}
                        {showWarning && (
                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-yellow-500 text-black text-sm px-4 py-2 rounded-lg shadow-lg animate-bounce font-semibold whitespace-nowrap">
                                ⚠️ Completá todas las opciones
                            </div>
                        )}
                    </div>
                </div>
            </Modal>
        </>
    );
}