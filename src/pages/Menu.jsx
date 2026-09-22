import { useEffect, useState } from "react";
import DishCard from "../components/DishCard";
import { API_BASE_URL } from "../utils/api";

const INITIAL_DISH_LIMIT = 9;

function Menu() {
  const [categories, setCategories] = useState([]);
  const [dishes, setDishes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/categories/`)
      .then((res) => res.json())
      .then(setCategories)
      .catch((err) => console.error("Error fetching categories:", err));

    fetch(`${API_BASE_URL}/api/dishes/`)
      .then((res) => res.json())
      .then(setDishes)
      .catch((err) => console.error("Error fetching dishes:", err));
  }, []);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setShowAll(false);
  };

  const filteredDishes = selectedCategory
    ? dishes.filter((dish) => dish.category_id === selectedCategory)
    : dishes;

  const displayedDishes = showAll
    ? filteredDishes
    : filteredDishes.slice(0, INITIAL_DISH_LIMIT);

  const hasMore = filteredDishes.length > INITIAL_DISH_LIMIT;

  return (
    <section className="menu-section container">
      <div className="section-intro">
        <span className="eyebrow">Nuestro menú</span>
        <h1 className="section-title">Platos hechos con tradición</h1>
      </div>

      <div className="menu-filters" role="group" aria-label="Filtrar platos por categoría">
        <button
          type="button"
          className={selectedCategory === null ? "category-btn active" : "category-btn"}
          aria-pressed={selectedCategory === null}
          onClick={() => handleCategoryChange(null)}
        >
          Todos
        </button>

        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
            className={selectedCategory === category.id ? "category-btn active" : "category-btn"}
            aria-pressed={selectedCategory === category.id}
            onClick={() => handleCategoryChange(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="dish-grid">
        {displayedDishes.map((dish) => {
          const category = categories.find((c) => c.id === dish.category_id);
          return (
            <DishCard
              key={dish.id}
              name={dish.name}
              description={dish.description}
              price={dish.price}
              imageUrl={dish.image_url}
              categoryName={category ? category.name : ""}
            />
          );
        })}
      </div>

      {hasMore && (
        <div className="menu-load-more">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setShowAll((prev) => !prev)}
          >
            {showAll
              ? "Ver menos platos ▲"
              : `Ver más platos (${filteredDishes.length - INITIAL_DISH_LIMIT} más) ▼`}
          </button>
        </div>
      )}
    </section>
  );
}

export default Menu;