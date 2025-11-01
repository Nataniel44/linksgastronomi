
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// app/api/customers/route.ts
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const restaurantId = searchParams.get('restaurantId');
        const phone = searchParams.get('phone');

        if (!restaurantId) {
            return NextResponse.json(
                { error: 'restaurantId es requerido' },
                { status: 400 }
            );
        }

        const where: any = {
            restaurantId: parseInt(restaurantId)
        };

        if (phone) {
            where.phone = phone;
        }

        const customers = await prisma.customer.findMany({
            where,
            include: {
                orders: {
                    take: 5,
                    orderBy: {
                        createdAt: 'desc'
                    }
                }
            },
            orderBy: {
                totalSpent: 'desc' // Mejores clientes primero
            }
        });

        return NextResponse.json(customers);

    } catch (error) {
        console.error('Error fetching customers:', error);
        return NextResponse.json(
            { error: 'Error al obtener los clientes' },
            { status: 500 }
        );
    }
}
