export default function Footer() {
  return (
    <footer className="footer">
      <div>
        <strong>Café Central</strong>
        <span>Pedidos ágiles para recoger o recibir en San José.</span>
      </div>
      <span>© {new Date().getFullYear()} Café Central</span>
    </footer>
  );
}