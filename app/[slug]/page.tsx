// app/restaurants/[slug]/page.tsx
import { RestaurantMenu } from "@/components/RestaurantMenu";

async function getMenuData(slug: string) {
    const res = await fetch(`http://localhost:3000/api/menu/${slug}`, {
        cache: "no-store", // 🔥 evita que se quede cacheado
    });

    if (!res.ok) throw new Error("No se pudo cargar el menú");

    return res.json();
}

export default async function RestaurantPage({ params }: { params: { slug: string } }) {
    const data = await getMenuData(params.slug);

    return (
        <RestaurantMenu
            slug={params.slug}
            // 🔥 pasás los datos directamente, sin fetch en cliente
            initialData={data}
        />
    );
}
