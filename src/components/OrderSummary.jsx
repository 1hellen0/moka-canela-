import { useCart } from '../context/OrderContext';

export default function OrderSummary({ action }) {
  const { subtotal, deliveryFee, total, deliveryType, totalItems } = useCart();

  return (
    <aside className="order-summary-card">
      <h2 className="summary-title">Resumen del pedido</h2>
      <p className="summary-subtitle">{totalItems} {totalItems === 1 ? 'artículo' : 'artículos'} en total</p>

      <div className="summary-rows-list">
        <div className="summary-row">
          <span>Subtotal productos</span>
          <strong>₡{subtotal.toLocaleString('es-CR')}</strong>
        </div>

        <div className="summary-row">
          <span>Modalidad de entrega</span>
          <span className="summary-delivery-label">
            {deliveryType === 'delivery' ? 'Domicilio (₡1.500)' : 'Retiro en local (Gratis)'}
          </span>
        </div>

        <div className="summary-row">
          <span>Costo de envío</span>
          <strong className={deliveryFee === 0 ? 'text-free' : ''}>
            {deliveryType === 'delivery' ? `₡${deliveryFee.toLocaleString('es-CR')}` : 'Gratis'}
          </strong>
        </div>

        <div className="summary-total-row">
          <div>
            <span className="total-label">Total a pagar</span>
            <small className="total-taxes-note">IVA incluido</small>
          </div>
          <strong className="total-amount">₡{total.toLocaleString('es-CR')}</strong>
        </div>
      </div>

      {action && <div className="summary-action-box">{action}</div>}
    </aside>
  );
}
