"use client";
import { createContext, useContext, useState, ReactNode } from "react";

export type CartItemType = {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
    comment?: string;
};

type CartContextType = {
    cart: CartItemType[];
    addToCart: (item: CartItemType) => void;
    removeFromCart: (id: string, comment?: string) => void;
    clearCart: () => void;
    total: number;
    setCart: (items: CartItemType[]) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<CartItemType[]>([]);

    const addToCart = (item: CartItemType) => {
        setCart((prev) => {
            const existing = prev.find(
                (p) => p.id === item.id && (p.comment || "") === (item.comment || "")
            );

            if (existing) {
                return prev.map((p) =>
                    p.id === item.id && (p.comment || "") === (item.comment || "")
                        ? { ...p, quantity: p.quantity + item.quantity }
                        : p
                );
            }

            return [...prev, item];
        });
    };

    const removeFromCart = (id: string, comment?: string) => {
        setCart((prev) =>
            prev.filter(
                (item) => !(item.id === id && (item.comment || "") === (comment || ""))
            )
        );
    };

    const clearCart = () => setCart([]);

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <CartContext.Provider
            value={{ cart, addToCart, removeFromCart, clearCart, total, setCart }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart must be used within CartProvider");
    return context;
};
