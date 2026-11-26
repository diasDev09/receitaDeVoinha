import { Link } from "react-router-dom";
import CategoryGrid from "../categories/CategoryGrid";

// Sumário dos capítulos ao lado de uma introdução curta (grade assimétrica)
function CategoryPreview({ categories }) {
    return (
        <section className="chapters" aria-labelledby="chapters-title">
            <div className="chapters__intro">
                <h2 id="chapters-title">Capítulos</h2>
                <p>Cada receita mora num capítulo. Escolha um para ver só as receitas dele.</p>
                <p>
                    <Link to="/categorias" className="section-link">
                        Abrir o sumário completo
                    </Link>
                </p>
            </div>
            <CategoryGrid categories={categories} />
        </section>
    );
}

export default CategoryPreview;
