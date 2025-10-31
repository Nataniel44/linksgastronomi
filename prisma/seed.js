import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    console.log("Iniciando seed...");

    // 1️⃣ Crear o actualizar restaurante
    const restaurant = await prisma.restaurant.upsert({
        where: { slug: "elysrestobar" },
        update: {
            name: "Elys Restobar",
            description: "El mejor lugar para comer y disfrutar",
            logo: "/logos/elys-logo.png",
            banner: "/banners/elys-banner.jpg",
            phone: "123456789",
            whatsapp: "5491123456789",
            address: "Calle Falsa 123, Ciudad",
            currency: "ARS",
            deliveryCost: 300,
            minOrderAmount: 1000,
            deliveryTime: "30-45 min",
        },
        create: {
            slug: "elysrestobar",
            name: "Elys Restobar",
            description: "El mejor lugar para comer y disfrutar",
            logo: "/logos/elys-logo.png",
            banner: "/banners/elys-banner.jpg",
            phone: "123456789",
            whatsapp: "5491123456789",
            address: "Calle Falsa 123, Ciudad",
            currency: "ARS",
            deliveryCost: 300,
            minOrderAmount: 1000,
            deliveryTime: "30-45 min",
        },
    });

    // 2️⃣ Crear categorías con upsert
    const categoriesData = [
        { name: "Pizzas", slug: "pizzas", order: 1 },
        { name: "Hamburguesas", slug: "hamburguesas", order: 2 },
        { name: "Bebidas", slug: "bebidas", order: 3 },
    ];

    for (const cat of categoriesData) {
        const category = await prisma.category.upsert({
            where: {
                restaurantId_slug: { restaurantId: restaurant.id, slug: cat.slug },
            },
            update: { name: cat.name, order: cat.order },
            create: {
                restaurantId: restaurant.id,
                name: cat.name,
                slug: cat.slug,
                order: cat.order,
                isActive: true,
            },
        });

        // 3️⃣ Crear productos para cada categoría
        let productsData = [];

        if (cat.slug === "pizzas") {
            productsData = [
                { name: "Pizza Margarita", slug: "pizza-margarita", price: 2000, image: "/products/pizza-margarita.jpg" },
                { name: "Pizza Pepperoni", slug: "pizza-pepperoni", price: 2500, image: "/products/pizza-pepperoni.jpg" },
            ];
        } else if (cat.slug === "hamburguesas") {
            productsData = [
                { name: "Hamburguesa Clásica", slug: "hamburguesa-clasica", price: 1500, image: "/products/hamburguesa-clasica.jpg" },
                { name: "Hamburguesa Doble", slug: "hamburguesa-doble", price: 2000, image: "/products/hamburguesa-doble.jpg" },
            ];
        } else if (cat.slug === "bebidas") {
            productsData = [
                { name: "Coca Cola", slug: "coca-cola", price: 300, image: "/products/coca-cola.jpg" },
                { name: "Agua Mineral", slug: "agua-mineral", price: 200, image: "/products/agua-mineral.jpg" },
            ];
        }

        for (const prod of productsData) {
            await prisma.product.upsert({
                where: {
                    restaurantId_slug: { restaurantId: restaurant.id, slug: prod.slug },
                },
                update: {
                    name: prod.name,
                    price: prod.price,
                    image: prod.image,
                },
                create: {
                    restaurantId: restaurant.id,
                    categoryId: category.id,
                    name: prod.name,
                    slug: prod.slug,
                    price: prod.price,
                    image: prod.image,
                    isActive: true,
                    isAvailable: true,
                },
            });
        }
    }

    console.log("Seed finalizado correctamente ✅");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
