import { useState } from 'react';
import ProductCard from '../components/ProductCard';
import Cart from '../components/Cart';
import ProductModal from '../components/ProductModal';
import OrderForm from '../components/OrderForm';
import PickupForm from '../components/PickupForm'; // Nuevo componente para "Para retirar"
import "./local.css";

const defaultImage = "/argen.jpeg"; // Usa una imagen genérica

const products = [
  {
    id: 1,
    name: 'Jamón y Queso',
    description: 'Clásica tarta con jamón y queso.',
    price: 8400,
    category: 'Tartas',
    image: defaultImage,
    extras: [
      { name: 'Extra queso', price: 500 },
      { name: 'Sin cebolla', price: 0 }
    ]
  },
  {
    id: 2,
    name: 'Brocoli',
    description: 'Salteado de brócoli con quesos.',
    price: 10400,
    category: 'Empanadas',
    image: defaultImage,
    extras: []
  },    
  {
    id: 3,
    name: 'Quiche de Brócoli',
    description: 'Deliciosa quiche vegetariana con brócoli.',
    price: 14000,
    category: 'Quiches',
    image: defaultImage,
    extras: [
      { name: 'Extra queso', price: 500 }
    ]
  },
  {
    id: 7,
    name: 'Pizza Muzzarella',
    description: 'Pizza clásica con muzzarella y salsa de tomate.',
    price: 9500,
    category: 'Pizzas',
    image: defaultImage,
    extras: [
      { name: 'Extra queso', price: 700 },
      { name: 'Aceitunas', price: 300 }
    ]
  },
  {
    id: 8,
    name: 'Pizza Napolitana',
    description: 'Muzzarella, tomate en rodajas y ajo.',
    price: 10500,
    category: 'Pizzas',
    image: defaultImage,
    extras: [
      { name: 'Extra queso', price: 700 },
      { name: 'Aceitunas', price: 300 }
    ]
  },
  {
    id: 9,
    name: 'Pizza Calabresa',
    description: 'Muzzarella y longaniza calabresa.',
    price: 11000,
    category: 'Pizzas',
    image: defaultImage,
    extras: [
      { name: 'Extra queso', price: 700 }
    ]
  },
  {
    id: 10,
    name: 'Pizza Fugazzeta',
    description: 'Muzzarella y cebolla.',
    price: 11500,
    category: 'Pizzas',
    image: defaultImage,
    extras: [
      { name: 'Extra queso', price: 700 }
    ]
  },
  {
    id: 11,
    name: 'Pizza Especial',
    description: 'Muzzarella, jamón, morrón y huevo.',
    price: 12000,
    category: 'Pizzas',
    image: defaultImage,
    extras: [
      { name: 'Extra queso', price: 700 }
    ]
  },
  {
    id: 12,
    name: 'Empanada de Carne',
    description: 'Empanada tradicional de carne.',
    price: 1200,
    category: 'Empanadas',
    image: defaultImage,
    extras: []
  },
  {
    id: 13,
    name: 'Empanada de Pollo',
    description: 'Empanada de pollo con condimentos.',
    price: 1200,
    category: 'Empanadas',
    image: defaultImage,
    extras: []
  },
  {
    id: 14,
    name: 'Tarta de Verdura',
    description: 'Tarta de acelga y ricota.',
    price: 8500,
    category: 'Tartas',
    image: defaultImage,
    extras: [
      { name: 'Extra queso', price: 500 }
    ]
  },
  {
    id: 15,
    name: 'Pizza Rúcula y Jamón Crudo',
    description: 'Muzzarella, rúcula, jamón crudo y parmesano.',
    price: 13000,
    category: 'Pizzas',
    image: defaultImage,
    extras: [
      { name: 'Extra queso', price: 700 }
    ]
  }
];

const categories = [  
    { name: 'Pizzas', icon: '🍕' },
  { name: 'Tartas', icon: '🥧' },
  { name: 'Empanadas', icon: '🥟' },
  { name: 'Quiches', icon: '🍳' },


];

