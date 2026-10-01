function EmptyState({ icon = "🍽️", title, message, children }) {
    return (
        <div className="empty-state" role="status">
            <span className="empty-state__icon" aria-hidden="true">
                {icon}
            </span>
            <h2>{title}</h2>
            {message && <p>{message}</p>}
            {children}
        </div>
    );
}

export default EmptyState;