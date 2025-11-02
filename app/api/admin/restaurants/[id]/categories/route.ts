import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const categories = await prisma.category.findMany({
            where: { restaurantId: Number(params.id) },
            include: { subcategories: true },
            orderBy: { order: "asc" },
        });

        return NextResponse.json(categories);
    } catch (error) {
        console.error("Error al obtener categorías:", error);
        return NextResponse.json(
            { error: "Error interno del servidor" },
            { status: 500 }
        );
    }
}
