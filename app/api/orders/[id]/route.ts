// app/api/orders/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Ajusta la ruta según tu proyecto

// GET - Obtener un pedido por ID
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const orderId = parseInt(params.id);

        if (isNaN(orderId)) {
            return NextResponse.json(
                { error: 'ID inválido' },
                { status: 400 }
            );
        }

        const order = await prisma.order.findUnique({
            where: { id: orderId },
            include: {
                items: true,
                customer: true
            }
        });

        if (!order) {
            return NextResponse.json(
                { error: 'Pedido no encontrado' },
                { status: 404 }
            );
        }

        return NextResponse.json(order);

    } catch (error) {
        console.error('Error fetching order:', error);
        return NextResponse.json(
            { error: 'Error al obtener el pedido' },
            { status: 500 }
        );
    }
}

// PATCH - Actualizar un pedido
export async function PATCH(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const orderId = parseInt(params.id);
        const body = await request.json();

        if (isNaN(orderId)) {
            return NextResponse.json(
                { error: 'ID inválido' },
                { status: 400 }
            );
        }

        // Verificar que el pedido existe
        const existingOrder = await prisma.order.findUnique({
            where: { id: orderId }
        });

        if (!existingOrder) {
            return NextResponse.json(
                { error: 'Pedido no encontrado' },
                { status: 404 }
            );
        }

        // Preparar datos para actualizar
        const updateData: any = {};

        if (body.whatsappSent !== undefined) {
            updateData.whatsappSent = body.whatsappSent;
            if (body.whatsappSent) {
                updateData.whatsappSentAt = new Date();
            }
        }

        if (body.status) {
            updateData.status = body.status;
        }

        if (body.isPaid !== undefined) {
            updateData.isPaid = body.isPaid;
        }

        if (body.paymentMethod) {
            updateData.paymentMethod = body.paymentMethod;
        }

        if (body.notes !== undefined) {
            updateData.notes = body.notes;
        }

        // Actualizar el pedido
        const order = await prisma.order.update({
            where: { id: orderId },
            data: updateData,
            include: {
                items: true
            }
        });

        return NextResponse.json(order);

    } catch (error) {
        console.error('Error updating order:', error);
        return NextResponse.json(
            { error: 'Error al actualizar el pedido' },
            { status: 500 }
        );
    }
}

// DELETE - Cancelar/Eliminar un pedido
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const orderId = parseInt(params.id);

        if (isNaN(orderId)) {
            return NextResponse.json(
                { error: 'ID inválido' },
                { status: 400 }
            );
        }

        // Verificar que el pedido existe
        const existingOrder = await prisma.order.findUnique({
            where: { id: orderId }
        });

        if (!existingOrder) {
            return NextResponse.json(
                { error: 'Pedido no encontrado' },
                { status: 404 }
            );
        }

        // En lugar de eliminar, mejor cambiar el estado a "cancelled"
        const order = await prisma.order.update({
            where: { id: orderId },
            data: {
                status: 'cancelled'
            }
        });

        return NextResponse.json({
            message: 'Pedido cancelado exitosamente',
            order
        });

    } catch (error) {
        console.error('Error cancelling order:', error);
        return NextResponse.json(
            { error: 'Error al cancelar el pedido' },
            { status: 500 }
        );
    }
}