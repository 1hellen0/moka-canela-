import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Inicio from "./pages/Inicio";
import Catalogo from "./pages/Catalogo";
import Pedido from "./pages/Pedido";
import Checkout from "./pages/Checkout";
import Factura from "./pages/Factura";
import ConsultarPedido from "./pages/ConsultarPedido";

export default function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/pedido" element={<Pedido />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/factura/:numero" element={<Factura />} />
          <Route path="/consultar" element={<ConsultarPedido />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}