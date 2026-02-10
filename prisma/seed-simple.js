import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
    console.log("🌱 Iniciando seed...");

    // 1. Limpiar datos existentes
    console.log("🧹 Limpiando base de datos...");
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();
    await prisma.customer.deleteMany();
    await prisma.product.deleteMany();
    await prisma.subcategory.deleteMany();
    await prisma.category.deleteMany();
    await prisma.promotion.deleteMany();
    await prisma.restaurant.deleteMany();
    await prisma.admin.deleteMany();

    // 2. Crear Admin
    console.log("👤 Creando admin...");
    const hashedPassword = await bcrypt.hash("admin123", 10);
    await prisma.admin.create({
        data: {
            email: "admin@linksgastronomi.com",
            password: hashedPassword,
            name: "Administrador",
        },
    });

    // 3. Crear Restaurante
    console.log("🍽️ Creando restaurante...");
    const restaurant = await prisma.restaurant.create({
        data: {
            slug: "elysrestobar",
            name: "Elys Restobar",
            description: "El mejor restobar de la ciudad",
            phone: "+54 9 11 1234-5678",
            whatsapp: "5491112345678",
            email: "contacto@elysrestobar.com",
            address: "Av. Principal 123, Buenos Aires",
            isActive: true,
            currency: "ARS",
            deliveryCost: 500,
            minOrderAmount: 2000,
            deliveryTime: "30-45 min",
            colors: {
                primary: "#FF6B35",
                secondary: "#004E89",
            },
        },
    });

    // 4. Crear Categorías y Productos
    console.log("📦 Creando categorías y productos...");

    // Categoría: Pizzas
    const pizzasCategory = await prisma.category.create({
        data: {
            restaurantId: restaurant.id,
            name: "Pizzas",
            slug: "pizzas",
            description: "Pizzas artesanales",
            order: 1,
            isActive: true,
        },
    });

    await prisma.product.createMany({
        data: [
            {
                restaurantId: restaurant.id,
                categoryId: pizzasCategory.id,
                name: "Pizza Muzzarella",
                slug: "pizza-muzzarella",
                description: "Clásica pizza con muzzarella y salsa de tomate",
                price: 3500,
                isActive: true,
                isAvailable: true,
                order: 1,
            },
            {
                restaurantId: restaurant.id,
                categoryId: pizzasCategory.id,
                name: "Pizza Napolitana",
                slug: "pizza-napolitana",
                description: "Muzzarella, tomate, ajo y albahaca",
                price: 4000,
                isActive: true,
                isAvailable: true,
                order: 2,
            },
            {
                restaurantId: restaurant.id,
                categoryId: pizzasCategory.id,
                name: "Pizza Especial",
                slug: "pizza-especial",
                description: "Muzzarella, jamón, morrón y aceitunas",
                price: 4500,
                isActive: true,
                isAvailable: true,
                order: 3,
            },
        ],
    });

    // Categoría: Hamburguesas
    const hamburguesasCategory = await prisma.category.create({
        data: {
            restaurantId: restaurant.id,
            name: "Hamburguesas",
            slug: "hamburguesas",
            description: "Hamburguesas gourmet",
            order: 2,
            isActive: true,
        },
    });

    await prisma.product.createMany({
        data: [
            {
                restaurantId: restaurant.id,
                categoryId: hamburguesasCategory.id,
                name: "Hamburguesa Clásica",
                slug: "hamburguesa-clasica",
                description: "Carne, lechuga, tomate, cebolla y queso",
                price: 3000,
                isActive: true,
                isAvailable: true,
                order: 1,
            },
            {
                restaurantId: restaurant.id,
                categoryId: hamburguesasCategory.id,
                name: "Hamburguesa Completa",
                slug: "hamburguesa-completa",
                description: "Doble carne, queso cheddar, bacon, huevo",
                price: 4200,
                isActive: true,
                isAvailable: true,
                order: 2,
            },
        ],
    });

    // Categoría: Bebidas
    const bebidasCategory = await prisma.category.create({
        data: {
            restaurantId: restaurant.id,
            name: "Bebidas",
            slug: "bebidas",
            description: "Bebidas frías y calientes",
            order: 3,
            isActive: true,
        },
    });

    await prisma.product.createMany({
        data: [
            {
                restaurantId: restaurant.id,
                categoryId: bebidasCategory.id,
                name: "Coca Cola 500ml",
                slug: "coca-cola-500ml",
                description: "Bebida gaseosa",
                price: 800,
                isActive: true,
                isAvailable: true,
                order: 1,
            },
            {
                restaurantId: restaurant.id,
                categoryId: bebidasCategory.id,
                name: "Agua Mineral",
                slug: "agua-mineral",
                description: "Agua sin gas 500ml",
                price: 600,
                isActive: true,
                isAvailable: true,
                order: 2,
            },
            {
                restaurantId: restaurant.id,
                categoryId: bebidasCategory.id,
                name: "Cerveza Quilmes",
                slug: "cerveza-quilmes",
                description: "Cerveza 1L",
                price: 1500,
                isActive: true,
                isAvailable: true,
                order: 3,
            },
        ],
    });

    console.log("✅ Seed completado exitosamente!");
    console.log("\n📊 Resumen:");
    console.log("- 1 Admin creado (admin@linksgastronomi.com / admin123)");
    console.log("- 1 Restaurante: Elys Restobar");
    console.log("- 3 Categorías: Pizzas, Hamburguesas, Bebidas");
    console.log("- 8 Productos creados");
    console.log("\n🌐 Accede a: http://localhost:3000/elysrestobar");
}

main()
    .catch((err) => {
        console.error("❌ Error en seed:", err);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
