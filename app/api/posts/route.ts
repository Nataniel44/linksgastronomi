import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

// GET - Listar todos los posts
export async function GET() {
    try {
        const posts = await prisma.post.findMany({
            include: {
                author: true // Incluir información del autor
            },
            orderBy: {
                id: 'desc' // Mostrar los más recientes primero
            }
        })
        return NextResponse.json(posts)
    } catch (error) {
        console.error('Error:', error)
        return NextResponse.json(
            { error: 'Error al obtener posts' },
            { status: 500 }
        )
    }
}

// POST - Crear un nuevo post
export async function POST(request: Request) {
    try {
        const body = await request.json()

        // Validar que el usuario existe
        const userExists = await prisma.user.findUnique({
            where: { id: body.authorId }
        })

        if (!userExists) {
            return NextResponse.json(
                { error: 'Usuario no encontrado' },
                { status: 404 }
            )
        }

        const post = await prisma.post.create({
            data: {
                title: body.title,
                content: body.content,
                published: body.published ?? false,
                authorId: body.authorId
            },
            include: {
                author: true // Incluir datos del autor en la respuesta
            }
        })

        return NextResponse.json(post, { status: 201 })
    } catch (error) {
        console.error('Error:', error)
        return NextResponse.json(
            { error: 'Error al crear post' },
            { status: 500 }
        )
    }
}