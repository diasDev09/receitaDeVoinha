import { Link } from "react-router-dom";
import Hero from "../components/home/Hero";
import FeaturedRecipes from "../components/home/FeaturedRecipes";
import CategoryPreview from "../components/home/CategoryPreview";
import Loading from "../components/common/Loading";
import ErrorState from "../components/common/ErrorState";
import useAsync from "../hooks/useAsync";
import useDocumentTitle from "../hooks/useDocumentTitle";
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
    useDocumentTitle();
    const { data, loading, error, reload } = useAsync(loadHome);

    if (loading) return <Loading message="Abrindo o caderno..." />;
    if (error) return <ErrorState error={error} onRetry={reload} />;

    const { featured, categories } = data;

    return (
        <div className="home">
            {/* a mais bem avaliada vai na capa; as seguintes, no zig-zag */}
            <Hero recipe={featured[0]} />
            <FeaturedRecipes recipes={featured.slice(1)} />
            <CategoryPreview categories={categories} />

            <section className="blank-page" aria-labelledby="blank-title">
                <div>
                    <h2 id="blank-title">Esta página está esperando a sua receita</h2>
                    <p>Escreva a receita que só a sua família sabe fazer, do jeito que ela é feita.</p>
                </div>
                <Link to="/nova-receita" className="btn">
                    Cadastrar receita
                </Link>
            </section>
        </div>
    );
}

export default Home;
