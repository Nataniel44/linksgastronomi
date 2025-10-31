import { RestaurantMenu } from "@/components/RestaurantMenu";

export default async function Page({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    return <RestaurantMenu slug={slug} />;
}
