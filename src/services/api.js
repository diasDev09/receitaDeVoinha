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
        this.fields = fields;
    }
}

export async function request(path, { signal, ...options } = {}) {
    let response;
    try {
        response = await fetch(`${API_URL}${path}`, {
            ...options,
            signal,
            headers: { Accept: "application/json", ...options.headers },
        });
    } catch (error) {
        if (error.name === "AbortError") throw error; // cancelada: não é erro de rede
        throw new ApiError(
            "Não foi possível falar com o servidor. Verifique se a API está no ar.",
        );
    }

    // Erros da API vêm no formato { status, message, fields }
    if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new ApiError(
            body.message || `Erro ${response.status} ao chamar o servidor.`,
            response.status,
            body.fields,
        );
    }

    return response.status === 204 ? null : response.json();
}
