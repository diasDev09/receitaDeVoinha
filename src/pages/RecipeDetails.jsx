import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import EmptyState from "../components/common/EmptyState";
import RecipeIngredients from "../components/recipes/RecipeIngredients";
import useFavorites from "../hooks/useFavorites";
import { getAllRecipes } from "../utils/recipes";
import { PLACEHOLDER, handleImageError } from "../utils/images";

function RecipeDetails() {
    const { id } = useParams();
    const { isFavorite, toggleFavorite } = useFavorites();
    const [message, setMessage] = useState("");

    const recipe = useMemo(
        () => getAllRecipes().find((item) => String(item.id) === id),
        [id]
    );

    if (!recipe) {
        return (
            <EmptyState
                icon="😕"
                title="Receita não encontrada"
                message="Essa receita não existe ou foi removida."
            >
                <Link to="/receitas" className="btn">
                    Ver todas as receitas
                </Link>
            </EmptyState>
        );
    }

    const favorite = isFavorite(recipe.id);

    function handleToggle() {
        const added = toggleFavorite(recipe.id);
        setMessage(
            added ? "Receita adicionada aos favoritos! ❤️" : "Receita removida dos favoritos."
        );
    }

    return (
        <article className="recipe-details">
            <Link to="/receitas" className="back-link">
                ← Voltar para receitas
            </Link>

            <div className="recipe-details__top">
                <img
                    className="recipe-details__image"
                    src={recipe.image || PLACEHOLDER}
                    alt={recipe.title}
                    onError={handleImageError}
                />

                <div className="recipe-details__info">
                    <span className="recipe-card__category">{recipe.category}</span>
                    <h1>{recipe.title}</h1>

                    <div className="recipe-card__meta">
                        <span>⭐ {recipe.rating.toFixed(1)}</span>
                        <span>⏱️ {recipe.time}</span>
                    </div>

                    <p className="recipe-details__description">{recipe.description}</p>

                    <button
                        type="button"
                        className={favorite ? "btn btn--favorited" : "btn"}
                        onClick={handleToggle}
                        aria-pressed={favorite}
                    >
                        {favorite ? "❤️ Favoritada" : "🤍 Favoritar"}
                    </button>

                    {message && (
                        <p className="feedback feedback--success" role="status">
                            {message}
                        </p>
                    )}
                </div>
            </div>

            <div className="recipe-details__content">
                <section>
                    <h2>Ingredientes</h2>
                    <RecipeIngredients ingredients={recipe.ingredients} />
                </section>

                <section>
                    <h2>Modo de preparo</h2>
                    <ol className="preparation-list">
                        {recipe.preparation.map((step, index) => (
                            <li key={index}>{step}</li>
                        ))}
                    </ol>
                </section>
            </div>
        </article>
    );
}

export default RecipeDetails;