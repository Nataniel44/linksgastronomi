import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

export async function GET(
    request: Request,
    context: { params: Promise<{ slug: string }> }
) {
    const { slug } = await context.params

    try {
        // Leer el archivo JSON de datos locales
        const filePath = path.join(process.cwd(), 'data', 'mock-menu.json')
        const fileData = await fs.readFile(filePath, 'utf8')
        const data = JSON.parse(fileData)

        // Verificar si el slug coincide (simulación de búsqueda)
        if (data.restaurant.slug !== slug) {
            return NextResponse.json(
                { error: 'Restaurante no encontrado' },
                { status: 404 }
            )
        }

        return NextResponse.json(data)
    } catch (error) {
        console.error('Error al obtener menú desde JSON:', error)
        return NextResponse.json(
            { error: 'Error al cargar el menú local' },
            { status: 500 }
        )
    }
}
