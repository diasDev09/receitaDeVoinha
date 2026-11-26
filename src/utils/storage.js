export const STORAGE_KEYS = {
    // { token, user: { id, name, username } }. A senha nunca é guardada.
    SESSION: "rdv:session",
};

export function getStorage(key, fallback = null) {
    try {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : fallback;
    } catch (error) {
        console.error(`Erro ao ler "${key}" do localStorage:`, error);
        return fallback;
    }
}

export function setStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (error) {
        console.error(`Erro ao salvar "${key}" no localStorage:`, error);
        return false;
    }
}

export function removeStorage(key) {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.error(`Erro ao remover "${key}" do localStorage:`, error);
    }
}

// Atalhos da sessão
export const getSession = () => getStorage(STORAGE_KEYS.SESSION, null);
export const saveSession = (session) => setStorage(STORAGE_KEYS.SESSION, session);
export const clearSession = () => removeStorage(STORAGE_KEYS.SESSION);
