// hash-admin-passwords.ts
import { PrismaClient } from '@prisma/client'  // ← Ahora es desde @prisma/client
const prisma = new PrismaClient();
import bcrypt from "bcrypt";

async function main() {
    const admins = await prisma.admin.findMany();
    console.log(`Se encontraron ${admins.length} admins.`);

    for (const admin of admins) {
        // Si la contraseña ya parece un hash (opcional)
        if (admin.password.startsWith("$2")) {
            console.log(`El admin ${admin.email} ya tiene hash. Omitiendo...`);
            continue;
        }

        const hashed = await bcrypt.hash(admin.password, 10);
        await prisma.admin.update({
            where: { id: admin.id },
            data: { password: hashed },
        });

        console.log(`Contraseña del admin ${admin.email} hasheada correctamente.`);
    }

    console.log("Proceso terminado.");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(() => prisma.$disconnect());
