import { useMemo } from "react";
import CategoryGrid from "../components/categories/CategoryGrid";
import { getAllRecipes, getCategoriesWithCount } from "../utils/recipes";

function Categories() {
    const categories = useMemo(
        () => getCategoriesWithCount(getAllRecipes()),
        []
    );

    return (
        <section>
            <div className="page-title">
                <h1>Categorias</h1>
            </div>
            <p className="page-subtitle">
                Escolha uma categoria para ver as receitas relacionadas.
            </p>
            <CategoryGrid categories={categories} />
        </section>
    );
}

export default Categories;