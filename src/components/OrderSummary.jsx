import { useCart } from "../context/CartContext";

export default function OrderSummary({ action }) {
  const { subtotal, deliveryFee, total, deliveryType } = useCart();

  return (
    <aside className="summary-card">
      <h2>Resumen del pedido</h2>
      <div className="summary-row"><span>Subtotal</span><b>₡{subtotal.toLocaleString("es-CR")}</b></div>
      <div className="summary-row">
        <span>Entrega</span>
        <b>{deliveryType === "delivery" ? `₡${deliveryFee.toLocaleString("es-CR")}` : "Gratis"}</b>
      </div>
      <div className="summary-total"><span>Total</span><strong>₡{total.toLocaleString("es-CR")}</strong></div>
      {action}
    </aside>
  );
}