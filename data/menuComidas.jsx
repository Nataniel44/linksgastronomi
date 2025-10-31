export const menuComidas = {


    entradas: [
        {
            subcategoria: "Papas",
            items: [
                { name: "Clásicas o Rústicas", image: "/menu/pacl.png", price: 7000 },
                {
                    name: "Gratinadas con queso", options: [
                        { portion: "Cheddar", price: 7800 },
                        { portion: "Muzzarella", price: 7800 },
                    ], image: "/menu/papgratinque.jpg", price: 7800
                },
                { name: "Panceta, cheddar y verdeo", image: "/menu/papaschedarverd.jpg", price: 8800 },
                { name: "Bravas (picantes)", image: "/menu/papasbravaspic.jpg", price: 7800 },
            ],
        },
        {
            subcategoria: "Otros",
            items: [
                { name: "Mandiocas fritas", image: "/menu/man.png", price: 7000 },
                { name: "Tequeños con dip", image: "/menu/taque.jpg", price: 9500 },
                { name: "Rabas con aderezo", image: "/menu/rabas.jpg", price: 14000 },
                { name: "Camarones crujientes", image: "/menu/camacru.jpg", price: 18000 },
                { name: "Mozzarella sticks", image: "/menu/fing.png", price: 9500 },
                { name: "Chicken fingers con dip", image: "/menu/muzzas.jpg", price: 10000 },
                { name: "Provoleta a la Napolitana", image: "/menu/prov.jpg", price: 10500 },
            ],
        },
    ],
    especialidades: [
        {
            name: "Picaña",
            image: "/menu/pic.jpg",
            options: [
                { portion: "Para 2 personas (400–450 g)", price: 20000 },
                { portion: "Para 4 personas (800–900 g)", price: 34000 },
            ],
            guarniciones: ["Papas fritas", "Mandioca frita", "Mandioca hervida", "Puré de papas", "Arroz especiado"],
        },
        {
            name: "Entraña",
            image: "/menu/entr.jpg",
            options: [
                { portion: "Para 2 personas", price: 20000 },
                { portion: "Para 4 personas", price: 34000 },
            ],
            guarniciones: ["Papas fritas", "Mandioca frita", "Mandioca hervida", "Puré de papas", "Arroz especiado"],
        },
        {
            name: "Lomo",
            image: "/menu/pic.jpg",
            options: [
                { portion: "Para 2 personas", price: 20000 },
                { portion: "Para 4 personas", price: 34000 },
            ],
            guarniciones: ["Papas fritas", "Mandioca frita", "Mandioca hervida", "Puré de papas", "Arroz especiado"],
        },
        {
            name: "T-Bone",
            image: "/menu/tbone.jpg",
            options: [
                { portion: "Para 2 personas", price: 20000 },
                { portion: "Para 4 personas", price: 34000 },
            ],
            guarniciones: ["Papas fritas", "Mandioca frita", "Mandioca hervida", "Puré de papas", "Arroz especiado"],
        },
        {
            name: "Bife de Chorizo",
            image: "/menu/bif.jpeg",
            options: [
                { portion: "Para 2 personas", price: 20000 },
                { portion: "Para 4 personas", price: 34000 },
            ],
            guarniciones: ["Papas fritas", "Mandioca frita", "Mandioca hervida", "Puré de papas", "Arroz especiado"],
        },
    ],
    ensaladas: [
        { name: "Completa", desc: "Zanahoria, Tomate, Huevo Duro, Choclo", price: 9000 },
        { name: "Mixta", desc: "Lechuga, Tomate y Cebolla", price: 7000 },
        { name: "Especial", desc: "Rúcula, Cherrys y Parmesano", price: 8500 },
        { name: "César", image: "/menu/cesar.jpg", desc: "Hojas verdes, Croutons, Pollo crujiente, Parmesano", price: 10000 },
    ], paraCompartir: [
        {
            name: "Tabla de Milanesas (4u.)",
            image: "/menu/m.jpg",
            desc: "Napolitana, Mozza con jamón, Mozza huevo y panceta, Suiza",

            price: 11000,
        },
        {
            name: "Tabla de Pizzetas (8u.)",
            image: "/menu/pizzetas.png",
            price: 28000,
            desc: "2 Napolitana, 2 Mozza con Jamón, 2 Fugazzetas, 2 Jamón y huevo",

        },

        {
            name: "Picada", image: "/menu/pica.jpg",
            desc: "Jamón Cocido, Queso, Salame, Jamón Crudo, Aceitunas, Milanesitas, Bastones de Mozza, Papas, Sopa paraguaya",
            options: [
                { portion: "Para 2 personas", price: 18000 },
                { portion: "Para 4 personas", price: 30000 },
            ],
        },
    ], alPlato: [
        {
            name: "Lomo / Milanesa a la Napo con papas fritas", image: "/menu/milanapo.png", options: [
                { portion: "Lomo", price: 13500 },
                { portion: "Milanesa", price: 13500 },
            ], price: 13500
        },
        {
            name: "Pechuga al verdeo o mostaza con puré de papas", image: "/menu/pechu.png", options: [
                { portion: "Verdeo", price: 12000 },
                { portion: "Mostaza", price: 12000 },
            ], price: 12000
        },
        { name: "Lomo a las finas hierbas con papas noisette", image: "/menu/lomopapa.jpeg", price: 13500 },
        { name: "Mila a caballo en colchón con papas pay", image: "/menu/milacaballo.jpeg", price: 13500 },
        { name: "Pacu teko al roquefort con papas noisette", image: "/menu/pacu.jpeg", price: 15000 },
        // Pastas
        { name: "Sorrentinos de jamón y queso", image: "/menu/sorre.jpg", price: 13000, salsas: ["Bolognesa", "Scarparo", "4 Quesos", "Parisienne"] },
        { name: "Ravioles de ricota y verduras", image: "/menu/raviolesrico.jpg", price: 13000, salsas: ["Bolognesa", "Scarparo", "4 Quesos", "Parisienne"] },
        { name: "Tallarines al huevo", image: "/menu/tallahue.jpg", price: 11500, salsas: ["Bolognesa", "Scarparo", "4 Quesos", "Parisienne"] },
    ],
    pizzas: [
        {
            name: "Mozzarella",
            desc: "Salsa, Mozza, Aceitunas verdes, Orégano",
            price: 10000,
            extras: [
                { name: "Muzza extra", price: 800 }
            ]
        },
        {
            name: "Fugazzeta",
            desc: "Mozza, Cebolla, Aceitunas negras, Orégano, Oliva",
            price: 11000,
            extras: [
                { name: "Muzza extra", price: 800 }
            ]
        },
        {
            name: "Napolitana",
            desc: "Salsa, Mozza, Tomate en rodajas, Orégano",
            price: 12600,
            extras: [
                { name: "Muzza extra", price: 800 }
            ]
        },
        {
            name: "Especial",
            desc: "Salsa, Mozza, Jamón, Huevo duro, Tomate, Aceitunas verdes",
            imagen: "/menu/pizzaesp.jpg",
            price: 13400,
            extras: [
                { name: "Muzza extra", price: 800 }
            ]
        },
        {
            name: "Napo con Jamón",
            desc: "Salsa, Mozza, Jamón, Tomate, Orégano",
            price: 12800,
            extras: [
                { name: "Muzza extra", price: 800 }
            ]
        },
        {
            name: "Jamón y Morrones",
            desc: "Salsa, Mozza, Jamón, Morrones, Aceitunas verdes",
            price: 12600,
            extras: [
                { name: "Muzza extra", price: 800 }
            ]
        },
        {
            name: "4 Quesos",
            desc: "Mozza, Queso azul, Parmesano, Provolone",
            price: 13800,
            extras: [
                { name: "Muzza extra", price: 800 }
            ]
        },
        {
            name: "Americana",
            desc: "Salsa, Mozza, Huevo frito, Panceta", imagen: "/menu/pizzhue.jpg",
            price: 16800,
            extras: [
                { name: "Muzza extra", price: 800 }
            ]
        },
        {
            name: "Anchoas",
            desc: "Salsa, Mozza, Anchoas, Aceitunas negras",
            price: 13800,
            extras: [
                { name: "Muzza extra", price: 800 }
            ]
        },
        {
            name: "Calabresa / Pepperoni",
            desc: "Salsa, Mozza, Longaniza, Aceitunas",
            price: 13600,
            extras: [
                { name: "Muzza extra", price: 800 }
            ]
        },
        {
            name: "Palmitos",
            desc: "Salsa, Mozza, Jamón, Salsa golf, Palmitos, Aceitunas",
            price: 14600,
            extras: [
                { name: "Muzza extra", price: 800 }
            ]
        },
        {
            name: "Tropical",
            desc: "Salsa, Mozza, Jamón, Ananá, Aceitunas",
            price: 15600,
            extras: [
                { name: "Muzza extra", price: 800 }
            ]
        },
        {
            name: "Rúcula",
            desc: "Salsa, Mozza, Jamón crudo, Rúcula, Parmesano, Aceitunas negras",
            price: 16600,
            extras: [
                { name: "Muzza extra", price: 800 }
            ]
        },
        {
            name: "Humita",
            desc: "Salsa, Mozza, Choclo en salsa blanca",
            price: 14400,
            extras: [
                { name: "Muzza extra", price: 800 }
            ]
        }
    ],

    empanadas: {
        sabores: [
            "Carne",
            "Pollo",
            "Jamón y Queso",
            "Cebolla y Queso",
            "Caprese",
            "Panceta y Queso",
            "Napolitana",
            "Cheese Burger",
            "Verduras",
            "Humita",
        ],
        precios: { unidad: 1500, docena: 18000 },
    },
    hamburguesas: [
        {
            name: "Completa Clásica", image: "/menu/cl.jpg", extras: [
                { name: "Medallón extra", price: 1500 }
            ], desc: "Pan Artesanal, Medallón, Lechuga, Tomate, Jamón, Queso y Huevo. Todas las hamburguesas van acompañadas con papas.", price: 8500
        },
        {
            name: "Del Bar", extras: [
                { name: "Medallón extra", price: 1500 }
            ], image: "/menu/hamburgesa_debar.jpg", desc: "Pan Artesanal, Medallón, Lechuga, Tomate, Jamón, Huevo, Queso Cheddar, Panceta crocante, Cebolla Caramelizada. Todas las hamburguesas van acompañadas con papas.", price: 9500
        },
        {
            name: "Cheese Burger", extras: [
                { name: "Medallón extra", price: 1500 }
            ], image: "/menu/cheesebur.jpeg", desc: "Pan Artesanal, Doble Medallón de Carne Smasheada, Doble Cheddar y Cebolla. Todas las hamburguesas van acompañadas con papas.", price: 8000
        },
        {
            name: "Crispy Onion", extras: [
                { name: "Medallón extra", price: 1500 }
            ], image: "/menu/crispy.jpg", desc: "Pan Artesanal, Doble Medallón Smasheado, Panceta Crocante, Doble queso blanco, Cebolla crocante. Todas las hamburguesas van acompañadas con papas.", price: 9000
        },
        {
            name: "Veggie", extras: [
                { name: "Medallón extra", price: 1500 }
            ], image: "/menu/hamburgesa_veggie.jpg", desc: "Medallón, Tomate, Lechuga, Queso, Huevo. Consultar variedad disponible de medallón. Todas las hamburguesas van acompañadas con papas.", price: 7500
        },
    ],
    sandwicheria: [

        {
            name: "Lomito Completo Clásico", image: "/menu/lomo.jpg", extras: [
                { name: "Salsa de ajo", price: 0 }
            ], desc: "Pan Artesanal, Bife de lomo, Lechuga, Tomate, Jamón, Queso, Huevo. Todos los sándwiches van acompañados con papas.", price: 10000,
        },
        {
            name: "Salteado Peruano", image: "/menu/saltpe.jpg", extras: [
                { name: "Salsa de ajo", price: 0 }
            ], desc: "Pan Artesanal, Lomo en tiras, Cebolla morada, Morrón amarillo, Perejil, Tomates en gajos, Salsa agridulce, Rúcula, Cebolla. Todos los sándwiches van acompañados con papas.", price: 10500
        },
        {
            name: "Panini de Pollo", extras: [
                { name: "Salsa de ajo", price: 0 }
            ], image: "/menu/san.jpg", desc: "Suprema grillada, Salsa de Pesto, Mozza, Tomates cherrys, Lechuga repollada. Todos los sándwiches van acompañados con papas.", price: 9500
        },
        {
            name: "Shawarma", image: "/menu/shaw.jpg", extras: [

                { name: "Salsa de ajo", price: 0 }
            ], options: [
                { portion: "Lomo", price: 9000 },
                { portion: "Pollo braseado", price: 9000 },
            ], desc: "Pan pita, Lomo o pollo braseados, Cebolla en pluma, Bañar, Salsa de ajo, Tomates trozados, Gratinado de queso. Todos los sándwiches van acompañados con papas.", price: 9000
        },
        {
            name: "Milanguche",
            image: "/menu/milan.jpg",
            extras: [
                { name: "Salsa de ajo", price: 0 }
            ], options: [
                { portion: "Carne", price: 10000 },
                { portion: "Pollo", price: 10000 },
            ], desc: "Milanesas (carne o pollo), Pan artesanal, Queso, Huevo, Jamón, Tomate, Lechuga, Morrones asados. Todos los sándwiches van acompañados con papas.", price: 10000
        },
    ],


};
