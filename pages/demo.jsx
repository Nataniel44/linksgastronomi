import { useState } from "react";
import "./local.css";
import { ProductCarousel } from "@/app/components/ProductCarousel";
import { Header } from "@/app/components/Header";
import Modal from "@/app/components/Modal";
import Cart from "@/app/components/Cart";
import Footer from "@/app/components/Footer";

export default function Demo() {
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal para horarios
  const [isFormModalOpen, setIsFormModalOpen] = useState(false); // Modal para el formulario
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("comida_rapida");
  const [formData, setFormData] = useState({
    name: "",
    deliveryMethod: "delivery",
    paymentMethod: "efectivo",
    address: "",
    phone: "",
  });

  const products = [
    { name: "Hamburguesa", category: "comida_rapida", description: "Hamburguesa con queso y carne.", price: 8000, image: "/burger.png" },
    { name: "Pizza", category: "comida_rapida", description: "Pizza con ingredientes frescos.", price: 9000, image: "/burger.png" },
    { name: "Pasta", category: "comida_rapida", description: "Pasta con salsa de tomate.", price: 7500, image: "/burger.png" },
    { name: "Helado", category: "postres", description: "Helado artesanal de chocolate.", price: 4000, image: "/burger.png" },
  ];

  const categories = [
    { id: "comida_rapida", label: "Comida Rápida" },
    { id: "postres", label: "Postres" },
  ];

  const addToCart = (product) => {
    const existingProduct = cart.find((item) => item.name === product.name);
    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item.name === product.name
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (product) => setCart(cart.filter((item) => item !== product));
  const filteredProducts = products.filter((product) => product.category === selectedCategory);

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isFormValid = () => {
    const { name, phone, deliveryMethod, address } = formData;
    if (deliveryMethod === "delivery") {
      return name && phone && address;
    }
    return name && phone;
  };

  const handleOrder = () => {
    if (!isFormValid()) {
      alert("Por favor, completa todos los campos requeridos antes de enviar el pedido.");
      return;
    }

    const orderSummary = cart
      .map((item) => `${item.name} x ${item.quantity || 1} - $${item.price * (item.quantity || 1)}`)
      .join("\n");
    const message = `Pedido de ${formData.name}:\n${orderSummary}\n\n` +
      `Método de entrega: ${formData.deliveryMethod}\n` +
      `Método de pago: ${formData.paymentMethod}\n` +
      `Teléfono: ${formData.phone}\n` +
      `${formData.deliveryMethod === "delivery" ? `Dirección: ${formData.address}` : ""}`;

    window.open(`https://wa.me/521123456789?text=${encodeURIComponent(message)}`, "_blank");
    setIsFormModalOpen(false); // Cerrar modal después de enviar
  };
  const updateCart = (product, quantity) => {
    if (quantity === 0) {
      setCart(cart.filter((item) => item.name !== product.name));
    } else {
      setCart(
        cart.map((item) =>
          item.name === product.name ? { ...item, quantity } : item
        )
      );
    }
  };

  const clearCart = () => setCart([]);

  return (
    <div className="bg-white max-w-screen-md mx-auto">
      <Header openModal={() => setIsModalOpen(true)} />
      <Modal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)}>
        <h2 className="text-3xl font-semibold text-center mb-4 text-black">Horarios de Apertura y Cierre</h2>
        <table className="min-w-full table-auto border-collapse border border-gray-300 rounded-lg shadow-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Día</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Apertura</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Cierre</th>
            </tr>
          </thead>
          <tbody>
            {[
              { dia: "Lunes", apertura: "10:00 AM", cierre: "10:00 PM" },
              { dia: "Martes", apertura: "10:00 AM", cierre: "10:00 PM" },
              { dia: "Miércoles", apertura: "10:00 AM", cierre: "10:00 PM" },
              { dia: "Jueves", apertura: "10:00 AM", cierre: "10:00 PM" },
              { dia: "Viernes", apertura: "10:00 AM", cierre: "11:00 PM" },
              { dia: "Sábado", apertura: "10:00 AM", cierre: "11:00 PM" },
              { dia: "Domingo", apertura: "10:00 AM", cierre: "9:00 PM" },
            ].map((horario, index) => (
              <tr
                key={index}
                className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100 transition-colors duration-300`}
              >
                <td className="px-4 py-2 text-sm text-gray-800">{horario.dia}</td>
                <td className="px-4 py-2 text-sm text-gray-600">{horario.apertura}</td>
                <td className="px-4 py-2 text-sm text-gray-600">{horario.cierre}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Modal>
      <Modal isOpen={isFormModalOpen} closeModal={() => setIsFormModalOpen(false)}>
        <h2 className="text-xl font-bold mb-4">Detalles del Pedido</h2>
        <form className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Nombre"
            value={formData.name}
            onChange={handleFormChange}
            className="p-2 border"
          />
          <select
            name="deliveryMethod"
            value={formData.deliveryMethod}
            onChange={handleFormChange}
            className="p-2 border"
          >
            <option value="delivery">Delivery</option>
            <option value="retiro">Retiro en el lugar</option>
          </select>
          {formData.deliveryMethod === "delivery" && (
            <input
              type="text"
              name="address"
              placeholder="Dirección"
              value={formData.address}
              onChange={handleFormChange}
              className="p-2 border"
            />
          )}
          <select
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleFormChange}
            className="p-2 border"
          >
            <option value="efectivo">Efectivo</option>
            <option value="transferencia">Transferencia</option>
          </select>
          <input
            type="text"
            name="phone"
            placeholder="Teléfono"
            value={formData.phone}
            onChange={handleFormChange}
            className="p-2 border"
          />
          <button
            type="button"
            onClick={handleOrder}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Enviar Pedido
          </button>
        </form>
      </Modal>
      <main className="py-5 flex flex-col gap-5">
        <div className="flex gap-1 justify-center flex-wrap">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full ${selectedCategory === category.id ? "bg-yellow-400 text-white" : "bg-yellow-300 hover:bg-yellow-400"}`}
            >
              {category.label}
            </button>
          ))}
        </div>
        <ProductCarousel products={filteredProducts} addToCart={addToCart} />
        <Footer />
      </main>
      <Cart
        cartItems={cart}
        removeFromCart={removeFromCart}
        handleOrder={() => setIsFormModalOpen(true)} // Abrir modal al realizar pedido
        isFormValid={isFormValid}
        updateCart={updateCart} // Función para actualizar cantidades
        clearCart={clearCart}   // Función para vaciar el carrito
      />

    </div>
  );
}
