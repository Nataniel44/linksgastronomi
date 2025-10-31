"use client";

import Link from "next/link";

export default function NotFoundService() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center px-6">
            <h1 className="text-4xl font-bold text-red-600 mb-4">Servicio no encontrado</h1>
            <p className="text-gray-600 mb-6">
                El servicio que estás buscando no existe o fue eliminado.
            </p>
            <Link
                href="/"
                className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition"
            >
                Volver a Inicio
            </Link>
        </div>
    );
}
