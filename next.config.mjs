/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export", // Genera archivos estáticos en out/
    images: {
        unoptimized: true, // Evita problemas con imágenes optimizadas
    },
    distDir: "out",// Fuerza a que use "out" en lugar de ".next" (opcional)

};

export default nextConfig;
