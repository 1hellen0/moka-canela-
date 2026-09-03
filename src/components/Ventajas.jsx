function Ventajas() {
  const items = [
    {
      icon: '⏱️',
      title: 'Café preparado al momento',
      desc: 'Molienda y extracción en el instante para garantizar la máxima frescura y aroma.',
    },
    {
      icon: '🌿',
      title: 'Ingredientes seleccionados',
      desc: 'Granos de origen ético, leche fresca y canela pura de Ceilán en cada receta.',
    },
    {
      icon: '⚡',
      title: 'Pedido rápido',
      desc: 'Pantalla ágil y táctil diseñada para ordenar a tu propio ritmo sin filas.',
    },
  ];

  return (
    <section className="ventajas-section">
      <div className="ventajas-grid">
        {items.map((item, index) => (
          <article key={index} className="ventaja-card">
            <div className="ventaja-icon-box">
              <span>{item.icon}</span>
            </div>
            <div className="ventaja-text-content">
              <h2 className="ventaja-title">{item.title}</h2>
              <p className="ventaja-desc">{item.desc}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Ventajas;
