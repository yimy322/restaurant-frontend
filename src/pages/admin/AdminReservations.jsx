import { useEffect, useState } from "react";
import { authFetch } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { logout } from "../../utils/api";

const STATUS_LABELS = {
  pending: "Pendiente",
  confirmed: "Confirmada",
  cancelled: "Cancelada",
};

function AdminReservations() {
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState("");

  const loadReservations = async () => {
    const response = await authFetch("/api/reservations/");
    setReservations(await response.json());
  };

  useEffect(() => {
    loadReservations();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    setError("");
    const response = await authFetch(`/api/reservations/${id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      setError(errorData.detail || "No se pudo actualizar el estado.");
      return;
    }

    loadReservations();
  };

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
          <h1 className="section-title">Gestionar reservas</h1>
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

      {error && <p className="form-error">{error}</p>}

      <table className="admin-table">
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Teléfono</th>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Personas</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((res) => (
            <tr key={res.id}>
              <td>{res.customer_name}</td>
              <td>{res.phone}</td>
              <td>{res.reservation_date}</td>
              <td>{res.reservation_time}</td>
              <td>{res.guests}</td>
              <td>
                <select
                  value={res.status}
                  onChange={(e) => handleStatusChange(res.id, e.target.value)}
                  className={`status-select status-${res.status}`}
                >
                  {Object.entries(STATUS_LABELS).map(([value, label]) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default AdminReservations;