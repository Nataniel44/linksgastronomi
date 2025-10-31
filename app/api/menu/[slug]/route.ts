import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(
    request: Request,
    { params }: { params: { slug: string } }
) {
    try {
        const { slug } = params

        // Obtener restaurante con todas sus relaciones
        const restaurant = await prisma.restaurant.findFirst({
            where: {
                slug: slug,
                isActive: true
            },
            include: {
                categories: {
                    where: {
                        isActive: true
                    },
                    include: {
                        subcategories: {
                            where: {
                                isActive: true
                            },
                            orderBy: {
                                order: 'asc'
                            }
                        },
                        products: {
                            where: {
                                isActive: true,
                                isAvailable: true
                            },
                            orderBy: {
                                order: 'asc'
                            }
                        }
                    },
                    orderBy: {
                        order: 'asc'
                    }
                }
            }
        })

        // Si no existe el restaurante
        if (!restaurant) {
            return NextResponse.json(
                { error: 'Restaurante no encontrado' },
                { status: 404 }
            )
        }

        // Si el restaurante no está activo
        if (!restaurant.isActive) {
            return NextResponse.json(
                { error: 'Restaurante no disponible' },
                { status: 403 }
            )
        }

        // Formatear la respuesta
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
                subcategories: category.subcategories,
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
            }))
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