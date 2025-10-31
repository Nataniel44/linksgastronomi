import { getServiceBySlug, getAllServices } from "@/lib/services";
import ServiceClient from "@/components/ServiceClient";
import NotFoundService from "@/components/NotFoundService";

export async function generateStaticParams() {
    const services = await getAllServices();
    return services.map((s) => ({ slug: s.slug }));
}

export default async function ServicePage({ params }: { params: { slug: string } }) {
    const service = await getServiceBySlug(params.slug);

    if (!service) {
        return <NotFoundService />;
    }

    return (
        <>
            <div className="min-h-screen   py-16">
                <ServiceClient service={service} />
            </div>
        </>
    );
}
