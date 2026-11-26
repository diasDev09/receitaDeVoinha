// Esqueleto no formato das pranchas da lista (sem spinner, como pede o guia de design)
function Loading({ message = "Carregando..." }) {
    return (
        <div className="loading" role="status">
            <span className="visually-hidden">{message}</span>
            {[0, 1, 2].map((item) => (
                <div key={item} aria-hidden="true">
                    <div className="skeleton skeleton--image" />
                    <div className="skeleton skeleton--line skeleton--short" />
                    <div className="skeleton skeleton--line" />
                </div>
            ))}
        </div>
    );
}

export default Loading;
