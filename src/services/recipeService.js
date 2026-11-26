import { request, ApiError } from "./api";
import { isContingency } from "./contingency";
import localRecipes from "../data/recipes";

// Em modo contingência as leituras usam src/data/recipes.js (mesmo formato da API).
// Escritas nunca são simuladas: sem API, o usuário vê uma mensagem clara.
function requireApi(action) {
    if (isContingency()) {
        throw new ApiError(
            `${action} precisa da API. Saia do modo contingência e tente de novo.`,
            503,
        );
    }
}

// GET /api/receitas
export async function listRecipes(options) {
    if (isContingency()) return localRecipes;
    return request("/api/receitas", options);
}

// GET /api/receitas/{id}
export async function getRecipe(id, options) {
    if (!/^\d+$/.test(String(id))) {
        throw new ApiError("Receita não encontrada.", 404);
    }

    if (isContingency()) {
        const recipe = localRecipes.find((item) => String(item.id) === String(id));
        if (!recipe) throw new ApiError("Receita não encontrada.", 404);
        return recipe;
    }

    return request(`/api/receitas/${id}`, options);
}

// POST /api/receitas (exige login) -> 201 com a receita criada
export async function createRecipe(recipe) {
    requireApi("Cadastrar receitas");
    return request("/api/receitas", { method: "POST", body: recipe });
}

// DELETE /api/receitas/{id} (exige login; 403 se não for o autor)
export async function deleteRecipe(id) {
    requireApi("Excluir receitas");
    return request(`/api/receitas/${id}`, { method: "DELETE" });
}
