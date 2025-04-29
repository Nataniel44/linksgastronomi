"use client"
import { useState, useRef, useEffect } from "react";
import { ProductCarousel } from "@/app/components/ProductCarousel";
import { Header } from "@/app/components/Header";
import { Modal } from "@/app/components/Modal";
import Cart from "@/app/components/Cart";
import Image from 'next/image'
import ComboCard from "./components/ComboCard";

export default function Demo() {


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
    { name: "Hamburguesa hulk", category: "burgers", description: "Hamburguesa con queso cheddar x2, carne x2, huevo x2, cebolla caramelizada x2 y salsa BBQ.", price: 5000, image: "./hulk.jpeg" },
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
      <div className=" bg-white max-w-screen-md mx-auto">

        <div
          className={`fixed mx-auto top-0 px-4 py-2 z-50 transition-opacity duration-500 ease-in-out bg-green-400 text-white  ${showNotification ? "opacity-100" : "opacity-0"
            }`}
        >
          {notification} <button onClick={toggleCart} className="text-blue-500 underline ">Ver carrito.</button>
        </div>

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

                    { dia: "Viernes", apertura: "20:00 PM", cierre: "23:00 PM" },
                    { dia: "Sábado", apertura: "20:00 PM", cierre: "23:00 PM" },
                    { dia: "Domingo", apertura: "20:00 PM", cierre: "23:00 PM" },
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
          <div className=" flex items-center justify-center z-40 ">
            <div
              className="fixed z-40 top-0 left-0 w-full p-5  bg-white rounded-lg shadow-lg  max-w-xl h-full
               overflow-y-auto"
            >
              {/* Sombra indicativa de scroll */}
              <div className=" fixed bottom-0 left-0 w-full h-8 bg-gradient-to-t from-black/45 to-transparent pointer-events-none"></div>

              {/* Título */}
              <h2 className="text-2xl font-bold mb-6 text-black uppercase text-center">
                Detalles del Pedido
              </h2>

              {/* Formulario */}
              <form className="flex flex-col gap-6 text-black">
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
                    className="absolute left-3 top-0 text-black/85 text-xs transition-all 
                     peer-placeholder-shown:text-black/85 
                     peer-focus:text-xs peer-focus:text-yellow-500 "
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
                  <label className="absolute left-3 top-0 text-black/85 text-xs transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-black/85 peer-focus:top-0 peer-focus:text-xs peer-focus:text-yellow-500">
                    Método de Entrega
                  </label>
                </div>
                {/* Dirección (si es delivery) */}
                {formData.deliveryMethod === "Retiro en el lugar" && (
                  <div className="relative">
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleFormChange}
                      placeholder=" "
                      className="peer w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                    />
                    <label className="absolute left-3 top-3 text-black/85 text-base transition-all 
              peer-placeholder-shown:top-3 peer-placeholder-shown:text-black/85 
              peer-focus:top-0 peer-focus:text-xs peer-focus:text-yellow-500
              peer-valid:top-0 peer-valid:text-xs peer-valid:black">
                      Dirección (entre calles)
                    </label>
                  </div>
                )}
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
                    <label className="absolute left-3 top-3 text-black/85 text-base transition-all 
              peer-placeholder-shown:top-3 peer-placeholder-shown:text-black/85 
              peer-focus:top-0 peer-focus:text-xs peer-focus:text-yellow-500
              peer-valid:top-0 peer-valid:text-xs peer-valid:black">
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
                  <label className="absolute left-3 top-0 text-black/85 text-xs transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-black/85 peer-focus:top-0 peer-focus:text-xs peer-focus:text-yellow-500">
                    Método de Pago
                  </label>
                </div>
                {formData.paymentMethod === "transferencia" && (
                  <div className=" flex ">

                    <span className="text-sm ">
                      ⓘ La información de la cuenta bancaria se enviará por mensaje.
                    </span>
                  </div>
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
                  <label className="absolute left-3 top-3 text-black/85 text-base transition-all 
              peer-placeholder-shown:top-3 peer-placeholder-shown:text-black/85 
              peer-focus:top-0 peer-focus:text-xs peer-focus:text-yellow-500
              peer-valid:top-0 peer-valid:text-xs peer-valid:black">
                    Teléfono
                  </label>
                </div>

                {/* Botón de envío */}
                <button
                  type="button"
                  onClick={handleOrder}
                  className=" bg-green-300 px-4 py-2 rounded-full hover:border-yellow-400 hover:text-black hover:bg-yellow-300 border-gray-400 border-2  shadow-lg transition-colors"
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




        <Header openmodal={() => setIsModalOpen(true)} />
        <main className=" flex flex-col gap-5 h-full pt-10 " >


          <div className="flex flex-col gap-5  ">
            <div className="flex flex-col">

              <span className=" text-center text-black font-bold text-xl uppercase">categorías</span>
              <span className=" text-center text-black font-base text-sm ">Seleccione su categoria favorita.</span>
            </div>
            <div className="relative ">
              {/* Contenedor deslizante horizontal */}
              <div className="flex overflow-x-auto scroll-smooth scrollbar-hide gap-4 px-5">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-full whitespace-nowrap border-2 transition-all duration-300  ${selectedCategory === category.id
                      ? "bg-yellow-300 text-black border-yellow-400 shadow-lg"
                      : "bg-white text-gray-600 border-gray-400 hover:border-yellow-300 hover:bg-yellow-100"
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
          <h4 className="text-center px-4 text-yellow-400 font-bold text-2xl uppercase">productos</h4>

          <Modal isOpen={isProductModalOpen} closeModal={() => setIsProductModalOpen(false)}>
            {selectedProduct && (
              <div className="flex flex-col items-center gap-4 p-6 bg-white rounded-lg shadow-lg w-full max-w-md">
                {/* Imagen del Producto */}
                <Image
                  width="192"
                  height="192"
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-48 h-48 object-cover rounded-lg shadow-md"
                />
                <div className="flex flex-col gap-3 text-black">

                  {/* Título */}
                  <h2 className="text-4xl font-extrabold text-yellow-400 uppercase text-center">
                    {selectedProduct.name}
                  </h2>

                  {/* Descripción */}
                  <p className="text-sm text-gray-700 text-start bg-gray-100 rounded-lg p-4 shadow-inner">
                    {selectedProduct.description}
                  </p>

                  {/* Información de Precio y Botón */}
                  <div className="flex flex-col items-enf gap-4 w-full">
                    <p className="text-lg font-bold text-gray-800">
                      <span className="text-yellow-500">Precio:</span> ${selectedProduct.price}
                    </p>

                    <button
                      onClick={() => addToCart(selectedProduct)}
                      className="   text-gray-600 px-4 py-2 rounded-full hover:border-yellow-400 hover:text-black hover:bg-yellow-300 border-gray-400 border-2    shadow-lg"
                    >
                      Agregar al carrito
                    </button>

                  </div>
                </div>
              </div>
            )}
          </Modal>

          <div className="flex flex-col gap-2 min-h-36 w-11/12 mx-auto">
            {filteredProducts.map((product, index) => (
              <div
                key={index}
                className="grid grid-cols-[1fr,auto] items-center border p-2 rounded bg-gray-50 hover:bg-gray-100 gap-4"
              >
                {/* Nombre y precio */}
                <div>
                  <h3 className="text-md text-black font-normal uppercase leading-tight">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-600">Precio: ${product.price}</p>
                </div>

                {/* Botones */}
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

          <h4 className="text-center px-4 text-2xl font-bold text-yellow-400 uppercase mt-3">DESCUBRE NUESTROS PRODUCTOS</h4>
          <ProductCarousel products={products} addToCart={addToCart} />


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

    </>
  );
}
