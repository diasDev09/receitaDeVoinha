import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import EmptyState from "../components/common/EmptyState";
import ErrorState from "../components/common/ErrorState";
import Loading from "../components/common/Loading";
import RecipeGrid from "../components/recipes/RecipeGrid";
import useAuth from "../hooks/useAuth";
import useFavorites from "../hooks/useFavorites";
import useDocumentTitle from "../hooks/useDocumentTitle";

// Rota protegida: os favoritos são do usuário logado e vêm da API (GET /api/favoritos)
function Favorites() {
    useDocumentTitle("Favoritos");
    const { user } = useAuth();
    const { favorites, loading, error, reload } = useFavorites();

    return (
        <section>
            <div className="page-title">
                <h1>Favoritos</h1>
            </div>
            <p className="page-subtitle">Receitas salvas por {user.name}.</p>

            {loading && <Loading message="Carregando favoritos..." />}
            {error && <ErrorState error={error} onRetry={reload} />}

            {favorites && favorites.length > 0 && (
                <>
                    <p className="results-count" aria-live="polite">
                        {favorites.length === 1
                            ? "1 receita salva"
                            : `${favorites.length} receitas salvas`}
                    </p>
                    <RecipeGrid recipes={favorites} />
                </>
            )}

            {favorites && favorites.length === 0 && (
                <EmptyState
                    icon={Heart}
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
