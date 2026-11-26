// Modo de contingência: quando a API está fora do ar, o usuário pode optar por ver
// os dados locais da AV1 (src/data). Fica no sessionStorage, então some ao fechar a aba.
// É só para demonstração: login, cadastro e favoritos continuam exigindo a API.
const KEY = "rdv:contingencia";
const EVENT = "rdv:contingencia-alterada";

export function isContingency() {
    try {
        return sessionStorage.getItem(KEY) === "1";
    } catch {
        return false;
    }
}

function setContingency(active) {
    try {
        if (active) sessionStorage.setItem(KEY, "1");
        else sessionStorage.removeItem(KEY);
    } catch {
        // sessionStorage indisponível: o modo vale só até o próximo evento
    }
    window.dispatchEvent(new Event(EVENT));
}

export const enableContingency = () => setContingency(true);
export const disableContingency = () => setContingency(false);

// Para useSyncExternalStore
export function subscribeContingency(callback) {
    window.addEventListener(EVENT, callback);
    return () => window.removeEventListener(EVENT, callback);
}
