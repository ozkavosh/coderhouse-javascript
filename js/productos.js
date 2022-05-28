//Mock de JSON y Fetch

const productosJSON = [
  {
    name: "Aceite",
    price: 250,
    thumbnailUrl: "./assets/img/aceite.jpg",
    description: "250ml de aceite de primera calidad.",
    category: "varios",
    id: 1,
  },
  {
    name: "Bujia",
    price: 180,
    thumbnailUrl: "./assets/img/bujia.jpg",
    description: "Bujia para motocicleta de 110cc.",
    category: "mecanicos",
    id: 2,
  },
  {
    name: "Bateria",
    price: 390,
    thumbnailUrl: "./assets/img/bateria.jpg",
    description: "Bateria gel para motocicleta.",
    category: "electronicos",
    id: 3,
  },
  {
    name: "Aros",
    price: 200,
    thumbnailUrl: "./assets/img/aros.jpg",
    description: "Kit de aros para piston de motocicleta.",
    category: "mecanicos",
    id: 4,
  },
];

const fetchProductos = () => {
  return new Promise((resolve) => {
    resolve(productosJSON);
  });
};
