import { Link } from "react-router-dom";
import { PLACEHOLDER, handleImageError } from "../../utils/images";

function Hero({ recipe }) {
    return (
        <section className="hero">
            <div className="hero__text">
                <span className="hero__tag">🌿 Receitas caseiras</span>
                <h1>
                    Sabores de <span>vó</span> direto para a sua mesa
                </h1>
                <p>
                    Descubra receitas tradicionais, salve suas favoritas e cadastre as
                    que você mais ama. Tudo organizado, simples e feito com carinho.
                </p>
                <div className="hero__actions">
                    <Link to="/receitas" className="btn">
                        Explorar receitas
                    </Link>
                    <Link to="/nova-receita" className="btn btn--secondary">
                        Cadastrar receita
                    </Link>
                </div>
            </div>

            {recipe && (
                <div className="hero__visual">
                    <div className="hero__blob" aria-hidden="true" />
                    <img
                        className="hero__image"
                        src={recipe.image || PLACEHOLDER}
                        alt={recipe.title}
                        onError={handleImageError}
                    />
                    <Link to={`/receitas/${recipe.id}`} className="hero__badge">
                        <strong>{recipe.title}</strong>
                        <span>
                            ⭐ {recipe.rating.toFixed(1)} · ⏱️ {recipe.time}
                        </span>
                    </Link>
                </div>
            )}
        </section>
    );
}

export default Hero;