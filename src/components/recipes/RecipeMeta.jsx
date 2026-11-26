import { Clock, Star } from "lucide-react";

const formatRating = (rating) =>
    rating > 0 ? rating.toFixed(1).replace(".", ",") : "Nova";

// Tempo de preparo e avaliação, com rótulos para leitores de tela
function RecipeMeta({ recipe }) {
    return (
        <div className="recipe-meta">
            <span>
                <Clock size={15} strokeWidth={1.75} aria-hidden="true" />
                <span className="visually-hidden">Tempo de preparo:</span>
                {recipe.time}
            </span>
            <span>
                <Star size={15} strokeWidth={1.75} aria-hidden="true" />
                <span className="visually-hidden">Avaliação:</span>
                {formatRating(recipe.rating)}
            </span>
        </div>
    );
}

export default RecipeMeta;
