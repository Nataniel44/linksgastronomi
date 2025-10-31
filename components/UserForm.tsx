"use client";
import React, { useState } from "react";

type Props = {
    total: number;
    onSubmit: (userData: { name: string; phone: string; address: string }) => void;
};

export const UserForm: React.FC<Props> = ({ total, onSubmit }) => {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !phone || !address) return alert("Completa todos los campos");
        onSubmit({ name, phone, address });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 text-white">
            <h3 className="text-xl font-bold">Información del cliente</h3>
            <input
                type="text"
                placeholder="Nombre completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 rounded-md bg-white/10 text-white placeholder-white/60"
                required
            />
            <input
                type="tel"
                placeholder="Teléfono"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-2 rounded-md bg-white/10 text-white placeholder-white/60"
                required
            />
            <input
                type="text"
                placeholder="Dirección"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full p-2 rounded-md bg-white/10 text-white placeholder-white/60"
                required
            />
            <p>Total a pagar: <span className="font-bold">${total}</span></p>
            <button
                type="submit"
                className="w-full bg-green-500 hover:bg-green-600 p-3 rounded-lg text-white font-bold"
            >
                Confirmar y enviar
            </button>
        </form>
    );
};
