import ProductCard from './ProductCard';

function ProductGrid({ productos, onAddToCart }) {
  if (!productos || productos.length === 0) {
    return (
      <div className="empty-catalog-state">
        <div className="empty-state-icon">🔍</div>
        <h3 className="empty-state-title">No se encontraron productos</h3>
        <p className="empty-state-text">
          Intenta buscando con otro término o selecciona una categoría diferente.
        </p>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {productos.map((producto) => (
        <ProductCard
          key={producto.id}
          producto={producto}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
}

export default ProductGrid;
