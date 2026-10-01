import { Link } from "react-router-dom";

function NotFound() {
    return (
        <section className="not-found">
            <h1>404</h1>
            <p>Ops! Essa página não foi encontrada.</p>
            <Link to="/" className="btn">
                Voltar para a Home
            </Link>
        </section>
    );
}

export default NotFound;