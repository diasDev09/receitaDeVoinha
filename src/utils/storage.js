export const STORAGE_KEYS = {
    FAVORITES: "rdv:favorites",
    CUSTOM_RECIPES: "rdv:custom-recipes",
};

export function getStorage(key, fallback = []) {
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

// Atalhos específicos do projeto
export const getFavorites = () => getStorage(STORAGE_KEYS.FAVORITES, []);
export const saveFavorites = (ids) => setStorage(STORAGE_KEYS.FAVORITES, ids);

export const getCustomRecipes = () =>
    getStorage(STORAGE_KEYS.CUSTOM_RECIPES, []);
export const saveCustomRecipes = (list) =>
    setStorage(STORAGE_KEYS.CUSTOM_RECIPES, list);