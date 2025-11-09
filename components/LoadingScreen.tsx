"use client";
import { Loader2 } from "lucide-react";

export default function LoadingScreen() {
    return (
        <div className="flex flex-col items-center justify-center h-[70vh] text-center">
            {/* Spinner */}
            <div className="mb-4 animate-spin">
                <Loader2 className="w-10 h-10 text-primary" />
            </div>

            {/* Texto elegante */}
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300 animate-fade-in">
                Cargando menú...
            </p>

            {/* Efecto de puntos animados */}
            <div className="flex mt-2 space-x-1">
                <span className="w-2 h-2 bg-primary rounded-full animate-bounce1"></span>
                <span className="w-2 h-2 bg-primary rounded-full animate-bounce2"></span>
                <span className="w-2 h-2 bg-primary rounded-full animate-bounce3"></span>
            </div>
        </div>
    );
}
