import { request, ApiError } from "./api";
import { isContingency } from "./contingency";

// Favoritos são do usuário logado e ficam na API (todas as rotas exigem token).
function requireApi() {
    if (isContingency()) {
        throw new ApiError(
            "Os favoritos ficam na API. Saia do modo contingência para vê-los.",
            503,
        );
    }
}

// GET /api/favoritos -> lista de receitas favoritadas
export async function listFavorites(options) {
    requireApi();
    return request("/api/favoritos", options);
}

// PUT /api/favoritos/{id} -> 204
export async function addFavorite(recipeId) {
    requireApi();
    return request(`/api/favoritos/${recipeId}`, { method: "PUT" });
}

// DELETE /api/favoritos/{id} -> 204
export async function removeFavorite(recipeId) {
    requireApi();
    return request(`/api/favoritos/${recipeId}`, { method: "DELETE" });
}
