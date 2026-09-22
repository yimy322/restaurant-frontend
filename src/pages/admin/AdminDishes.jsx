import { useEffect, useRef, useState } from "react";
import { authFetch, API_BASE_URL } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { logout } from "../../utils/api";

const emptyForm = {
  name: "",
  description: "",
  price: "",
  category_id: "",
};

function AdminDishes() {
  const [dishes, setDishes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);
  const [uploadTargetId, setUploadTargetId] = useState(null);

  const loadData = async () => {
    const [dishesRes, categoriesRes] = await Promise.all([
      authFetch("/api/dishes/"),
      authFetch("/api/categories/"),
    ]);
    setDishes(await dishesRes.json());
    setCategories(await categoriesRes.json());
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = (dish) => {
    setEditingId(dish.id);
    setFormData({
      name: dish.name,
      description: dish.description || "",
      price: dish.price,
      category_id: dish.category_id,
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData(emptyForm);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("¿Seguro que quieres eliminar este plato?");
    if (!confirmDelete) return;

    const response = await authFetch(`/api/dishes/${id}`, { method: "DELETE" });
    if (!response.ok) {
      setError("No se pudo eliminar el plato.");
      return;
    }
    loadData();
  };

  const handleUploadClick = (dishId) => {
    setUploadTargetId(dishId);
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file || !uploadTargetId) return;

    const formData = new FormData();
    formData.append("file", file);

    const response = await authFetch(`/api/dishes/${uploadTargetId}/image`, {
        method: "POST",
        body: formData, // sin headers de Content-Type: el navegador lo arma solo con FormData
    });

    if (!response.ok) {
        setError("No se pudo subir la imagen.");
    } else {
        loadData();
    }

    e.target.value = ""; // permite volver a elegir el mismo archivo si hace falta
    setUploadTargetId(null);
   };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const payload = {
      name: formData.name,
      description: formData.description,
      price: Number(formData.price),
      category_id: Number(formData.category_id),
    };

    const url = editingId ? `/api/dishes/${editingId}` : "/api/dishes/";
    const method = editingId ? "PUT" : "POST";

    const response = await authFetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      setError(errorData.detail || "No se pudo guardar el plato.");
      return;
    }

    handleCancelEdit();
    loadData();
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
          <h1 className="section-title">Gestionar platos</h1>
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
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">Nombre</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="price">Precio (S/)</label>
            <input type="number" step="0.01" id="price" name="price" value={formData.price} onChange={handleChange} required />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="description">Descripción</label>
          <textarea id="description" name="description" value={formData.description} onChange={handleChange} rows={2} />
        </div>

        <div className="form-group">
          <label htmlFor="category_id">Categoría</label>
          <select id="category_id" name="category_id" value={formData.category_id} onChange={handleChange} required>
            <option value="">-- Selecciona --</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>

        {error && <p className="form-error">{error}</p>}

        <div className="admin-form-actions">
          <button type="submit" className="btn btn-primary">
            {editingId ? "Guardar cambios" : "Crear plato"}
          </button>
          {editingId && (
            <button type="button" className="btn btn-outline" onClick={handleCancelEdit}>
              Cancelar
            </button>
          )}
        </div>
      </form>
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <table className="admin-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Imagen</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {dishes.map((dish) => {
            const category = categories.find((c) => c.id === dish.category_id);
            return (
              <tr key={dish.id}>
                <td>{dish.name}</td>
                <td>{category ? category.name : "—"}</td>
                <td>S/ {dish.price}</td>
                <td className="admin-thumb-cell">
                    <div className="admin-thumb-wrap">
                        {dish.image_url ? (
                        <img src={`${API_BASE_URL}${dish.image_url}`} alt={dish.name} className="admin-thumb" />
                        ) : (
                        <span className="admin-thumb-placeholder">Sin imagen</span>
                        )}
                    </div>
                    <button
                        type="button"
                        className="table-pill-btn"
                        onClick={() => handleUploadClick(dish.id)}
                    >
                        {dish.image_url ? "Cambiar" : "Subir"}
                    </button>
                </td>
                <td className="admin-table-actions">
                    <button
                        type="button"
                        className="table-icon-btn"
                        onClick={() => handleEdit(dish)}
                        aria-label={`Editar ${dish.name}`}
                        title="Editar"
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"
                            strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                    <button
                        type="button"
                        className="table-icon-btn table-icon-btn-danger"
                        onClick={() => handleDelete(dish.id)}
                        aria-label={`Eliminar ${dish.name}`}
                        title="Eliminar"
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M4 7h16M9 7V4h6v3M6 7l1 13a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-13M10 11v6M14 11v6"
                            strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}

export default AdminDishes;