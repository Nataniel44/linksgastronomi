"use client";

import React, { useState, useMemo, useCallback, useEffect } from "react";
import { ModalProducto } from "./ModalProducto";
import { ProductCard } from "./ProductCard";
import { ProductCardSkeleton } from "./ProductCardSkeletonBase";
import { Banner } from "./Banner";
import { CartSidebar } from "./CartSidebar";
import { CategorySelector } from "./CategorySelector";
import ClickcitoIntro from "./ClickcitoIntro";
import { ShoppingCart } from "lucide-react";
import OrderHistory from "./OrderHistory";
import { Product, Extra } from "@/types/product";
import toast from "react-hot-toast";

type Subcategory = { id: number; name: string; slug: string; };
type Category = { id: number; name: string; slug: string; subcategories: Subcategory[]; products: Product[]; };

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

type Props = { slug: string; initialData: RestaurantData };

export const RestaurantMenu = ({ slug, initialData }: Props) => {
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const [activeSubcategory, setActiveSubcategory] = useState<number | null>(null);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [cart, setCart] = useState<CartItem[]>([]);
    const [showCart, setShowCart] = useState(false);
    const [isLoadingProducts, setIsLoadingProducts] = useState(false);

    const { restaurant, categories } = initialData;

    // ✅ Simular carga cuando cambia la categoría
    useEffect(() => {
        if (activeCategory) {
            setIsLoadingProducts(true);
            // Simular tiempo de carga (puedes quitar esto si no necesitas delay)
            const timer = setTimeout(() => {
                setIsLoadingProducts(false);
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [activeCategory, activeSubcategory]);

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

    // ✅ Memoizar funciones para evitar renders innecesarios
    const getImageSrc = useCallback((src?: string) => {
        if (!src) return "/placeholder.png";
        return src.startsWith("http") ? src : `${src}`;
    }, []);

    const handleProductClick = useCallback((p: Product) => {
        setSelectedProduct(p);
    }, []);

    const handleAddToCart = useCallback((product: Product, quantity: number, extras: Extra[]) => {
        setCart((prev) => [...prev, { ...product, quantity, extras }]);
        toast.success(`${product.name} agregado a tu pedido 🛒`);
    }, []);

    const handleRemoveItem = useCallback((index: number) => {
        setCart((prev) => prev.filter((_, i) => i !== index));
    }, []);

    const clearCart = useCallback(() => setCart([]), []);

    const cartItemCount = useMemo(
        () => cart.reduce((sum, item) => sum + item.quantity, 0),
        [cart]
    );

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

                {/* Categorías */}
                <CategorySelector
                    categories={categories}
                    activeCategory={activeCategory}
                    activeSubcategory={activeSubcategory}
                    onSelectCategory={setActiveCategory}
                    onSelectSubcategory={setActiveSubcategory}
                />

                {!activeCategory && <ClickcitoIntro />}

                {/* Productos */}
                {activeCategory && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 p-6 md:p-12">
                        {isLoadingProducts ? (
                            // 🔥 Mostrar skeletons mientras carga
                            <ProductCardSkeleton count={10} />
                        ) : filteredProducts.length > 0 ? (
                            // Mostrar productos reales
                            filteredProducts.map((prod) => (
                                <ProductCard
                                    key={prod.id}
                                    product={prod}
                                    onClick={handleProductClick}
                                    getImageSrc={getImageSrc}
                                />
                            ))
                        ) : (
                            // Mensaje cuando no hay productos
                            <div className="col-span-full text-center py-12 text-gray-400">
                                No hay productos en esta categoría
                            </div>
                        )}
                    </div>
                )}

                {activeCategory && <ClickcitoIntro />}

                {/* Modal */}
                {selectedProduct && (
                    <ModalProducto
                        product={selectedProduct}
                        onClose={() => setSelectedProduct(null)}
                        getImageSrc={getImageSrc}
                        onAddToCart={handleAddToCart}
                    />
                )}

                {/* Botón carrito */}
                <div className="fixed z-40 bottom-6 right-6 gap-3 flex flex-col items-end">
                    <OrderHistory restaurantId={restaurant.id} />

                    {cart.length > 0 && (
                        <button
                            className="group flex items-center gap-2 aspect-square md:aspect-video bg-green-500/20 hover:bg-green-500/30 backdrop-blur-md px-5 py-3 rounded-full shadow-lg hover:shadow-xl text-white transition-all duration-200 border border-green-400/20 hover:scale-105 active:scale-95"
                            onClick={() => setShowCart(true)}
                            aria-label={`Ver carrito con ${cartItemCount} ${cartItemCount === 1 ? "producto" : "productos"}`}
                        >
                            <div className="relative">
                                <ShoppingCart className="w-5 h-5" />
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold rounded-full min-w-[16px] h-4 flex items-center justify-center px-1 border border-white/20">
                                    {cartItemCount}
                                </span>
                            </div>
                            <span className="text-sm font-medium hidden sm:inline">
                                Ver carrito
                            </span>
                        </button>
                    )}
                </div>
            </div>
        </>
    );
};