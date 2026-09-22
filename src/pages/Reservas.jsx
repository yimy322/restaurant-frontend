import { useState } from "react";
import { API_BASE_URL } from "../utils/api";

function Reservas() {
  const [formData, setFormData] = useState({
    customer_name: "",
    phone: "",
    reservation_date: "",
    reservation_time: "",
    guests: 2,
  });
  const [status, setStatus] = useState(null);
  // para manejar el mensaje de error de la API
  const [errorMessage, setErrorMessage] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault(); // evita que el navegador recargue la pagina al enviar el form
    setStatus(null);
    setErrorMessage("");
    try {
      const response = await fetch(`${API_BASE_URL}/api/reservations/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          guests: Number(formData.guests), // el input llega como string, la API espera un numero
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "No se pudo crear la reserva");
      }

      setStatus("success");
      setFormData({
        customer_name: "",
        phone: "",
        reservation_date: "",
        reservation_time: "",
        guests: 2,
      });
    } catch (error) {
      console.error(error);
      setStatus("error");
      setErrorMessage(error.message);
    }
  };
  return (
    <section className="reservation-section container">
      <div className="section-intro">
        <span className="eyebrow">Reserva tu mesa</span>
        <h1 className="section-title">Te esperamos con lo mejor de Perú</h1>
        <p className="section-description">Completa el formulario y te confirmaremos por teléfono.</p>
      </div>

      <form className="reservation-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="customer_name">Nombre completo</label>
            <input
              type="text"
              id="customer_name"
              name="customer_name"
              placeholder="Tu nombre"
              value={formData.customer_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Teléfono</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="999 999 999"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="reservation_date">Fecha</label>
            <input
              type="date"
              id="reservation_date"
              name="reservation_date"
              value={formData.reservation_date}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="reservation_time">Hora</label>
            <input
              type="time"
              id="reservation_time"
              name="reservation_time"
              value={formData.reservation_time}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="guests">Número de personas</label>
            <input
              type="number"
              id="guests"
              name="guests"
              min="1"
              max="20"
              value={formData.guests}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary btn-block">Confirmar reserva</button>

        {status === "success" && <p className="form-success">¡Reserva creada con éxito!</p>}
        {status === "error" && <p className="form-error">{errorMessage}</p>}
      </form>
    </section>
  );
}

export default Reservas;