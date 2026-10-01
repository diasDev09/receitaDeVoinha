import { NavLink } from "react-router-dom";

const links = [
    { to: "/", label: "Home" },
    { to: "/receitas", label: "Receitas" },
    { to: "/categorias", label: "Categorias" },
    { to: "/favoritos", label: "Favoritos" },
    { to: "/sobre", label: "Sobre" },
];

function Navbar() {
    return (
        <nav className="navbar" aria-label="Navegação principal">
            {links.map((link) => (
                <NavLink
                    key={link.to}
                    to={link.to}
                    end={link.to === "/"}
                    className={({ isActive }) =>
                        isActive ? "navbar__link active" : "navbar__link"
                    }
                >
                    {link.label}
                </NavLink>
            ))}
        </nav>
    );
}

export default Navbar;