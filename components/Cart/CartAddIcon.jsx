// CartAddIcon.jsx
import React from "react";

/**
 * CartAddIcon
 * Props:
 *  - size: number (px)
 *  - stroke: number (stroke width)
 *  - className: string (CSS classes)
 *  - title: string (accessibility)
 *  - variant: 'plus-circle' | 'bag-plus' | 'box-plus'
 */
export default function CartAddIcon({
    size = 40,
    stroke = 2.5,
    className = "",
    title = "Agregar",
    variant = "plus-circle",
}) {
    const common = {
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        "aria-hidden": title ? "false" : "true",
        role: "img",
        className,
    };

    if (variant === "bag-plus") {
        return (
            <svg {...common}>
                {title ? <title>{title}</title> : null}
                <path
                    d="M6 8h12l-.8 9a2 2 0 0 1-2 1.8H9.8A2 2 0 0 1 8 17L7.2 8z"
                    stroke="currentColor"
                    strokeWidth={stroke}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                />
                <path
                    d="M9 8a3 3 0 0 1 6 0"
                    stroke="currentColor"
                    strokeWidth={stroke}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                />
                <circle cx="18.5" cy="5.5" r="3.0" fill="currentColor" opacity="0.1" />
                <path
                    d="M18.5 4.5v2M17.5 5.5h2"
                    stroke="currentColor"
                    strokeWidth={stroke}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        );
    }

    if (variant === "box-plus") {
        return (
            <svg {...common}>
                {title ? <title>{title}</title> : null}
                <path
                    d="M3 7.5L12 3l9 4.5v8.5a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7.5z"
                    stroke="currentColor"
                    strokeWidth={stroke}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                />
                <path
                    d="M12 3v10"
                    stroke="currentColor"
                    strokeWidth={stroke}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <circle cx="18" cy="6" r="3.2" fill="currentColor" opacity="0.06" />
                <path
                    d="M18 4.7v2.6M16.3 6h3.4"
                    stroke="currentColor"
                    strokeWidth={stroke}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        );
    }

    // default: plus-circle (simple, limpio, moderno)
    return (
        <svg {...common}>
            {title ? <title>{title}</title> : null}
            <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth={stroke}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M12 8v8M8 12h8"
                stroke="currentColor"
                strokeWidth={stroke}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            {/* pequeño detalle: sombra interior */}
            <path
                d="M19 5 L19 5"
                stroke="currentColor"
                strokeWidth="0.5"
                opacity="0.04"
            />
        </svg>
    );
}
