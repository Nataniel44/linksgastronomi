import Link from "next/link";

const baseClasses = "font-bold px-4 py-2 rounded-full shadow-xl text-base transition-transform hover:scale-105 border-2 flex items-center gap-2 justify-center";

const variants = {
    primary: "bg-yellow-500 hover:bg-yellow-600 text-white border-yellow-400",
    secondary: "bg-white border-yellow-400 text-yellow-600 hover:bg-yellow-100",
    dark: "bg-black text-white hover:bg-gray-900 border-transparent",
};

export function ActionButton({ href, children, variant = "primary", className = "" }) {
    return (
        <Link href={href} className={`${baseClasses} ${variants[variant]} ${className}`}>
            {children}
        </Link>
    );
}