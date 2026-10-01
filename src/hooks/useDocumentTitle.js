import { useEffect } from "react";

const BASE_TITLE = "Receita de Voinha";

function useDocumentTitle(title) {
    useEffect(() => {
        document.title = title ? `${title} · ${BASE_TITLE}` : BASE_TITLE;
    }, [title]);
}

export default useDocumentTitle;