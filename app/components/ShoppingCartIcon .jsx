import React from "react";

const ShoppingCartIcon = ({ size = 24, color = "#000" }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            width={size}
            height={size}
        >
            <path d="M6 6h15l-1.5 8.5a2 2 0 0 1-2 1.5H8a2 2 0 0 1-2-1.5L4 4H2" />
            <circle cx="9" cy="20" r="1.5" />
            <circle cx="18" cy="20" r="1.5" />
        </svg>
    );
};

export default ShoppingCartIcon;
