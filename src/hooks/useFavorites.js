import { useCallback, useState } from "react";
import useAsync from "./useAsync";
import useAuth from "./useAuth";
import { listFavorites, addFavorite, removeFavorite } from "../services/favoriteService";

const notLogged = async () => [];

// Favoritos do usuário logado, gravados na API. Sem login a lista é vazia.
function useFavorites() {
    const { isAuthenticated } = useAuth();
    const load = useCallback(
        (options) => (isAuthenticated ? listFavorites(options) : notLogged()),
        [isAuthenticated]
    );
    const { data: favorites, loading, error, reload } = useAsync(load);

    // Ajuste otimista: o botão muda na hora e volta atrás se a API recusar
    const [changes, setChanges] = useState({});
    const isFavorite = (id) =>
        id in changes ? changes[id] : Boolean(favorites?.some((r) => r.id === id));

    // Resolve com true se passou a ser favorita, false se foi removida
    async function toggleFavorite(id) {
        const next = !isFavorite(id);
        setChanges((prev) => ({ ...prev, [id]: next }));
        try {
            await (next ? addFavorite(id) : removeFavorite(id));
            return next;
        } catch (err) {
            setChanges((prev) => ({ ...prev, [id]: !next }));
            throw err;
        }
    }

    return { favorites, loading, error, reload, isFavorite, toggleFavorite };
}

export default useFavorites;
