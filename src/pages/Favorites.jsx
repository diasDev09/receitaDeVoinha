import { useMemo } from "react";
import { Link } from "react-router-dom";
import EmptyState from "../components/common/EmptyState";
import ErrorState from "../components/common/ErrorState";
import Loading from "../components/common/Loading";
import RecipeGrid from "../components/recipes/RecipeGrid";
import useFavorites from "../hooks/useFavorites";
import useAsync from "../hooks/useAsync";
import { listRecipes } from "../services/recipeService";

function Favorites() {
    const { favorites } = useFavorites();
    const { data: recipes, loading, error, reload } = useAsync(listRecipes);

    const favoriteRecipes = useMemo(
        () => (recipes || []).filter((recipe) => favorites.includes(recipe.id)),
        [recipes, favorites]
    );

    return (
        <section>
            <div className="page-title">
                <h1>Favoritos</h1>
            </div>

            {loading && <Loading message="Carregando favoritos..." />}
            {error && <ErrorState message={error.message} onRetry={reload} />}

            {recipes && favoriteRecipes.length > 0 && (
                <>
                    <p className="results-count" aria-live="polite">
                        {favoriteRecipes.length === 1
                            ? "1 receita salva"
                            : `${favoriteRecipes.length} receitas salvas`}
                    </p>
                    <RecipeGrid recipes={favoriteRecipes} />
                </>
            )}

            {recipes && favoriteRecipes.length === 0 && (
                <EmptyState
                    icon="🤍"
                    title="Você ainda não tem favoritos"
                    message="Abra uma receita e clique em Favoritar para salvá-la aqui."
                >
                    <Link to="/receitas" className="btn">
                        Explorar receitas
                    </Link>
                </EmptyState>
            )}
        </section>
    );
}

export default Favorites;
