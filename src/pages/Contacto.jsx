import { useEffect, useState } from "react";

const API_BASE_URL = "http://127.0.0.1:8000";

const DAY_LABELS = {
  monday: "Lunes",
  tuesday: "Martes",
  wednesday: "Miércoles",
  thursday: "Jueves",
  friday: "Viernes",
  saturday: "Sábado",
  sunday: "Domingo",
};

const DAY_ORDER = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

function formatTime(timeString) {
  const [hours, minutes] = timeString.split(":");
  const date = new Date();
  date.setHours(Number(hours), Number(minutes));
  return date.toLocaleTimeString("es-PE", { hour: "numeric", minute: "2-digit", hour12: true });
}

function Contacto() {
  const [openingHours, setOpeningHours] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/opening-hours/`)
      .then((res) => res.json())
      .then((data) => {
        const sorted = [...data].sort(
          (a, b) => DAY_ORDER.indexOf(a.day_of_week) - DAY_ORDER.indexOf(b.day_of_week)
        );
        setOpeningHours(sorted);
      });
  }, []);

  return (
    <section class="contact-section container">
      <div class="section-intro">
        <span class="eyebrow">Visítanos</span>
        <h1 class="section-title">Contacto</h1>
      </div>

      <div class="contact-content">
        <ul class="contact-list">
          <li class="contact-item">
            <span class="contact-icon" aria-hidden="true"></span>
            <div>
              <h3>Dirección</h3>
              <p>Av. El Sol 235, San Juan de Lurigancho, Lima, Perú.</p>
            </div>
          </li>
          <li className="contact-item">
            <span className="contact-icon" aria-hidden="true"></span>
            <div>
              <h3>Horario</h3>
              {openingHours.map((oh) => (
                <p key={oh.id}>
                  {DAY_LABELS[oh.day_of_week]}: {formatTime(oh.open_time)} – {formatTime(oh.close_time)}
                </p>
              ))}
            </div>
          </li>
          <li class="contact-item">
            <span class="contact-icon" aria-hidden="true"></span>
            <div>
              <h3>Teléfono</h3>
              <p>+51 987 654 321</p>
            </div>
          </li>
        </ul>

        <div class="contact-map">
          <div class="map-placeholder">
            <iframe
              title="Ubicación UTP San Juan de Lurigancho"
              src="https://www.google.com/maps?q=UTP+Av.+El+Sol+235+San+Juan+de+Lurigancho+Lima+Peru&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contacto;