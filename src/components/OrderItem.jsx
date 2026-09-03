import { useCart } from '../context/OrderContext';

export default function OrderItem({ item }) {
  const { updateQuantity, removeItem, toggleExtra } = useCart();

  const itemQty = item.quantity || item.cantidad || 1;
  const itemUnitPrice = Number(item.unitPrice ?? item.precio ?? item.price ?? 0);
  const itemTotal = itemUnitPrice * itemQty;

  return (
    <article className="order-item">
      <div className="order-icon-box">
        {item.imagen ? (
          <img src={item.imagen} alt={item.nombre || item.name} className="order-item-img" />
        ) : (
          <span className="order-icon-emoji">{item.icon || '☕'}</span>
        )}
      </div>

      <div className="order-main">
        <div className="order-title-row">
          <div>
            <h3 className="order-item-name">{item.nombre || item.name}</h3>
            <span className="order-unit-price">₡{itemUnitPrice.toLocaleString('es-CR')} c/u</span>
            {item.extras?.length > 0 && (
              <p className="extras-summary">
                Extras: {item.extras.map((e) => e.name).join(', ')}
              </p>
            )}
          </div>

          <button
            type="button"
            className="btn-remove-item"
            onClick={() => removeItem(item.id)}
            title="Eliminar del pedido"
          >
            🗑️ Eliminar
          </button>
        </div>

        {item.availableExtras?.length > 0 && (
          <div className="edit-extras">
            <span>Personalizar:</span>
            {item.availableExtras.map((extra) => {
              const isSelected = item.extras?.some((e) => e.name === extra.name);
              return (
                <button
                  type="button"
                  key={extra.name}
                  className={isSelected ? 'chip selected' : 'chip'}
                  onClick={() => toggleExtra(item.id, extra)}
                >
                  {isSelected ? '✓ ' : '+ '}
                  {extra.name}
                  {extra.price ? ` ₡${Number(extra.price).toLocaleString('es-CR')}` : ''}
                </button>
              );
            })}
          </div>
        )}

        <div className="order-bottom-row">
          <div className="qty-control">
            <button
              type="button"
              className="qty-btn"
              onClick={() => updateQuantity(item.id, itemQty - 1)}
              aria-label="Disminuir cantidad"
            >
              −
            </button>
            <span className="qty-number">{itemQty}</span>
            <button
              type="button"
              className="qty-btn"
              onClick={() => updateQuantity(item.id, itemQty + 1)}
              aria-label="Aumentar cantidad"
            >
              +
            </button>
          </div>

          <strong className="order-line-total">
            ₡{itemTotal.toLocaleString('es-CR')}
          </strong>
        </div>
      </div>
    </article>
  );
}
