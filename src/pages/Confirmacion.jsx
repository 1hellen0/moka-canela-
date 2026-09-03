import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

export default function Confirmacion() {
  const [lastOrder, setLastOrder] = useState(null);

  useEffect(() => {
    const lastOrderNumber = localStorage.getItem('cafe-last-order');
    if (lastOrderNumber) {
      const saved = localStorage.getItem(`cafe-order-${lastOrderNumber}`);
      if (saved) {
        setLastOrder(JSON.parse(saved));
      }
    }
  }, []);

  return (
    <div className="kiosk-app">
      <Navbar />

      <div className="kiosk-body">
        <Sidebar />

        <main className="kiosk-content">
          {lastOrder ? (
            <div className="page-placeholder-card">
              <div className="empty-order-icon">✅</div>
              <h1>Último pedido confirmado</h1>
              <p>
                Tu orden <strong>{lastOrder.number}</strong> fue confirmada por un total de{' '}
                <strong>₡{Number(lastOrder.total).toLocaleString('es-CR')}</strong>.
              </p>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
                <Link to={`/factura/${lastOrder.number}`} className="btn-add-more-products">
                  Ver comprobante completo →
                </Link>
                <Link to="/catalogo" className="btn-explore-menu">
                  Hacer un nuevo pedido
                </Link>
              </div>
            </div>
          ) : (
            <div className="page-placeholder-card">
              <div className="empty-order-icon">📋</div>
              <h1>No hay pedidos recientes</h1>
              <p>Aún no has realizado ningún pedido en esta sesión de autoservicio.</p>
              <Link to="/catalogo" className="btn-explore-menu" style={{ marginTop: '1.5rem' }}>
                Ir al catálogo de productos →
              </Link>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
