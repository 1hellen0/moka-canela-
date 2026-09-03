import { createContext, useContext, useMemo, useState } from 'react';

const OrderContext = createContext(null);

export function OrderProvider({ children }) {
  const [items, setItems] = useState([]);
  const [deliveryType, setDeliveryType] = useState('pickup'); // 'pickup' | 'delivery'

  // Función unificada para agregar producto compatible con Moka & Canela y con Hellen
  const addItem = (product, extras = []) => {
    if (!product) return;

    const extraCost = Array.isArray(extras)
      ? extras.reduce((sum, e) => sum + (Number(e.price) || 0), 0)
      : 0;

    const extrasKey = Array.isArray(extras)
      ? extras.map((e) => e.name).sort().join('|')
      : '';

    const key = `${product.id}-${extrasKey}`;

    setItems((currentItems) => {
      const existingIndex = currentItems.findIndex(
        (item) => item.key === key || (item.productId === product.id && (!extras || extras.length === 0 && (!item.extras || item.extras.length === 0)))
      );

      if (existingIndex > -1) {
        return currentItems.map((item, index) => {
          if (index === existingIndex) {
            const nextQty = (item.quantity || item.cantidad || 1) + 1;
            return {
              ...item,
              quantity: nextQty,
              cantidad: nextQty,
            };
          }
          return item;
        });
      }

      const basePrice = Number(product.precio ?? product.price ?? product.basePrice ?? product.unitPrice ?? 0);
      const unitPrice = basePrice + extraCost;
      const defaultIcon = product.icon || (
        product.categoria === 'Bebidas frías' ? '🧊' :
        product.categoria === 'Repostería' ? '🥐' :
        product.categoria === 'Postres' ? '🍰' :
        product.categoria === 'Comida' ? '🥪' : '☕'
      );

      const newItem = {
        key,
        id: `${product.id}-${Date.now()}`,
        productId: product.id,
        nombre: product.nombre || product.name || 'Producto',
        name: product.nombre || product.name || 'Producto',
        descripcion: product.descripcion || product.description || '',
        categoria: product.categoria || product.category || 'Cafés',
        imagen: product.imagen || product.image || '',
        icon: defaultIcon,
        basePrice,
        unitPrice,
        precio: unitPrice,
        price: unitPrice,
        quantity: 1,
        cantidad: 1,
        extras: Array.isArray(extras) ? extras : [],
        availableExtras: product.extras || product.availableExtras || [],
      };

      return [...currentItems, newItem];
    });
  };

  // Alias para mantener compatibilidad con addToCart de Moka
  const addToCart = addItem;

  // Actualizar cantidad específica
  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      return removeItem(id);
    }
    setItems((current) =>
      current.map((item) =>
        item.id === id || item.productId === id
          ? { ...item, quantity, cantidad: quantity }
          : item
      )
    );
  };

  // Incrementar cantidad
  const increaseQuantity = (id) => {
    setItems((current) =>
      current.map((item) =>
        item.id === id || item.productId === id
          ? {
              ...item,
              quantity: (item.quantity || item.cantidad || 1) + 1,
              cantidad: (item.quantity || item.cantidad || 1) + 1,
            }
          : item
      )
    );
  };

  // Disminuir cantidad con eliminación si llega a 0
  const decreaseQuantity = (id) => {
    setItems((current) =>
      current
        .map((item) => {
          if (item.id === id || item.productId === id) {
            const nextQty = (item.quantity || item.cantidad || 1) - 1;
            return { ...item, quantity: nextQty, cantidad: nextQty };
          }
          return item;
        })
        .filter((item) => (item.quantity || item.cantidad || 0) > 0)
    );
  };

  // Eliminar ítem completamente
  const removeItem = (id) => {
    setItems((current) => current.filter((item) => item.id !== id && item.productId !== id));
  };
  const removeFromCart = removeItem;

  // Modificar extras en un ítem existente
  const toggleExtra = (id, extra) => {
    setItems((current) =>
      current.map((item) => {
        if (item.id !== id && item.productId !== id) return item;
        const currentExtras = Array.isArray(item.extras) ? item.extras : [];
        const has = currentExtras.some((e) => e.name === extra.name);
        const nextExtras = has
          ? currentExtras.filter((e) => e.name !== extra.name)
          : [...currentExtras, extra];
        const extraCost = nextExtras.reduce((sum, e) => sum + (Number(e.price) || 0), 0);
        const newUnitPrice = item.basePrice + extraCost;

        return {
          ...item,
          extras: nextExtras,
          unitPrice: newUnitPrice,
          precio: newUnitPrice,
          price: newUnitPrice,
        };
      })
    );
  };

  // Vaciar carrito
  const clearCart = () => {
    setItems([]);
  };

  // Cálculos de totales numéricos
  const subtotal = useMemo(() => {
    return items.reduce((sum, item) => {
      const unit = Number(item.unitPrice ?? item.precio ?? item.price ?? 0);
      const qty = Number(item.quantity ?? item.cantidad ?? 1);
      return sum + unit * qty;
    }, 0);
  }, [items]);

  const deliveryFee = deliveryType === 'delivery' && subtotal > 0 ? 1500 : 0;
  const total = subtotal + deliveryFee;
  const totalItems = useMemo(() => {
    return items.reduce((sum, item) => sum + Number(item.quantity ?? item.cantidad ?? 1), 0);
  }, [items]);

  const contextValue = {
    // Listas (soporte dual para cart / items)
    items,
    cart: items,

    // Funciones
    addItem,
    addToCart,
    updateQuantity,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    removeFromCart,
    toggleExtra,
    clearCart,

    // Entrega y totales
    deliveryType,
    setDeliveryType,
    subtotal,
    deliveryFee,
    total,
    totalItems,
  };

  return (
    <OrderContext.Provider value={contextValue}>
      {children}
    </OrderContext.Provider>
  );
}

// Hook original de Moka & Canela
export function useOrder() {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrder debe ser utilizado dentro de un OrderProvider');
  }
  return context;
}

// Hook de compatibilidad para código de Hellen
export function useCart() {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useCart debe utilizarse dentro de un OrderProvider o CartProvider');
  }
  return context;
}

// Exportación alternativa del Provider por compatibilidad
export const CartProvider = OrderProvider;
