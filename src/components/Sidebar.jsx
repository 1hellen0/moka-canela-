import { NavLink } from 'react-router-dom';

function Sidebar() {
  return (
    <aside className="kiosk-sidebar">
      <div className="sidebar-title">Menú Principal</div>

      <NavLink
        to="/"
        end
        className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
      >
        <span className="sidebar-icon">🏠</span>
        <span>Inicio</span>
      </NavLink>

      <NavLink
        to="/catalogo"
        className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
      >
        <span className="sidebar-icon">☕</span>
        <span>Catálogo</span>
      </NavLink>

      <NavLink
        to="/pedido"
        className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
      >
        <span className="sidebar-icon">📋</span>
        <span>Mi pedido</span>
      </NavLink>

      <NavLink
        to="/confirmacion"
        className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
      >
        <span className="sidebar-icon">✅</span>
        <span>Confirmación</span>
      </NavLink>
    </aside>
  );
}

export default Sidebar;
