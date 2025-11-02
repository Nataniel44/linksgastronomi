"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ProductForm from "@/components/ProductForm";
import ProductList from "@/components/ProductList";

export default function EditRestaurantPage() {
    const params = useParams();
    const router = useRouter();


    const id = params?.id as string | undefined;

    const [form, setForm] = useState({
        name: "",
        slug: "",
        address: "",
        phone: "",
        logo: "",
        banner: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    useEffect(() => {
        fetch(`/api/admin/restaurants/${id}`)
            .then((res) => {
                if (!res.ok) throw new Error("Error al cargar restaurante");
                return res.json();
            })
            .then((data) => setForm(data))
            .catch(() => setError("No se pudo cargar el restaurante."));
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        setLoading(true);

        try {
            const res = await fetch(`/api/admin/restaurants/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || "Error al guardar los cambios");
            }

            setSuccess("Cambios guardados correctamente ✅");
            setTimeout(() => router.push("/admin/restaurants"), 1500);
        } catch (err: any) {
            setError(err.message || "Error desconocido al guardar.");
        } finally {
            setLoading(false);
        }
    };
    if (!params || !params.id) {
        return <p className="text-center mt-10 text-gray-500">Cargando...</p>;
    }

    return (
        <div className="max-w-lg mx-auto mt-10">
            <h1 className="text-2xl font-bold mb-6">Editar Restaurante</h1>

            {error && (
                <p className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">{error}</p>
            )}
            {success && (
                <p className="bg-green-100 text-green-700 p-3 rounded mb-4 text-sm">
                    {success}
                </p>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1 font-medium">Nombre</label>
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                        required
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Slug</label>
                    <input
                        type="text"
                        name="slug"
                        value={form.slug}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                        required
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Dirección</label>
                    <input
                        type="text"
                        name="address"
                        value={form.address}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Teléfono</label>
                    <input
                        type="text"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Logo (URL)</label>
                    <input
                        type="text"
                        name="logo"
                        value={form.logo}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Banner (URL)</label>
                    <input
                        type="text"
                        name="banner"
                        value={form.banner}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                    />
                </div>


                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                >
                    {loading ? "Guardando..." : "Guardar cambios"}
                </button>
            </form>    <ProductForm restaurantId={Number(id)} />

            <hr className="my-8" />
            <h2 className="text-xl font-semibold mb-4">Productos del restaurante</h2>

            <ProductList restaurantId={Number(id)} />

        </div>
    );
}
