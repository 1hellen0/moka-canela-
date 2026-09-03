import { useCart } from "../context/CartContext";

export default function DeliverySelector() {
  const { deliveryType, setDeliveryType } = useCart();

  return (
    <section className="delivery-selector">
      <h2>¿Dónde consumirás tu pedido?</h2>
      <p>Elige cómo quieres recibirlo.</p>
      <div className="delivery-options">
        <button
          className={deliveryType === "pickup" ? "delivery-option selected" : "delivery-option"}
          onClick={() => setDeliveryType("pickup")}
        >
          <span>🏪</span>
          <div><strong>Retirar en el negocio</strong><small>Te avisaremos cuando esté listo.</small></div>
        </button>
        <button
          className={deliveryType === "delivery" ? "delivery-option selected" : "delivery-option"}
          onClick={() => setDeliveryType("delivery")}
        >
          <span>🏠</span>
          <div><strong>Entrega a domicilio</strong><small>Recíbelo en tu dirección.</small></div>
        </button>
      </div>
    </section>
  );
}