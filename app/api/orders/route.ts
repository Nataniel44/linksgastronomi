// app/api/orders/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const {
            restaurantId,
            customerName,
            customerPhone,
            deliveryType,
            address,
            items,
            subtotal,
            deliveryCost,
            discount,
            total
        } = body;

        if (!restaurantId || !customerName || !customerPhone || !items || items.length === 0) {
            return NextResponse.json(
                { error: 'Datos incompletos' },
                { status: 400 }
            );
        }

        // 🔗 Buscar o crear cliente automáticamente
        let customer = await prisma.customer.findFirst({
            where: { phone: customerPhone, restaurantId },
        });

        if (!customer) {
            customer = await prisma.customer.create({
                data: {
                    name: customerName,
                    phone: customerPhone,
                    restaurantId,
                },
            });
        }

        // Crear el pedido vinculado al cliente
        const order = await prisma.order.create({
            data: {
                restaurantId,
                customerId: customer.id, // ✅ Relación con el cliente
                customerName,
                customerPhone,
                deliveryType,
                address,
                subtotal,
                deliveryCost,
                discount,
                total,
                status: 'pending',
                items: {
                    create: items.map((item: any) => ({
                        productId: item.productId,
                        name: item.name,
                        price: item.price,
                        quantity: item.quantity,
                        options: item.options,
                        subtotal: item.subtotal
                    }))
                }
            },
            include: {
                items: true
            }
        });

        return NextResponse.json(order, { status: 201 });

    } catch (error) {
        console.error('Error creating order:', error);
        return NextResponse.json(
            { error: 'Error al crear el pedido' },
            { status: 500 }
        );
    }
}
