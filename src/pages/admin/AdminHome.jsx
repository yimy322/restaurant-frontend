import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../utils/api";

const MENU_ITEMS = [
  {
    to: "/admin/platos",
    label: "Platos",
    description: "Crea, edita y elimina los platos del menú.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M4 3v18M4 3c0 3 3 3 3 6s-3 3-3 6M20 3v18M20 8h-3a2 2 0 0 1-2-2V3"
          strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    to: "/admin/categorias",
    label: "Categorías",
    description: "Organiza las categorías del menú.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M4 6h16M4 12h16M4 18h7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    to: "/admin/reservas",
    label: "Reservas",
    description: "Revisa y actualiza el estado de las reservas.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="3.5" y="5" width="17" height="15" rx="2" />
        <path d="M3.5 10h17M8 3v4M16 3v4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

function AdminHome() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <section className="admin-section container">
      <div className="admin-section-header">
        <div className="section-intro admin-intro">
          <span className="eyebrow">Panel de administración</span>
          <h1 className="section-title">¿Qué quieres gestionar?</h1>
        </div>

        <div className="admin-header-actions">
          <button
            type="button"
            className="icon-btn"
            onClick={() => navigate("/admin")}
            aria-label="Ir al panel de administración"
            title="Panel de administración"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M3 11l9-8 9 8M5 10v10a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V10"
                strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <button
            type="button"
            className="icon-btn admin-logout-btn"
            onClick={handleLogout}
            aria-label="Cerrar sesión"
            title="Cerrar sesión"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M15 17l5-5-5-5M20 12H9M13 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h7"
                strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      <div className="admin-menu-grid">
        {MENU_ITEMS.map((item) => (
          <Link key={item.to} to={item.to} className="admin-menu-card">
            <span className="admin-menu-icon">{item.icon}</span>
            <span className="admin-menu-label">{item.label}</span>
            <span className="admin-menu-description">{item.description}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default AdminHome;