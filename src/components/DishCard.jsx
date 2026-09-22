const DEFAULT_IMAGE = "/img/placeholder-dish.svg";

// Mapeo de fotos disponibles en public/img/comidas/
const DISH_IMAGE_MAP = {
  "Ceviche Clásico": "/img/comidas/ceviche.jpg",
  "Causa Limeña de Pollo": "/img/comidas/causa.jpg",
  "Papa a la Huancaína": "/img/comidas/huancaina.jpg",
  "Anticuchos de Corazón": "/img/comidas/anticucho.jpg",
  "Lomo Saltado Criollo": "/img/comidas/lomo.png",
  "Ají de Gallina Tradicional": "/img/comidas/aji_de_gallina.png",
  "Arroz con Mariscos": "/img/comidas/arroz_mariscos.jpg",
  "Seco de Res con Frejoles": "/img/comidas/seco_res.webp",
  "Suspiro a la Limeña": "/img/comidas/suspiro.png",
  "Mazamorra Morada con Arroz con Leche (Clásico)": "/img/comidas/mazamorra_morada.png",
  "Picarones con Miel de Chancaca": "/img/comidas/picarones.jpg",
  "Chicha Morada Tradicional (Jarra 1L)": "/img/comidas/chicha.jpg",
  "Pisco Sour Quebranta": "/img/comidas/pisco_sour.jpg",
  "Limonada Frozen con Hierba Buena": "/img/comidas/limonada_frozen.png",
};

function DishCard({ name, description, price, imageUrl, categoryName }) {
  // Asignar imagen del mapeo o imageUrl si existe, sino fallback al placeholder
  const imageSrc = DISH_IMAGE_MAP[name] || (imageUrl && !imageUrl.startsWith("/static/") ? imageUrl : DEFAULT_IMAGE);

  return (
    <article className="dish-card">
      <div className="dish-image">
        <img
          src={imageSrc}
          alt={name}
          onError={(e) => {
            e.currentTarget.src = DEFAULT_IMAGE;
          }}
        />
        <span className="dish-category">{categoryName}</span>
      </div>
      <div className="dish-body">
        <div className="dish-header">
          <h3 className="dish-name">{name}</h3>
          <span className="dish-price">S/ {price}</span>
        </div>
        <p className="dish-description">{description}</p>
      </div>
    </article>
  );
}

export default DishCard;