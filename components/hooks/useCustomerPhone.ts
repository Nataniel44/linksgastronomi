"use client";

import { useState, useEffect } from "react";

export const useCustomerPhone = () => {
    const [phone, setPhone] = useState<string | null>(null);
    console.log(phone);

    // 🔹 Cargar el número guardado al montar el componente
    useEffect(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem("customerPhone");
            if (saved) setPhone(saved);
        }
    }, []);

    // 🔹 Guardar cada vez que cambia
    const savePhone = (newPhone: string) => {
        setPhone(newPhone);
        if (typeof window !== "undefined") {
            localStorage.setItem("customerPhone", newPhone);
        }
    };

    // 🔹 Permite borrar si se quiere reiniciar datos
    const clearPhone = () => {
        setPhone(null);
        if (typeof window !== "undefined") {
            localStorage.removeItem("customerPhone");
        }
    };

    return { phone, savePhone, clearPhone };
};
