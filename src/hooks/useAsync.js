import { useCallback, useEffect, useState } from "react";

// Executa uma chamada assíncrona e expõe { data, loading, error, reload }.
// `load` recebe { signal } e deve ser estável (useCallback) para não repetir a chamada.
export default function useAsync(load) {
    const [state, setState] = useState({ data: null, loading: true, error: null });
    const [attempt, setAttempt] = useState(0);

    useEffect(() => {
        const controller = new AbortController();
        setState((prev) => ({ ...prev, loading: true, error: null }));

        load({ signal: controller.signal })
            .then((data) => setState({ data, loading: false, error: null }))
            .catch((error) => {
                if (error.name === "AbortError") return;
                setState({ data: null, loading: false, error });
            });

        return () => controller.abort();
    }, [load, attempt]);

    const reload = useCallback(() => setAttempt((n) => n + 1), []);

    return { ...state, reload };
}
