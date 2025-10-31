"use client";

import { motion } from "framer-motion";
import React, { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

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
    const [showSubcategories, setShowSubcategories] = useState(false);

    if (!categories || categories.length === 0) {
        return (
            <div className="text-center text-gray-500 py-6">
                No hay categorías disponibles.
            </div>
        );
    }

    const activeCat = categories.find((c) => c.slug === activeCategory);
    const hasSubcategories = activeCat && activeCat.subcategories?.length > 0;

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
        <div className="sticky top-[90px] z-40 bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg border-b border-gray-200/50 dark:border-gray-800/50 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 py-2.5">
                {/* Categorías - Compactas y elegantes */}
                <div
                    ref={categoryRef}
                    className="flex gap-2 overflow-x-auto scrollbar-hide scroll-smooth"
                >
                    {categories.map((cat) => {
                        const isActive = activeCategory === cat.slug;
                        return (
                            <motion.button
                                key={cat.id}
                                whileTap={{ scale: 0.95 }}
                                onClick={(e) => {
                                    onSelectCategory(cat.slug);
                                    onSelectSubcategory(null);
                                    setShowSubcategories(false);
                                    scrollToCenter(categoryRef, e.currentTarget);
                                }}
                                className={`relative flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${isActive
                                        ? "bg-green-500/90 text-white shadow-md"
                                        : "bg-gray-100/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:bg-gray-200/80 dark:hover:bg-gray-700/80"
                                    }`}
                            >
                                {cat.name}
                                {cat.subcategories?.length > 0 && (
                                    <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isActive && showSubcategories ? 'rotate-180' : ''}`} />
                                )}
                            </motion.button>
                        );
                    })}
                </div>

                {/* Subcategorías - Desplegable opcional */}
                {hasSubcategories && (
                    <div className="mt-2 flex items-center gap-2">
                        <button
                            onClick={() => setShowSubcategories(!showSubcategories)}
                            className="text-xs text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 font-medium flex items-center gap-1 transition-colors"
                        >
                            {showSubcategories ? 'Ocultar' : 'Ver'} subcategorías
                            <ChevronDown className={`w-3 h-3 transition-transform ${showSubcategories ? 'rotate-180' : ''}`} />
                        </button>

                        {showSubcategories && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="flex gap-2 overflow-x-auto scrollbar-hide flex-1"
                            >
                                <button
                                    onClick={() => onSelectSubcategory(null)}
                                    className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all ${activeSubcategory === null
                                            ? "bg-green-500/20 text-green-700 dark:text-green-300 border border-green-500/30"
                                            : "bg-gray-100/80 dark:bg-gray-800/80 hover:bg-gray-200/80 dark:hover:bg-gray-700/80 text-gray-600 dark:text-gray-400"
                                        }`}
                                >
                                    Todos
                                </button>

                                {activeCat.subcategories.map((sub) => (
                                    <button
                                        key={sub.id}
                                        onClick={() => onSelectSubcategory(sub.id)}
                                        className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all ${activeSubcategory === sub.id
                                                ? "bg-green-500/20 text-green-700 dark:text-green-300 border border-green-500/30"
                                                : "bg-gray-100/80 dark:bg-gray-800/80 hover:bg-gray-200/80 dark:hover:bg-gray-700/80 text-gray-600 dark:text-gray-400"
                                            }`}
                                    >
                                        {sub.name}
                                    </button>
                                ))}
                            </motion.div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};