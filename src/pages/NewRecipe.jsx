import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import RecipeForm from "../components/recipes/RecipeForm";
import Button from "../components/common/Button";
import { getCustomRecipes, saveCustomRecipes } from "../utils/storage";
import { textToList } from "../utils/validators";

function NewRecipe() {
    const navigate = useNavigate();
    const [status, setStatus] = useState({ type: "idle" });

    function handleSubmit(values) {
        const recipe = {
            id: Date.now(), // id único e numérico
            title: values.title.trim(),
            category: values.category,
            description: values.description.trim(),
            image: values.image.trim(),
            rating: 0, // receita nova ainda não tem avaliação
            time: values.time.trim(),
            ingredients: textToList(values.ingredients),
            preparation: textToList(values.preparation),
        };

        const saved = saveCustomRecipes([...getCustomRecipes(), recipe]);

        setStatus(
            saved
                ? { type: "success", recipe }
                : { type: "error" }
        );
    }

    if (status.type === "success") {
        return (
            <section className="form-page">
                <div className="feedback feedback--success form-success" role="status">
                    <h2>Receita cadastrada com sucesso! 🎉</h2>
                    <p>
                        “{status.recipe.title}” já está na lista de receitas e foi salva no
                        seu navegador.
                    </p>
                    <div className="form-actions">
                        <Link to={`/receitas/${status.recipe.id}`} className="btn">
                            Ver receita
                        </Link>
                        <Button
                            variant="secondary"
                            onClick={() => setStatus({ type: "idle" })}
                        >
                            Cadastrar outra
                        </Button>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="form-page">
            <div className="page-title">
                <h1>Nova receita</h1>
            </div>

            {status.type === "error" && (
                <p className="feedback feedback--error" role="alert">
                    Não foi possível salvar a receita. Verifique o armazenamento do
                    navegador e tente novamente.
                </p>
            )}

            <RecipeForm
                onSubmit={handleSubmit}
                onCancel={() => navigate("/receitas")}
            />
        </section>
    );
}

export default NewRecipe;