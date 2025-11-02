// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET!; // tu clave secreta

export function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    // Rutas públicas (no requieren autenticación)
    const publicPaths = ["/login", "/api/login", "/api/public"];
    if (publicPaths.some((path) => pathname.startsWith(path))) {
        return NextResponse.next();
    }

    // Obtener token de cookies
    const token = req.cookies.get("token")?.value;

    if (!token) {
        // Sin token → redirigir a login
        return NextResponse.redirect(new URL("/login", req.url));
    }

    try {
        // Verificar token
        jwt.verify(token, SECRET);
        // Token válido → continuar
        return NextResponse.next();
    } catch (err) {
        // Token inválido → eliminar cookie y redirigir
        const response = NextResponse.redirect(new URL("/login", req.url));
        response.cookies.delete({ name: "token", path: "/" }); // ✅ corrección
        return response;
    }
}

// Configuración: proteger todas las rutas /admin/*
export const config = {
    matcher: ["/admin/:path*"],
};
