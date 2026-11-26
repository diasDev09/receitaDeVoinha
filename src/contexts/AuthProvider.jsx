import { useCallback, useEffect, useMemo, useState } from "react";
import AuthContext from "./authContext";
import { setAuthToken, setUnauthorizedHandler } from "../services/api";
import * as authService from "../services/authService";
import { getSession, saveSession, clearSession } from "../utils/storage";

// Lê a sessão salva uma única vez, já entregando o token ao cliente HTTP,
// para que a primeira requisição após o F5 já saia autenticada.
function readStoredSession() {
    const stored = getSession();
    const valid = stored?.token && stored?.user ? stored : null;
    setAuthToken(valid?.token);
    return valid;
}

// Dono da sessão: login, logout, restauração após recarregar e reação ao 401.
function AuthProvider({ children }) {
    const [session, setSession] = useState(readStoredSession);
    // Por que a sessão acabou: "expired" (401 da API) ou "logout" (o usuário saiu)
    const [authNotice, setAuthNotice] = useState(null);

    const endSession = useCallback(() => {
        setAuthToken(null);
        clearSession();
        setSession(null);
    }, []);

    // Qualquer 401 com token (sessão vencida, API reiniciada) derruba a sessão local
    useEffect(() => {
        setUnauthorizedHandler(() => {
            endSession();
            setAuthNotice("expired");
        });
        return () => setUnauthorizedHandler(null);
    }, [endSession]);

    // Ao abrir o app com sessão salva, confirma com a API se o token ainda vale.
    // Se a API estiver fora do ar, mantém a sessão (o 401 só vem se ela recusar).
    const storedToken = session?.token;
    useEffect(() => {
        if (!storedToken) return undefined;
        const controller = new AbortController();
        authService
            .getCurrentUser({ signal: controller.signal })
            .then((user) => {
                const next = { token: storedToken, user };
                saveSession(next);
                setSession(next);
            })
            .catch(() => {});
        return () => controller.abort();
        // Só na montagem: depois do login a resposta já traz o usuário
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Login e cadastro terminam igual: a API devolve { token, user } e a sessão começa
    const startSession = useCallback(({ token, user }) => {
        const next = { token, user };
        setAuthToken(token);
        saveSession(next); // só token e dados públicos do usuário, nunca a senha
        setSession(next);
        setAuthNotice(null);
        return user;
    }, []);

    const login = useCallback(
        async (username, password) => startSession(await authService.login(username, password)),
        [startSession]
    );

    const register = useCallback(
        async (name, username, password) =>
            startSession(await authService.register(name, username, password)),
        [startSession]
    );

    // Se o usuário estiver numa rota protegida, o ProtectedRoute o leva ao /login
    const logout = useCallback(() => {
        // Avisa a API (o token é lido antes de limpar) e encerra localmente sem esperar
        authService.logout().catch(() => {});
        endSession();
        setAuthNotice("logout");
    }, [endSession]);

    const value = useMemo(
        () => ({
            user: session?.user ?? null,
            isAuthenticated: Boolean(session),
            authNotice,
            login,
            register,
            logout,
        }),
        [session, authNotice, login, register, logout],
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
