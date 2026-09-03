import { useState } from "react";
import { Link } from "react-router-dom";

export default function ConsultarPedido() {
  const [value, setValue] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const search = e => {
    e.preventDefault();
    const query = value.trim().toLowerCase();
    if (!query) return;
    const keys = Object.keys(localStorage).filter(k => k.startsWith("cafe-order-"));
    const orders = keys.map(k => JSON.parse(localStorage.getItem(k))).filter(Boolean);
    const found = orders.find(o => o.number.toLowerCase() === query || o.customer.name.toLowerCase().includes(query));
    setResult(found || null);
    setError(found ? "" : "No encontramos un pedido con ese número o nombre.");
  };

  return (
    <div className="page lookup-page">
      <div className="lookup-intro">
        <span className="eyebrow">SEGUIMIENTO</span>
        <h1>Consulta tu pedido</h1>
        <p>Busca usando el número de pedido o el nombre con el que realizaste la compra.</p>
      </div>

      <form className="lookup-form" onSubmit={search}>
        <input value={value} onChange={e => setValue(e.target.value)} placeholder="Ej. CC-1234567 o Juan Pérez" />
        <button className="button primary" type="submit">Buscar pedido</button>
      </form>

      {error && <div className="alert centered">{error}</div>}

      {result && (
        <article className="status-card">
          <div className="status-top"><div><small>PEDIDO</small><h2>{result.number}</h2></div><span className="status-pill">Recibido</span></div>
          <div className="status-customer"><strong>{result.customer.name}</strong><span>{result.deliveryType === "pickup" ? "🏪 Retiro en cafetería" : "🏠 Entrega a domicilio"}</span></div>
          <div className="status-items">
            {result.items.map(item => <div key={item.id}><span>{item.quantity} × {item.name}</span><strong>₡{(item.unitPrice*item.quantity).toLocaleString("es-CR")}</strong></div>)}
          </div>
          <div className="status-total">Total <strong>₡{result.total.toLocaleString("es-CR")}</strong></div>
          <Link className="button secondary full" to={`/factura/${result.number}`}>Ver comprobante</Link>
        </article>
      )}
    </div>
  );
}