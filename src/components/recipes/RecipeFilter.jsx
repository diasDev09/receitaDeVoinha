import categories from "../../data/categories";

function RecipeFilter({ selected, onChange }) {
    return (
        <div className="recipe-filter" role="group" aria-label="Filtrar por categoria">
            <button
                type="button"
                className={selected === "" ? "chip chip--active" : "chip"}
                onClick={() => onChange("")}
            >
                Todas
            </button>

            {categories.map((category) => (
                <button
                    key={category.id}
                    type="button"
                    className={selected === category.name ? "chip chip--active" : "chip"}
                    onClick={() => onChange(category.name)}
                >
                    {category.icon} {category.name}
                </button>
            ))}
        </div>
    );
}

export default RecipeFilter;