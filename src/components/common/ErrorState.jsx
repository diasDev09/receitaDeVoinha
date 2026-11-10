import EmptyState from "./EmptyState";

// Erro de carregamento de uma página, com botão para tentar de novo
function ErrorState({ message, onRetry }) {
    return (
        <EmptyState
            icon="⚠️"
            title="Algo deu errado"
            message={message || "Não foi possível carregar os dados."}
        >
            {onRetry && (
                <button type="button" className="btn" onClick={onRetry}>
                    Tentar novamente
                </button>
            )}
        </EmptyState>
    );
}

export default ErrorState;
