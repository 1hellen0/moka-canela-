import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Hero from '../components/Hero';
import Ventajas from '../components/Ventajas';

function Home() {
  return (
    <div className="kiosk-app">
      <Navbar />
      <div className="kiosk-body">
        <Sidebar />
        <main className="kiosk-content">
          <Hero />
          <Ventajas />
        </main>
      </div>
    </div>
  );
}

export default Home;
