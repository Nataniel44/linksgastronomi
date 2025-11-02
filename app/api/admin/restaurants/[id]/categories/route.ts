import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
    try {
        const url = new URL(req.url);
        const segments = url.pathname.split("/");
        const idIndex = segments.indexOf("restaurants") + 1;
        const id = segments[idIndex];

        if (!id) {
            return NextResponse.json({ error: "ID no proporcionado" }, { status: 400 });
        }

        const categories = await prisma.category.findMany({
            where: { restaurantId: Number(id) },
            include: { subcategories: true },
            orderBy: { order: "asc" },
        });

        return NextResponse.json(categories);
    } catch (error) {
        console.error("Error al obtener categorías:", error);
        return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
    }
}
