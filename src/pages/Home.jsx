import { Link } from "react-router-dom";
import Hero from "../components/home/Hero";
import FeaturedRecipes from "../components/home/FeaturedRecipes";
import CategoryPreview from "../components/home/CategoryPreview";
import Loading from "../components/common/Loading";
import ErrorState from "../components/common/ErrorState";
import useAsync from "../hooks/useAsync";
import { listRecipes } from "../services/recipeService";
import { listCategories } from "../services/categoryService";
import { getFeaturedRecipes, getCategoriesWithCount } from "../utils/recipes";

// Definida fora do componente para ter identidade estável (useAsync não repete a chamada)
async function loadHome(options) {
    const [recipes, categories] = await Promise.all([
        listRecipes(options),
        listCategories(options),
    ]);
    return {
        featured: getFeaturedRecipes(recipes, 4),
        categories: getCategoriesWithCount(recipes, categories),
    };
}

function Home() {
    const { data, loading, error, reload } = useAsync(loadHome);

    if (loading) return <Loading message="Carregando receitas..." />;
    if (error) return <ErrorState message={error.message} onRetry={reload} />;

    const { featured, categories } = data;

    return (
        <>
            {featured[0] && <Hero recipe={featured[0]} />}
            <FeaturedRecipes recipes={featured} />
            <CategoryPreview categories={categories} />
            <section className="container">
                <div className="cta-band">
                    <h2>Tem uma receita de família?</h2>
                    <p>Guarde o sabor da sua casa e compartilhe com todo mundo.</p>
                    <Link to="/nova-receita" className="btn">Cadastrar receita</Link>
                </div>
            </section>
        </>
    );
}

export default Home;
