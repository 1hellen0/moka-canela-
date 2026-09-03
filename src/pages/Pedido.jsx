import { Link, useNavigate } from "react-router-dom";
import OrderItem from "../components/OrderItem";
import OrderSummary from "../components/OrderSummary";
import DeliverySelector from "../components/DeliverySelector";
import { useCart } from "../context/CartContext";

export default function Pedido() {
  const { items, clearCart, total } = useCart();
  const navigate = useNavigate();

  if (!items.length) {
    return (
      <div className="empty-state page">
        <div className="empty-icon">🛒</div>
        <span className="eyebrow">TU PEDIDO</span>
        <h1>Aún no tienes productos</h1>
        <p>Agrega comida o bebidas del menú para comenzar.</p>
        <Link className="button primary" to="/catalogo">Explorar menú</Link>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="page-heading compact">
        <div>
          <span className="eyebrow">TU PEDIDO</span>
          <h1>Revisa antes de confirmar</h1>
        </div>
        <button className="button danger-outline" onClick={clearCart}>Vaciar pedido</button>
      </div>

      <DeliverySelector />

      <div className="order-layout">
        <section className="items-card">
          {items.map(item => <OrderItem key={item.id} item={item} />)}
          <Link className="add-more" to="/catalogo">＋ Agregar más productos</Link>
        </section>

        <OrderSummary
          action={
            <button className="button primary full" onClick={() => {
              if (total <= 0) return;
              navigate("/checkout");
            }}>Continuar con mis datos</button>
          }
        />
      </div>
    </div>
  );
}