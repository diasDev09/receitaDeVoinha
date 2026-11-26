import { useCallback, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, CircleAlert, CircleCheck, FileQuestion, Heart, Trash2 } from "lucide-react";
import EmptyState from "../components/common/EmptyState";
import ErrorState from "../components/common/ErrorState";
import Loading from "../components/common/Loading";
import CategoryIcon from "../components/categories/CategoryIcon";
import RecipeIngredients from "../components/recipes/RecipeIngredients";
import RecipeMeta from "../components/recipes/RecipeMeta";
import useAuth from "../hooks/useAuth";
import useFavorites from "../hooks/useFavorites";
import useAsync from "../hooks/useAsync";
import useDocumentTitle from "../hooks/useDocumentTitle";
import { getRecipe, deleteRecipe } from "../services/recipeService";
import { PLACEHOLDER, handleImageError } from "../utils/images";

// Receita aberta como duas páginas de um livro
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
                icon={FileQuestion}
                title="Receita não encontrada"
                message="Essa receita não existe ou foi excluída do caderno."
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
                text: added ? "Receita adicionada aos favoritos." : "Receita removida dos favoritos.",
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

    const MessageIcon = message?.type === "error" ? CircleAlert : CircleCheck;

    return (
        <article className="recipe-details">
            <Link to="/receitas" className="back-link">
                <ArrowLeft size={16} strokeWidth={1.75} aria-hidden="true" />
                Voltar para as receitas
            </Link>

            <div className="spread">
                <div className="spread__page">
                    <img
                        className="spread__image"
                        src={recipe.image || PLACEHOLDER}
                        alt={recipe.title}
                        onError={handleImageError}
                    />

                    <Link
                        to={`/receitas?categoria=${encodeURIComponent(recipe.category)}`}
                        className="spread__category"
                    >
                        <CategoryIcon name={recipe.category} size={15} />
                        {recipe.category}
                    </Link>
                    <h1>{recipe.title}</h1>
                    {recipe.author && (
                        <p className="spread__author">Receita de {recipe.author}</p>
                    )}
                    <RecipeMeta recipe={recipe} />

                    <p className="spread__description">{recipe.description}</p>

                    <div className="spread__actions">
                        <button
                            type="button"
                            className={favorite ? "btn btn--favorited" : "btn btn--secondary"}
                            onClick={handleToggle}
                            aria-pressed={favorite}
                            disabled={busy || (isAuthenticated && loadingFavorites)}
                        >
                            <Heart
                                size={17}
                                strokeWidth={1.75}
                                fill={favorite ? "currentColor" : "none"}
                                aria-hidden="true"
                            />
                            {favorite ? "Favoritada" : isAuthenticated ? "Favoritar" : "Entre para favoritar"}
                        </button>

                        {isAuthor && (
                            <button
                                type="button"
                                className="btn btn--danger"
                                onClick={handleDelete}
                                disabled={busy}
                            >
                                <Trash2 size={17} strokeWidth={1.75} aria-hidden="true" />
                                Excluir receita
                            </button>
                        )}
                    </div>

                    {message && (
                        <p
                            className={`feedback feedback--${message.type}`}
                            role={message.type === "error" ? "alert" : "status"}
                        >
                            <MessageIcon size={17} strokeWidth={1.75} aria-hidden="true" />
                            {message.text}
                        </p>
                    )}
                </div>

                <div className="spread__page">
                    <section className="spread__section">
                        <h2>Ingredientes</h2>
                        <RecipeIngredients ingredients={recipe.ingredients} />
                    </section>

                    <section className="spread__section">
                        <h2>Modo de preparo</h2>
                        <ol className="preparation-list">
                            {recipe.preparation.map((step, index) => (
                                <li key={index}>{step}</li>
                            ))}
                        </ol>
                    </section>
                </div>
            </div>
        </article>
    );
}

export default RecipeDetails;
