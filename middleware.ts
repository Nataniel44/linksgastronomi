// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    // Rutas públicas
    const publicPaths = ["/", "/login", "/api/login", "/api/public"];
    if (publicPaths.some(path => pathname.startsWith(path))) return NextResponse.next();

    const token = req.cookies.get("token")?.value;
    const isRSC = req.nextUrl.searchParams.has("_rsc") || req.headers.get("rsc") === "1";

    if (!token && !isRSC) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
}
