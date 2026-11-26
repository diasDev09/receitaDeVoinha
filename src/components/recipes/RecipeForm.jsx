import { useState } from "react";
import Input from "../common/Input";
import Button from "../common/Button";
import { validateRecipe } from "../../utils/validators";

const INITIAL_VALUES = {
    title: "",
    category: "",
    time: "",
    description: "",
    image: "",
    ingredients: "",
    preparation: "",
};

// categories vem da API (GET /api/categorias) pela página.
// onSubmit é assíncrono e pode devolver erros por campo da API ({ title: "..." }).
function RecipeForm({ categories, onSubmit, onCancel }) {
    const [values, setValues] = useState(INITIAL_VALUES);
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);

    function handleChange(e) {
        const { name, value } = e.target;
        setValues((prev) => ({ ...prev, [name]: value }));

        if (errors[name]) {
            setErrors((prev) => {
                const next = { ...prev };
                delete next[name];
                return next;
            });
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (submitting) return;

        const foundErrors = validateRecipe(values);
        setErrors(foundErrors);
        if (Object.keys(foundErrors).length > 0) return;

        setSubmitting(true);
        const serverErrors = await onSubmit(values);
        setSubmitting(false);
        if (serverErrors) setErrors(serverErrors);
    }

    const hasErrors = Object.keys(errors).length > 0;

    return (
        <form className="recipe-form" onSubmit={handleSubmit} noValidate>
            {hasErrors && (
                <p className="feedback feedback--error" role="alert">
                    Corrija os campos destacados antes de cadastrar.
                </p>
            )}

            <Input
                label="Nome da receita *"
                name="title"
                value={values.title}
                onChange={handleChange}
                error={errors.title}
                placeholder="Ex.: Bolo de fubá"
            />

            <div className="form-row">
                <Input
                    as="select"
                    label="Categoria *"
                    name="category"
                    value={values.category}
                    onChange={handleChange}
                    error={errors.category}
                >
                    <option value="">Selecione...</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.name}>
                            {category.name}
                        </option>
                    ))}
                </Input>

                <Input
                    label="Tempo de preparo *"
                    name="time"
                    value={values.time}
                    onChange={handleChange}
                    error={errors.time}
                    placeholder="Ex.: 40min ou 1h30"
                />
            </div>

            <Input
                as="textarea"
                rows={3}
                label="Descrição *"
                name="description"
                value={values.description}
                onChange={handleChange}
                error={errors.description}
                placeholder="Conte um pouco sobre a receita..."
            />

            <Input
                label="Imagem (opcional)"
                name="image"
                value={values.image}
                onChange={handleChange}
                error={errors.image}
                placeholder="/images/minha-receita.png ou https://..."
                hint="Link da internet ou caminho de um arquivo em public/images."
            />

            <Input
                as="textarea"
                rows={5}
                label="Ingredientes *"
                name="ingredients"
                value={values.ingredients}
                onChange={handleChange}
                error={errors.ingredients}
                placeholder={"2 ovos\n1 xícara de leite"}
                hint="Um ingrediente por linha."
            />

            <Input
                as="textarea"
                rows={5}
                label="Modo de preparo *"
                name="preparation"
                value={values.preparation}
                onChange={handleChange}
                error={errors.preparation}
                placeholder={"Misture os ingredientes.\nLeve ao forno por 30 minutos."}
                hint="Um passo por linha."
            />

            <div className="form-actions">
                <Button variant="secondary" onClick={onCancel} disabled={submitting}>
                    Cancelar
                </Button>
                <Button type="submit" disabled={submitting}>
                    {submitting ? "Salvando..." : "Cadastrar"}
                </Button>
            </div>
        </form>
    );
}

export default RecipeForm;