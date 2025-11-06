import { RestaurantMenu } from "@/components/RestaurantMenu";
import type { Metadata, ResolvingMetadata } from "next";

type Props = {
    params: Promise<{ slug: string }>; // ✅ ahora concuerda con Next.js 15
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
    const { slug } = await params; // ✅ se espera como promesa
    const data = await getMenuData(slug);

    return <RestaurantMenu slug={slug} initialData={data} />;
}
