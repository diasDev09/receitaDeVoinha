import { Link } from "react-router-dom";

function CategoryCard({ category }) {
    return (
        <Link
            to={`/receitas?categoria=${encodeURIComponent(category.name)}`}
            className="category-card"
        >
            <span className="category-card__icon" aria-hidden="true">
                {category.icon}
            </span>
            <h3>{category.name}</h3>
            <small>
                {category.count === 1 ? "1 receita" : `${category.count} receitas`}
            </small>
        </Link>
    );
}

export default CategoryCard;