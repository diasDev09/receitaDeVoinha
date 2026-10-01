import { useMemo } from "react";
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
        </>
    );
}

export default Home;