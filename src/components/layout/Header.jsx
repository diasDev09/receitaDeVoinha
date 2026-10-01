import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import SearchBar from "../common/SearchBar";

function Header() {
    const [term, setTerm] = useState("");
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        const query = term.trim();
        navigate(query ? `/receitas?busca=${encodeURIComponent(query)}` : "/receitas");
        setTerm("");
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
            </div>
        </header>
    );
}

export default Header;