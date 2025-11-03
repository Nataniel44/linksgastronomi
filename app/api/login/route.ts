import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { createToken } from "@/lib/auth";
import bcrypt from "bcryptjs";

// ===========================
// LOGIN SEGURO (sin inyección)
// ===========================
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        // Sanitizar y validar inputs
        const email = String(body.email || "").trim().toLowerCase();
        const password = String(body.password || "").trim();

        if (!email || !password || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
        }

        // Evitar SQL injection: Prisma usa queries parametrizadas por defecto.
        const admin = await prisma.admin.findUnique({
            where: { email },
            select: { id: true, email: true, name: true, password: true },
        });

        // Usuario no existe
        if (!admin) {
            await new Promise((r) => setTimeout(r, 1000)); // delay contra fuerza bruta
            return NextResponse.json({ error: "Credenciales inválidas" }, { status: 401 });
        }

        // Validar contraseña
        const isValid = await bcrypt.compare(password, admin.password);
        if (!isValid) {
            await new Promise((r) => setTimeout(r, 1000));
            return NextResponse.json({ error: "Credenciales inválidas" }, { status: 401 });
        }

        // Crear token seguro
        const token = await createToken({
            userId: admin.id,
            email: admin.email,
            role: "admin",
        });

        // Generar respuesta y cookie protegida
        const response = NextResponse.json({
            success: true,
            user: {
                id: admin.id,
                email: admin.email,
                name: admin.name,
            },
        });

        response.cookies.set("token", token, {
            httpOnly: true,      // evita acceso desde JS (protege XSS)
            secure: process.env.NODE_ENV === "production", // solo HTTPS en prod
            sameSite: "strict",  // evita envío CSRF
            maxAge: 60 * 60 * 24 * 7, // 7 días
            path: "/",
        });

        return response;
    } catch (error) {
        console.error("Error en login:", error);
        return NextResponse.json(
            { error: "Error interno en el servidor" },
            { status: 500 }
        );
    }
}
