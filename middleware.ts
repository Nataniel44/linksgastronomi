import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET!;

export function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    // Rutas públicas
    const publicPaths = ["/login", "/api/login", "/api/public"];
    if (publicPaths.some(path => pathname.startsWith(path))) {
        return NextResponse.next();
    }

    // Chequear token
    const token = req.cookies.get("token")?.value;

    // Chequear si es RSC request
    const isRSC =
        req.nextUrl.searchParams.has("_rsc") || req.headers.get("rsc") === "1";

    if (!token) {
        if (isRSC) {
            // Permitir RSC aunque no haya token
            return NextResponse.next();
        }
        // Navegador normal sin token → login
        return NextResponse.redirect(new URL("/login", req.url));
    }

    try {
        jwt.verify(token, SECRET);
        return NextResponse.next();
    } catch (err) {
        const response = NextResponse.redirect(new URL("/login", req.url));
        response.cookies.delete({ name: "token", path: "/" });
        return response;
    }
}

export const config = {
    matcher: ["/admin/:path*"],
};
