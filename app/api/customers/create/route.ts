import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, phone, restaurantId } = body;

        if (!name || !phone || !restaurantId) {
            return NextResponse.json(
                { error: "Faltan campos requeridos" },
                { status: 400 }
            );
        }

        // Buscar si ya existe el cliente
        let customer = await prisma.customer.findUnique({
            where: {
                restaurantId_phone: {
                    restaurantId: parseInt(restaurantId),
                    phone,
                },
            },
        });

        // Si no existe, crearlo
        if (!customer) {
            customer = await prisma.customer.create({
                data: {
                    name,
                    phone,
                    restaurantId: parseInt(restaurantId),
                    totalOrders: 1,
                    totalSpent: 0,
                    points: 0,
                },
            });
        } else {
            // Si existe, actualizar su contador de pedidos
            customer = await prisma.customer.update({
                where: {
                    restaurantId_phone: {
                        restaurantId: parseInt(restaurantId),
                        phone,
                    },
                },
                data: {
                    totalOrders: { increment: 1 },
                },
            });
        }

        return NextResponse.json(customer);
    } catch (error) {
        console.error("Error creando cliente:", error);
        return NextResponse.json(
            { error: "Error al crear cliente" },
            { status: 500 }
        );
    }
}
