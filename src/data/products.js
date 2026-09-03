export const categories = ["Todos", "Cafés", "Bebidas", "Comida", "Repostería"];

export const products = [
  {
    id: 1, name: "Cappuccino", category: "Cafés", icon: "☕", price: 1800,
    description: "Espresso, leche vaporizada y espuma cremosa.",
    extras: [{name:"Leche de almendra",price:500},{name:"Shot extra de espresso",price:700},{name:"Canela",price:0}]
  },
  {
    id: 2, name: "Latte", category: "Cafés", icon: "☕", price: 1900,
    description: "Espresso suave con leche cremosa.",
    extras: [{name:"Leche de almendra",price:500},{name:"Shot extra de espresso",price:700},{name:"Vainilla",price:300}]
  },
  {
    id: 3, name: "Americano", category: "Cafés", icon: "☕", price: 1500,
    description: "Espresso doble y agua caliente.",
    extras: [{name:"Shot extra de espresso",price:700},{name:"Leche",price:300}]
  },
  {
    id: 4, name: "Chocolate frío", category: "Bebidas", icon: "🥤", price: 2200,
    description: "Chocolate, leche, hielo y crema.",
    extras: [{name:"Crema extra",price:400},{name:"Chispas de chocolate",price:300}]
  },
  {
    id: 5, name: "Té frío de limón", category: "Bebidas", icon: "🍋", price: 1700,
    description: "Té negro, limón y hielo.",
    extras: [{name:"Limón extra",price:200},{name:"Miel",price:300}]
  },
  {
    id: 6, name: "Sándwich de pollo", category: "Comida", icon: "🥪", price: 4200,
    description: "Pollo, queso, lechuga, tomate y salsa de la casa.",
    extras: [{name:"Queso extra",price:600},{name:"Tocino",price:900},{name:"Sin tomate",price:0},{name:"Sin cebolla",price:0},{name:"Salsa extra",price:300}]
  },
  {
    id: 7, name: "Bagel de jamón y queso", category: "Comida", icon: "🥯", price: 3900,
    description: "Bagel tostado con jamón y queso.",
    extras: [{name:"Queso extra",price:600},{name:"Tocino",price:900},{name:"Salsa especial",price:300}]
  },
  {
    id: 8, name: "Croissant", category: "Repostería", icon: "🥐", price: 2300,
    description: "Croissant de mantequilla horneado.",
    extras: [{name:"Jamón",price:700},{name:"Queso",price:600}]
  },
  {
    id: 9, name: "Cheesecake", category: "Repostería", icon: "🍰", price: 3200,
    description: "Porción de cheesecake con frutos rojos.",
    extras: [{name:"Frutos rojos extra",price:500},{name:"Crema batida",price:400}]
  },
  {
    id: 10, name: "Galleta con chispas", category: "Repostería", icon: "🍪", price: 1400,
    description: "Galleta grande recién horneada.",
    extras: [{name:"Chispas extra",price:300}]
  }
];