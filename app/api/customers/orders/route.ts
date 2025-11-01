// app/api/customers/orders/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Obtener pedidos de un cliente por teléfono
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const phone = searchParams.get('phone');
        const restaurantId = searchParams.get('restaurantId');

        if (!phone) {
            return NextResponse.json(
                { error: 'Teléfono es requerido' },
                { status: 400 }
            );
        }

        const where: any = {
            customerPhone: phone
        };

        if (restaurantId) {
            where.restaurantId = parseInt(restaurantId);
        }

        const orders = await prisma.order.findMany({
            where,
            include: {
                items: true
            },
            orderBy: {
                createdAt: 'desc'
            },
            take: 20 // Últimos 20 pedidos
        });

        return NextResponse.json(orders);

    } catch (error) {
        console.error('Error fetching customer orders:', error);
        return NextResponse.json(
            { error: 'Error al obtener los pedidos' },
            { status: 500 }
        );
    }
}


