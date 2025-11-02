import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Obtener un producto
export async function GET(req: Request) {
    try {
        const url = new URL(req.url);
        const id = url.pathname.split("/").pop(); // obtiene el último segmento de la URL
        if (!id) return NextResponse.json({ error: "ID no proporcionado" }, { status: 400 });

        const product = await prisma.product.findUnique({
            where: { id: Number(id) },
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
export async function PATCH(req: Request) {
    try {
        const url = new URL(req.url);
        const id = url.pathname.split("/").pop(); // último segmento
        if (!id) return NextResponse.json({ error: "ID no proporcionado" }, { status: 400 });

        const data = await req.json();

        const product = await prisma.product.update({
            where: { id: Number(id) },
            data,
        });

        return NextResponse.json(product);
    } catch (error) {
        console.error("Error al actualizar producto:", error);
        return NextResponse.json({ error: "No se pudo actualizar el producto" }, { status: 500 });
    }
}
