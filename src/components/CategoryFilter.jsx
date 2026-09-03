function CategoryFilter({ categorias, categoriaSeleccionada, onSelectCategoria }) {
  const categoryIcons = {
    'Todos': '🍽️',
    'Cafés': '☕',
    'Bebidas frías': '🧊',
    'Repostería': '🥐',
    'Postres': '🍰',
    'Comida': '🥪',
  };

  return (
    <nav className="category-filter-container" aria-label="Filtro de categorías de menú">
      <div className="category-filter-scroll">
        {categorias.map((cat) => {
          const isSelected = categoriaSeleccionada === cat;
          const icon = categoryIcons[cat] || '✨';

          return (
            <button
              key={cat}
              type="button"
              onClick={() => onSelectCategoria(cat)}
              className={`category-pill-btn ${isSelected ? 'active' : ''}`}
              aria-pressed={isSelected}
            >
              <span className="category-pill-icon">{icon}</span>
              <span className="category-pill-text">{cat}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

export default CategoryFilter;
