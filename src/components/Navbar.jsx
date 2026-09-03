import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
      <Link to="/">Home</Link>
      <Link to="/catalogo">Catálogo</Link>
      <Link to="/pedido">Pedido</Link>
      <Link to="/confirmacion">Confirmación</Link>
    </nav>
  );
}

export default Navbar;
