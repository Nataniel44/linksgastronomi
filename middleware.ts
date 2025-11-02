import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    // Permitir assets JS/CSS y RSC requests
    if (
        pathname.startsWith("/_next") ||
        pathname.startsWith("/favicon.ico") ||
        req.nextUrl.searchParams.has("_rsc") ||
        req.headers.get("rsc") === "1"
    ) {
        return NextResponse.next();
    }

    // Rutas públicas
    const publicPaths = ["/login", "/api/login", "/api/public"];
    if (publicPaths.some(path => pathname.startsWith(path))) {
        return NextResponse.next();
    }

    // Token desde cookies
    const token = req.cookies.get("token")?.value;

    if (!token) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
}

// Proteger solo /admin/*
export const config = {
    matcher: ["/admin/:path*"],
};
