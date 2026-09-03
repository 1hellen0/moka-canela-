import { Link } from "react-router-dom";

export default function Inicio() {
  return (
    <div>
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">CAFÉ CENTRAL · SAN JOSÉ</span>
          <h1>Tu café favorito, <em>sin filas.</em></h1>
          <p>Ordena desde tu celular o computadora, personaliza cada producto y elige si vienes a retirarlo o lo recibes en casa.</p>
          <div className="hero-actions">
            <Link className="button primary large" to="/catalogo">Ver menú y ordenar</Link>
            <Link className="button ghost large" to="/consultar">Consultar mi pedido</Link>
          </div>
        </div>
        <div className="hero-card">
          <div className="hero-cup">☕</div>
          <span>Pedido rápido</span>
          <strong>Elige · Personaliza · Confirma</strong>
          <small>Disponible para retiro y domicilio</small>
        </div>
      </section>

      <section className="feature-grid">
        <div><span>01</span><h3>Personaliza</h3><p>Agrega extras, quita ingredientes y ajusta tu pedido.</p></div>
        <div><span>02</span><h3>Elige dónde recibir</h3><p>Retira en la cafetería o solicita entrega a domicilio.</p></div>
        <div><span>03</span><h3>Recibe tu comprobante</h3><p>Obtén un número de pedido para facilitar el retiro.</p></div>
      </section>
    </div>
  );
}