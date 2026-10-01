import { Link } from "react-router-dom";

const PLACEHOLDER =
    "data:image/svg+xml;utf8," +
    encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="260">
    <rect width="100%" height="100%" fill="#e6f1e3"/>
    <text x="50%" y="52%" font-size="64" text-anchor="middle">🍲</text>
    </svg>`
    );

function RecipeCard({ recipe }) {
    function handleImageError(e) {
        e.currentTarget.onerror = null; // evita loop infinito
        e.currentTarget.src = PLACEHOLDER;
    }

    return (
        <article className="recipe-card">
            <Link to={`/receitas/${recipe.id}`} className="recipe-card__link">
                <img
                    className="recipe-card__image"
                    src={recipe.image || PLACEHOLDER}
                    alt={recipe.title}
                    onError={handleImageError}
                    loading="lazy"
                />
                <div className="recipe-card__body">
                    <span className="recipe-card__category">{recipe.category}</span>
                    <h3 className="recipe-card__title">{recipe.title}</h3>
                    <div className="recipe-card__meta">
                        <span>⭐ {recipe.rating.toFixed(1)}</span>
                        <span>⏱️ {recipe.time}</span>
                    </div>
                </div>
            </Link>
        </article>
    );
}

export default RecipeCard;