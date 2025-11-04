"use client";

import React from "react";

// Tipos
type Product = {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    image: string | null;
    price: number;
    comparePrice?: number | null;
    options?: {
        extras?: { name: string; price: number }[];
        sizes?: { name: string; price: number }[];
    };
    categoryId: number;
    subcategoryId?: number | null;
};

// 🔥 NUEVO TIPO
type Promotion = {
    id: number;
    name: string;
    description: string | null;
    code: string | null;
    discountType: string;
    discountValue: number;
    minAmount: number | null;
    maxDiscount: number | null;
    isActive: boolean;
};

type Subcategory = {
    id: number;
    name: string;
    slug: string;
};

type Extra = {
    name: string;
    price: number;
};

type Category = {
    id: number;
    name: string;
    slug: string;
    subcategories: Subcategory[];
    products: Product[];
};

type RestaurantData = {
    restaurant: {
        id: number;
        name: string;
        logo: string | null;
        banner?: string | null;
        phone: string | null;
        whatsapp: string | null;
        description: string | null;
        address: string | null;
    };
    categories: Category[];
    promotions: Promotion[]; // 🔥 AGREGAR
};

export type CartItem = {
    id: number;
    name: string;
    price: number;
    quantity: number;
    extras: Extra[];
    image?: string | null;
};

type Props = {
    slug: string;
};

// 🔥 COMPONENTE DE TARJETA DE PROMOCIÓN
export const PromotionCard: React.FC<{ promotion: Promotion }> = ({ promotion }) => {
    const getDiscountText = () => {
        if (promotion.discountType === "percentage") {
            return `-${promotion.discountValue}%`;
        } else if (promotion.discountType === "fixed") {
            return `-$${promotion.discountValue}`;
        }
        return "Promo";
    };

    return (
        <div className="group relative rounded-2xl bg-gradient-to-br from-orange-500/10 to-red-500/10 border-2 border-orange-400/30 dark:border-orange-500/40 overflow-hidden backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            {/* Badge de descuento */}
            <div className="absolute top-3 left-3 bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm font-bold px-3 py-1.5 rounded-full shadow-lg z-10">
                {getDiscountText()}
            </div>

            {/* Icono decorativo */}
            <div className="absolute top-3 right-3 text-4xl opacity-20">
                🎉
            </div>

            {/* Contenido */}
            <div className="p-5 pt-12 space-y-3">
                {/* Nombre */}
                <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-2 leading-tight">
                    {promotion.name}
                </h3>

                {/* Descripción */}
                {promotion.description && (
                    <p className="text-sm text-gray-700 dark:text-zinc-300 line-clamp-2 leading-relaxed">
                        {promotion.description}
                    </p>
                )}

                {/* Detalles adicionales */}
                <div className="flex flex-col gap-1.5 pt-2">
                    {promotion.code && (
                        <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-600 dark:text-zinc-400">Código:</span>
                            <span className="text-xs font-mono font-bold bg-white/50 dark:bg-zinc-800/50 px-2 py-1 rounded border border-orange-300 dark:border-orange-600">
                                {promotion.code}
                            </span>
                        </div>
                    )}

                    {promotion.minAmount && (
                        <p className="text-xs text-gray-600 dark:text-zinc-400">
                            Compra mínima: <span className="font-semibold">${promotion.minAmount}</span>
                        </p>
                    )}
                </div>
            </div>

            {/* Borde animado en hover */}
            <div className="absolute inset-0 border-2 border-orange-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        </div>
    );
};
