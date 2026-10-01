import { Link } from "react-router-dom";
import { PLACEHOLDER, handleImageError } from "../../utils/images";

function RecipeCard({ recipe }) {
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