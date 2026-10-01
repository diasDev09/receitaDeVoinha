import { Link } from "react-router-dom";
import CategoryGrid from "../categories/CategoryGrid";

function CategoryPreview({ categories }) {
    return (
        <section className="home-section">
            <div className="section-header">
                <h2>Explore por categoria</h2>
                <Link to="/categorias" className="section-link">
                    Ver categorias →
                </Link>
            </div>
            <CategoryGrid categories={categories} />
        </section>
    );
}

export default CategoryPreview;