"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditProductPage() {
    const params = useParams();
    const router = useRouter();
    const id = params?.id as string;

    const [form, setForm] = useState({
        name: "",
        slug: "",
        description: "",
        image: "",
        price: "",
        comparePrice: "",
        isActive: true,
        isAvailable: true,
        stock: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    // Obtener datos del producto
    useEffect(() => {
        if (!id) return;
        fetch(`/api/admin/products/${id}`)
            .then((res) => {
                if (!res.ok) throw new Error("Error al cargar el producto");
                return res.json();
            })
            .then((data) => setForm(data))
            .catch(() => setError("No se pudo cargar el producto."));
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type, checked } = e.target as HTMLInputElement;
        setForm({ ...form, [name]: type === "checkbox" ? checked : value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        setLoading(true);

        try {
            const res = await fetch(`/api/admin/products/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || "Error al guardar los cambios");
            }

            setSuccess("Cambios guardados correctamente ✅");
            setTimeout(() => router.back(), 1500);
        } catch (err: any) {
            setError(err.message || "Error desconocido al guardar.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-lg mx-auto mt-10">
            <h1 className="text-2xl font-bold mb-6">Editar producto</h1>

            {error && <p className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</p>}
            {success && <p className="bg-green-100 text-green-700 p-3 rounded mb-4">{success}</p>}

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
                    <label className="block mb-1 font-medium">Descripción</label>
                    <textarea
                        name="description"
                        value={form.description || ""}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Imagen (URL)</label>
                    <input
                        type="text"
                        name="image"
                        value={form.image}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block mb-1 font-medium">Precio</label>
                        <input
                            type="number"
                            name="price"
                            value={form.price}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Precio comparativo</label>
                        <input
                            type="number"
                            name="comparePrice"
                            value={form.comparePrice || ""}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                        />
                    </div>
                </div>

                <div>
                    <label className="block mb-1 font-medium">Stock</label>
                    <input
                        type="number"
                        name="stock"
                        value={form.stock || ""}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                    />
                </div>

                <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            name="isActive"
                            checked={form.isActive}
                            onChange={handleChange}
                        />
                        Activo
                    </label>

                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            name="isAvailable"
                            checked={form.isAvailable}
                            onChange={handleChange}
                        />
                        Disponible
                    </label>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                >
                    {loading ? "Guardando..." : "Guardar cambios"}
                </button>
            </form>
        </div>
    );
}
