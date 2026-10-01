import { useParams } from "react-router-dom";

function RecipeDetails() {
    const { id } = useParams();

    return (
        <section>
            <h1>Detalhes da receita</h1>
            <p>ID recebido pela rota: {id}</p>
        </section>
    );
}

export default RecipeDetails;