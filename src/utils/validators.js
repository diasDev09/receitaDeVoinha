// Transforma um textarea (uma linha por item) em lista
export function textToList(text) {
    return text
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line.length > 0);
}

export function validateRecipe(values) {
    const errors = {};

    if (values.title.trim().length < 3) {
        errors.title = "O nome deve ter pelo menos 3 caracteres.";
    }

    if (!values.category) {
        errors.category = "Selecione uma categoria.";
    }

    if (!values.time.trim()) {
        errors.time = "Informe o tempo de preparo (ex.: 40min).";
    }

    if (values.description.trim().length < 10) {
        errors.description = "A descrição deve ter pelo menos 10 caracteres.";
    }

    const image = values.image.trim();
    if (image && !/^(https?:\/\/|\/)/.test(image)) {
        errors.image = "Use um link (http...) ou um caminho começando com /.";
    }

    if (textToList(values.ingredients).length < 2) {
        errors.ingredients = "Informe pelo menos 2 ingredientes (um por linha).";
    }

    if (textToList(values.preparation).length < 1) {
        errors.preparation = "Informe pelo menos 1 passo (um por linha).";
    }

    return errors; // objeto vazio = formulário válido
}