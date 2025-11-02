"use client";

import { useState, useEffect } from "react";

export const useCustomerPhone = () => {
    const [phone, setPhone] = useState<string | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);

    // 🔹 Cargar el número guardado al montar el componente
    useEffect(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem("customerPhone");
            if (saved) {
                setPhone(saved);
            }
            setIsLoaded(true);
        }
    }, []);

    // 🔹 Guardar inmediatamente en localStorage y state
    const savePhone = (newPhone: string) => {
        if (typeof window !== "undefined") {
            localStorage.setItem("customerPhone", newPhone);
        }
        setPhone(newPhone);

        // Forzar actualización en otros componentes
        window.dispatchEvent(new StorageEvent('storage', {
            key: 'customerPhone',
            newValue: newPhone,
            storageArea: localStorage
        }));
    };

    // 🔹 Permite borrar si se quiere reiniciar datos
    const clearPhone = () => {
        if (typeof window !== "undefined") {
            localStorage.removeItem("customerPhone");
        }
        setPhone(null);

        // Notificar a otros componentes
        window.dispatchEvent(new StorageEvent('storage', {
            key: 'customerPhone',
            newValue: null,
            storageArea: localStorage
        }));
    };

    // 🔹 Escuchar cambios en localStorage desde otros tabs/componentes
    useEffect(() => {
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === 'customerPhone') {
                setPhone(e.newValue);
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    return { phone, savePhone, clearPhone, isLoaded };
};