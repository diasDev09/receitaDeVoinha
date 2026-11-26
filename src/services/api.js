// Cliente HTTP único do front. Todas as chamadas à API passam por aqui.
// A URL base vem do .env (VITE_API_URL); o padrão é a API rodando local.
export const API_URL = (
    import.meta.env.VITE_API_URL || "http://localhost:8080"
).replace(/\/$/, "");

export class ApiError extends Error {
    constructor(message, status = 0, fields = {}) {
        super(message);
        this.name = "ApiError";
        this.status = status; // 0 = não chegou a falar com a API
        this.fields = fields || {};
    }
}

// Token da sessão atual. Quem define é o AuthProvider (login, logout e restauração).
let authToken = null;
let unauthorizedHandler = null;

export function setAuthToken(token) {
    authToken = token || null;
}

// Chamado quando uma requisição COM token volta 401 (sessão vencida ou API reiniciada)
export function setUnauthorizedHandler(handler) {
    unauthorizedHandler = handler;
}

export async function request(path, { signal, body, headers, ...options } = {}) {
    const sentToken = authToken;
    const finalHeaders = { Accept: "application/json", ...headers };
    if (body !== undefined) finalHeaders["Content-Type"] = "application/json";
    if (sentToken) finalHeaders.Authorization = `Bearer ${sentToken}`;

    let response;
    try {
        response = await fetch(`${API_URL}${path}`, {
            ...options,
            signal,
            headers: finalHeaders,
            body: body === undefined ? undefined : JSON.stringify(body),
        });
    } catch (error) {
        if (error.name === "AbortError") throw error; // cancelada: não é erro de rede
        throw new ApiError(
            "Não foi possível falar com o servidor. Verifique se a API está no ar.",
        );
    }

    // Erros da API vêm no formato { status, message, fields }
    if (!response.ok) {
        const data = await response.json().catch(() => ({}));

        if (response.status === 401 && sentToken) {
            unauthorizedHandler?.();
            throw new ApiError("Sua sessão expirou. Entre novamente.", 401);
        }

        throw new ApiError(
            data.message || `Erro ${response.status} ao chamar o servidor.`,
            response.status,
            data.fields,
        );
    }

    return response.status === 204 ? null : response.json();
}
