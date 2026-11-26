import { Link } from "react-router-dom";
import CategoryIcon from "./CategoryIcon";

// Uma linha do sumário: numeral, nome, pontilhado de guia e quantidade
function CategoryCard({ category, numeral }) {
    return (
        <li>
            <Link
                to={`/receitas?categoria=${encodeURIComponent(category.name)}`}
                className="toc__row"
            >
                <span className="toc__numeral" aria-hidden="true">
                    {numeral}
                </span>
                <CategoryIcon name={category.name} size={20} className="toc__icon" />
                <span className="toc__name">{category.name}</span>
                <span className="toc__leader" aria-hidden="true" />
                <span className="toc__count">
                    {category.count === 1 ? "1 receita" : `${category.count} receitas`}
                </span>
            </Link>
        </li>
    );
}

export default CategoryCard;
