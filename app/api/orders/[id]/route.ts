import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest, context: { params: { id: string } }) {
    try {
        const { id } = context.params;

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

export async function PATCH(req: NextRequest, context: { params: { id: string } }) {
    try {
        const { id } = context.params;
        const { whatsappSent, status } = await req.json();

        const updated = await prisma.order.update({
            where: { id: Number(id) },
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
