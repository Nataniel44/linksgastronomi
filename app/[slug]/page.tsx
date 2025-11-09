import { RestaurantMenu } from "@/components/RestaurantMenu";

export default async function RestaurantPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    const baseUrl =

        process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

        
    const res = await fetch(`${baseUrl}/api/menu/${slug}`, {
        cache: "no-store",
    });

    if (!res.ok) throw new Error("No se pudo cargar el menú");

    const data = await res.json();

    return <RestaurantMenu slug={slug} initialData={data} />;
}
