import { RestaurantMenu } from "@/components/RestaurantMenu";

export default function Page({ params }: { params: any }) {
    return <RestaurantMenu slug={params?.slug} />;
}
