import CategoryCard from "./CategoryCard";

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];

// Categorias como sumário do caderno: cada uma é um capítulo, em ordem
function CategoryGrid({ categories }) {
    return (
        <ol className="toc">
            {categories.map((category, index) => (
                <CategoryCard
                    key={category.id}
                    category={category}
                    numeral={ROMAN[index] || String(index + 1)}
                />
            ))}
        </ol>
    );
}

export default CategoryGrid;
