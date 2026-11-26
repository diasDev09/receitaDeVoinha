import { Link } from "react-router-dom";
import useDocumentTitle from "../hooks/useDocumentTitle";

function NotFound() {
    useDocumentTitle("Página não encontrada");

    return (
        <section className="not-found">
            <span className="not-found__numeral" aria-hidden="true">
                404
            </span>
            <h1>Esta página não está no caderno</h1>
            <p>O endereço pode ter mudado ou estar digitado errado.</p>
            <Link to="/" className="btn">
                Voltar para a capa
            </Link>
        </section>
    );
}

export default NotFound;
