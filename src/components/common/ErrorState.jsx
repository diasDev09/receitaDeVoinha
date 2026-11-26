import EmptyState from "./EmptyState";
import { enableContingency } from "../../services/contingency";

// Erro de carregamento de uma página, com botão para tentar de novo.
// Se a API não respondeu (status 0), oferece também os dados de contingência.
function ErrorState({ error, message, onRetry }) {
    const offline = error?.status === 0;

    function showLocalData() {
        enableContingency();
        onRetry?.();
    }

    return (
        <EmptyState
            icon={offline ? "🔌" : "⚠️"}
            title={offline ? "Servidor fora do ar" : "Algo deu errado"}
            message={message || error?.message || "Não foi possível carregar os dados."}
        >
            {onRetry && (
                <div className="form-actions">
                    <button type="button" className="btn" onClick={onRetry}>
                        Tentar novamente
                    </button>
                    {offline && (
                        <button
                            type="button"
                            className="btn btn--secondary"
                            onClick={showLocalData}
                        >
                            Ver dados de demonstração
                        </button>
                    )}
                </div>
            )}
        </EmptyState>
    );
}

export default ErrorState;
