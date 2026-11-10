import CategoryGrid from "../components/categories/CategoryGrid";
import Loading from "../components/common/Loading";
import ErrorState from "../components/common/ErrorState";
import EmptyState from "../components/common/EmptyState";
import useAsync from "../hooks/useAsync";
import { listRecipes } from "../services/recipeService";
import { listCategories } from "../services/categoryService";
import { getCategoriesWithCount } from "../utils/recipes";

async function loadCategories(options) {
    const [recipes, categories] = await Promise.all([
        listRecipes(options),
        listCategories(options),
    ]);
    return getCategoriesWithCount(recipes, categories);
}

function Categories() {
    const { data: categories, loading, error, reload } = useAsync(loadCategories);

    return (
        <section>
            <div className="page-title">
                <h1>Categorias</h1>
            </div>
            <p className="page-subtitle">
                Escolha uma categoria para ver as receitas relacionadas.
            </p>

            {loading && <Loading message="Carregando categorias..." />}
            {error && <ErrorState message={error.message} onRetry={reload} />}
            {categories && categories.length === 0 && (
                <EmptyState icon="🗂️" title="Nenhuma categoria cadastrada" />
            )}
            {categories && categories.length > 0 && (
                <CategoryGrid categories={categories} />
            )}
        </section>
    );
}

export default Categories;
