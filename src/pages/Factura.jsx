import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { useCart } from '../context/OrderContext';

export default function Factura() {
  const { numero } = useParams();
  const { clearCart } = useCart();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    // Si viene por parámetro de ruta o se consulta la última orden
    const orderNumber = numero || localStorage.getItem('cafe-last-order');
    if (orderNumber) {
      const savedData = localStorage.getItem(`cafe-order-${orderNumber}`);
      if (savedData) {
        setOrder(JSON.parse(savedData));
      }
    }
    // Vaciar el carrito tras confirmación exitosa
    clearCart();
  }, [numero]);

  if (!order) {
    return (
      <div className="kiosk-app">
        <Navbar />
        <div className="kiosk-body">
          <Sidebar />
          <main className="kiosk-content">
            <div className="empty-order-state">
              <div className="empty-order-icon">🔍</div>
              <h1 className="empty-order-title">Pedido no encontrado</h1>
              <p className="empty-order-desc">
                No pudimos localizar la información de este comprobante o ya ha expirado.
              </p>
              <Link to="/catalogo" className="btn-explore-menu">
                Volver al catálogo
              </Link>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="kiosk-app">
      <Navbar />

      <div className="kiosk-body">
        <Sidebar />

        <main className="kiosk-content factura-page-layout">
          {/* Header de éxito */}
          <div className="factura-header-banner">
            <div className="success-badge">✓</div>
            <span className="factura-eyebrow">COMPRA CONFIRMADA</span>
            <h1 className="factura-main-title">¡Gracias por tu pedido!</h1>
            <p className="factura-main-desc">
              Tu orden ha sido registrada exitosamente en nuestro sistema.
            </p>
          </div>

          {/* Comprobante / Recibo físico tipo Kiosco */}
          <article className="receipt-container">
            <header className="receipt-head">
              <div className="receipt-brand">
                <span className="receipt-brand-title">☕ Moka &amp; Canela</span>
                <strong className="receipt-doc-type">COMPROBANTE ELECTRÓNICO DE PEDIDO</strong>
              </div>
              <div className="receipt-number-box">
                <small>N.º DE PEDIDO</small>
                <strong className="receipt-order-id">{order.number}</strong>
              </div>
            </header>

            <div className="receipt-meta-grid">
              <div className="receipt-meta-item">
                <small>CLIENTE</small>
                <strong>{order.customer.name}</strong>
              </div>
              <div className="receipt-meta-item">
                <small>CÉDULA</small>
                <strong>{order.customer.cedula}</strong>
              </div>
              <div className="receipt-meta-item">
                <small>TELÉFONO</small>
                <strong>{order.customer.phone}</strong>
              </div>
              <div className="receipt-meta-item">
                <small>FECHA Y HORA</small>
                <strong>{new Date(order.createdAt).toLocaleString('es-CR')}</strong>
              </div>
              <div className="receipt-meta-item">
                <small>MODALIDAD</small>
                <strong>
                  {order.deliveryType === 'pickup' ? '🏪 Retiro en cafetería' : '🛵 Entrega a domicilio'}
                </strong>
              </div>
              <div className="receipt-meta-item">
                <small>MÉTODO DE PAGO</small>
                <strong>{order.paymentMethod || 'Efectivo'}</strong>
              </div>
            </div>

            {/* Desglose de ítems */}
            <div className="receipt-items-section">
              <div className="receipt-items-header">
                <span>Producto</span>
                <span>Subtotal</span>
              </div>

              <div className="receipt-items-list">
                {order.items.map((item) => {
                  const qty = item.quantity || item.cantidad || 1;
                  const unitPrice = Number(item.unitPrice ?? item.precio ?? item.price ?? 0);
                  return (
                    <div key={item.id} className="receipt-item-row">
                      <div className="receipt-item-details">
                        <span className="receipt-item-name">
                          {qty} × {item.nombre || item.name}
                        </span>
                        {item.extras?.length > 0 && (
                          <small className="receipt-item-extras">
                            Extras: {item.extras.map((e) => e.name).join(', ')}
                          </small>
                        )}
                      </div>
                      <strong className="receipt-item-amount">
                        ₡{(unitPrice * qty).toLocaleString('es-CR')}
                      </strong>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Subtotales y Total */}
            <div className="receipt-summary-footer">
              <div className="receipt-subtotal-row">
                <span>Subtotal productos</span>
                <span>₡{Number(order.subtotal || 0).toLocaleString('es-CR')}</span>
              </div>
              <div className="receipt-subtotal-row">
                <span>Costo de envío</span>
                <span>
                  {order.deliveryType === 'delivery'
                    ? `₡${Number(order.deliveryFee || 1500).toLocaleString('es-CR')}`
                    : 'Gratis'}
                </span>
              </div>
              <div className="receipt-grand-total">
                <span>TOTAL PAGADO</span>
                <strong>₡{Number(order.total || 0).toLocaleString('es-CR')}</strong>
              </div>
            </div>

            {/* Dirección de envío si aplica */}
            {order.deliveryType === 'delivery' && (
              <div className="receipt-address-box">
                <small>DIRECCIÓN DE ENTREGA</small>
                <p>
                  {order.customer.address}, {order.customer.district}, {order.customer.canton}, {order.customer.province}
                </p>
              </div>
            )}

            {order.customer.notes && (
              <div className="receipt-notes-box">
                <small>NOTAS DEL PEDIDO</small>
                <p>{order.customer.notes}</p>
              </div>
            )}

            <footer className="receipt-footer-notice">
              <p>Presenta este comprobante al momento de retirar o recibir tu orden.</p>
              <p>¡Esperamos que disfrutes tu café Moka &amp; Canela!</p>
            </footer>
          </article>

          {/* Acciones finales */}
          <div className="factura-actions-bar">
            <button
              type="button"
              className="btn-print-receipt"
              onClick={() => window.print()}
            >
              🖨️ Imprimir comprobante
            </button>
            <Link to="/catalogo" className="btn-return-menu">
              Ordenar más productos →
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}
