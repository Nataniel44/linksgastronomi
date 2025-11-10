"use client";

import React, { useState, useMemo } from "react";
import { ModalProducto } from "./ModalProducto";
import { ProductCard } from "./ProductCard";
import { Banner } from "./Banner";
import { CartSidebar } from "./CartSidebar";
import { CategorySelector } from "./CategorySelector";
import ClickcitoIntro from "./ClickcitoIntro";
import { ShoppingCart } from "lucide-react";
import OrderHistory from "./OrderHistory";
import { Product, Extra } from "@/types/product";
import toast from "react-hot-toast";

type Subcategory = {
    id: number;
    name: string;
    slug: string;
};

type Category = {
    id: number;
    name: string;
    slug: string;
    subcategories: Subcategory[];
    products: Product[];
};

type RestaurantData = {
    restaurant: {
        id: number;
        name: string;
        logo: string | null;
        banner?: string | null;
        phone: string | null;
        whatsapp: string | null;
        description: string | null;
        address: string | null;
    };
    categories: Category[];
};

export type CartItem = {
    id: number;
    name: string;
    price: number;
    quantity: number;
    extras: Extra[];
    image?: string | null;
};

type Props = {
    slug: string;
    initialData: RestaurantData;
};

export const RestaurantMenu = ({ slug, initialData }: Props) => {
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const [activeSubcategory, setActiveSubcategory] = useState<number | null>(null);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [cart, setCart] = useState<CartItem[]>([]);
    const [showCart, setShowCart] = useState(false);

    const { restaurant, categories } = initialData;

    // ✅ Memoizar cálculos pesados
    const { activeCat, filteredProducts } = useMemo(() => {
        const activeCat = categories.find((c) => c.slug === activeCategory);
        const filteredProducts = activeCat
            ? activeCat.products.filter((p) =>
                activeSubcategory ? p.subcategoryId === activeSubcategory : true
            )
            : [];

        return { activeCat, filteredProducts };
    }, [categories, activeCategory, activeSubcategory]);

    // ✅ Funciones optimizadas con useCallback implícito
    const clearCart = () => setCart([]);

    const handleAddToCart = (product: Product, quantity: number, extras: Extra[]) => {
        setCart(prev => [...prev, { ...product, quantity, extras }]);
        toast.success(`${product.name} agregado a tu pedido 🛒`);

    };



    const handleRemoveItem = (index: number) => {
        setCart(prev => prev.filter((_, i) => i !== index));
    };

    const getImageSrc = (src?: string) => {
        if (!src) return "/placeholder.png";
        return src.startsWith("http") ? src : `${src}`;
    };

    // ✅ Calcular total de items en carrito
    const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <>
            <div className="relative w-full bg-gray-900 rounded-b-lg min-h-screen">
                {/* Carrito flotante */}
                {showCart && (
                    <CartSidebar
                        cart={cart}
                        onClose={() => setShowCart(false)}
                        removeItem={handleRemoveItem}
                        whatsapp={restaurant.whatsapp as string}
                        restaurantId={restaurant.id}
                        getImageSrc={getImageSrc}
                        clearCart={clearCart}
                    />
                )}

                {/* Banner */}
                <Banner
                    name={restaurant.name}
                    logo={restaurant.logo}
                    banner={restaurant.banner ?? null}
                    description={restaurant.description}
                    phone={restaurant.phone}
                    whatsapp={restaurant.whatsapp}
                    address={restaurant.address}
                    getImageSrc={getImageSrc}
                />

                {/* Selector de categorías */}
                <CategorySelector
                    categories={categories}
                    activeCategory={activeCategory}
                    activeSubcategory={activeSubcategory}
                    onSelectCategory={setActiveCategory}
                    onSelectSubcategory={setActiveSubcategory}
                />

                {/* Intro solo cuando NO hay categoría activa */}
                {!activeCategory && <ClickcitoIntro />}

                {/* Grid de productos */}
                {activeCategory && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 p-6 md:p-12">
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map(prod => (
                                <ProductCard
                                    key={prod.id}
                                    product={prod}
                                    onClick={setSelectedProduct}
                                    getImageSrc={getImageSrc}
                                />
                            ))
                        ) : (
                            <div className="col-span-full text-center py-12 text-gray-400">
                                No hay productos en esta categoría
                            </div>
                        )}
                    </div>
                )}

                {/* Intro al final (solo si hay categoría activa) */}
                {activeCategory && <ClickcitoIntro />}

                {/* Modal de producto */}
                {selectedProduct && (
                    <ModalProducto
                        product={selectedProduct}
                        onClose={() => setSelectedProduct(null)}
                        getImageSrc={getImageSrc}
                        onAddToCart={handleAddToCart}
                    />
                )}

                {/* Botones flotantes */}
                <div className="fixed z-40 bottom-6 right-6 gap-3 flex flex-col items-end">
                    <OrderHistory restaurantId={restaurant.id} />

                    {/* Botón del carrito */}
                    {cart.length > 0 && (
                        <button
                            className="group flex items-center gap-2 aspect-square bg-green-500/20 hover:bg-green-500/30 backdrop-blur-md px-5 py-3 rounded-full shadow-lg hover:shadow-xl text-white transition-all duration-200 border border-green-400/20 hover:scale-105 active:scale-95"
                            onClick={() => setShowCart(true)}
                            aria-label={`Ver carrito con ${cartItemCount} ${cartItemCount === 1 ? 'producto' : 'productos'}`}
                        >
                            <div className="relative">
                                <ShoppingCart className="w-5 h-5" />
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold rounded-full min-w-[16px] h-4 flex items-center justify-center px-1 border border-white/20">
                                    {cartItemCount}
                                </span>
                            </div>
                            <span className="text-sm font-medium hidden sm:inline">Ver carrito</span>
                        </button>
                    )}
                </div>
            </div>

            {/* Estilos globales para scrollbar */}
            <style jsx global>{`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                
                /* Scrollbar personalizado para otros elementos */
                *::-webkit-scrollbar {
                    width: 6px;
                    height: 6px;
                }
                *::-webkit-scrollbar-track {
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 10px;
                }
                *::-webkit-scrollbar-thumb {
                    background: rgba(34, 197, 94, 0.5);
                    border-radius: 10px;
                }
                *::-webkit-scrollbar-thumb:hover {
                    background: rgba(34, 197, 94, 0.7);
                }
            `}</style>
        </>
    );
};