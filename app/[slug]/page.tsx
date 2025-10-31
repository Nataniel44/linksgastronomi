import { RestaurantMenu } from "@/components/RestaurantMenu";

export default function Page({ params }: { params: { slug: string } }) {
    return <RestaurantMenu slug={params.slug} />;
}
