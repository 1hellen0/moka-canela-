import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

function Catalogo() {
  return (
    <div className="kiosk-app">
      <Navbar />
      <div className="kiosk-body">
        <Sidebar />
        <main className="kiosk-content">
          <section className="page-placeholder-card">
            <h1>Página Catálogo</h1>
            <p>Aquí se desplegarán las categorías y productos de café en la siguiente etapa.</p>
          </section>
        </main>
      </div>
    </div>
  );
}

export default Catalogo;
