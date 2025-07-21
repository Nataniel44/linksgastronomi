"use client"
import { useState, useRef, useEffect } from "react";
import { ProductCarousel } from "@/app/components/ProductCarousel";
import { Header } from "@/app/components/Header";
import { Modal } from "@/app/components/Modal";
import Cart from "@/app/components/Cart";
import Image from 'next/image'
import "./local.css"; // Asegúrate de que este archivo exista y tenga los estilos necesarios
export default function Demo() {
 const handleLocation = async () => {
  if (!navigator.geolocation) {
    alert("La geolocalización no está disponible en tu navegador.");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const { latitude, longitude } = position.coords;

      // Llamada a Nominatim (OpenStreetMap)
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
        );
        const data = await response.json();
        const address = data.display_name;

        handleFormChange({ target: { name: 'address', value: address } });
      } catch (error) {
        console.error("Error al obtener dirección:", error);
        alert("No se pudo obtener la dirección.");
      }
    },
    (error) => {
      console.error(error);
      alert("No se pudo acceder a tu ubicación.");
    }
  );
};

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal para horarios
  const [isFormModalOpen, setIsFormModalOpen] = useState(false); // Modal para el formulario
  const [isProductModalOpen, setIsProductModalOpen] = useState(false); // Modal para detalles del producto
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [showNotification, setShowNotification] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState("burgers");
  const [formData, setFormData] = useState({
    name: "",
    deliveryMethod: "delivery",
    paymentMethod: "efectivo",
    address: "",
    phone: "",
  });
  const totalPrice = cart.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);
  const products = [
    { name: "Hamburguesa cheese", category: "burgers", description: "Hamburguesa con queso cheddar, carne y aderezos.", price: 3000, image: "./cheese.jpeg" },
    { name: "Hamburguesa classic", category: "burgers", description: "Hamburguesa con queso barra, carne, huevo, lechuga, tómate y aderezos.", price: 4000, image: "./class.jpeg" },
    { name: "Hamburguesa top one", category: "burgers", description: "Hamburguesa con queso cheddar, cebolla caramelizada, huevo, lechuga, tómate y aderezos.", price: 4500, image: "./topone.jpeg" },
    { name: "Hamburguesa argenta", category: "burgers", description: "Hamburguesa con queso provoleta, huevo, salsa criolla, chimichurri y aderezos.", price: 4500, image: "./argen.jpeg" },
    { name: "Hamburguesa hulk", category: "burgers", description: "Hamburguesa con queso cheddar x2, carne x2, huevo x2, cebolla caramelizada x2 y salsa BBQ.", price: 5500, image: "./hulk.jpeg" },
    { name: "Papas fritas con cheddar", category: "snacks", description: "Papas fritas chips, salsa de queso cheddar, cebollita de verdeo, cebolla morada.", price: 3500, image: "./papas.jpeg" },
  ];


  const categories = [
    { id: "burgers", label: "Burgers🍔" },
    { id: "snacks", label: "Snacks🍟" },

  ];
  const [notification, setNotification] = useState("");

  useEffect(() => {
    if (isFormModalOpen && totalPrice === 0) {
      setIsFormModalOpen(false);
    }
  }, [totalPrice, isFormModalOpen]);

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
    setNotification(`¡${product.name} añadido al carrito!`);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000); // Ocultar después de 3 segundos
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
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen); // Abrir o cerrar el carrito
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

    window.open(`https://wa.m55246464?text=${encodeURIComponent(message)}`, "_blank");
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
  const handleViewMore = (product) => {
    setSelectedProduct(product);
    setIsProductModalOpen(true);
  };
  const clearCart = () => setCart([]);
  const phoneRef = useRef(null);

    return (
      <>
      <div className="bg-white max-w-screen-md w-full mx-auto relative sm:rounded-lg sm:shadow-lg">

      {/* Notificación elegante */}
      <div
      className={`fixed max-w-screen-md left-1/2 -translate-x-1/2 top-4 px-4 sm:px-6 py-2 sm:py-3 z-50 rounded-xl shadow-lg transition-all duration-500 ease-in-out flex flex-col text-center md:flex-row items-center gap-2 sm:gap-3
        ${showNotification ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}
        bg-gradient-to-r from-green-400 to-green-500 text-white`}
      style={{ minWidth: 220, maxWidth: 400 }}
      >
      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white/90" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
      </svg>
      <span className="flex-1 text-xs sm:text-base">{notification}</span>
      <button
        onClick={toggleCart}
        className="ml-2 px-2 sm:px-3 py-1 rounded-full bg-white/20 hover:bg-white/40 text-white font-semibold text-xs shadow transition"
      >
        Ver carrito
      </button>
      </div>

      {/* Modal de horarios */}
      <Modal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)}>
      <div className="p-3 sm:p-6 bg-white rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-xl sm:text-2xl font-bold text-center mb-4 sm:mb-6 text-yellow-400 leading-snug">
        Horarios de Apertura y Cierre
        </h2>
        <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse rounded-lg overflow-hidden text-xs sm:text-base">
        <thead className="bg-yellow-100 text-yellow-700">
        <tr>
          <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold">Día</th>
          <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold">Apertura</th>
          <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold">Cierre</th>
        </tr>
        </thead>
        <tbody>
        {[
          { dia: "Viernes", apertura: "20:00 PM", cierre: "23:00 PM" },
          { dia: "Sábado", apertura: "20:00 PM", cierre: "23:00 PM" },
          { dia: "Domingo", apertura: "20:00 PM", cierre: "23:00 PM" },
        ].map((horario, index) => (
          <tr
          key={index}
          className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-yellow-50 transition-colors duration-200`}
          >
          <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-700">{horario.dia}</td>
          <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-600">{horario.apertura}</td>
          <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-600">{horario.cierre}</td>
          </tr>
        ))}
        </tbody>
        </table>
        </div>
      </div>
      </Modal>

      {/* Modal de formulario */}
      <Modal isOpen={isFormModalOpen} closeModal={() => setIsFormModalOpen(false)}>
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40 px-2">
        <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl flex flex-col min-h-[90vh] max-h-[95vh] animate-fade-in overflow-hidden border border-gray-100">
        <div className="flex items-center justify-between px-4 sm:px-6 pt-4 sm:pt-6 pb-2 border-b border-gray-100 bg-white/95 sticky top-0 z-10">
        <h2 className="text-xl sm:text-3xl font-extrabold text-gray-800 text-center flex-1">
        Detalles del Pedido
        </h2>
        <button
        onClick={() => setIsFormModalOpen(false)}
        className="ml-2 sm:ml-4 text-gray-400 hover:text-gray-700 text-2xl sm:text-3xl font-bold bg-gray-100 rounded-full w-8 sm:w-10 h-8 sm:h-10 flex items-center justify-center shadow focus:outline-none focus:ring-2 focus:ring-yellow-200"
        aria-label="Cerrar"
        >
        X
        </button>
        </div>
        <div className="relative flex-1 flex flex-col min-h-0">
        <form className="flex-1 flex flex-col gap-4 sm:gap-5 text-black overflow-y-auto px-4 sm:px-6 pb-6 sm:pb-8 pt-2 sm:pt-4 min-h-0" style={{ maxHeight: '100%' }}>
          <div className="flex flex-col gap-1">

       
            <label className="text-sm font-semibold text-gray-700 mb-1">Método de entrega</label>
                <div className="flex gap-3">
                  
                  
  <button
    type="button"
    onClick={() => handleFormChange({ target: { name: 'deliveryMethod', value: 'delivery' } })}
    className={`flex-1 py-3 rounded-full font-bold transition-all text-sm sm:text-base
      ${formData.deliveryMethod === 'delivery'
        ? 'bg-yellow-500 text-white shadow-lg'
        : 'bg-white border border-yellow-400 text-yellow-600 hover:bg-yellow-50'}`}
  >
    Delivery
  </button>
  <button
    type="button"
    onClick={() => handleFormChange({ target: { name: 'deliveryMethod', value: 'retiro' } })}
    className={`flex-1 py-3 rounded-full font-bold transition-all text-sm sm:text-base
      ${formData.deliveryMethod === 'retiro'
        ? 'bg-yellow-500 text-white shadow-lg'
        : 'bg-white border border-yellow-400 text-yellow-600 hover:bg-yellow-50'}`}
  >
    Retiro en el lugar
  </button>
</div>   </div>
        <div className="relative ">
          <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleFormChange}
          placeholder="Nombre y Apellido"
          className="peer w-full p-3 sm:p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none text-base sm:text-lg bg-gray-50"
          required
          />
          <label className="absolute left-4 top-0 text-gray-500 text-xs transition-all peer-focus:top-0 peer-focus:text-xs peer-focus:text-yellow-500">
          Nombre
          </label>
        </div>


    {formData.deliveryMethod === "delivery" && (
  <div className="relative">
    <input
      type="text"
      name="address"
      value={formData.address}
      onChange={handleFormChange}
      placeholder="Dirección (entre calles)"
      className="peer w-full p-3 sm:p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none text-base sm:text-lg bg-gray-50"
    />
    <label className="absolute left-4 top-0 text-gray-500 text-xs transition-all peer-focus:top-0 peer-focus:text-xs peer-focus:text-yellow-500">
      Dirección
    </label>
    <button
      type="button"
      onClick={handleLocation}
      className="absolute right-3 top-3 text-xs sm:text-sm text-yellow-600 underline hover:text-yellow-700"
    >
      Usar mi ubicación
    </button>
  </div>
)}

      <div className="flex flex-col gap-1">
  <label className="text-sm font-semibold text-gray-700 mb-1">Método de Pago</label>
  <div className="flex gap-3">
    <button
      type="button"
      onClick={() => handleFormChange({ target: { name: 'paymentMethod', value: 'efectivo' } })}
      className={`flex-1 py-3 rounded-full font-bold transition-all text-sm sm:text-base ${
        formData.paymentMethod === 'efectivo'
          ? 'bg-yellow-500 text-white shadow-lg'
          : 'bg-white border border-yellow-400 text-yellow-600 hover:bg-yellow-50'
      }`}
    >
      Efectivo
    </button>
    <button
      type="button"
      onClick={() => handleFormChange({ target: { name: 'paymentMethod', value: 'transferencia' } })}
      className={`flex-1 py-3 rounded-full font-bold transition-all text-sm sm:text-base ${
        formData.paymentMethod === 'transferencia'
          ? 'bg-yellow-500 text-white shadow-lg'
          : 'bg-white border border-yellow-400 text-yellow-600 hover:bg-yellow-50'
      }`}
    >
      Transferencia
    </button>
  </div>
</div>

        {formData.paymentMethod === "transferencia" && (
          <div className="flex items-center bg-gray-50 rounded-lg p-2 sm:p-3 border border-gray-200">
          <span className="text-xs sm:text-sm text-gray-600">
          ⓘ La información de la cuenta bancaria se enviará por mensaje.
          </span>
          </div>
        )}
        <div className="relative">
          <input
          ref={phoneRef}
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleFormChange}
          placeholder="Teléfono"
          className="peer w-full p-3 sm:p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none text-base sm:text-lg bg-gray-50"
          />
          <label className="absolute left-4 top-0 text-gray-500 text-xs transition-all peer-focus:top-0 peer-focus:text-xs peer-focus:text-yellow-500">
          Teléfono
          </label>
        </div>
        
        <div className="flex flex-col md:flex-row gap-3 sm:gap-4 mt-2">
          <button
          type="button"
          onClick={handleOrder}
          className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 sm:py-3 rounded-full shadow-lg text-base sm:text-lg transition-all border-0 focus:outline-none focus:ring-2 focus:ring-yellow-200"
          >
          Confirmar Pedido
          </button>
          <button
          type="button"
          onClick={toggleCart}
          className="flex-1 bg-white border border-yellow-400 text-yellow-600 font-bold py-2 sm:py-3 rounded-full shadow text-base sm:text-lg hover:bg-yellow-50 transition-all focus:outline-none focus:ring-2 focus:ring-yellow-200"
          >
          Ver Carrito
          </button>
        </div>
        <div className="text-center mt-2 sm:mt-4">
          <p className="text-base sm:text-lg text-gray-800">
          Total: <span className="text-yellow-600 font-bold">
          {new Intl.NumberFormat("es-AR", {
          style: "currency",
          currency: "ARS",
          }).format(totalPrice)}
          </span>
          </p>
          <p className="text-xs sm:text-sm text-gray-500 mt-2">
          ⓘ Su pedido será enviado por WhatsApp
          </p>
        </div>
        </form>
        <div className="pointer-events-none absolute bottom-0 left-0 w-full h-10 bg-gradient-to-t from-white to-transparent" />
        </div>
        </div>
      </div>
      </Modal>

      <Header openmodal={() => setIsModalOpen(true)} />
      <main id="pedidos" className="flex flex-col gap-4 sm:gap-5 h-full pt-6 sm:pt-10 mb-20 px-3">
      <div className="flex flex-col gap-3 sm:gap-5">
        <div className="flex flex-col">
        <span className="text-center text-black font-bold text-lg sm:text-xl uppercase">categorías</span>
        <span className="text-center text-black font-base text-xs sm:text-sm">Seleccione su categoria favorita.</span>
        </div>
        <div className="relative">
        <div className="flex overflow-x-auto scroll-smooth scrollbar-hide gap-2 sm:gap-4 px-2 sm:px-5">
        {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => setSelectedCategory(category.id)}
          className={`px-3 sm:px-4 py-2 rounded-full whitespace-nowrap border-2 transition-all duration-300  ${selectedCategory === category.id
          ? "bg-yellow-300 text-black border-yellow-400 shadow-lg"
          : "bg-white text-gray-600 border-gray-400 hover:border-yellow-300 hover:bg-yellow-100"
          }`}
        >
          {category.label}
        </button>
        ))}
        </div>
        <div className="absolute top-0 bottom-0 left-0 w-6 sm:w-10 bg-gradient-to-r from-white pointer-events-none"></div>
        <div className="absolute top-0 bottom-0 right-0 w-6 sm:w-10 bg-gradient-to-l from-white pointer-events-none"></div>
        </div>
      </div>
      <h4 className="text-center px-2 sm:px-4 text-yellow-400 font-bold text-xl sm:text-2xl uppercase">productos</h4>

      <Modal isOpen={isProductModalOpen} closeModal={() => setIsProductModalOpen(false)}>
        {selectedProduct && (
        <div className="flex flex-col items-center gap-4 p-6 bg-white rounded-2xl shadow-2xl w-full max-w-md animate-fade-in border border-yellow-100 relative">
          {/* Botón de cerrar */}
          <button
            onClick={() => setIsProductModalOpen(false)}
            className="absolute top-3 right-3 text-gray-400 hover:text-yellow-500 bg-gray-100 hover:bg-yellow-100 rounded-full w-9 h-9 flex items-center justify-center shadow focus:outline-none focus:ring-2 focus:ring-yellow-200 z-10 transition"
            aria-label="Cerrar"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <Image
            width="192"
            height="192"
            src={selectedProduct.image}
            alt={selectedProduct.name}
            className="w-36 h-36 sm:w-48 sm:h-48 object-cover rounded-xl shadow-lg border-4 border-yellow-100 mb-2"
          />
          <div className="flex flex-col gap-3 text-black w-full">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-yellow-500 uppercase text-center drop-shadow-sm tracking-wide">
              {selectedProduct.name}
            </h2>
            <p className="text-xs sm:text-base text-gray-700 text-start bg-yellow-50 rounded-xl p-3 sm:p-5 shadow-inner border border-yellow-100">
              {selectedProduct.description}
            </p>
            <div className="flex flex-col items-end gap-3 w-full mt-2">
              <p className="text-lg sm:text-xl font-bold text-gray-800 flex items-center gap-2">
                <span className="text-yellow-500 text-xl sm:text-2xl">${selectedProduct.price}</span>
                <span className="text-xs sm:text-sm text-gray-500 font-normal">ARS</span>
              </p>
              <button
                onClick={() => addToCart(selectedProduct)}
                className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-6 py-2 rounded-full font-bold shadow-lg text-base sm:text-lg hover:scale-105 hover:from-yellow-500 hover:to-yellow-400 transition-all border-2 border-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-200"
              >
                <svg className="inline-block w-5 h-5 mr-2 -mt-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4" />
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                </svg>
                Agregar al carrito
              </button>
            </div>
          </div>
        </div>
        )}
      </Modal>

      <div className="flex flex-col gap-2 min-h-36 w-full sm:w-11/12 mx-auto">
        {filteredProducts.map((product, index) => (
        <div
        key={index}
        className="grid grid-cols-[1fr,auto] items-center border p-2 rounded bg-gray-50 hover:bg-gray-100 gap-2 sm:gap-4"
        >
        <div>
        <h3 className="text-sm sm:text-md text-black font-normal uppercase leading-tight">
          {product.name}
        </h3>
        <p className="text-xs sm:text-sm text-gray-600">Precio: ${product.price}</p>
        </div>
        <div className="flex gap-1 sm:gap-2">
        <button
          onClick={() => addToCart(product)}
          className="bg-green-400 text-white px-2 py-1 rounded hover:bg-green-500 text-xs sm:text-sm"
        >
          Agregar
        </button>
        <button
          onClick={() => handleViewMore(product)}
          className="bg-blue-400 text-white px-2 py-1 rounded hover:bg-blue-500 text-xs sm:text-sm"
        >
          Ver Más
        </button>
        </div>
        </div>
        ))}
      </div>

      <h4 className="text-center px-2 sm:px-4 text-xl sm:text-2xl font-bold text-yellow-400 uppercase mt-2 sm:mt-3">DESCUBRE NUESTROS PRODUCTOS</h4>
      <ProductCarousel products={products} addToCart={addToCart} />
      </main>

      <Cart
      cartItems={cart}
      removeFromCart={removeFromCart}
      handleOrder={() => setIsFormModalOpen(true)}
      isFormValid={isFormValid}
      updateCart={updateCart}
      clearCart={clearCart}
      isOpen={isCartOpen}
      toggleCart={toggleCart}
      />

      {/* Botón flotante elegante para abrir el carrito */}
      <div className="fixed bottom-0 right-0 z-50 p-4 sm:p-6">

    <button
  onClick={() => setIsCartOpen(true)}
  className="relative bg-white border-2 border-yellow-400 text-black hover:bg-yellow-300/80 rounded-full shadow-xl hover:shadow-2xl hover:-translate-y-1 w-14 h-14 sm:w-16 sm:h-16 flex flex-col items-center justify-center text-xl sm:text-2xl font-extrabold transition-all duration-300 group"
  aria-label="Abrir carrito"
>
  <svg
    className="w-6 h-6 sm:w-7 sm:h-7 mb-1 text-yellow-500 transform transition-transform duration-300 ease-in-out group-hover:scale-125"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path
      d="M3 3h2l.4 2M7 13h10l4-8H5.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
  </svg>

  {cart.length > 0 && (
    <span className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full px-2 py-1 text-xs font-bold shadow">
      {cart.length}
    </span>
  )}
</button>

      </div>
      </div>
      </>
    );
}
