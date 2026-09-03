import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

function Confirmacion() {
  return (
    <div className="kiosk-app">
      <Navbar />
      <div className="kiosk-body">
        <Sidebar />
        <main className="kiosk-content">
          <section className="page-placeholder-card">
            <h1>Página Confirmación</h1>
            <p>Aquí se mostrará el número de orden y ticket final del pedido.</p>
          </section>
        </main>
      </div>
    </div>
  );
}

export default Confirmacion;
