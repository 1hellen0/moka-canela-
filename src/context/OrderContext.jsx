import { createContext, useContext, useState } from 'react';

const OrderContext = createContext(null);

export function OrderProvider({ children }) {
  const [cart, setCart] = useState([]);

  // 1. addToCart(producto):
  // Si no existe, lo agrega con cantidad: 1. Si ya existe, incrementa cantidad en 1.
  const addToCart = (producto) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.id === producto.id);

      if (existingIndex > -1) {
        return prevCart.map((item, index) =>
          index === existingIndex
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }

      return [
        ...prevCart,
        {
          id: producto.id,
          nombre: producto.nombre,
          descripcion: producto.descripcion,
          precio: Number(producto.precio),
          categoria: producto.categoria,
          imagen: producto.imagen,
          cantidad: 1,
        },
      ];
    });
  };

  // 2. removeFromCart(productoId):
  // Elimina completamente el producto del pedido.
  const removeFromCart = (productoId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productoId));
  };

  // 3. increaseQuantity(productoId):
  // Incrementa la cantidad de un producto existente.
  const increaseQuantity = (productoId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productoId
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      )
    );
  };

  // 4. decreaseQuantity(productoId):
  // Disminuye la cantidad. Si la cantidad llega a 1 y se disminuye, se elimina del pedido.
  const decreaseQuantity = (productoId) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === productoId) {
            return { ...item, cantidad: item.cantidad - 1 };
          }
          return item;
        })
        .filter((item) => item.cantidad > 0)
    );
  };

  // 5. clearCart():
  // Vacía completamente el pedido.
  const clearCart = () => {
    setCart([]);
  };

  // 6. totalItems:
  // Cantidad total de unidades en el pedido (ej. 2 Cappuccinos + 1 Latte = 3).
  const totalItems = cart.reduce((acc, item) => acc + item.cantidad, 0);

  // 7. total:
  // Total monetario numérico: suma de (precio * cantidad) de todos los productos.
  const total = cart.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  const value = {
    cart,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    totalItems,
    total,
  };

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrder debe ser utilizado dentro de un OrderProvider');
  }
  return context;
}
