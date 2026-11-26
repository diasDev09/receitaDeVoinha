import { request } from "./api";
import { isContingency } from "./contingency";
import localCategories from "../data/categories";

// GET /api/categorias (em contingência: src/data/categories.js)
export async function listCategories(options) {
    if (isContingency()) return localCategories;
    return request("/api/categorias", options);
}
