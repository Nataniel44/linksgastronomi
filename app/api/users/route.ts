import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    try {
        console.log('=== DEBUG ===')
        console.log('DATABASE_URL desde process.env:', process.env.DATABASE_URL)
        console.log('NODE_ENV:', process.env.NODE_ENV)

        const body = await request.json()
        console.log('Body recibido:', body)

        const user = await prisma.user.create({
            data: {
                email: body.email,
                name: body.name
            }
        })

        return NextResponse.json(user, { status: 201 })
    } catch (error) {
        console.error('Error completo:', error)
        return NextResponse.json(
            {
                error: 'Error al crear usuario',
                details: error instanceof Error ? error.message : String(error)
            },
            { status: 500 }
        )
    }
}