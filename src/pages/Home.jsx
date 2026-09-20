function Home() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-content">
        <h1 id="hero-title" className="hero-title">La Huaca</h1>
        <p className="hero-subtitle">
          Sabores del Perú en cada plato: tradición, ingredientes frescos y el calor de siempre, en el corazón de la ciudad.
        </p>
        <div className="hero-actions">
          <a href="/menu" className="btn btn-accent">Ver menú</a>
          <a href="/reservas" className="btn btn-outline">Reservar mesa</a>
        </div>
      </div>
    </section>
  );
}

export default Home;