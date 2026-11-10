import { request } from "./api";

// GET /api/categorias
export function listCategories(options) {
    return request("/api/categorias", options);
}
