import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import OrderItem from '../components/OrderItem';
import OrderSummary from '../components/OrderSummary';
import DeliverySelector from '../components/DeliverySelector';
import { useCart } from '../context/OrderContext';

export default function Pedido() {
  const { items, clearCart, total } = useCart();
  const navigate = useNavigate();

  return (
    <div className="kiosk-app">
      <Navbar />

      <div className="kiosk-body">
        <Sidebar />

        <main className="kiosk-content pedido-page-layout">
          {!items || items.length === 0 ? (
            <div className="empty-order-state">
              <div className="empty-order-icon">🛒</div>
              <span className="empty-order-badge">TU PEDIDO</span>
              <h1 className="empty-order-title">Aún no tienes productos en tu pedido</h1>
              <p className="empty-order-desc">
                Explora nuestras opciones de café de especialidad, repostería y comida artesanal.
              </p>
              <Link to="/catalogo" className="btn-explore-menu">
                Explorar catálogo de productos →
              </Link>
            </div>
          ) : (
            <>
              {/* Encabezado del pedido */}
              <div className="pedido-header">
                <div>
                  <span className="pedido-eyebrow">TU PEDIDO</span>
                  <h1 className="pedido-title">Revisa tu orden</h1>
                  <p className="pedido-subtitle">Ajusta cantidades o personaliza tus opciones.</p>
                </div>

                <button
                  type="button"
                  className="btn-clear-cart"
                  onClick={clearCart}
                  title="Vaciar todo el pedido"
                >
                  🗑️ Vaciar pedido
                </button>
              </div>

              {/* Selector de Entrega (Retiro vs Domicilio) */}
              <DeliverySelector />

              {/* Contenedor principal: Lista de productos + Resumen lateral */}
              <div className="order-content-grid">
                <section className="order-items-container">
                  <div className="order-items-list">
                    {items.map((item) => (
                      <OrderItem key={item.id} item={item} />
                    ))}
                  </div>

                  <div className="order-items-footer">
                    <Link to="/catalogo" className="btn-add-more-products">
                      ＋ Agregar más productos del menú
                    </Link>
                  </div>
                </section>

                <OrderSummary
                  action={
                    <button
                      type="button"
                      className="btn-proceed-checkout"
                      onClick={() => {
                        if (total <= 0) return;
                        navigate('/checkout');
                      }}
                    >
                      Continuar con mis datos →
                    </button>
                  }
                />
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
