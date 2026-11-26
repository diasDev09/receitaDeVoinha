import { request, ApiError } from "./api";
import { isContingency } from "./contingency";

function requireApi() {
    if (isContingency()) {
        throw new ApiError(
            "O login precisa da API. Saia do modo contingência para entrar.",
            503,
        );
    }
}

// POST /api/auth/login -> { token, user: { id, name, username } }
export async function login(username, password) {
    requireApi();
    return request("/api/auth/login", {
        method: "POST",
        body: { username, password },
    });
}

// POST /api/auth/cadastro -> 201 { token, user } (a pessoa já entra logada)
// 400 com erros por campo; 409 se o nome de usuário já existe
export async function register(name, username, password) {
    requireApi();
    return request("/api/auth/cadastro", {
        method: "POST",
        body: { name, username, password },
    });
}

// GET /api/auth/me -> { id, name, username } (401 se o token não vale mais)
export function getCurrentUser(options) {
    return request("/api/auth/me", options);
}

// POST /api/auth/logout -> 204 (invalida o token no servidor)
export function logout() {
    return request("/api/auth/logout", { method: "POST" });
}
