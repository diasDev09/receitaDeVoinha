import { useMemo } from "react";
import { Link } from "react-router-dom";
import Hero from "../components/home/Hero";
import FeaturedRecipes from "../components/home/FeaturedRecipes";
import CategoryPreview from "../components/home/CategoryPreview";
import {
    getAllRecipes,
    getFeaturedRecipes,
    getCategoriesWithCount,
} from "../utils/recipes";

function Home() {
    const recipes = useMemo(() => getAllRecipes(), []);
    const featured = useMemo(() => getFeaturedRecipes(recipes, 4), [recipes]);
    const categories = useMemo(() => getCategoriesWithCount(recipes), [recipes]);

    return (
        <>
            <Hero recipe={featured[0]} />
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