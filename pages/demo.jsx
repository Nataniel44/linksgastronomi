import { useState, useRef, useEffect } from "react";

import "./local.css";
import { ProductCarousel } from "@/app/components/ProductCarousel";
import { Header } from "@/app/components/Header";
import { Modal } from "@/app/components/Modal";
import Cart from "@/app/components/Cart";
import Footer from "@/app/components/Footer";

export default function Demo() {


  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal para horarios
  const [isFormModalOpen, setIsFormModalOpen] = useState(false); // Modal para el formulario
  const [isProductModalOpen, setIsProductModalOpen] = useState(false); // Modal para detalles del producto
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("comida_rapida");
  const [formData, setFormData] = useState({
    name: "",
    deliveryMethod: "delivery",
    paymentMethod: "efectivo",
    address: "",
    phone: "",
  });
  const totalPrice = cart.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);
  const products = [
    { name: "Hamburguesa", category: "comida_rapida", description: "Hamburguesa con queso y carne.", price: 8000, image: "./hamburgesa.jpg" },
    { name: "Pizza", category: "comida_rapida", description: "Pizza con ingredientes frescos.", price: 9000, image: "./pizza.png" },
    { name: "Empanadas", category: "comida_rapida", description: "Empanadas de carne picada cuchillo", price: 7500, image: "./empanadas.webp" },
    { name: "Helado", category: "postres", description: "Helado artesanal de chocolate.", price: 4000, image: "./helado.jpg" },
    { name: "Tacos", category: "comida_mexicana", description: "Tacos de pollo con salsa especial.", price: 6500, image: "./tacos.jpg" },
    { name: "Ensalada César", category: "saludables", description: "Ensalada César con pollo y aderezo especial.", price: 7000, image: "./ensalada_cesar.jpg" },
    { name: "Sushi", category: "japonesa", description: "Sushi de salmón fresco.", price: 15000, image: "./sushi.jpg" },
    { name: "Brownie", category: "postres", description: "Brownie de chocolate con nueces.", price: 4500, image: "./brownie.jpg" },
    { name: "Pollo Asado", category: "parrilla", description: "Pollo asado a la parrilla con especias.", price: 12000, image: "./pollo_asado.jpg" },
    { name: "Arepas", category: "comida_latina", description: "Arepas rellenas de queso y carne mechada.", price: 5000, image: "./arepas.jpg" },
    { name: "Café Latte", category: "bebidas", description: "Café con leche y espuma cremosa.", price: 3000, image: "./cafe_latte.jpg" },
    { name: "Limonada", category: "bebidas", description: "Limonada fresca con hierbabuena.", price: 2500, image: "./limonada.jpg" },
    { name: "Tarta de Manzana", category: "postres", description: "Tarta de manzana con un toque de canela.", price: 5000, image: "./tarta_manzana.jpg" },
    { name: "Ceviche", category: "mariscos", description: "Ceviche de pescado con limón y cilantro.", price: 11000, image: "./ceviche.jpg" },
    { name: "Costillas BBQ", category: "parrilla", description: "Costillas de cerdo con salsa BBQ.", price: 18000, image: "./costillas_bbq.jpg" },
  ];


  const categories = [
    { id: "comida_rapida", label: "Comida Rápida" },
    { id: "postres", label: "Postres" },
    { id: "comida_mexicana", label: "Comida Mexicana" },
    { id: "saludables", label: "Opciones Saludables" },
    { id: "japonesa", label: "Comida Japonesa" },
    { id: "parrilla", label: "A la Parrilla" },
    { id: "comida_latina", label: "Comida Latina" },
    { id: "bebidas", label: "Bebidas" },
    { id: "mariscos", label: "Mariscos" },
  ];

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
  const handleViewMore = (product) => {
    setSelectedProduct(product);
    setIsProductModalOpen(true);
  };
  const clearCart = () => setCart([]);
  const phoneRef = useRef(null);

  return (
    <div className="bg-white max-w-screen-md mx-auto">
      <Header openModal={() => setIsModalOpen(true)} />

      <Modal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)}>
        <div className="p-6 bg-white rounded-lg shadow-lg w-full max-w-lg">
          {/* Título */}
          <h2 className="text-2xl font-bold text-center mb-6 text-yellow-400 leading-snug">
            Horarios de Apertura y Cierre
          </h2>

          {/* Tabla de horarios */}
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse rounded-lg overflow-hidden">
              <thead className="bg-yellow-100 text-yellow-700">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Día</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Apertura</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Cierre</th>
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
                    className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      } hover:bg-yellow-50 transition-colors duration-200`}
                  >
                    <td className="px-4 py-3 text-sm text-gray-700">{horario.dia}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{horario.apertura}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{horario.cierre}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Modal >


      <Modal isOpen={isFormModalOpen} closeModal={() => setIsFormModalOpen(false)}>
        <div className=" flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div
            className="relative px-6 py-10 bg-white rounded-lg shadow-lg w-full max-w-xl max-h-[80vh] overflow-y-auto"
          >
            {/* Sombra indicativa de scroll */}
            <div className=" fixed bottom-0 left-0 w-full h-8 bg-gradient-to-t from-black/45 to-transparent pointer-events-none"></div>

            {/* Título */}
            <h2 className="text-2xl font-bold mb-6 text-yellow-400 uppercase text-center">
              Detalles del Pedido
            </h2>

            {/* Formulario */}
            <form className="flex flex-col gap-6">
              {/* Nombre */}
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  placeholder=" "
                  className="peer w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                  required // Asegura que el campo sea evaluado como válido
                />
                <label
                  className="absolute left-3 top-3 text-gray-400 text-sm transition-all 
              peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 
              peer-focus:top-0 peer-focus:text-xs peer-focus:text-yellow-500
              peer-valid:top-0 peer-valid:text-xs peer-valid:text-yellow-500"
                >
                  Nombre
                </label>
              </div>

              {/* Método de entrega */}
              <div className="relative">
                <select
                  name="deliveryMethod"
                  value={formData.deliveryMethod}
                  onChange={handleFormChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                >
                  <option value="delivery">Delivery</option>
                  <option value="retiro">Retiro en el lugar</option>
                </select>
                <label className="absolute left-3 top-0 text-gray-400 text-xs transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-focus:top-0 peer-focus:text-xs peer-focus:text-yellow-500">
                  Método de Entrega
                </label>
              </div>

              {/* Dirección (si es delivery) */}
              {formData.deliveryMethod === "delivery" && (
                <div className="relative">
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleFormChange}
                    placeholder=" "
                    className="peer w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                  />
                  <label className="absolute left-3 top-3 text-gray-400 text-sm transition-all 
              peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 
              peer-focus:top-0 peer-focus:text-xs peer-focus:text-yellow-500
              peer-valid:top-0 peer-valid:text-xs peer-valid:text-yellow-500">
                    Dirección (entre calles)
                  </label>
                </div>
              )}

              {/* Método de pago */}
              <div className="relative">
                <select
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleFormChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                >
                  <option value="efectivo">Efectivo</option>
                  <option value="transferencia">Transferencia</option>
                </select>
                <label className="absolute left-3 top-0 text-gray-400 text-xs transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-focus:top-0 peer-focus:text-xs peer-focus:text-yellow-500">
                  Método de Pago
                </label>
              </div>
              {formData.paymentMethod === "transferencia" && (
                <span className="text-sm text-gray-500">
                  ⓘ La información de la cuenta bancaria se enviará por mensaje.
                </span>
              )}

              {/* Teléfono */}
              <div
                className="relative"
                onClick={() => phoneRef.current?.scrollIntoView({ behavior: "smooth" })}
              >
                <input
                  ref={phoneRef}
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleFormChange}
                  placeholder=" "
                  className="peer w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                />
                <label className="absolute left-3 top-3 text-gray-400 text-sm transition-all 
              peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 
              peer-focus:top-0 peer-focus:text-xs peer-focus:text-yellow-500
              peer-valid:top-0 peer-valid:text-xs peer-valid:text-yellow-500">
                  Teléfono
                </label>
              </div>

              {/* Botón de envío */}
              <button
                type="button"
                onClick={handleOrder}
                className="bg-yellow-400 text-white text-lg py-3 rounded-md hover:bg-yellow-500 transition-colors"
              >
                Enviar Pedido
              </button>

              {/* Total */}
              {/* Total */}
              <div className="text-center">
                <p className="text-lg text-gray-800">
                  Total:{" "}
                  <span className="text-green-600 font-bold">
                    {new Intl.NumberFormat("es-AR", {
                      style: "currency",
                      currency: "ARS",
                    }).format(totalPrice)}
                  </span>
                </p>
              </div>

              {/* Botón para ver el carrito */}
              <button type="button" onClick={toggleCart}>VER CARRITO</button>


              {/* Información adicional */}
              <p className="text-sm text-green-500 text-center">
                ⓘ ¡Su pedido será enviado por WhatsApp!
              </p>
            </form>
          </div>
        </div>
      </Modal>



      <main className=" flex flex-col gap-5 h-full">
        <div className="flex flex-col gap-2 pt-8">

          <span className=" text-center text-black font-bold text-xl uppercase">categorías</span>
          <div className="relative">
            {/* Contenedor deslizante horizontal */}
            <div className="flex overflow-x-auto scroll-smooth scrollbar-hide gap-4 px-4 pb-4">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full whitespace-nowrap border-2 transition-all duration-300 ${selectedCategory === category.id
                    ? "bg-yellow-300 text-white border-yellow-400 shadow-lg"
                    : "bg-white text-gray-700 border-gray-300 hover:border-yellow-300 hover:bg-yellow-100"
                    }`}
                >
                  {category.label}
                </button>
              ))}
            </div>

            {/* Gradientes laterales */}
            <div className="absolute top-0 bottom-0 left-0 w-10 bg-gradient-to-r from-white pointer-events-none"></div>
            <div className="absolute top-0 bottom-0 right-0 w-10 bg-gradient-to-l from-white pointer-events-none"></div>
          </div>

        </div>
        <h4 className="text-start px-4 text-yellow-400 font-bold text-3xl uppercase">productos</h4>
        <Modal isOpen={isProductModalOpen} closeModal={() => setIsProductModalOpen(false)}>
          {selectedProduct && (
            <div className="flex flex-col items-center gap-4 p-6 bg-white rounded-lg shadow-lg w-full max-w-md">
              {/* Imagen del Producto */}
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-48 h-48 object-cover rounded-lg shadow-md"
              />

              {/* Título */}
              <h2 className="text-3xl font-extrabold text-yellow-400 uppercase text-center">
                {selectedProduct.name}
              </h2>

              {/* Descripción */}
              <p className="text-sm text-gray-700 text-center bg-gray-100 rounded-lg px-4 py-3 shadow-inner">
                {selectedProduct.description}
              </p>

              {/* Información de Precio y Botón */}
              <div className="flex flex-col items-center gap-4 w-full">
                <p className="text-lg font-bold text-gray-800">
                  <span className="text-yellow-500">Precio:</span> ${selectedProduct.price}
                </p>
                <button
                  onClick={() => addToCart(selectedProduct)}
                  className="w-full max-w-xs bg-yellow-400 text-white px-4 py-2 rounded-full hover:bg-yellow-500 transition-all duration-300"
                >
                  Agregar al carrito
                </button>
              </div>
            </div>
          )}
        </Modal>


        <div className="flex flex-col gap-2 min-h-36 w-11/12 mx-auto">
          {filteredProducts.map((product, index) => (
            <div
              key={index}
              className="flex justify-between items-center border p-2 rounded bg-gray-50 hover:bg-gray-100"
            >
              <div>
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-sm text-gray-600">Precio: ${product.price}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => addToCart(product)}
                  className="bg-green-400 text-white px-2 py-1 rounded hover:bg-green-500 text-sm"
                >
                  Agregar
                </button>
                <button
                  onClick={() => handleViewMore(product)}
                  className="bg-blue-400 text-white px-2 py-1 rounded hover:bg-blue-500 text-sm"
                >
                  Ver Más
                </button>
              </div>
            </div>
          ))}
        </div>
        <h4 className="text-start px-4 text-3xl font-bold text-yellow-400 uppercase mt-3">destacados</h4>
        <ProductCarousel products={products} addToCart={addToCart} />
        <h4 className="text-start px-4 text-3xl font-bold text-yellow-400 uppercase mt-3">UBICACIÓN</h4>
        <div className="w-full flex justify-center items-center p-3">

          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7389.603747075606!2d-55.117974516509804!3d-27.486953236546334!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94f8f54706b1b501%3A0x2a4796c88edb4c9!2sOber%C3%A1%2C%20Misiones!5e1!3m2!1ses-419!2sar!4v1733663283050!5m2!1ses-419!2sar" width="600" height="450" Style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
        <Footer />
      </main>
      <Cart
        cartItems={cart}
        removeFromCart={removeFromCart}
        handleOrder={() => setIsFormModalOpen(true)} // Abrir modal al realizar pedido
        isFormValid={isFormValid}
        updateCart={updateCart} // Función para actualizar cantidades
        clearCart={clearCart}   // Función para vaciar el carrito      
        isOpen={isCartOpen} // Pasar el estado del carrito
        toggleCart={toggleCart} // Pasar la función para abrir/cerrar el carrito
      />

    </div >
  );
}
