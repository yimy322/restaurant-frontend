import { Link, NavLink } from "react-router-dom";

function Header() {
  return (
    <header className="site-header">
      <div className="container header-container">
        <Link to="/" className="logo">La Huaca · Cocina Peruana</Link>
        <nav className="main-nav" aria-label="Navegación principal">
          <ul>
            <li>
              <NavLink to="/" end className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                Inicio
              </NavLink>
            </li>
            <li>
              <NavLink to="/menu" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                Menú
              </NavLink>
            </li>
            <li>
              <NavLink to="/reservas" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                Reservas
              </NavLink>
            </li>
            <li>
              <NavLink to="/contacto" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                Contacto
              </NavLink>
            </li>
          </ul>
        </nav>
        <Link to="/reservas" className="btn btn-primary header-cta">Reservar mesa</Link>
      </div>
    </header>
  );
}

export default Header;