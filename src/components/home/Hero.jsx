import { Link } from "react-router-dom";
import RecipeMeta from "../recipes/RecipeMeta";
import { PLACEHOLDER, handleImageError } from "../../utils/images";

// Capa do caderno: tecido, lombada, friso dourado e uma prancha colada
function Hero({ recipe }) {
    return (
        <section className="cover" aria-labelledby="cover-title">
            <span className="cover__frame" aria-hidden="true" />

            <div className="cover__text">
                <h1 id="cover-title" className="cover__title">
                    Receita de Voinha
                </h1>
                <hr className="cover__rule" />
                <p className="cover__lede">
                    O caderno onde a família guarda a feijoada de domingo, o pudim das
                    festas e o pão de queijo do café.
                </p>
                <div className="cover__actions">
                    <Link to="/receitas" className="btn btn--gold">
                        Ver todas as receitas
                    </Link>
                    <Link to="/nova-receita" className="btn btn--ghost">
                        Cadastrar receita
                    </Link>
                </div>
            </div>

            {recipe && (
                <Link to={`/receitas/${recipe.id}`} className="cover__plate">
                    <img
                        src={recipe.image || PLACEHOLDER}
                        alt=""
                        onError={handleImageError}
                    />
                    <span className="cover__caption">
                        <strong>{recipe.title}</strong>
                        <RecipeMeta recipe={recipe} />
                    </span>
                </Link>
            )}
        </section>
    );
}

export default Hero;
