"use client";
import { memo } from "react";

type SkeletonProps = {
    count?: number;
    className?: string;
};

const ProductCardSkeletonBase: React.FC<SkeletonProps> = ({
    count = 1,
    className = ""
}) => {
    return (
        <>
            {Array.from({ length: count }).map((_, index) => (
                <div
                    key={index}
                    className={`group relative rounded-2xl bg-white dark:bg-zinc-900/40 border border-gray-100 dark:border-zinc-800/50 overflow-hidden ${className}`}
                >
                    {/* Imagen Skeleton */}
                    <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-100 dark:bg-zinc-800/50">
                        <div className="w-full h-full flex items-center justify-center animate-pulse">
                            <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-zinc-700/50 flex items-center justify-center">
                                <span className="text-2xl opacity-30">🍽️</span>
                            </div>
                        </div>
                    </div>

                    {/* Contenido Skeleton */}
                    <div className="p-4 space-y-3 flex items-center flex-col text-center">
                        {/* Título */}
                        <div className="h-5 w-3/4 bg-gray-200 dark:bg-zinc-800 rounded-md animate-pulse" />

                        {/* Descripción */}
                        <div className="space-y-2 w-full">
                            <div className="h-3 w-full bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
                            <div className="h-3 w-4/5 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
                        </div>

                        {/* Pills/Opciones Skeleton */}
                        <div className="flex flex-wrap items-center justify-center gap-1.5 w-full">
                            {/* Pills moradas (sizes) */}
                            <div className="flex items-center gap-1 bg-gradient-to-r from-purple-500/10 to-purple-600/10 backdrop-blur-sm px-2 py-0.5 rounded-full border border-purple-500/20 animate-pulse">
                                <div className="w-1 h-1 rounded-full bg-purple-400/40" />
                                <div className="h-3 w-16 bg-purple-300/20 rounded" />
                            </div>

                            {/* Pills naranjas (sabores) */}
                            <div className="flex items-center gap-1 bg-gradient-to-r from-orange-500/10 to-orange-600/10 backdrop-blur-sm px-2 py-0.5 rounded-full border border-orange-500/20 animate-pulse">
                                <div className="w-1 h-1 rounded-full bg-orange-400/40" />
                                <div className="h-3 w-12 bg-orange-300/20 rounded" />
                            </div>

                            {/* Pills verdes (extras) */}
                            <div className="flex items-center gap-1 bg-gradient-to-r from-green-500/10 to-green-600/10 backdrop-blur-sm px-2 py-0.5 rounded-full border border-green-500/20 animate-pulse">
                                <div className="w-1 h-1 rounded-full bg-green-400/40" />
                                <div className="h-3 w-14 bg-green-300/20 rounded" />
                            </div>
                        </div>

                        {/* Precio Skeleton */}
                        <div className="flex items-baseline gap-2 pt-1">
                            <div className="h-6 w-20 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
                            <div className="h-4 w-16 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export const ProductCardSkeleton = memo(ProductCardSkeletonBase);
export default ProductCardSkeleton;