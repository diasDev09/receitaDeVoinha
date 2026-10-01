import CategoryCard from "./CategoryCard";

function CategoryGrid({ categories }) {
    return (
        <div className="category-grid">
            {categories.map((category) => (
                <CategoryCard key={category.id} category={category} />
            ))}
        </div>
    );
}

export default CategoryGrid;