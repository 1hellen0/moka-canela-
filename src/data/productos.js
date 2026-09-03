import coffeeHeroImg from '../assets/coffee-hero.jpg';

// Generador de placeholders SVG visualmente atractivos con la paleta de Moka & Canela
const createSvgPlaceholder = (bgColor, accentColor, iconSvg) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%">
    <defs>
      <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${bgColor}" />
        <stop offset="100%" stop-color="${accentColor}" />
      </linearGradient>
      <radialGradient id="glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.25"/>
        <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="400" height="300" fill="url(#grad)" />
    <circle cx="200" cy="150" r="110" fill="url(#glow)" />
    <circle cx="200" cy="150" r="70" fill="#FFFFFF" fill-opacity="0.15" />
    <g transform="translate(140, 90) scale(2)">
      ${iconSvg}
    </g>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

// Iconos vectoriales estilizados para cada categoría
const coldDrinkSvg = `
  <path d="M12 2v4M20 2v4M16 2v4" stroke="#FFF9F2" stroke-width="2" stroke-linecap="round"/>
  <path d="M10 6h40l-5 46a4 4 0 0 1-4 4H19a4 4 0 0 1-4-4L10 6z" fill="#C88A4A" fill-opacity="0.85" stroke="#FFF9F2" stroke-width="2"/>
  <circle cx="25" cy="25" r="4" fill="#FFFFFF" fill-opacity="0.8"/>
  <circle cx="35" cy="35" r="3" fill="#FFFFFF" fill-opacity="0.8"/>
  <path d="M18 16h24" stroke="#FFF9F2" stroke-width="1.5" stroke-dasharray="2 2"/>
`;

const bakerySvg = `
  <path d="M30 10 C15 10 8 25 10 38 C12 48 22 52 30 52 C38 52 48 48 50 38 C52 25 45 10 30 10 Z" fill="#C88A4A" stroke="#FFF9F2" stroke-width="2"/>
  <path d="M18 28 Q30 38 42 28" fill="none" stroke="#4B2E20" stroke-width="2.5" stroke-linecap="round"/>
  <path d="M22 20 Q30 28 38 20" fill="none" stroke="#4B2E20" stroke-width="2" stroke-linecap="round"/>
`;

const dessertSvg = `
  <path d="M10 40 L50 40 L45 20 L25 15 L15 25 Z" fill="#6F4E37" stroke="#FFF9F2" stroke-width="2"/>
  <path d="M10 40 L50 40 L48 48 L12 48 Z" fill="#4B2E20"/>
  <circle cx="25" cy="14" r="5" fill="#C88A4A" stroke="#FFF9F2" stroke-width="1.5"/>
  <path d="M14 27 C20 25 35 25 45 23" stroke="#FFF9F2" stroke-width="2" fill="none"/>
`;

const foodSvg = `
  <path d="M8 32 C8 24 16 20 30 20 C44 20 52 24 52 32 L52 36 L8 36 Z" fill="#C88A4A" stroke="#FFF9F2" stroke-width="2"/>
  <rect x="6" y="36" width="48" height="6" rx="2" fill="#6F4E37"/>
  <path d="M10 42 C10 46 16 50 30 50 C44 50 50 46 50 42 Z" fill="#C88A4A" stroke="#FFF9F2" stroke-width="2"/>
  <circle cx="20" cy="27" r="1.5" fill="#FFF9F2"/>
  <circle cx="30" cy="25" r="1.5" fill="#FFF9F2"/>
  <circle cx="40" cy="27" r="1.5" fill="#FFF9F2"/>
`;

const imgCold = createSvgPlaceholder('#4B2E20', '#6F4E37', coldDrinkSvg);
const imgBakery = createSvgPlaceholder('#6F4E37', '#C88A4A', bakerySvg);
const imgDessert = createSvgPlaceholder('#4B2E20', '#C88A4A', dessertSvg);
const imgFood = createSvgPlaceholder('#6F4E37', '#4B2E20', foodSvg);

