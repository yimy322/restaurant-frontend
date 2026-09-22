const API_BASE_URL = "http://127.0.0.1:8000";

function DishCard({ name, description, price, imageUrl, categoryName }) {
  return (
    <article className="dish-card">
      <div className="dish-image">
        {imageUrl ? (
          <img src={`${API_BASE_URL}${imageUrl}`} alt={name} />
        ) : (
          <span className="dish-image-placeholder">[ foto: {name} ]</span>
        )}
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