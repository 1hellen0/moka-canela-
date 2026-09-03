import React, { createContext, useContext, useMemo, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [deliveryType, setDeliveryType] = useState("pickup");

  const addItem = (product, extras = []) => {
    const extraCost = extras.reduce((sum, e) => sum + e.price, 0);
    const key = `${product.id}-${extras.map(e => e.name).sort().join("|")}`;
    setItems((current) => {
      const found = current.find(item => item.key === key);
      if (found) {
        return current.map(item => item.key === key
          ? { ...item, quantity: item.quantity + 1 }
          : item
        );
      }
      return [...current, {
        key,
        id: `${product.id}-${Date.now()}`,
        productId: product.id,
        name: product.name,
        icon: product.icon,
        quantity: 1,
        basePrice: product.price,
        extras,
        availableExtras: product.extras || [],
        unitPrice: product.price + extraCost
      }];
    });
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) return removeItem(id);
    setItems(current => current.map(item => item.id === id ? { ...item, quantity } : item));
  };

  const removeItem = (id) => setItems(current => current.filter(item => item.id !== id));

  const toggleExtra = (id, extra) => {
    setItems(current => current.map(item => {
      if (item.id !== id) return item;
      const has = item.extras.some(e => e.name === extra.name);
      const nextExtras = has
        ? item.extras.filter(e => e.name !== extra.name)
        : [...item.extras, extra];
      return {
        ...item,
        extras: nextExtras,
        unitPrice: item.basePrice + nextExtras.reduce((sum, e) => sum + e.price, 0)
      };
    }));
  };

  const clearCart = () => setItems([]);

  const subtotal = useMemo(() =>
    items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0), [items]
  );
  const deliveryFee = deliveryType === "delivery" && subtotal > 0 ? 1500 : 0;
  const total = subtotal + deliveryFee;
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      items, addItem, updateQuantity, removeItem, toggleExtra, clearCart,
      deliveryType, setDeliveryType, subtotal, deliveryFee, total, totalItems
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart debe utilizarse dentro de CartProvider");
  return context;
}