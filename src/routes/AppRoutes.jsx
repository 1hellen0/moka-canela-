import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Catalogo from '../pages/Catalogo';
import Pedido from '../pages/Pedido';
import Checkout from '../pages/Checkout';
import Factura from '../pages/Factura';
import Confirmacion from '../pages/Confirmacion';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/catalogo" element={<Catalogo />} />
      <Route path="/pedido" element={<Pedido />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/factura" element={<Factura />} />
      <Route path="/factura/:numero" element={<Factura />} />
      <Route path="/confirmacion" element={<Confirmacion />} />
    </Routes>
  );
}

export default AppRoutes;
