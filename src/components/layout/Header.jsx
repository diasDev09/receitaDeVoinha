import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import SearchBar from "../common/SearchBar";
import useAuth from "../../hooks/useAuth";

function Header() {
    const [term, setTerm] = useState("");
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    function handleSubmit(e) {
        e.preventDefault();
        const query = term.trim();
        navigate(query ? `/receitas?busca=${encodeURIComponent(query)}` : "/receitas");
        setTerm("");
    }

    // Em página pública o usuário continua onde está; em rota protegida
    // o ProtectedRoute o leva ao /login com o aviso "Você saiu da sua conta."
    function handleLogout() {
        logout();
    }

    return (
        <header className="header">
            <div className="header__inner container">
                <Link to="/" className="header__logo">
                    🍲 Receita de Voinha
                </Link>

                <Navbar />

                <form className="header__search" onSubmit={handleSubmit}>
                    <SearchBar value={term} onChange={setTerm} />
                </form>

                <div className="header__auth">
                    {user ? (
                        <>
                            <span className="header__user" title={`Conectado como ${user.username}`}>
                                Olá, {user.name}
                            </span>
                            <button type="button" className="btn btn--small" onClick={handleLogout}>
                                Sair
                            </button>
                        </>
                    ) : (
                        <Link to="/login" className="btn btn--small">
                            Entrar
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;
