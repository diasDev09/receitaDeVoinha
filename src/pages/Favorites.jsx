import { useMemo } from "react";
import { Link } from "react-router-dom";
import EmptyState from "../components/common/EmptyState";
import RecipeGrid from "../components/recipes/RecipeGrid";
import useFavorites from "../hooks/useFavorites";
import { getAllRecipes } from "../utils/recipes";

function Favorites() {
    const { favorites } = useFavorites();

    const favoriteRecipes = useMemo(
        () => getAllRecipes().filter((recipe) => favorites.includes(recipe.id)),
        [favorites]
    );

    return (
        <section>
            <div className="page-title">
                <h1>Favoritos</h1>
            </div>

            {favoriteRecipes.length > 0 ? (
                <>
                    <p className="results-count" aria-live="polite">
                        {favoriteRecipes.length === 1
                            ? "1 receita salva"
                            : `${favoriteRecipes.length} receitas salvas`}
                    </p>
                    <RecipeGrid recipes={favoriteRecipes} />
                </>
            ) : (
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