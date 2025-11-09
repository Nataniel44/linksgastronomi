"use client";
import Link from "next/link";


export function BentoGridItem({ title, description, icon: Icon, className = "" }) {
    const slug = title.toLowerCase().replace(/\s+/g, "-");

    return (
        <Link href={`/services/${slug}`} className="block">
            <div

                className={`relative group rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow overflow-hidden cursor-pointer ${className}`}
            >
                {/* Efecto de brillo */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-200/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                <div className="relative z-10 flex flex-col h-full">
                    <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-yellow-500/10 border border-yellow-500/20 mb-4 group-hover:bg-yellow-500/20 transition-colors">
                        <Icon className="w-7 h-7 text-yellow-600" strokeWidth={2} />
                    </div>

                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 group-hover:text-yellow-600 transition-colors">
                        {title}
                    </h3>
                    <p className="text-gray-600 text-sm md:text-base leading-relaxed">{description}</p>

                    <div className="mt-auto pt-4 flex items-center text-yellow-600 font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                        <span>Ver más</span>
                        <svg
                            className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </div>
                </div>

                <div className="absolute top-0 right-0 w-20 h-20 bg-yellow-400/5 rounded-bl-[100px] -z-0" />
            </div>
        </Link>
    );
}
