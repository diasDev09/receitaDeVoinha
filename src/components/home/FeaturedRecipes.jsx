import { Link } from "react-router-dom";
import CategoryIcon from "../categories/CategoryIcon";
import RecipeMeta from "../recipes/RecipeMeta";
import { PLACEHOLDER, handleImageError } from "../../utils/images";

// As mais bem avaliadas, em linhas que alternam foto e texto (zig-zag)
function FeaturedRecipes({ recipes }) {
    if (recipes.length === 0) return null;

    return (
        <section aria-labelledby="featured-title">
            <div className="section-header">
                <h2 id="featured-title">As mais bem avaliadas</h2>
                <Link to="/receitas" className="section-link">
                    Ver todas as receitas
                </Link>
            </div>

            <ul className="feature-list">
                {recipes.map((recipe) => (
                    <li key={recipe.id} className="feature">
                        <Link
                            to={`/receitas/${recipe.id}`}
                            className="feature__image"
                            tabIndex={-1}
                            aria-hidden="true"
                        >
                            <img
                                src={recipe.image || PLACEHOLDER}
                                alt=""
                                onError={handleImageError}
                                loading="lazy"
                            />
                        </Link>
                        <div>
                            <span className="feature__category">
                                <CategoryIcon name={recipe.category} size={15} />
                                {recipe.category}
                            </span>
                            <h3>
                                <Link to={`/receitas/${recipe.id}`}>{recipe.title}</Link>
                            </h3>
                            <p>{recipe.description}</p>
                            <RecipeMeta recipe={recipe} />
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default FeaturedRecipes;
