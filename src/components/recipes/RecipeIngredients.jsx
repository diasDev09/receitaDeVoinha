function RecipeIngredients({ ingredients }) {
    return (
        <ul className="ingredients-list">
            {ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
            ))}
        </ul>
    );
}

export default RecipeIngredients;