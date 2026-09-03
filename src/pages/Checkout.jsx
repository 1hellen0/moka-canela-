import { useState } from "react";
import { useNavigate } from "react-router-dom";
import OrderSummary from "../components/OrderSummary";
import { useCart } from "../context/CartContext";

const initial = { name:"", phone:"", email:"", cedula:"", address:"", province:"San José", canton:"", district:"", notes:"", paymentMethod:"" };

export default function Checkout() {
  const { items, deliveryType, total } = useCart();
  const [form, setForm] = useState(initial);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  if (!items.length) {
    navigate("/pedido");
    return null;
  }

  const change = e => setForm({...form, [e.target.name]: e.target.value});

  const submit = e => {
    e.preventDefault();
    if (!items.length) return setError("No puedes confirmar un pedido vacío.");
    const required = deliveryType === "delivery"
      ? ["name","phone","email","cedula","address","province","canton","district","paymentMethod"]
      : ["name","phone","email","cedula","paymentMethod"];
    if (required.some(key => !form[key].trim())) {
      setError("Completa todos los campos obligatorios.");
      return;
    }

    const number = `CC-${Date.now().toString().slice(-7)}`;
    const order = {
      number,
      customer: form,
      deliveryType,
      items,
      total,
      createdAt: new Date().toISOString()
    };
    localStorage.setItem(`cafe-order-${number}`, JSON.stringify(order));
    localStorage.setItem("cafe-last-order", number);
    navigate(`/factura/${number}`);
  };

  return (
    <div className="page">
      <div className="page-heading compact">
        <div><span className="eyebrow">PASO FINAL</span><h1>Datos para tu factura</h1></div>
      </div>

      <div className="checkout-layout">
        <form className="form-card" onSubmit={submit}>
          <h2>Información del cliente</h2>
          <p className="form-help">Los datos se utilizarán para generar tu comprobante.</p>
          {error && <div className="alert">{error}</div>}

          <div className="form-grid">
            <label>Nombre completo *<input name="name" value={form.name} onChange={change} placeholder="Ej. Juan Pérez" /></label>
            <label>Cédula *<input name="cedula" value={form.cedula} onChange={change} placeholder="Ej. 1-2345-6789" /></label>
            <label>Teléfono *<input name="phone" value={form.phone} onChange={change} placeholder="Ej. 8888-8888" /></label>
            <label>Correo electrónico *<input type="email" name="email" value={form.email} onChange={change} placeholder="correo@ejemplo.com" /></label>
          </div>

          {deliveryType === "delivery" && (
            <>
              <hr />
              <h2>Dirección de entrega</h2>
              <div className="form-grid">
                <label>Provincia *<select name="province" value={form.province} onChange={change}><option>San José</option><option>Alajuela</option><option>Cartago</option><option>Heredia</option><option>Guanacaste</option><option>Puntarenas</option><option>Limón</option></select></label>
                <label>Cantón *<input name="canton" value={form.canton} onChange={change} placeholder="Ej. San José" /></label>
                <label>Distrito *<input name="district" value={form.district} onChange={change} placeholder="Ej. Carmen" /></label>
                <label>Dirección exacta *<input name="address" value={form.address} onChange={change} placeholder="Señas de la casa o edificio" /></label>
              </div>
            </>
          )}

          <label>Notas del pedido<textarea name="notes" value={form.notes} onChange={change} placeholder="Indicaciones adicionales (opcional)" /></label>

          <hr />
          <h2>Forma de pago</h2>
          <label>Selecciona cómo pagarás *
            <select name="paymentMethod" value={form.paymentMethod} onChange={change}>
              <option value="">Elige una opción</option>
              <option value="Efectivo">Efectivo</option>
              <option value="Tarjeta">Tarjeta</option>
              <option value="SINPE Móvil">SINPE Móvil</option>
            </select>
          </label>

          <button className="button primary full large" type="submit">Confirmar compra</button>
        </form>

        <OrderSummary />
      </div>
    </div>
  );
}