// app/restaurants/[slug]/page.tsx
import { RestaurantMenu } from "@/components/RestaurantMenu";

async function getMenuData(slug: string) {
    const baseUrl =
        process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"; // ✅ fallback local

    const res = await fetch(`${baseUrl}/api/menu/${slug}`, {
        cache: "no-store", // 🔥 evita cache en el servidor
    });

    if (!res.ok) throw new Error("No se pudo cargar el menú");

    return res.json();
}

export default async function RestaurantPage({
    params,
}: {
    params: { slug: string };
}) {
    const data = await getMenuData(params.slug);

    return (
        <RestaurantMenu
            slug={params.slug}
            initialData={data} // ✅ datos cargados del server directamente
        />
    );
}
