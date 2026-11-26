import { BookOpen } from "lucide-react";

// icon: componente de ícone do Lucide (ex.: SearchX), nunca emoji
function EmptyState({ icon: Icon = BookOpen, title, message, children }) {
    return (
        <div className="empty-state" role="status">
            <span className="empty-state__icon" aria-hidden="true">
                <Icon size={24} strokeWidth={1.5} />
            </span>
            <h2>{title}</h2>
            {message && <p>{message}</p>}
            {children}
        </div>
    );
}

export default EmptyState;
