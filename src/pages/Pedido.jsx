import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

function Pedido() {
  return (
    <div className="kiosk-app">
      <Navbar />
      <div className="kiosk-body">
        <Sidebar />
        <main className="kiosk-content">
          <section className="page-placeholder-card">
            <h1>Página Pedido</h1>
            <p>Aquí se revisará el resumen del pedido y artículos seleccionados.</p>
          </section>
        </main>
      </div>
    </div>
  );
}

export default Pedido;
