import { useState } from "react";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const [open, setOpen] = useState(false);
  const [extras, setExtras] = useState([]);

  const toggleExtra = (extra) => {
    setExtras((current) =>
      current.some((x) => x.name === extra.name)
        ? current.filter((x) => x.name !== extra.name)
        : [...current, extra]
    );
  };

  const price = product.price + extras.reduce((sum, e) => sum + e.price, 0);

  const add = () => {
    addItem(product, extras);
    setExtras([]);
    setOpen(false);
  };

  return (
    <article className="product-card">
      <div className="product-icon">{product.icon}</div>
      <div className="product-info">
        <span className="category">{product.category}</span>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <strong>₡{product.price.toLocaleString("es-CR")}</strong>
      </div>
      {product.extras?.length > 0 && (
        <button className="button secondary" onClick={() => setOpen(!open)}>
          {open ? "Cerrar opciones" : "Personalizar"}
        </button>
      )}
      {open && (
        <div className="extras-box">
          <h4>Personaliza tu producto</h4>
          {product.extras.map((extra) => (
            <label key={extra.name} className="extra-row">
              <input
                type="checkbox"
                checked={extras.some((x) => x.name === extra.name)}
                onChange={() => toggleExtra(extra)}
              />
              <span>{extra.name}</span>
              <b>+₡{extra.price.toLocaleString("es-CR")}</b>
            </label>
          ))}
          <div className="custom-total">
            Total: <strong>₡{price.toLocaleString("es-CR")}</strong>
          </div>
          <button className="button primary full" onClick={add}>Agregar al pedido</button>
        </div>
      )}
      {!open && (
        <button className="button primary full" onClick={add}>Agregar</button>
      )}
    </article>
  );
}