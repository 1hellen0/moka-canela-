import { useCart } from '../context/OrderContext';

export default function DeliverySelector() {
  const { deliveryType, setDeliveryType } = useCart();

  return (
    <section className="delivery-selector-card">
      <div className="delivery-header">
        <h2 className="delivery-title">¿Cómo deseas recibir tu pedido?</h2>
        <p className="delivery-desc">Selecciona la modalidad de entrega.</p>
      </div>

      <div className="delivery-options-grid">
        <button
          type="button"
          className={`delivery-option-btn ${deliveryType === 'pickup' ? 'selected' : ''}`}
          onClick={() => setDeliveryType('pickup')}
        >
          <span className="delivery-icon">🏪</span>
          <div className="delivery-info">
            <strong className="delivery-name">Retirar en el negocio</strong>
            <span className="delivery-detail">Listo en barra • Gratis</span>
          </div>
          {deliveryType === 'pickup' && <span className="delivery-check">✓</span>}
        </button>

        <button
          type="button"
          className={`delivery-option-btn ${deliveryType === 'delivery' ? 'selected' : ''}`}
          onClick={() => setDeliveryType('delivery')}
        >
          <span className="delivery-icon">🛵</span>
          <div className="delivery-info">
            <strong className="delivery-name">Entrega a domicilio</strong>
            <span className="delivery-detail">A tu dirección • +₡1.500</span>
          </div>
          {deliveryType === 'delivery' && <span className="delivery-check">✓</span>}
        </button>
      </div>
    </section>
  );
}
