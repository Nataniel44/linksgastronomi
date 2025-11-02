import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/orders/[id]
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const id = params.id;

        if (!id) {
            return NextResponse.json({ error: "ID no proporcionado" }, { status: 400 });
        }

        const order = await prisma.order.findUnique({
            where: { id: Number(id) },
            include: { items: true },
        });

        if (!order) {
            return NextResponse.json({ error: "Pedido no encontrado" }, { status: 404 });
        }

        return NextResponse.json(order);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Error al obtener el pedido" }, { status: 500 });
    }
}

// PATCH /api/orders/[id]
export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { whatsappSent, status } = await request.json();

        const updated = await prisma.order.update({
            where: { id: Number(params.id) },
            data: {
                whatsappSent: whatsappSent ?? undefined,
                status: status ?? undefined,
            },
        });

        return NextResponse.json(updated);
    } catch (error) {
        console.error("Error en PATCH /api/orders/[id]:", error);
        return NextResponse.json({ error: "Error al actualizar el pedido" }, { status: 500 });
    }
}
