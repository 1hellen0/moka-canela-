# Café Central — Sistema de pedidos React

Sistema frontend de pedidos para una cafetería en San José, Costa Rica.

## Estructura

Componentes → Páginas → Rutas → App → main

- `src/components/` — componentes reutilizables
- `src/pages/` — pantallas
- `src/data/` — catálogo de productos
- `src/context/` — estado global del carrito
- `src/App.jsx` — rutas
- `src/main.jsx` — punto de entrada

## Funciones

- Catálogo por categorías.
- Carrito de compras.
- Aumento y disminución de cantidades.
- Eliminación individual de productos.
- Vaciar pedido completo.
- Personalización de ingredientes.
- Extras con costo adicional.
- Modalidad de retiro o entrega a domicilio.
- Formulario de datos del cliente.
- Validación para impedir pedidos vacíos.
- Generación automática de número de pedido.
- Comprobante/factura del pedido.
- Opciones de pago mostradas después de confirmar.
- Consulta de pedido por número o nombre.
- Persistencia de pedidos en `localStorage`.

## Ejecutar

Requiere Node.js.

```bash
npm install
npm run dev
```

Luego abre la URL indicada por Vite.

> Nota: es un prototipo frontend. Los pagos, inventario, facturación fiscal y persistencia multiusuario todavía requerirían backend e integración con servicios reales.
