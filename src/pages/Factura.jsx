import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";

export default function Factura() {
  const { numero } = useParams();
  const { clearCart } = useCart();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const raw = localStorage.getItem(`cafe-order-${numero}`);
    if (raw) setOrder(JSON.parse(raw));
    clearCart();
  }, [numero]);

  if (!order) return <div className="empty-state page"><h1>Pedido no encontrado</h1><Link className="button primary" to="/consultar">Consultar otro</Link></div>;

  return (
    <div className="page receipt-page">
      <div className="success-badge">✓</div>
      <span className="eyebrow">COMPRA CONFIRMADA</span>
      <h1>¡Gracias por tu pedido!</h1>
      <p>Presenta este comprobante para retirar tu pedido.</p>

      <article className="receipt">
        <div className="receipt-head">
          <div><span>Café Central</span><strong>COMPROBANTE DE PEDIDO</strong></div>
          <div className="receipt-number"><small>N.º DE PEDIDO</small><strong>{order.number}</strong></div>
        </div>

        <div className="receipt-meta">
          <div><small>CLIENTE</small><strong>{order.customer.name}</strong></div>
          <div><small>FECHA</small><strong>{new Date(order.createdAt).toLocaleString("es-CR")}</strong></div>
          <div><small>MODALIDAD</small><strong>{order.deliveryType === "pickup" ? "🏪 Retiro en cafetería" : "🏠 Entrega a domicilio"}</strong></div>
          <div><small>FORMA DE PAGO</small><strong>{order.paymentMethod || "No especificada"}</strong></div>
        </div>

        <div className="receipt-items">
          {order.items.map(item => (
            <div className="receipt-line" key={item.id}>
              <span>{item.quantity} × {item.name}<small>{item.extras?.length ? item.extras.map(e=>e.name).join(", ") : ""}</small></span>
              <strong>₡{(item.unitPrice * item.quantity).toLocaleString("es-CR")}</strong>
            </div>
          ))}
        </div>

        <div className="receipt-total"><span>Total</span><strong>₡{order.total.toLocaleString("es-CR")}</strong></div>

        {order.deliveryType === "delivery" && (
          <div className="address-box">
            <small>ENTREGA</small>
            {order.customer.address}, {order.customer.district}, {order.customer.canton}, {order.customer.province}
          </div>
        )}

        <div className="payment-notice">
          <strong>Pago seleccionado: {order.paymentMethod || "No especificado"}</strong>
          <p>Presenta este comprobante al momento de retirar o recibir tu pedido.</p>
        </div>
      </article>

      <div className="receipt-actions">
        <button className="button secondary" onClick={() => window.print()}>Imprimir comprobante</button>
        <Link className="button primary" to="/consultar">Consultar pedido</Link>
      </div>
    </div>
  );
}