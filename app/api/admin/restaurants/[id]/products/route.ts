import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
    _req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const products = await prisma.product.findMany({
            where: { restaurantId: Number(params.id) },
            orderBy: { id: "desc" },
        });

        return NextResponse.json(products);
    } catch (error) {
        console.error("Error al obtener productos:", error);
        return NextResponse.json(
            { error: "Error al obtener productos" },
            { status: 500 }
        );
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const { productId } = await req.json();
        await prisma.product.delete({
            where: { id: Number(productId) },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error al eliminar producto:", error);
        return NextResponse.json(
            { error: "No se pudo eliminar el producto" },
            { status: 500 }
        );
    }
}
