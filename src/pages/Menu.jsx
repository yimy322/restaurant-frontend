import { useEffect, useState } from "react";
import DishCard from "../components/DishCard";

const API_BASE_URL = "http://127.0.0.1:8000";

function Menu() {
  const [categories, setCategories] = useState([]);
  const [dishes, setDishes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/categories/`)
      .then((res) => res.json())
      .then(setCategories);

    fetch(`${API_BASE_URL}/api/dishes/`)
      .then((res) => res.json())
      .then(setDishes);
  }, []); // [] = corre despues de que se renderiza el componente por primera vez

  const filteredDishes = selectedCategory
    ? dishes.filter((dish) => dish.category_id === selectedCategory)
    : dishes;

  return (
    <section class="menu-section container">
      <div class="section-intro">
        <span class="eyebrow">Nuestro menú</span>
        <h1 class="section-title">Platos hechos con tradición</h1>
      </div>

      <div className="menu-filters" role="group" aria-label="Filtrar platos por categoría">
        <button
          type="button"
          className={selectedCategory === null ? "category-btn active" : "category-btn"}
          aria-pressed={selectedCategory === null}
          onClick={() => setSelectedCategory(null)}
        >
          Todos
        </button>

        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
            className={selectedCategory === category.id ? "category-btn active" : "category-btn"}
            aria-pressed={selectedCategory === category.id}
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="dish-grid">
        {filteredDishes.map((dish) => {
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
    </section>
  );
}

export default Menu;