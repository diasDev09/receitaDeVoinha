import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BookOpen, LogIn, LogOut } from "lucide-react";
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
                    <BookOpen size={22} strokeWidth={1.5} aria-hidden="true" />
                    Receita de Voinha
                </Link>

                <Navbar />

                <form className="header__search" onSubmit={handleSubmit} role="search">
                    <SearchBar value={term} onChange={setTerm} />
                </form>

                <div className="header__auth">
                    {user ? (
                        <>
                            <span className="header__user" title={`Conectado como ${user.username}`}>
                                {user.name}
                            </span>
                            <button
                                type="button"
                                className="btn btn--ghost btn--small"
                                onClick={handleLogout}
                            >
                                <LogOut size={16} strokeWidth={1.75} aria-hidden="true" />
                                Sair
                            </button>
                        </>
                    ) : (
                        <Link to="/login" className="btn btn--gold btn--small">
                            <LogIn size={16} strokeWidth={1.75} aria-hidden="true" />
                            Entrar
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;
