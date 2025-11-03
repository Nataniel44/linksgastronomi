// lib/auth.ts - Helpers de autenticación
import { NextRequest } from "next/server";
import { jwtVerify, SignJWT } from "jose";

const JWT_SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET || "tu-secreto-super-seguro-cambiar-en-produccion"
);

export type TokenPayload = {
    userId: number;
    email: string;
    role: "admin" | "restaurant";
};

// Crear token JWT
export async function createToken(payload: TokenPayload): Promise<string> {
    const token = await new SignJWT(payload as any)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("7d") // Token válido por 7 días
        .sign(JWT_SECRET);

    return token;
}

// Verificar y decodificar token
export async function verifyToken(token: string): Promise<TokenPayload | null> {
    try {
        const { payload } = await jwtVerify(token, JWT_SECRET);
        return payload as TokenPayload;
    } catch (error) {
        console.error("Error verificando token:", error);
        return null;
    }
}

// Obtener usuario desde request
export async function getUserFromRequest(req: NextRequest): Promise<TokenPayload | null> {
    const token = req.cookies.get("token")?.value;

    if (!token) {
        return null;
    }

    return verifyToken(token);
}

// Middleware helper para proteger rutas de API
export async function requireAuth(req: NextRequest): Promise<TokenPayload> {
    const user = await getUserFromRequest(req);

    if (!user) {
        throw new Error("No autorizado");
    }

    return user;
}

// =============================================
// .env.local - Variables de entorno necesarias
// =============================================
/*
# JWT Secret (cambiar en producción)
JWT_SECRET=tu_secreto_super_seguro_minimo_32_caracteres_aleatorios


# Cron Job Secret (para proteger endpoints de cron)
CRON_SECRET=otro_secreto_aleatorio_para_cron_jobs
*/

// =============================================
// Ejemplo de uso en API Routes
// =============================================

