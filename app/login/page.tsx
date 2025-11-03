"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        // Validación básica antes del fetch
        const cleanEmail = email.trim().toLowerCase();
        const cleanPassword = password.trim();
        if (!cleanEmail || !cleanPassword) {
            setError("Complete todos los campos");
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
            setError("Email inválido");
            return;
        }

        try {
            setLoading(true);
            const res = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: cleanEmail.replace(/[<>]/g, ""), // evita inyección o XSS
                    password: cleanPassword.replace(/[<>]/g, ""),
                }),
                credentials: "include",
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Error desconocido");

            router.push("/admin/restaurants");
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow bg-white/80 backdrop-blur">
            <h1 className="text-2xl font-bold mb-4">Iniciar sesión</h1>
            {error && <p className="text-red-600 mb-4">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border rounded px-3 py-2"
                        required
                        autoComplete="username"
                    />
                </div>

                <div>
                    <label className="block mb-1">Contraseña</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border rounded px-3 py-2"
                        required
                        autoComplete="current-password"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-yellow-500 text-black py-2 rounded font-semibold hover:bg-yellow-400 disabled:opacity-60"
                >
                    {loading ? "Ingresando..." : "Ingresar"}
                </button>
            </form>
        </div>
    );
}
