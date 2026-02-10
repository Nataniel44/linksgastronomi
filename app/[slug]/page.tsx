import { RestaurantMenu } from "@/components/RestaurantMenu";
import { notFound } from "next/navigation";

export default async function RestaurantPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    try {
        const res = await fetch(`${baseUrl}/api/menu/${slug}`, {
            cache: "no-store",
        });

        if (!res.ok) {
            notFound();
        }

        const data = await res.json();
        return <RestaurantMenu slug={slug} initialData={data} />;
    } catch (error) {
        notFound();
    }
}
