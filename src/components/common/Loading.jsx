function Loading({ message = "Carregando..." }) {
    return (
        <div className="loading" role="status">
            <span className="loading__spinner" aria-hidden="true" />
            <p>{message}</p>
        </div>
    );
}

export default Loading;