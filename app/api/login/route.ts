// app/api/login/route.ts
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma"; // tu cliente Prisma
import bcrypt from "bcrypt";



export async function POST(req: Request) {
    const SECRET = process.env.JWT_SECRET!;

    try {
        const { email, password } = await req.json();
        console.log("Login attempt for:", email);

        if (!email || !password) {
            return NextResponse.json({ error: "Email y contraseña son obligatorios" }, { status: 400 });
        }

        // Buscar admin en DB
        const admin = await prisma.admin.findUnique({ where: { email } });
        if (!admin) return NextResponse.json({ error: "Credenciales inválidas" }, { status: 401 });



        const valid = await bcrypt.compare(password, admin.password);
        if (!valid) return NextResponse.json({ error: "Credenciales inválidas" }, { status: 401 });

        // Crear JWT
        const token = jwt.sign({ id: admin.id, email: admin.email, role: "admin" }, SECRET, {
            expiresIn: "1d",
        });

        // Guardar token en cookie
        const response = NextResponse.json({ success: true });

        // Antes de setear la nueva cookie, elimina cualquier cookie vieja:
        response.cookies.delete("token");
        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "development", // false en localhost
            path: "/",   // MUY importante que coincida con el middleware
            maxAge: 60 * 60 * 24, // 1 día
        });

        return response;
    } catch (err) {
        console.error("Login error:", err);
        return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
    }
}