export const productos = [
  // --- Categoría: Cafés ---
  {
    id: 1,
    nombre: 'Espresso',
    descripcion: 'Extracción pura e intensa de granos seleccionados con crema densa color avellana.',
    precio: 1500,
    categoria: 'Cafés',
    imagen: coffeeHeroImg,
  },
  {
    id: 2,
    nombre: 'Cappuccino',
    descripcion: 'Equilibrio perfecto de café espresso, leche vaporizada y abundante espuma con canela.',
    precio: 2400,
    categoria: 'Cafés',
    imagen: coffeeHeroImg,
  },
  {
    id: 3,
    nombre: 'Latte',
    descripcion: 'Suave espresso combinado con abundante leche cremada y un toque sedoso artesanal.',
    precio: 2600,
    categoria: 'Cafés',
    imagen: coffeeHeroImg,
  },
  {
    id: 4,
    nombre: 'Moka',
    descripcion: 'Nuestra receta insignia: café espresso, chocolate artesanal, leche y canela espolvoreada.',
    precio: 2800,
    categoria: 'Cafés',
    imagen: coffeeHeroImg,
  },
  {
    id: 5,
    nombre: 'Americano',
    descripcion: 'Espresso doble rebajado en agua caliente para resaltar los matices florales del grano.',
    precio: 1800,
    categoria: 'Cafés',
    imagen: coffeeHeroImg,
  },

  // --- Categoría: Bebidas frías ---
  {
    id: 6,
    nombre: 'Cold Brew',
    descripcion: 'Infusión en frío durante 18 horas para un café refrescante, dulce y de baja acidez.',
    precio: 2500,
    categoria: 'Bebidas frías',
    imagen: imgCold,
  },
  {
    id: 7,
    nombre: 'Frappé de café',
    descripcion: 'Bebida helada batida con espresso, leche, sirope de caramelo y crema batida.',
    precio: 3200,
    categoria: 'Bebidas frías',
    imagen: imgCold,
  },
  {
    id: 8,
    nombre: 'Iced Latte',
    descripcion: 'Doble shot de espresso servido sobre leche fría y cubos de hielo artesanal.',
    precio: 2700,
    categoria: 'Bebidas frías',
    imagen: imgCold,
  },
  {
    id: 9,
    nombre: 'Té frío',
    descripcion: 'Té negro aromático con notas cítricas de limón natural y rodajas de naranja fresca.',
    precio: 2000,
    categoria: 'Bebidas frías',
    imagen: imgCold,
  },

  // --- Categoría: Repostería ---
  {
    id: 10,
    nombre: 'Croissant',
    descripcion: 'Hojaldre tradicional horneado con pura mantequilla, dorado y crujiente por fuera.',
    precio: 2200,
    categoria: 'Repostería',
    imagen: imgBakery,
  },
  {
    id: 11,
    nombre: 'Muffin de chocolate',
    descripcion: 'Bizcocho esponjoso relleno y coronado con chispas de cacao al 70%.',
    precio: 1900,
    categoria: 'Repostería',
    imagen: imgBakery,
  },
  {
    id: 12,
    nombre: 'Roll de canela',
    descripcion: 'Masa suave enrollada con abundante canela de Ceilán y glaseado cremoso de vainilla.',
    precio: 2400,
    categoria: 'Repostería',
    imagen: imgBakery,
  },

  // --- Categoría: Postres ---
  {
    id: 13,
    nombre: 'Cheesecake',
    descripcion: 'Pastel de queso estilo neoyorquino sobre base crocante y coulis de frutos rojos.',
    precio: 3200,
    categoria: 'Postres',
    imagen: imgDessert,
  },
  {
    id: 14,
    nombre: 'Brownie',
    descripcion: 'Pastel denso de chocolate con nueces tostadas y corazón suave de fudge.',
    precio: 2100,
    categoria: 'Postres',
    imagen: imgDessert,
  },
  {
    id: 15,
    nombre: 'Tarta de frutos rojos',
    descripcion: 'Masa sableé rellena de crema pastelera artesanal y frutos del bosque frescos.',
    precio: 3400,
    categoria: 'Postres',
    imagen: imgDessert,
  },

  // --- Categoría: Comida ---
  {
    id: 16,
    nombre: 'Sándwich de pollo',
    descripcion: 'Pechuga marinada a las finas hierbas con queso gouda fundido en pan ciabatta rústico.',
    precio: 3900,
    categoria: 'Comida',
    imagen: imgFood,
  },
  {
    id: 17,
    nombre: 'Sándwich de jamón y queso',
    descripcion: 'Jamón ahumado selecto, queso mozzarella derretido y mantequilla aromatizada.',
    precio: 3500,
    categoria: 'Comida',
    imagen: imgFood,
  },
  {
    id: 18,
    nombre: 'Tostada de aguacate',
    descripcion: 'Pan brioche tostado con aguacate hass, semillas de sésamo, tomate cherry y aceite de oliva.',
    precio: 3200,
    categoria: 'Comida',
    imagen: imgFood,
  },
];

export const categorias = [
  'Todos',
  'Cafés',
  'Bebidas frías',
  'Repostería',
  'Postres',
  'Comida',
];
