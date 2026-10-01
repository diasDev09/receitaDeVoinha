import { Link } from "react-router-dom";
import RecipeGrid from "../recipes/RecipeGrid";

function FeaturedRecipes({ recipes }) {
    return (
        <section className="home-section">
            <div className="section-header">
                <h2>Receitas em destaque</h2>
                <Link to="/receitas" className="section-link">
                    Ver todas →
                </Link>
            </div>
            <RecipeGrid recipes={recipes} />
        </section>
    );
}

export default FeaturedRecipes;