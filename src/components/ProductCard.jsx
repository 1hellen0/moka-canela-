import { useState } from 'react';

function ProductCard({ producto, onAddToCart }) {
  const [agregado, setAgregado] = useState(false);

  const handleAgregar = () => {
    setAgregado(true);
    if (onAddToCart) {
      onAddToCart(producto);
    }
    setTimeout(() => {
      setAgregado(false);
    }, 1200);
  };

  // Formato de precio en colones costarricenses
  const precioFormateado = `₡${producto.precio.toLocaleString('es-CR')}`;

  return (
    <article className="product-card">
      <div className="product-image-wrapper">
        <img
          src={producto.imagen}
          alt={producto.nombre}
          className="product-image"
          loading="lazy"
        />
        <span className="product-category-badge">{producto.categoria}</span>
      </div>

      <div className="product-info">
        <h3 className="product-name">{producto.nombre}</h3>
        <p className="product-description">{producto.descripcion}</p>

        <div className="product-footer">
          <span className="product-price">{precioFormateado}</span>
          <button
            type="button"
            onClick={handleAgregar}
            className={`btn-add-product ${agregado ? 'added' : ''}`}
            aria-label={`Agregar ${producto.nombre} al pedido`}
          >
            {agregado ? (
              <>
                <span className="btn-icon">✓</span>
                <span>¡Agregado!</span>
              </>
            ) : (
              <>
                <span className="btn-icon">+</span>
                <span>Agregar</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
