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

// GET /api/auth/me -> { id, name, username } (401 se o token não vale mais)
export function getCurrentUser(options) {
    return request("/api/auth/me", options);
}

// POST /api/auth/logout -> 204 (invalida o token no servidor)
export function logout() {
    return request("/api/auth/logout", { method: "POST" });
}
