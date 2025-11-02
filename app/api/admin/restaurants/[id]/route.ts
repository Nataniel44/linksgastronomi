import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Obtener restaurante por ID
export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const restaurant = await prisma.restaurant.findUnique({
            where: { id: Number(params.id) },
        });

        if (!restaurant) {
            return NextResponse.json({ error: "Restaurante no encontrado" }, { status: 404 });
        }

        return NextResponse.json(restaurant);
    } catch (error) {
        console.error("❌ Error al obtener restaurante:", error);
        return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
    }
}

// Actualizar restaurante (PATCH)
export async function PATCH(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const id = Number(params.id);
        const body = await request.json();

        // 🧠 Validación básica
        if (!body.name || !body.slug) {
            return NextResponse.json(
                { error: "El nombre y el slug son obligatorios." },
                { status: 400 }
            );
        }

        // Verificar si el slug ya existe (y no pertenece a este restaurante)
        const existing = await prisma.restaurant.findFirst({
            where: {
                slug: body.slug,
                NOT: { id },
            },
        });

        if (existing) {
            return NextResponse.json(
                { error: "Ya existe otro restaurante con ese slug." },
                { status: 409 }
            );
        }

        // Actualizar el restaurante
        const updated = await prisma.restaurant.update({
            where: { id },
            data: {
                name: body.name,
                slug: body.slug,
                address: body.address || "",
                phone: body.phone || "",
                logo: body.logo || "",
                banner: body.banner || "",
            },
        });

        return NextResponse.json({
            success: true,
            message: "Restaurante actualizado correctamente.",
            restaurant: updated,
        });
    } catch (error) {
        console.error("❌ Error al actualizar restaurante:", error);
        return NextResponse.json(
            { error: "Error al guardar los cambios." },
            { status: 500 }
        );
    }
}
