import { useSyncExternalStore } from "react";
import { isContingency, subscribeContingency } from "../services/contingency";

// true enquanto o modo contingência (dados locais) estiver ligado
export default function useContingency() {
    return useSyncExternalStore(subscribeContingency, isContingency);
}
