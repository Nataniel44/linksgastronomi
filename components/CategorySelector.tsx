"use client";

import { motion } from "framer-motion";
import React, { useRef } from "react";

type Subcategory = {
    id: number;
    name: string;
};

type Category = {
    id: number;
    name: string;
    slug: string;
    subcategories: Subcategory[];
};

type Props = {
    categories: Category[];
    activeCategory: string | null;
    activeSubcategory: number | null;
    onSelectCategory: (slug: string) => void;
    onSelectSubcategory: (id: number | null) => void;
};

export const CategorySelector: React.FC<Props> = ({
    categories,
    activeCategory,
    activeSubcategory,
    onSelectCategory,
    onSelectSubcategory,
}) => {
    const categoryRef = useRef<HTMLDivElement>(null);
    const subcategoryRef = useRef<HTMLDivElement>(null);

    if (!categories || categories.length === 0) {
        return (
            <div className="text-center text-gray-500 py-6">
                No hay categorías disponibles.
            </div>
        );
    }

    const activeCat = categories.find((c) => c.slug === activeCategory);

    // Función para centrar el botón clickeado
    const scrollToCenter = (
        containerRef: React.RefObject<HTMLDivElement>,
        element: HTMLElement
    ) => {
        const container = containerRef.current;
        if (!container) return;
        const containerWidth = container.offsetWidth;
        const elementLeft = element.offsetLeft;
        const elementWidth = element.offsetWidth;
        const scrollPosition = elementLeft - containerWidth / 2 + elementWidth / 2;

        container.scrollTo({
            left: scrollPosition,
            behavior: "smooth",
        });
    };

    return (
        <div className="sticky top-[90px] z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 shadow-sm transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 py-3">
                {/* Categorías */}
                <div
                    ref={categoryRef}
                    className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 scroll-smooth"
                >
                    {categories.map((cat) => (
                        <motion.button
                            key={cat.id}
                            whileTap={{ scale: 0.95 }}
                            onClick={(e) => {
                                onSelectCategory(cat.slug);
                                onSelectSubcategory(null);
                                scrollToCenter(categoryRef, e.currentTarget);
                            }}
                            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${activeCategory === cat.slug
                                    ? "bg-green-500 text-white shadow-md"
                                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-green-100 dark:hover:bg-gray-700"
                                }`}
                        >
                            {cat.name}
                        </motion.button>
                    ))}
                </div>

                {/* Subcategorías */}
                {activeCat && activeCat.subcategories?.length > 0 && (
                    <div
                        ref={subcategoryRef}
                        className="flex gap-2 overflow-x-auto scrollbar-hide mt-3 pb-1 scroll-smooth"
                    >
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={(e) => {
                                onSelectSubcategory(null);
                                scrollToCenter(subcategoryRef, e.currentTarget);
                            }}
                            className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all ${activeSubcategory === null
                                    ? "bg-green-500 text-white"
                                    : "bg-gray-200 dark:bg-gray-800 hover:bg-green-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
                                }`}
                        >
                            Todos
                        </motion.button>

                        {activeCat.subcategories.map((sub) => (
                            <motion.button
                                key={sub.id}
                                whileTap={{ scale: 0.95 }}
                                onClick={(e) => {
                                    onSelectSubcategory(sub.id);
                                    scrollToCenter(subcategoryRef, e.currentTarget);
                                }}
                                className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all ${activeSubcategory === sub.id
                                        ? "bg-green-500 text-white"
                                        : "bg-gray-200 dark:bg-gray-800 hover:bg-green-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
                                    }`}
                            >
                                {sub.name}
                            </motion.button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
