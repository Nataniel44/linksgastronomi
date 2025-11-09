import { RestaurantMenu } from "@/components/RestaurantMenu";

type Props = {
    params: { slug: string };
};

async function getMenuData(slug: string) {
    const baseUrl =
        process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    const res = await fetch(`${baseUrl}/api/menu/${slug}`, {
        cache: "no-store",
    });

    if (!res.ok) throw new Error("No se pudo cargar el menú");

    return res.json();
}

export default async function RestaurantPage({ params }: Props) {
    const { slug } = params;
    const data = await getMenuData(slug);

    return <RestaurantMenu slug={slug} initialData={data} />;
}
