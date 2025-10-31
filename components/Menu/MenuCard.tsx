// components/Menu/MenuCard.tsx
"use client";
import React, { useState } from "react";
import { Item } from "./Item";
import { useCart, CartItemType } from "../Cart/CartProvider";

type Product = {
    name: string;
    desc?: string;
    price?: number | string;
};

export default function MenuCard({ product }: { product: Product }) {
    const { addToCart } = useCart();
    const [selectedPrice, setSelectedPrice] = useState<string | number>(
        product.price ?? 0
    );

    // Manejo de rangos o varias opciones
    const priceOptions = typeof product.price === "string" && product.price.includes("/")
        ? product.price.split("/").map((p) => p.trim())
        : [product.price];

    const handleAdd = () => {
        const item: CartItemType = {
            id: product.name + selectedPrice, // id único por variante
            name: product.name,
            price: typeof selectedPrice === "string" ? parseInt(selectedPrice.replace(/\D/g, "")) || 0 : selectedPrice,
            quantity: 1,
            image: "/placeholder.png", // reemplazar si hay imagen
        };
        addToCart(item);
    };

    return (
        <div className="border rounded-lg p-4 flex flex-col bg-[rgb(20,22,28)]">
            <Item name={product.name} desc={product.desc} price={selectedPrice} />

            {priceOptions.length > 1 && (
                <select
                    value={selectedPrice}
                    onChange={(e) => setSelectedPrice(e.target.value)}
                    className="mt-2 p-1 bg-white text-black rounded"
                >
                    {priceOptions.map((p) => (
                        <option key={p} value={p}>
                            {p}
                        </option>
                    ))}
                </select>
            )}

            <button
                onClick={handleAdd}
                className="mt-2 bg-blue-500 text-white px-3 py-1 rounded"
            >
                Agregar
            </button>
        </div>
    );
}
