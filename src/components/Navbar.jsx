import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <header className="kiosk-navbar">
      <Link to="/" className="navbar-brand">
        <div className="brand-icon">
          ☕
        </div>
        <div className="brand-text-container">
          <span className="brand-title">Moka &amp; Canela</span>
          <span className="brand-slogan">Café artesanal &amp; momentos únicos</span>
        </div>
      </Link>

      <Link to="/pedido" className="navbar-order-btn">
        <span>🛍️ Mi Pedido</span>
        <span className="order-badge">0</span>
      </Link>
    </header>
  );
}

export default Navbar;
