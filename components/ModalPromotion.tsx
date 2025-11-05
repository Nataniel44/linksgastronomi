"use client";

import React, { useState } from "react";
import { X, Minus, Plus, Tag, ShoppingCart } from "lucide-react";

type Promotion = {
    id: number;
    name: string;
    description: string | null;
    code: string | null;
    discountType: string;
    discountValue: number;
    minAmount: number | null;
    maxDiscount: number | null;
};

type Props = {
    promotion: Promotion;
    onClose: () => void;
    onAddToCart: (promotion: Promotion, quantity: number) => void;
};

export const ModalPromotion: React.FC<Props> = ({ promotion, onClose, onAddToCart }) => {
    const [quantity, setQuantity] = useState(1);

    const handleAdd = () => {
        onAddToCart(promotion, quantity);
    };

    const getDiscountText = () => {
        if (promotion.discountType === "percentage") {
            return `${promotion.discountValue}% de descuento`;
        } else if (promotion.discountType === "fixed") {
            return `$${promotion.discountValue} de descuento`;
        }
        return "Promoción especial";
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-zinc-900 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
                {/* Header con gradiente */}
                <div className="relative bg-gradient-to-br from-orange-500 to-red-500 p-8 rounded-t-3xl">
                    {/* Botón cerrar */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all"
                    >
                        <X className="w-5 h-5 text-white" />
                    </button>

                    {/* Badge de descuento grande */}
                    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full mb-4">
                        <Tag className="w-5 h-5 text-white" />
                        <span className="text-white font-bold text-lg">
                            {promotion.discountType === "percentage"
                                ? `-${promotion.discountValue}%`
                                : promotion.discountType === "fixed"
                                    ? `-$${promotion.discountValue}`
                                    : "PROMO"}
                        </span>
                    </div>

                    {/* Título */}
                    <h2 className="text-3xl font-bold text-white mb-2">
                        {promotion.name}
                    </h2>

                    {/* Subtítulo */}
                    <p className="text-white/90 text-lg">
                        {getDiscountText()}
                    </p>
                </div>

                {/* Contenido */}
                <div className="p-8 space-y-6">
                    {/* Descripción */}
                    {promotion.description && (
                        <div>
                            <h3 className="text-sm font-semibold text-gray-500 dark:text-zinc-400 uppercase tracking-wide mb-2">
                                Descripción
                            </h3>
                            <p className="text-gray-800 dark:text-white text-lg leading-relaxed">
                                {promotion.description}
                            </p>
                        </div>
                    )}

                    {/* Detalles */}
                    <div className="space-y-3">
                        {promotion.code && (
                            <div className="flex items-center justify-between p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl border border-orange-200 dark:border-orange-800">
                                <span className="text-sm text-gray-600 dark:text-zinc-400">
                                    Código de promoción
                                </span>
                                <span className="text-lg font-mono font-bold text-orange-600 dark:text-orange-400">
                                    {promotion.code}
                                </span>
                            </div>
                        )}

                        {promotion.minAmount && (
                            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-zinc-800/50 rounded-xl">
                                <span className="text-sm text-gray-600 dark:text-zinc-400">
                                    Compra mínima
                                </span>
                                <span className="text-lg font-bold text-gray-900 dark:text-white">
                                    ${promotion.minAmount}
                                </span>
                            </div>
                        )}

                        {promotion.maxDiscount && (
                            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-zinc-800/50 rounded-xl">
                                <span className="text-sm text-gray-600 dark:text-zinc-400">
                                    Descuento máximo
                                </span>
                                <span className="text-lg font-bold text-gray-900 dark:text-white">
                                    ${promotion.maxDiscount}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Selector de cantidad */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-500 dark:text-zinc-400 uppercase tracking-wide mb-3">
                            Cantidad
                        </h3>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                disabled={quantity <= 1}
                                className="w-12 h-12 rounded-full bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
                            >
                                <Minus className="w-5 h-5 text-gray-700 dark:text-white" />
                            </button>

                            <span className="text-2xl font-bold text-gray-900 dark:text-white min-w-[3rem] text-center">
                                {quantity}
                            </span>

                            <button
                                onClick={() => setQuantity(quantity + 1)}
                                className="w-12 h-12 rounded-full bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 flex items-center justify-center transition-colors"
                            >
                                <Plus className="w-5 h-5 text-gray-700 dark:text-white" />
                            </button>
                        </div>
                    </div>

                    {/* Botón agregar */}
                    <button
                        onClick={handleAdd}
                        className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-200 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl active:scale-95"
                    >
                        <ShoppingCart className="w-5 h-5" />
                        <span>Agregar promoción al carrito</span>
                    </button>

                    {/* Nota informativa */}
                    <p className="text-xs text-center text-gray-500 dark:text-zinc-400">
                        El descuento se aplicará automáticamente al finalizar tu pedido
                    </p>
                </div>
            </div>
        </div>
    );
};