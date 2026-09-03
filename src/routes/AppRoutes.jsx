import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Catalogo from '../pages/Catalogo';
import Pedido from '../pages/Pedido';
import Confirmacion from '../pages/Confirmacion';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/catalogo" element={<Catalogo />} />
      <Route path="/pedido" element={<Pedido />} />
      <Route path="/confirmacion" element={<Confirmacion />} />
    </Routes>
  );
}

export default AppRoutes;
