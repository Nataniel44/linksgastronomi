// app/api/me/route.ts
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req: NextRequest) {
    try {
        const token = req.cookies.get("token")?.value;
        if (!token) return NextResponse.json({ loggedIn: false });

        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        return NextResponse.json({ loggedIn: true, user: decoded });
    } catch {
        return NextResponse.json({ loggedIn: false });
    }
}
