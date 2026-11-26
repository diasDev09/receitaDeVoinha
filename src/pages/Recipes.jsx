import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Plus, SearchX } from "lucide-react";
import SearchBar from "../components/common/SearchBar";
import EmptyState from "../components/common/EmptyState";
import ErrorState from "../components/common/ErrorState";
import Loading from "../components/common/Loading";
import RecipeFilter from "../components/recipes/RecipeFilter";
import RecipeGrid from "../components/recipes/RecipeGrid";
import useAsync from "../hooks/useAsync";
import { listRecipes } from "../services/recipeService";
import { listCategories } from "../services/categoryService";
import { filterRecipes, sortRecipes } from "../utils/recipes";

// Fora do componente para ter identidade estável (useAsync não repete a chamada)
async function loadRecipesPage(options) {
    const [recipes, categories] = await Promise.all([
        listRecipes(options),
        listCategories(options),
    ]);
    return { recipes, categories };
}

function Recipes() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [sortBy, setSortBy] = useState("");
    const { data, loading, error, reload } = useAsync(loadRecipesPage);
    const allRecipes = data?.recipes;

    const search = searchParams.get("busca") || "";
    const category = searchParams.get("categoria") || "";

    const visibleRecipes = useMemo(() => {
        const filtered = filterRecipes(allRecipes || [], { search, category });
        return sortRecipes(filtered, sortBy);
    }, [allRecipes, search, category, sortBy]);

    function updateParam(key, value) {
        const next = new URLSearchParams(searchParams);
        if (value) {
            next.set(key, value);
        } else {
            next.delete(key);
        }
        setSearchParams(next, { replace: true });
    }

    function clearFilters() {
        setSearchParams({}, { replace: true });
        setSortBy("");
    }

    const hasFilters = search || category;

    return (
        <section className="recipes-page">
            <div className="page-title">
                <h1>Receitas</h1>
                <Link to="/nova-receita" className="btn">
                    <Plus size={17} strokeWidth={1.75} aria-hidden="true" />
                    Nova receita
                </Link>
            </div>

            <div className="recipes-toolbar">
                <SearchBar
                    value={search}
                    onChange={(value) => updateParam("busca", value)}
                    placeholder="Buscar por nome, descrição ou ingrediente..."
                />

                <select
                    className="select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    aria-label="Ordenar receitas"
                >
                    <option value="">Ordenar por...</option>
                    <option value="nome">Nome (A–Z)</option>
                    <option value="avaliacao">Melhor avaliação</option>
                    <option value="tempo">Menor tempo</option>
                </select>
            </div>

            {data && (
                <RecipeFilter
                    categories={data.categories}
                    selected={category}
                    onChange={(value) => updateParam("categoria", value)}
                />
            )}

            {loading && <Loading message="Carregando receitas..." />}
            {error && <ErrorState error={error} onRetry={reload} />}

            {allRecipes && (
                <>
                    <p className="results-count" aria-live="polite">
                        {visibleRecipes.length === 1
                            ? "1 receita encontrada"
                            : `${visibleRecipes.length} receitas encontradas`}
                    </p>

                    {visibleRecipes.length > 0 ? (
                        <RecipeGrid recipes={visibleRecipes} />
                    ) : (
                        <EmptyState
                            icon={SearchX}
                            title="Nenhuma receita encontrada"
                            message="Tente buscar por outro termo ou escolher outra categoria."
                        >
                            {hasFilters && (
                                <button type="button" className="btn" onClick={clearFilters}>
                                    Limpar filtros
                                </button>
                            )}
                        </EmptyState>
                    )}
                </>
            )}
        </section>
    );
}

export default Recipes;
