import { Link } from "react-router-dom";
import CategoryIcon from "../categories/CategoryIcon";
import RecipeMeta from "./RecipeMeta";
import { PLACEHOLDER, handleImageError } from "../../utils/images";

// Prancha: foto emoldurada numa folha branca, com a legenda embaixo
function RecipeCard({ recipe }) {
    return (
        <article className="recipe-card">
            <Link to={`/receitas/${recipe.id}`} className="recipe-card__link">
                <div className="recipe-card__frame">
                    <img
                        className="recipe-card__image"
                        src={recipe.image || PLACEHOLDER}
                        alt=""
                        onError={handleImageError}
                        loading="lazy"
                    />
                </div>
                <div className="recipe-card__body">
                    <span className="recipe-card__category">
                        <CategoryIcon name={recipe.category} size={14} />
                        {recipe.category}
                    </span>
                    <h3 className="recipe-card__title">{recipe.title}</h3>
                    <RecipeMeta recipe={recipe} />
                </div>
            </Link>
        </article>
    );
}

export default RecipeCard;
