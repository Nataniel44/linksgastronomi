// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET!;

// Middleware principal
export function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    // Rutas públicas que no necesitan autenticación
    const publicPaths = ["/login", "/api/public"];
    if (publicPaths.some(path => pathname.startsWith(path))) {
        return NextResponse.next();
    }

    // 1️⃣ Obtener token de cookies
    // ⚠️ Traefik puede pasar cookies con domain, así que nos aseguramos de usar `.get("token")`
    const token = req.cookies.get("token")?.value;

    if (!token) {
        // Sin token → redirigir a login
        const loginUrl = new URL("/login", req.url);
        const res = NextResponse.redirect(loginUrl);
        res.cookies.delete({ name: "token", path: "/" });
        return res;
    }

    try {
        // 2️⃣ Verificar token JWT
        jwt.verify(token, SECRET);

        // Token válido → continuar
        return NextResponse.next();
    } catch (err) {
        // Token inválido → eliminar cookie y redirigir
        const loginUrl = new URL("/login", req.url);
        const res = NextResponse.redirect(loginUrl);
        res.cookies.delete({ name: "token", path: "/" });
        return res;
    }
}

// 3️⃣ Configuración de rutas protegidas
export const config = {
    matcher: ["/admin/:path*"], // protege todo /admin/*
};
