import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    const restaurants = await prisma.restaurant.findMany({
        orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(restaurants);
}

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();

        if (!data.name || !data.slug || !data.phone || !data.whatsapp)
            return NextResponse.json({ error: "Datos obligatorios faltantes" }, { status: 400 });

        const restaurant = await prisma.restaurant.create({ data });
        return NextResponse.json(restaurant);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Error al crear restaurante" }, { status: 500 });
    }
}
