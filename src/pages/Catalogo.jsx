import { useState, useMemo } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import CategoryFilter from '../components/CategoryFilter';
import ProductGrid from '../components/ProductGrid';
import { productos, categorias } from '../data/productos';
import { useOrder } from '../context/OrderContext';

function Catalogo() {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todos');
  const [busqueda, setBusqueda] = useState('');
  const [mensajeToast, setMensajeToast] = useState('');

  // Acceso al estado global de la orden
  const { addToCart } = useOrder();

  // Filtrado reactivo por categoría y término de búsqueda
  const productosFiltrados = useMemo(() => {
    return productos.filter((prod) => {
      const coincideCategoria =
        categoriaSeleccionada === 'Todos' || prod.categoria === categoriaSeleccionada;

      const termino = busqueda.trim().toLowerCase();
      const coincideBusqueda =
        !termino ||
        prod.nombre.toLowerCase().includes(termino) ||
        prod.descripcion.toLowerCase().includes(termino);

      return coincideCategoria && coincideBusqueda;
    });
  }, [categoriaSeleccionada, busqueda]);

  // Manejo de interacción de agregar al pedido conectado a OrderContext
  const handleAddToCart = (producto) => {
    addToCart(producto);
    setMensajeToast(`¡"${producto.nombre}" agregado al pedido!`);
    setTimeout(() => {
      setMensajeToast('');
    }, 2000);
  };

  return (
    <div className="kiosk-app">
      <Navbar />

      <div className="kiosk-body">
        <Sidebar />

        <main className="kiosk-content catalogo-layout">
          {/* Encabezado y buscador */}
          <header className="catalogo-header">
            <div className="catalogo-titles">
              <h1 className="catalogo-title">Nuestro menú</h1>
              <p className="catalogo-subtitle">Elige tus favoritos y arma tu pedido.</p>
            </div>

            <div className="catalogo-search-container">
              <span className="search-icon" aria-hidden="true">🔍</span>
              <input
                type="text"
                placeholder="Buscar producto..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="catalogo-search-input"
                aria-label="Buscar producto por nombre o ingrediente"
              />
              {busqueda && (
                <button
                  type="button"
                  onClick={() => setBusqueda('')}
                  className="search-clear-btn"
                  aria-label="Limpiar búsqueda"
                >
                  ✕
                </button>
              )}
            </div>
          </header>

          {/* Filtro de Categorías */}
          <CategoryFilter
            categorias={categorias}
            categoriaSeleccionada={categoriaSeleccionada}
            onSelectCategoria={setCategoriaSeleccionada}
          />

          {/* Barra de estado / conteo */}
          <div className="catalogo-meta-bar">
            <span className="products-counter">
              Mostrando <strong>{productosFiltrados.length}</strong> {productosFiltrados.length === 1 ? 'producto' : 'productos'}
              {categoriaSeleccionada !== 'Todos' && ` en "${categoriaSeleccionada}"`}
              {busqueda && ` para "${busqueda}"`}
            </span>
          </div>

          {/* Cuadrícula de Productos */}
          <ProductGrid
            productos={productosFiltrados}
            onAddToCart={handleAddToCart}
          />

          {/* Notificación flotante de confirmación visual */}
          {mensajeToast && (
            <aside className="toast-notification" role="status" aria-live="polite">
              <span className="toast-icon">🛍️</span>
              <span className="toast-text">{mensajeToast}</span>
            </aside>
          )}
        </main>
      </div>
    </div>
  );
}

export default Catalogo;
