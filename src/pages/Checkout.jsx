import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import OrderSummary from '../components/OrderSummary';
import { useCart } from '../context/OrderContext';

const initialForm = {
  name: '',
  phone: '',
  email: '',
  cedula: '',
  province: 'San José',
  canton: '',
  district: '',
  address: '',
  notes: '',
  paymentMethod: '',
};

export default function Checkout() {
  const { items, deliveryType, total, subtotal, deliveryFee } = useCart();
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Si no hay productos, redirige de inmediato a /pedido
  useEffect(() => {
    if (!items || items.length === 0) {
      navigate('/pedido');
    }
  }, [items, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!items || items.length === 0) {
      setError('No puedes confirmar un pedido vacío.');
      return;
    }

    // Validación de campos obligatorios
    const requiredFields =
      deliveryType === 'delivery'
        ? ['name', 'cedula', 'phone', 'email', 'province', 'canton', 'district', 'address', 'paymentMethod']
        : ['name', 'cedula', 'phone', 'email', 'paymentMethod'];

    for (const field of requiredFields) {
      if (!form[field] || !form[field].trim()) {
        setError('Por favor completa todos los campos obligatorios señalados con asterisco (*).');
        return;
      }
    }

    // Generar número de pedido único con prefijo CC-
    const randomSuffix = Math.floor(1000000 + Math.random() * 9000000);
    const number = `CC-${randomSuffix}`;

    const orderData = {
      number,
      customer: {
        name: form.name.trim(),
        cedula: form.cedula.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
        province: form.province,
        canton: form.canton.trim(),
        district: form.district.trim(),
        address: form.address.trim(),
        notes: form.notes.trim(),
      },
      deliveryType,
      deliveryFee,
      items,
      subtotal,
      total,
      paymentMethod: form.paymentMethod,
      createdAt: new Date().toISOString(),
    };

    // Almacenamiento temporal en localStorage
    localStorage.setItem(`cafe-order-${number}`, JSON.stringify(orderData));
    localStorage.setItem('cafe-last-order', number);

    // Navegación hacia la factura de confirmación
    navigate(`/factura/${number}`);
  };

  return (
    <div className="kiosk-app">
      <Navbar />

      <div className="kiosk-body">
        <Sidebar />

        <main className="kiosk-content checkout-page-layout">
          <div className="checkout-header">
            <span className="checkout-eyebrow">PASO FINAL</span>
            <h1 className="checkout-title">Datos para tu factura y entrega</h1>
            <p className="checkout-subtitle">Ingresa la información para preparar tu comprobante oficial.</p>
          </div>

          <div className="checkout-content-grid">
            <form className="checkout-form-card" onSubmit={handleSubmit}>
              <h2 className="form-section-title">Información del cliente</h2>
              <p className="form-section-desc">Estos datos se utilizarán para generar tu comprobante.</p>

              {error && (
                <div className="form-error-alert" role="alert">
                  <span className="error-icon">⚠️</span>
                  <span>{error}</span>
                </div>
              )}

              <div className="form-inputs-grid">
                <label className="form-label">
                  Nombre completo *
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Ej. Juan Pérez"
                    className="form-input"
                  />
                </label>

                <label className="form-label">
                  Cédula o identificación *
                  <input
                    type="text"
                    name="cedula"
                    value={form.cedula}
                    onChange={handleChange}
                    placeholder="Ej. 1-2345-6789"
                    className="form-input"
                  />
                </label>

                <label className="form-label">
                  Teléfono *
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Ej. 8888-8888"
                    className="form-input"
                  />
                </label>

                <label className="form-label">
                  Correo electrónico *
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="correo@ejemplo.com"
                    className="form-input"
                  />
                </label>
              </div>

              {deliveryType === 'delivery' && (
                <>
                  <div className="form-divider" />
                  <h2 className="form-section-title">Dirección de entrega a domicilio</h2>
                  <p className="form-section-desc">Indica con precisión el lugar para el envío.</p>

                  <div className="form-inputs-grid">
                    <label className="form-label">
                      Provincia *
                      <select
                        name="province"
                        value={form.province}
                        onChange={handleChange}
                        className="form-select"
                      >
                        <option value="San José">San José</option>
                        <option value="Alajuela">Alajuela</option>
                        <option value="Cartago">Cartago</option>
                        <option value="Heredia">Heredia</option>
                        <option value="Guanacaste">Guanacaste</option>
                        <option value="Puntarenas">Puntarenas</option>
                        <option value="Limón">Limón</option>
                      </select>
                    </label>

                    <label className="form-label">
                      Cantón *
                      <input
                        type="text"
                        name="canton"
                        value={form.canton}
                        onChange={handleChange}
                        placeholder="Ej. San José"
                        className="form-input"
                      />
                    </label>

                    <label className="form-label">
                      Distrito *
                      <input
                        type="text"
                        name="district"
                        value={form.district}
                        onChange={handleChange}
                        placeholder="Ej. Carmen"
                        className="form-input"
                      />
                    </label>

                    <label className="form-label">
                      Dirección exacta *
                      <input
                        type="text"
                        name="address"
                        value={form.address}
                        onChange={handleChange}
                        placeholder="Señas de la casa, condominio o edificio"
                        className="form-input"
                      />
                    </label>
                  </div>
                </>
              )}

              <div className="form-divider" />

              <label className="form-label">
                Notas especiales para el pedido (opcional)
                <textarea
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                  placeholder="Indicaciones adicionales (ej. con poca azúcar, entregar en recepción, etc.)"
                  className="form-textarea"
                />
              </label>

              <div className="form-divider" />
              <h2 className="form-section-title">Método de pago</h2>

              <label className="form-label">
                Selecciona cómo pagarás *
                <select
                  name="paymentMethod"
                  value={form.paymentMethod}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="">Elige una opción</option>
                  <option value="Efectivo">Efectivo al recibir</option>
                  <option value="Tarjeta">Tarjeta de crédito / débito</option>
                  <option value="SINPE Móvil">SINPE Móvil</option>
                </select>
              </label>

              <button type="submit" className="btn-confirm-order">
                Confirmar y generar comprobante →
              </button>
            </form>

            <OrderSummary />
          </div>
        </main>
      </div>
    </div>
  );
}
