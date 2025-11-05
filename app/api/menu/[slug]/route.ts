import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(
    request: Request,
    context: { params: Promise<{ slug: string }> }
) {
    const { slug } = await context.params

    try {
        // Obtener restaurante con todas sus relaciones
        const restaurant = await prisma.restaurant.findFirst({
            where: {
                slug: slug,
                isActive: true,
            },
            include: {
                categories: {
                    where: {
                        isActive: true,
                    },
                    include: {
                        subcategories: {
                            where: {
                                isActive: true,
                            },
                            include: {
                                products: {
                                    where: {
                                        isActive: true,
                                        isAvailable: true,
                                    },
                                    orderBy: {
                                        order: "asc",
                                    },
                                },
                            },
                            orderBy: {
                                order: "asc",
                            },
                        },
                        products: {
                            where: {
                                isActive: true,
                                isAvailable: true,
                            },
                            orderBy: {
                                order: "asc",
                            },
                        },
                    },
                    orderBy: {
                        order: "asc",
                    },
                },
            },
        });

        if (!restaurant) {
            return NextResponse.json(
                { error: 'Restaurante no encontrado' },
                { status: 404 }
            )
        }

        if (!restaurant.isActive) {
            return NextResponse.json(
                { error: 'Restaurante no disponible' },
                { status: 403 }
            )
        }

        // 🔥 OBTENER PROMOCIONES ACTIVAS
        const now = new Date()
        const promotions = await prisma.promotion.findMany({
            where: {
                restaurantId: restaurant.id,
                isActive: true,
                OR: [
                    { startDate: null },
                    { startDate: { lte: now } }
                ],
                AND: [
                    {
                        OR: [
                            { endDate: null },
                            { endDate: { gte: now } }
                        ]
                    }
                ]
            },
            orderBy: {
                createdAt: 'desc'
            },
            select: {
                id: true,
                name: true,
                description: true,
                code: true,
                discountType: true,
                discountValue: true,
                minAmount: true,
                maxDiscount: true,
                isActive: true // ✅ necesario para el filtro del frontend
            }

        })

        const response = {
            restaurant: {
                id: restaurant.id,
                name: restaurant.name,
                slug: restaurant.slug,
                description: restaurant.description,
                logo: restaurant.logo,
                banner: restaurant.banner,
                phone: restaurant.phone,
                whatsapp: restaurant.whatsapp,
                address: restaurant.address,
                currency: restaurant.currency,
                colors: restaurant.colors,
                deliveryCost: restaurant.deliveryCost,
                minOrderAmount: restaurant.minOrderAmount,
                deliveryTime: restaurant.deliveryTime
            },
            categories: restaurant.categories.map(category => ({
                id: category.id,
                name: category.name,
                slug: category.slug,
                description: category.description,
                image: category.image,
                subcategories: category.subcategories.map(sub => ({
                    id: sub.id,
                    name: sub.name,
                    slug: sub.slug,
                    products: sub.products.map(p => ({
                        id: p.id,
                        name: p.name,
                        slug: p.slug,
                        description: p.description,
                        image: p.image,
                        price: p.price,
                        comparePrice: p.comparePrice,
                        options: p.options,
                        categoryId: p.categoryId,
                        subcategoryId: p.subcategoryId,
                    })),
                })),

                products: category.products.map(product => ({
                    id: product.id,
                    name: product.name,
                    slug: product.slug,
                    description: product.description,
                    image: product.image,
                    price: product.price,
                    comparePrice: product.comparePrice,
                    options: product.options,
                    categoryId: product.categoryId,
                    subcategoryId: product.subcategoryId
                }))
            })),
            // 🔥 AGREGAR PROMOCIONES A LA RESPUESTA
            promotions: promotions
        }

        return NextResponse.json(response)
    } catch (error) {
        console.error('Error al obtener menú:', error)
        return NextResponse.json(
            { error: 'Error al cargar el menú' },
            { status: 500 }
        )
    }
}