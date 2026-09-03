import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const location = useLocation();
  const { totalItems } = useCart();

  return (
    <header className="navbar">
      <Link className="brand" to="/">
        <span className="brand-mark">CC</span>
        <span>
          <strong>Café Central</strong>
          <small>San José, Costa Rica</small>
        </span>
      </Link>

      <nav>
        <Link className={location.pathname === "/" ? "active" : ""} to="/">Inicio</Link>
        <Link className={location.pathname === "/catalogo" ? "active" : ""} to="/catalogo">Menú</Link>
        <Link className={location.pathname === "/consultar" ? "active" : ""} to="/consultar">Consultar pedido</Link>
        <Link className="cart-link" to="/pedido">🛒 Pedido <b>{totalItems}</b></Link>
      </nav>
    </header>
  );
}