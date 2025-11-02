import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
    try {
        const url = new URL(req.url);
        const segments = url.pathname.split("/");
        const idIndex = segments.indexOf("restaurants") + 1;
        const restaurantId = segments[idIndex];

        if (!restaurantId) {
            return NextResponse.json({ error: "ID de restaurante no proporcionado" }, { status: 400 });
        }

        const products = await prisma.product.findMany({
            where: { restaurantId: Number(restaurantId) },
            orderBy: { id: "desc" },
        });

        return NextResponse.json(products);
    } catch (error) {
        console.error("Error al obtener productos:", error);
        return NextResponse.json({ error: "Error al obtener productos" }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const url = new URL(req.url);
        const segments = url.pathname.split("/");
        const idIndex = segments.indexOf("restaurants") + 1;
        const restaurantId = segments[idIndex];

        const { productId } = await req.json();

        if (!restaurantId || !productId) {
            return NextResponse.json({ error: "ID faltante" }, { status: 400 });
        }

        await prisma.product.delete({
            where: { id: Number(productId) },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error al eliminar producto:", error);
        return NextResponse.json({ error: "No se pudo eliminar el producto" }, { status: 500 });
    }
}
