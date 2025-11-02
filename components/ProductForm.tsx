"use client";

import { useEffect, useState } from "react";

export default function ProductForm({ restaurantId }: { restaurantId: number }) {
    const [form, setForm] = useState({
        name: "",
        slug: "",
        description: "",
        price: "",
        image: "",
        categoryId: "",
        subcategoryId: "",
    });
    const [categories, setCategories] = useState<any[]>([]);
    const [subcategories, setSubcategories] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // 🔹 Cargar categorías
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch(`/api/admin/restaurants/${restaurantId}/categories`);
                const data = await res.json();
                setCategories(data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchCategories();
    }, [restaurantId]);

    // 🔹 Actualizar subcategorías al cambiar categoría
    useEffect(() => {
        const selectedCategory = categories.find((c) => c.id === Number(form.categoryId));
        setSubcategories(selectedCategory ? selectedCategory.subcategories : []);
        setForm((prev) => ({ ...prev, subcategoryId: "" }));
    }, [form.categoryId, categories]);

    // 🔹 Manejo de cambios de inputs
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // 🔹 Enviar producto
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/admin/products", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...form, restaurantId }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Error al crear producto");

            alert("✅ Producto creado correctamente");
            setForm({
                name: "",
                slug: "",
                description: "",
                price: "",
                image: "",
                categoryId: "",
                subcategoryId: "",
            });
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="p-4 border rounded-lg space-y-3 mt-6 bg-white shadow-sm"
        >
            <h3 className="font-semibold text-lg">Agregar Producto</h3>
            {error && <p className="text-red-500">{error}</p>}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                    name="name"
                    placeholder="Nombre del producto"
                    value={form.name}
                    onChange={handleChange}
                    className="border p-2 rounded"
                />
                <input
                    name="slug"
                    placeholder="Slug"
                    value={form.slug}
                    onChange={handleChange}
                    className="border p-2 rounded"
                />

                <textarea
                    name="description"
                    placeholder="Descripción"
                    value={form.description}
                    onChange={handleChange}
                    className="border p-2 rounded col-span-full"
                />

                <input
                    name="price"
                    placeholder="Precio"
                    type="number"
                    value={form.price}
                    onChange={handleChange}
                    className="border p-2 rounded"
                />
                <input
                    name="image"
                    placeholder="URL de imagen"
                    value={form.image}
                    onChange={handleChange}
                    className="border p-2 rounded"
                />

                <select
                    name="categoryId"
                    value={form.categoryId}
                    onChange={handleChange}
                    className="border p-2 rounded"
                >
                    <option value="">Seleccionar categoría</option>
                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                            {cat.name}
                        </option>
                    ))}
                </select>

                <select
                    name="subcategoryId"
                    value={form.subcategoryId}
                    onChange={handleChange}
                    className="border p-2 rounded"
                    disabled={!subcategories.length}
                >
                    <option value="">Sin subcategoría</option>
                    {subcategories.map((sub) => (
                        <option key={sub.id} value={sub.id}>
                            {sub.name}
                        </option>
                    ))}
                </select>
            </div>

            <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
            >
                {loading ? "Guardando..." : "Guardar Producto"}
            </button>
        </form>
    );
}
