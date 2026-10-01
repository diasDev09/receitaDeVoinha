import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import SearchBar from "../components/common/SearchBar";
import EmptyState from "../components/common/EmptyState";
import RecipeFilter from "../components/recipes/RecipeFilter";
import RecipeGrid from "../components/recipes/RecipeGrid";
import { getAllRecipes, filterRecipes, sortRecipes } from "../utils/recipes";

function Recipes() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [sortBy, setSortBy] = useState("");

    const search = searchParams.get("busca") || "";
    const category = searchParams.get("categoria") || "";

    const allRecipes = useMemo(() => getAllRecipes(), []);

    const visibleRecipes = useMemo(() => {
        const filtered = filterRecipes(allRecipes, { search, category });
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
                    + Nova receita
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

            <RecipeFilter
                selected={category}
                onChange={(value) => updateParam("categoria", value)}
            />

            <p className="results-count" aria-live="polite">
                {visibleRecipes.length === 1
                    ? "1 receita encontrada"
                    : `${visibleRecipes.length} receitas encontradas`}
            </p>

            {visibleRecipes.length > 0 ? (
                <RecipeGrid recipes={visibleRecipes} />
            ) : (
                <EmptyState
                    icon="🔍"
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
        </section>
    );
}

export default Recipes;