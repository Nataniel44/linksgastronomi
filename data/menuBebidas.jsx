// menuBebidas.jsx
export const menuBebidas = {
  sinAlcohol: [
    {
      name: "Agua Mineral 500cc",
      price: 1700,
      image: "/menu/bebidas/aguabotella.jpeg",
      options: [
        { portion: "Con gas", price: 1700 },
        { portion: "Sin gas", price: 1700 },
      ],
    },
    {
      name: "Agua Mineral 1.5L",
      price: 3200,
      image: "/menu/bebidas/aguabotella.jpeg",
      options: [
        { portion: "Con gas", price: 3200 },
        { portion: "Sin gas", price: 3200 },
      ],
    },
    { name: "Aquarius 1.5L", price: 3200, image: "/menu/bebidas/aqua.webp" },
    { name: "Cepita 1.5L", price: 4300, image: "/menu/bebidas/cepita1.png" },
    {
      name: "Gaseosa 500cc",
      price: 2500,
      image: "/menu/bebidas/botellachicoca.webp",
      options: [
        { portion: "Coca Cola", price: 2500 },
        { portion: "Fanta", price: 2500 },
        { portion: "Sprite", price: 2500 },
        { portion: "Paso de los Toros", price: 2500 },
      ],
    },
    {
      name: "Gaseosa 1.5L",
      price: 4800,
      image: "/menu/bebidas/coca1l.jpg",
      options: [
        { portion: "Coca Cola", price: 4800 },
        { portion: "Fanta", price: 4800 },
        { portion: "Sprite", price: 4800 },
      ],
    },
    { name: "Red Bull (lata)", price: 3500, image: "/menu/bebidas/lata-red.jpg" },
    { name: "Speed (lata)", price: 2800, image: "/menu/bebidas/speedlata.jpg" },
  ],

  cervezaArtesanal: [
    { name: "Media pinta", price: 2000, image: "/menu/bebidas/pinta.jpg" },
    { name: "Pinta", price: 3200, image: "/menu/bebidas/pinta.jpg" },
    { name: "Jarra 1.5L (consultar variedad)", price: 7500, image: "/menu/bebidas/jarra.png" },
  ],

  porrones: [
    { name: "Heineken 330cc", price: 3300, image: "/menu/bebidas/heinekchica.png" },
    { name: "Corona 330cc", price: 3500, image: "/menu/bebidas/coronachi.jpg" },
  ],

  botellas: [
    { name: "Budweiser", price: 4500, image: "/menu/bebidas/nud.jpg" },
    { name: "Brahma", price: 4500, image: "/menu/bebidas/brahamal.webp" },
    { name: "Imperial Golden", price: 4900, image: "/menu/bebidas/golden.webp" },
    { name: "Stella Artois", price: 6800, image: "/menu/bebidas/artois.webp" },
    { name: "Heineken", price: 6800, image: "/menu/bebidas/heineken1l.webp" },
    { name: "Patagonia Amber Lager 730cc", price: 6400, image: "/menu/bebidas/patag.webp" },
    { name: "Corona 710cc", price: 5700, image: "/menu/bebidas/coronacer.webp" },
  ],

  vinos: [
    {
      tipo: "blancos",
      items: [
        { name: "Prófugo Chenin Dulce", price: 8500, image: "/menu/bebidas/chenindulce.jpeg" },
        { name: "Dilema Blanco Dulce", price: 4800, image: "/menu/bebidas/Vino-Dilema-Dulce-Blanco.webp" },
        { name: "Santa Julia Chenin Dulce", price: 9700, image: "/menu/bebidas/santajuliachenindulce.jpeg" },
        { name: "Lola Monetes Dulce Terroir", price: 5800, image: "/menu/bebidas/lolamontess.png" },
        { name: "flia. Gascon Dulce Cosecha", price: 6500, image: "/menu/bebidas/gaconblancodulce.jpeg" },
        { name: "Altos Del Plata chardononnay", price: 10000, image: "/menu/bebidas/altosmal.jpeg" },
        { name: "Casillero Del Diablo chardononnay", price: 10800, image: "/menu/bebidas/casillero.webp" },
        { name: "Trumpeter (consultar variedades)", price: 12900, image: "/menu/bebidas/Trumpeter-Malbec.webp" },
      ],
    },
    {
      tipo: "tintos",
      items: [
        { name: "Lola Montes (Malbec)", price: 5000, image: "/menu/bebidas/lolamontess.png" },
        { name: "Santa Julia Tinto Dulce Natural", price: 9700, image: "/menu/bebidas/santajulia.jpg" },
        { name: "Cordero con Piel de Lobo (Malbec)", price: 5800, image: "/menu/bebidas/pieldelobo.jpeg" },
        { name: "flia. Gascon", price: 7500, image: "/menu/bebidas/gacon.webp" },
        { name: "Altos Del Plata (Malbec)", price: 11400, image: "/menu/bebidas/altosmal.jpeg" },
        { name: "Trumpeter (Malbec)", price: 12800, image: "/menu/bebidas/Trumpeter-Malbec.webp" },
        { name: "Saint Felicien (Malbec)", price: 13800, image: "/menu/bebidas/saint.jpeg" },
        { name: "Nicasia Red Blend (Malbec)", price: 16000, image: "/menu/bebidas/nicasia.jpg" },
        { name: "Luigi Bosca (Malbec)", price: 18000, image: "/menu/bebidas/luigi.jpg" },
        { name: "Terrazas De Los Andes (Malbec)", price: 18500, image: "/menu/bebidas/terrazas.jpg" },
        { name: "Angélica Zapata (Malbec)", price: 35000, image: "/menu/bebidas/angelica.jpg" },
        { name: "Rutini (Malbec)", price: 40000, image: "/menu/bebidas/rutini.webp" },
      ],
    },
    {
      tipo: "espumantes",
      items: [
        { name: "Mercier", price: 12000, image: "/menu/bebidas/mercier.png" },
        { name: "Sidra 1888 Saenz Briones", price: 10000, image: "/menu/bebidas/1888.jpg" },
        { name: "Chandon", price: 24000, image: "/menu/bebidas/chandon.jpeg" },
        { name: "Baron B.", price: 40000, image: "/menu/bebidas/baronb.webp" },
      ],
    },
  ],
};
