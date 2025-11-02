import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Obtener un producto
export async function GET(
    _req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const product = await prisma.product.findUnique({
            where: { id: Number(params.id) },
        });
        if (!product) {
            return NextResponse.json({ error: "Producto no encontrado" }, { status: 404 });
        }
        return NextResponse.json(product);
    } catch (error) {
        console.error("Error al obtener producto:", error);
        return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
    }
}

// Actualizar un producto
export async function PATCH(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const data = await req.json();

        const product = await prisma.product.update({
            where: { id: Number(params.id) },
            data,
        });

        return NextResponse.json(product);
    } catch (error) {
        console.error("Error al actualizar producto:", error);
        return NextResponse.json({ error: "No se pudo actualizar el producto" }, { status: 500 });
    }
}
