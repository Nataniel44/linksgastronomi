import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
    try {
        const data = await req.json();

        const {
            restaurantId,
            categoryId,
            subcategoryId,
            name,
            slug,
            description,
            image,
            price,
            comparePrice,
            isActive,
            isAvailable,
            stock,
            options,
            order,
        } = data;

        if (!restaurantId || !categoryId || !name || !slug || !price) {
            return NextResponse.json(
                { error: "Faltan campos obligatorios" },
                { status: 400 }
            );
        }

        const existing = await prisma.product.findFirst({
            where: { slug, restaurantId },
        });
        if (existing) {
            return NextResponse.json(
                { error: "Ya existe un producto con ese slug" },
                { status: 409 }
            );
        }

        const product = await prisma.product.create({
            data: {
                restaurantId: Number(restaurantId),
                categoryId: Number(categoryId),
                subcategoryId: subcategoryId ? Number(subcategoryId) : null,
                name,
                slug,
                description,
                image,
                price: Number(price),
                comparePrice: comparePrice ? Number(comparePrice) : null,
                isActive: isActive ?? true,
                isAvailable: isAvailable ?? true,
                stock: stock ? Number(stock) : null,
                options,
                order: order ?? 0,
            },
        });

        return NextResponse.json(product, { status: 201 });
    } catch (error) {
        console.error("Error al crear producto:", error);
        return NextResponse.json(
            { error: "Error interno del servidor" },
            { status: 500 }
        );
    }
}
