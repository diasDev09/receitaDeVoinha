import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CircleCheck } from "lucide-react";
import RecipeForm from "../components/recipes/RecipeForm";
import Button from "../components/common/Button";
import Loading from "../components/common/Loading";
import ErrorState from "../components/common/ErrorState";
import useAsync from "../hooks/useAsync";
import useDocumentTitle from "../hooks/useDocumentTitle";
import { createRecipe } from "../services/recipeService";
import { listCategories } from "../services/categoryService";
import { textToList } from "../utils/validators";

// Rota protegida: a receita é gravada na API em nome do usuário logado
function NewRecipe() {
    useDocumentTitle("Nova receita");
    const navigate = useNavigate();
    const [status, setStatus] = useState({ type: "idle" }); // idle | success | error
    const [formKey, setFormKey] = useState(0);
    const { data: categories, loading, error, reload } = useAsync(listCategories);

    // Devolve os erros por campo vindos da API (400) para o formulário marcar
    async function handleSubmit(values) {
        setStatus({ type: "idle" });
        try {
            const recipe = await createRecipe({
                title: values.title.trim(),
                category: values.category,
                time: values.time.trim(),
                description: values.description.trim(),
                image: values.image.trim(),
                ingredients: textToList(values.ingredients),
                preparation: textToList(values.preparation),
            });
            setStatus({ type: "success", recipe });
            return null;
        } catch (err) {
            setStatus({ type: "error", message: err.message });
            return err.fields || null;
        }
    }

    if (status.type === "success") {
        return (
            <section className="form-page">
                <div className="feedback feedback--success form-success" role="status">
                    <h2>
                        <CircleCheck size={24} strokeWidth={1.75} aria-hidden="true" />
                        Receita cadastrada
                    </h2>
                    <p>“{status.recipe.title}” foi salva no servidor e já aparece na lista de receitas.</p>
                    <div className="form-actions">
                        <Link to={`/receitas/${status.recipe.id}`} className="btn">
                            Ver receita
                        </Link>
                        <Button
                            variant="secondary"
                            onClick={() => {
                                setStatus({ type: "idle" });
                                setFormKey((key) => key + 1);
                            }}
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

            {loading && <Loading message="Carregando categorias..." />}
            {error && <ErrorState error={error} onRetry={reload} />}

            {status.type === "error" && (
                <p className="feedback feedback--error" role="alert">
                    Não foi possível salvar a receita: {status.message}
                </p>
            )}

            {categories && (
                <RecipeForm
                    key={formKey}
                    categories={categories}
                    onSubmit={handleSubmit}
                    onCancel={() => navigate("/receitas")}
                />
            )}
        </section>
    );
}

export default NewRecipe;
