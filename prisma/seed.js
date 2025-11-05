import { PrismaClient } from "@prisma/client";
import { menuComidas } from "./data/menuComidas.js";

const prisma = new PrismaClient();

async function main() {
    const restaurantId = 1; // Elys Restobar

    // Limpiar en orden correcto
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();
    await prisma.product.deleteMany();
    await prisma.subcategory.deleteMany();
    await prisma.category.deleteMany();

    for (const [categoryName, categoryData] of Object.entries(menuComidas)) {
        if (!categoryName) continue; // seguridad
        const categorySlug = categoryName.toLowerCase().replace(/\s+/g, "-");

        const category = await prisma.category.create({
            data: {
                restaurantId,
                name: categoryName,
                slug: categorySlug,
                order: 0,
                isActive: true,
            },
        });

        // Si es un array directo de productos
        if (Array.isArray(categoryData)) {
            for (const item of categoryData) {
                if (!item?.name) continue;
                await prisma.product.create({
                    data: {
                        restaurantId,
                        categoryId: category.id,
                        name: item.name,
                        slug: `${item.name.toLowerCase().replace(/\s+/g, "-")}-${category.id}-${Math.floor(Math.random() * 10000)}`,

                        description: item.desc || null,
                        image: item.image || null,
                        price: item.price || 0,
                        comparePrice: null,
                        options:
                            item.options || item.extras || item.salsas
                                ? {
                                    extras: item.extras || [],
                                    sizes: item.options || [],
                                    salsas: item.salsas || [],
                                }
                                : null,
                        isActive: true,
                        isAvailable: true,
                    },
                });
            }
            continue;
        }

        // Si tiene subcategorías
        if (categoryData && typeof categoryData === "object") {
            for (const [subName, subList] of Object.entries(categoryData)) {
                if (!subName || !subList?.items) continue;
                const subSlug = subName.toLowerCase().replace(/\s+/g, "-");

                const subcategory = await prisma.subcategory.create({
                    data: {
                        categoryId: category.id,
                        name: subName,
                        slug: subSlug,
                        order: 0,
                        isActive: true,
                    },
                });

                for (const item of subList.items) {
                    if (!item?.name) continue;
                    await prisma.product.create({
                        data: {
                            restaurantId,
                            categoryId: category.id,
                            subcategoryId: subcategory.id,
                            name: item.name,
                            slug: item.name.toLowerCase().replace(/\s+/g, "-"),
                            description: item.desc || null,
                            image: item.image || null,
                            price: item.price || 0,
                            comparePrice: null,
                            options:
                                item.options || item.extras || item.salsas
                                    ? {
                                        extras: item.extras || [],
                                        sizes: item.options || [],
                                        salsas: item.salsas || [],
                                    }
                                    : null,
                            isActive: true,
                            isAvailable: true,
                        },
                    });
                }
            }
        }
    }

    console.log("✅ Menú cargado correctamente para Elys Restobar");
}

main()
    .catch((err) => {
        console.error("❌ Error cargando menú:", err);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
