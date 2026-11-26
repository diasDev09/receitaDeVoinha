import { useCallback, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import EmptyState from "../components/common/EmptyState";
import ErrorState from "../components/common/ErrorState";
import Loading from "../components/common/Loading";
import RecipeIngredients from "../components/recipes/RecipeIngredients";
import useAuth from "../hooks/useAuth";
import useFavorites from "../hooks/useFavorites";
import useAsync from "../hooks/useAsync";
import useDocumentTitle from "../hooks/useDocumentTitle";
import { getRecipe, deleteRecipe } from "../services/recipeService";
import { PLACEHOLDER, handleImageError } from "../utils/images";

function RecipeDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { user, isAuthenticated } = useAuth();
    const { isFavorite, toggleFavorite, loading: loadingFavorites } = useFavorites();
    const [message, setMessage] = useState(null); // { type: "success" | "error", text }
    const [busy, setBusy] = useState(false);

    const load = useCallback((options) => getRecipe(id, options), [id]);
    const { data: recipe, loading, error, reload } = useAsync(load);
    useDocumentTitle(recipe?.title);

    if (loading) return <Loading message="Carregando receita..." />;

    if (error?.status === 404) {
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

    if (error) return <ErrorState error={error} onRetry={reload} />;

    const favorite = isFavorite(recipe.id);
    const isAuthor = Boolean(user) && recipe.authorId === user.id;

    async function handleToggle() {
        // Favoritar exige conta: manda para o login e volta para esta receita
        if (!isAuthenticated) {
            navigate("/login", { state: { from: location } });
            return;
        }
        setBusy(true);
        try {
            const added = await toggleFavorite(recipe.id);
            setMessage({
                type: "success",
                text: added ? "Receita adicionada aos favoritos! ❤️" : "Receita removida dos favoritos.",
            });
        } catch (err) {
            setMessage({ type: "error", text: err.message });
        } finally {
            setBusy(false);
        }
    }

    async function handleDelete() {
        if (!window.confirm(`Excluir "${recipe.title}"? Essa ação não pode ser desfeita.`)) return;
        setBusy(true);
        try {
            await deleteRecipe(recipe.id);
            navigate("/receitas", { replace: true });
        } catch (err) {
            // 403: não é o autor; 401: sessão caiu (o AuthProvider já limpou a sessão)
            setMessage({ type: "error", text: err.message });
            setBusy(false);
        }
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
                    {recipe.author && (
                        <p className="recipe-details__author">Enviada por {recipe.author}</p>
                    )}

                    <div className="recipe-card__meta">
                        <span>⭐ {recipe.rating > 0 ? recipe.rating.toFixed(1) : "Nova"}</span>
                        <span>⏱️ {recipe.time}</span>
                    </div>

                    <p className="recipe-details__description">{recipe.description}</p>

                    <div className="recipe-details__actions">
                        <button
                            type="button"
                            className={favorite ? "btn btn--favorited" : "btn"}
                            onClick={handleToggle}
                            aria-pressed={favorite}
                            disabled={busy || (isAuthenticated && loadingFavorites)}
                        >
                            <span key={favorite ? "on" : "off"} className="heart" aria-hidden="true">
                                {favorite ? "❤️" : "🤍"}
                            </span>{" "}
                            {favorite ? "Favoritada" : isAuthenticated ? "Favoritar" : "Entre para favoritar"}
                        </button>

                        {isAuthor && (
                            <button
                                type="button"
                                className="btn btn--danger"
                                onClick={handleDelete}
                                disabled={busy}
                            >
                                🗑️ Excluir receita
                            </button>
                        )}
                    </div>

                    {message && (
                        <p
                            className={`feedback feedback--${message.type}`}
                            role={message.type === "error" ? "alert" : "status"}
                        >
                            {message.text}
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
