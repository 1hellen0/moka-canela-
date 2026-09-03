import { useCart } from "../context/CartContext";

export default function OrderItem({ item }) {
  const { updateQuantity, removeItem, toggleExtra } = useCart();

  return (
    <article className="order-item">
      <div className="order-icon">{item.icon}</div>
      <div className="order-main">
        <div className="order-title">
          <div>
            <h3>{item.name}</h3>
            {item.extras?.length > 0 && (
              <p className="extras-summary">
                Extras: {item.extras.map(e => e.name).join(", ")}
              </p>
            )}
          </div>
          <button className="remove" onClick={() => removeItem(item.id)}>Eliminar</button>
        </div>

        {item.availableExtras?.length > 0 && (
          <div className="edit-extras">
            <span>Editar ingredientes:</span>
            {item.availableExtras.map((extra) => (
              <button
                key={extra.name}
                className={item.extras.some(e => e.name === extra.name) ? "chip selected" : "chip"}
                onClick={() => toggleExtra(item.id, extra)}
              >
                {item.extras.some(e => e.name === extra.name) ? "✓ " : "+ "}{extra.name}
                {extra.price ? ` ₡${extra.price}` : ""}
              </button>
            ))}
          </div>
        )}

        <div className="order-bottom">
          <div className="qty">
            <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</button>
            <strong>{item.quantity}</strong>
            <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
          </div>
          <strong>₡{(item.unitPrice * item.quantity).toLocaleString("es-CR")}</strong>
        </div>
      </div>
    </article>
  );
}