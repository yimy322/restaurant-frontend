import { useEffect, useState } from "react";
import { authFetch } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { logout } from "../../utils/api";

function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");

  const loadCategories = async () => {
    const response = await authFetch("/api/categories/");
    setCategories(await response.json());
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleEdit = (category) => {
    setEditingId(category.id);
    setName(category.name);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setName("");
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("¿Seguro que quieres eliminar esta categoría?");
    if (!confirmDelete) return;

    const response = await authFetch(`/api/categories/${id}`, { method: "DELETE" });
    if (!response.ok) {
      const errorData = await response.json();
      setError(errorData.detail || "No se pudo eliminar la categoría.");
      return;
    }
    loadCategories();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const url = editingId ? `/api/categories/${editingId}` : "/api/categories/";
    const method = editingId ? "PUT" : "POST";

    const response = await authFetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      setError(errorData.detail || "No se pudo guardar la categoría.");
      return;
    }

    handleCancelEdit();
    loadCategories();
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
          <h1 className="section-title">Gestionar categorías</h1>
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

      <form className="admin-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nombre</label>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>

        {error && <p className="form-error">{error}</p>}

        <div className="admin-form-actions">
          <button type="submit" className="btn btn-primary">
            {editingId ? "Guardar cambios" : "Crear categoría"}
          </button>
          {editingId && (
            <button type="button" className="btn btn-outline" onClick={handleCancelEdit}>
              Cancelar
            </button>
          )}
        </div>
      </form>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat) => (
            <tr key={cat.id}>
              <td>{cat.name}</td>
              <td className="admin-table-actions">
                <button type="button" className="table-icon-btn" onClick={() => handleEdit(cat)} aria-label={`Editar ${cat.name}`} title="Editar">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <button type="button" className="table-icon-btn table-icon-btn-danger" onClick={() => handleDelete(cat.id)} aria-label={`Eliminar ${cat.name}`} title="Eliminar">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M4 7h16M9 7V4h6v3M6 7l1 13a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-13M10 11v6M14 11v6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default AdminCategories;