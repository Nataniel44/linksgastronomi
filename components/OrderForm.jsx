import { useState } from "react";

export default function OrderForm() {
  const [form, setForm] = useState({
    email: "",
    name: "",
    phone: "",
    address: "",
    floor: "",
    comments: "",
    payment: "efectivo",
  });

  return (
    <form className="bg-white rounded-xl shadow p-4 w-full max-w-2xl mx-auto grid gap-6">
      {/* Datos generales */}
      <div className="">
        <h3 className="font-bold text-lg mb-2">Datos generales</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Correo electrónico</label>
            <input
              type="email"
              className="w-full border rounded px-3 py-2 mt-1"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              placeholder="ejemplo@gmail.com"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Nombre y apellido *</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2 mt-1"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              required
              placeholder="Tu nombre"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Número de teléfono</label>
            <input
              type="tel"
              className="w-full border rounded px-3 py-2 mt-1"
              value={form.phone}
              onChange={e => setForm({ ...form, phone: e.target.value })}
              placeholder="Ej: 011-15-2345-6789"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="text-sm font-medium">Calle y número</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2 mt-1"
              value={form.address}
              onChange={e => setForm({ ...form, address: e.target.value })}
              placeholder="Av. Argentina 1234"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Piso y departamento</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2 mt-1"
              value={form.floor}
              onChange={e => setForm({ ...form, floor: e.target.value })}
              placeholder="Por ejemplo: 1B"
            />
          </div>
        </div>
        <div className="mt-4">
          <label className="text-sm font-medium">Comentarios</label>
          <textarea
            className="w-full border rounded px-3 py-2 mt-1"
            value={form.comments}
            onChange={e => setForm({ ...form, comments: e.target.value })}
            placeholder="Comentarios adicionales"
            rows={2}
          />
        </div>
      </div>
      {/* Forma de pago */}
      <div>
        <h3 className="font-bold text-lg mb-2">Forma de pago</h3>
        <div className="flex flex-wrap gap-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="payment"
              value="efectivo"
              checked={form.payment === "efectivo"}
              onChange={e => setForm({ ...form, payment: e.target.value })}
            />
            Efectivo
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="payment"
              value="qr"
              checked={form.payment === "qr"}
              onChange={e => setForm({ ...form, payment: e.target.value })}
            />
            Código QR
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="payment"
              value="mercadopago"
              checked={form.payment === "mercadopago"}
              onChange={e => setForm({ ...form, payment: e.target.value })}
            />
            Mercado Pago
          </label>
        </div>
      </div>
      {/* Botones */}
      <div className="flex justify-between mt-4">
        <button type="button" className="border border-[#D58A17] text-[#D58A17] px-4 py-2 rounded font-semibold">
          Atrás
        </button>
        <button type="submit" className="bg-[#D58A17] text-white px-4 py-2 rounded font-semibold">
          Confirmar pedido
        </button>
      </div>
    </form>
  );
}
