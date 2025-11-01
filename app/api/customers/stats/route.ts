// Obtener estadísticas de un cliente
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// app/api/customers/stats/route.ts
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const phone = searchParams.get('phone');
        const restaurantId = searchParams.get('restaurantId');

        if (!phone || !restaurantId) {
            return NextResponse.json(
                { error: 'phone y restaurantId son requeridos' },
                { status: 400 }
            );
        }

        const customer = await prisma.customer.findUnique({
            where: {
                restaurantId_phone: {
                    restaurantId: parseInt(restaurantId),
                    phone: phone
                }
            },
            include: {
                orders: {
                    orderBy: {
                        createdAt: 'desc'
                    },
                    take: 10
                }
            }
        });

        if (!customer) {
            return NextResponse.json(
                { error: 'Cliente no encontrado' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            customer,
            stats: {
                totalOrders: customer.totalOrders,
                totalSpent: customer.totalSpent,
                points: customer.points,
                averageOrderValue: customer.totalOrders > 0
                    ? customer.totalSpent / customer.totalOrders
                    : 0
            }
        });

    } catch (error) {
        console.error('Error fetching customer stats:', error);
        return NextResponse.json(
            { error: 'Error al obtener estadísticas' },
            { status: 500 }
        );
    }
}