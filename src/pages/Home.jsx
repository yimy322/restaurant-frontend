import { Link } from "react-router-dom";
function Home() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-content">
        <h1 id="hero-title" className="hero-title">La Huaca</h1>
        <p className="hero-subtitle">
          Sabores del Perú en cada plato: tradición, ingredientes frescos y el calor de siempre, en el corazón de la ciudad.
        </p>
        <div className="hero-actions">
          <Link to="/menu" className="btn btn-accent">Ver menú</Link>
          <Link to="/reservas" className="btn btn-outline-home">Reservar mesa</Link>
        </div>
      </div>
    </section>
  );
}

export default Home;