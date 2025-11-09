"use client";

import React, { useEffect, useState } from "react";

interface Service {
    title: string;
    description: string;
    cta?: { href: string; label: string };
}

interface ServiceClientProps {
    service: Service;
}

export default function ServiceClient({ service }: ServiceClientProps) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        // Simula aparición suave después del montaje
        const timer = setTimeout(() => setVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div
            className={`max-w-3xl mx-auto p-8 md:p-12 bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700
            transform transition-all duration-700 ease-out
            ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
        >
            {/* Título */}
            <h1
                className={`text-4xl md:text-5xl font-extrabold mb-6 text-gray-900 dark:text-white
                transition-all duration-700 delay-100
                ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
            >
                {service.title}
            </h1>

            {/* Descripción */}
            <p
                className={`text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed
                transition-all duration-700 delay-200
                ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
            >
                {service.description}
            </p>

            {/* CTA */}
            {service.cta && (
                <a
                    href={service.cta.href}
                    className={`inline-block mt-8 px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold rounded-xl shadow-lg
                    hover:shadow-xl transform transition-all duration-300
                    ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}
                    hover:-translate-y-1 active:scale-95`}
                    style={{ transitionDelay: "300ms" }}
                >
                    {service.cta.label}
                </a>
            )}
        </div>
    );
}
