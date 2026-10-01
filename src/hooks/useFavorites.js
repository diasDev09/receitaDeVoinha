import { useState } from "react";
import { getFavorites, saveFavorites } from "../utils/storage";

function useFavorites() {
    const [favorites, setFavorites] = useState(() => getFavorites());

    function isFavorite(id) {
        return favorites.includes(id);
    }

    // Retorna true se a receita passou a ser favorita, false se foi removida
    function toggleFavorite(id) {
        const alreadyFavorite = favorites.includes(id);
        const next = alreadyFavorite
            ? favorites.filter((favoriteId) => favoriteId !== id)
            : [...favorites, id];

        setFavorites(next);
        saveFavorites(next);
        return !alreadyFavorite;
    }

    return { favorites, isFavorite, toggleFavorite };
}

export default useFavorites;