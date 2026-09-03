import { Link } from 'react-router-dom';
import coffeeHeroImg from '../assets/coffee-hero.jpg';

function Hero() {
  return (
    <section className="hero-card">
      <div className="hero-text-content">
        <div className="hero-tag">
          <span>✨ Kiosco de Autoservicio</span>
        </div>

        <h1 className="hero-title">¡Bienvenido a Moka &amp; Canela!</h1>

        <p className="hero-subtitle">
          Elige, personaliza y disfruta tu café perfecto.
        </p>

        <Link to="/catalogo" className="hero-cta-btn">
          Comenzar pedido →
        </Link>
      </div>

      <div className="hero-image-container">
        <img
          src={coffeeHeroImg}
          alt="Café de especialidad con canela y arte latte en Moka & Canela"
          className="hero-img"
        />
        <div className="hero-image-overlay-badge">
          <span>☕ 100% Granos de Especialidad</span>
        </div>
      </div>
    </section>
  );
}

export default Hero;
