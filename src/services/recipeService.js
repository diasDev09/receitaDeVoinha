import { request, ApiError } from "./api";
import { getCustomRecipes } from "../utils/storage";

// GET /api/receitas + receitas cadastradas no navegador.
// (O cadastro na API entra junto com o login; até lá, novas receitas ficam no localStorage.)
export async function listRecipes(options) {
    const fromApi = await request("/api/receitas", options);
    return [...fromApi, ...getCustomRecipes()];
}

// GET /api/receitas/{id}; ids de receitas locais são resolvidos sem chamar a API
export async function getRecipe(id, options) {
    const local = getCustomRecipes().find((item) => String(item.id) === String(id));
    if (local) return local;

    if (!/^\d+$/.test(String(id))) {
        throw new ApiError("Receita não encontrada.", 404);
    }
    return request(`/api/receitas/${id}`, options);
}
