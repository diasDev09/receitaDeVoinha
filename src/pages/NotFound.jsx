import { Link } from "react-router-dom";
import useDocumentTitle from "../hooks/useDocumentTitle";

function NotFound() {
    useDocumentTitle("Página não encontrada");

    return (
        <section className="not-found">
            <span className="not-found__icon" aria-hidden="true">
                🍳
            </span>
            <h1>404</h1>
            <p>Ops! Essa página não foi encontrada.</p>
            <Link to="/" className="btn">
                Voltar para a Home
            </Link>
        </section>
    );
}

export default NotFound;