export default function PizzaPepaPage() {
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Tartas');
  const [search, setSearch] = useState('');
  const [modalProduct, setModalProduct] = useState(null);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);
  const [deliveryType, setDeliveryType] = useState("domicilio");

  const filteredProducts = products
    .filter(p => p.category === selectedCategory)
    .filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  const addToCart = (product, quantity = 1, extras = []) => {
    setCart([...cart, { ...product, quantity, extras }]);
    setModalProduct(null);
  };

  const removeFromCart = (idx) => {
    setCart(cart.filter((_, i) => i !== idx));
  };

  // Calcular total y cantidad de productos en el carrito
  const cartTotal = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
  const cartCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

  return (
    <div className="min-h-screen bg-[#f8f8f8] text-[#222]">
      {/* Header */}
      <header className="bg-white shadow px-6 py-4 flex flex-col md:flex-row md:justify-between md:items-center gap-3">
        <div className="flex items-center gap-3">
          <img src="./pepa.svg" alt="Pizza Pepa" className="w-28 " />
          <div>
            <div className="text-xs text-gray-500 flex  gap-5 items-center">
              <span>Av. Misiones 579</span>
              <span>3755 701177</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <button
            className={`px-4 py-2 rounded-full font-semibold shadow transition ${
              deliveryType === "domicilio"
                ? "bg-[#D58A17] text-white"
                : "border border-[#D58A17] text-[#D58A17] hover:bg-[#D58A17] hover:text-white"
            }`}
            onClick={() => setDeliveryType("domicilio")}
          >
            Entrega a domicilio
          </button>
          <button
            className={`px-4 py-2 rounded-full font-semibold transition border ${
              deliveryType === "retiro"
                ? "bg-[#D58A17] text-white border-[#D58A17]"
                : "border-[#D58A17] text-[#D58A17] hover:bg-[#D58A17] hover:text-white"
            }`}
            onClick={() => setDeliveryType("retiro")}
          >
            Para retirar
          </button>
        </div>
      </header>

      {/* Categorías y Buscador en la misma fila en desktop */}
      <div className="bg-white sticky top-0 shadow mt-2 px-4 py-3 flex flex-col md:flex-row md:items-center md:gap-6">
        <nav className="flex-1 flex gap-2 overflow-x-auto scrollbar-hide">
          {categories.map(cat => (
            <button
              key={cat.name}
              className={`flex flex-col items-center px-3 py-2 rounded-lg font-medium transition min-w-[80px] ${selectedCategory === cat.name ? 'bg-[#FFE5C2] text-[#D58A17]' : 'text-gray-500 hover:bg-[#FFF5E6]'}`}
              onClick={() => setSelectedCategory(cat.name)}
            >
              <span className="text-2xl mb-1">{cat.icon}</span>
              <span className="text-xs">{cat.name}</span>
            </button>
          ))}
        </nav>
        <div className="flex-1 flex justify-center mt-4 md:mt-0">
          <input
            type="text"
            placeholder="Buscar productos por nombre"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full max-w-md px-4 py-2 rounded-full border border-gray-200 shadow focus:outline-none focus:border-[#D58A17] transition"
          />
        </div>
      </div>

      {/* Main grid content */}
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-8 px-2 md:px-12 mt-8 items-start">
        {/* Productos */}
        <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 self-start">
          {filteredProducts.length === 0 && (
            <div className="col-span-full text-center text-gray-400 py-8">No hay productos en esta categoría.</div>
          )}
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => setModalProduct(product)}
            />
          ))}
        </main>

        {/* Carrito desktop */}
        <div className="w-full hidden md:block">
          <Cart
            cart={cart}
            removeFromCart={removeFromCart}
            onConfirm={() => setShowOrderForm(true)}
          />
        </div>
      </div>

      {/* Carrito móvil: botón flotante */}
      {cart.length > 0 && (
        <button
          className="fixed bottom-0 left-0 w-full z-40 bg-[#D58A17] text-white rounded-none px-0 py-4 shadow-lg flex items-center justify-center gap-3 font-bold text-lg md:hidden"
          onClick={() => setShowCartModal(true)}
        >
          🛒 Mi pedido ({cartCount}) - ${cartTotal}
        </button>
      )}

      {/* Modal carrito móvil */}
      {showCartModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-end justify-center z-50 md:hidden">
          {/* X flotante para cerrar */}
          <button
            className="fixed top-4 right-4 z-50 bg-white/60 backdrop-blur-lg rounded-full p-2 text-3xl text-gray-700 hover:text-red-500 shadow-lg"
            style={{ border: 'none' }}
            onClick={() => setShowCartModal(false)}
            aria-label="Cerrar"
          >
            ×
          </button>
          <div className="w-full max-w-md bg-white rounded-t-2xl shadow-xl p-4 relative">
            <Cart
              cart={cart}
              removeFromCart={removeFromCart}
              onConfirm={() => {
                setShowCartModal(false);
                setShowOrderForm(true);
              }}
              onClose={() => setShowCartModal(false)}
            />
            {/* Botón confirmar pedido solo en móvil */}
            {cart.length > 0 && (
              <button
                className="w-full bg-[#D58A17] text-white px-4 py-2 rounded font-semibold mt-4 md:hidden"
                onClick={() => {
                  setShowCartModal(false);
                  setShowOrderForm(true);
                }}
              >
                Confirmar pedido
              </button>
            )}
          </div>
        </div>
      )}

      {/* Modal de producto */}
      {modalProduct && (
        <ProductModal
          product={modalProduct}
          onClose={() => setModalProduct(null)}
          onAdd={addToCart}
        />
      )}


      {showOrderForm && (
        <div className="fixed top-0 inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="relative w-full max-w-2xl mx-auto h-full flex items-center justify-center">
            <div className="w-full max-w-2xl bg-white shadow-lg overflow-y-auto h-screen md:max-h-[100vh] p-0 relative rounded-xl md:rounded-xl rounded-none md:max-h-[90vh] md:p-0 md:relative
              md:block
              fixed md:static top-0 left-0 h-full md:h-auto
              ">
              <OrderForm logo="/pepa.svg" deliveryType={deliveryType} onClose={() => setShowOrderForm(false)} />
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-[#941F1F] text-white text-center py-6 mt-8 pb-28 md:pb-6">
        <p>📍 Av. Misiones 579 | 📞 3755 701177 | 📷 @pizzapepa.obera</p>
      </footer>
    </div>
  );
}