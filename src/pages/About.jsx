import { Link } from "react-router-dom";
import useDocumentTitle from "../hooks/useDocumentTitle";

const features = [
    { icon: "🔍", text: "Busque receitas por nome, descrição ou ingrediente" },
    { icon: "🗂️", text: "Filtre por categoria e ordene como preferir" },
    { icon: "❤️", text: "Salve suas receitas favoritas" },
    { icon: "✍️", text: "Cadastre suas próprias receitas de família" },
];

function About() {
    useDocumentTitle("Sobre");

    return (
        <section className="about">
            <div className="page-title">
                <h1>Sobre o projeto</h1>
            </div>

            <div className="about__card">
                <h2>Receita de Voinha 🍲</h2>
                <p>
                    O Receita de Voinha é uma aplicação web de receitas culinárias
                    caseiras, pensada para apresentar os pratos de forma visual,
                    organizada e interativa. Aqui as receitas ficam à mão, do jeitinho
                    que a vovó faz.
                </p>
            </div>

            <div className="about__card">
                <h2>Objetivo</h2>
                <p>
                    Este projeto foi desenvolvido como a primeira avaliação (AV1) da
                    disciplina, com o objetivo de construir um protótipo funcional em
                    React: navegação entre telas, gerenciamento de estado, formulário
                    com validação, busca e filtro, e persistência dos dados no
                    navegador com localStorage.
                </p>
            </div>

            <div className="about__card">
                <h2>O que você pode fazer</h2>
                <ul className="about__features">
                    {features.map((feature) => (
                        <li key={feature.text}>
                            <span aria-hidden="true">{feature.icon}</span>
                            {feature.text}
                        </li>
                    ))}
                </ul>
                <p className="about__tech">
                    Feito com React, JavaScript, Vite e React Router. Os dados ficam
                    salvos apenas no seu navegador.
                </p>
            </div>

            <div className="about__cta">
                <Link to="/receitas" className="btn">
                    Explorar receitas
                </Link>
            </div>
        </section>
    );
}

export default About;