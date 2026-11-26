import { Link } from "react-router-dom";
import { BookMarked, Heart, PenLine, Search } from "lucide-react";
import useDocumentTitle from "../hooks/useDocumentTitle";

const features = [
    { icon: Search, text: "Buscar receitas por nome, descrição ou ingrediente" },
    { icon: BookMarked, text: "Filtrar por capítulo e ordenar como preferir" },
    { icon: Heart, text: "Guardar as receitas favoritas na sua conta" },
    { icon: PenLine, text: "Cadastrar as receitas da sua família" },
];

function About() {
    useDocumentTitle("Sobre");

    return (
        <section className="about">
            <div className="page-title">
                <h1>Sobre o caderno</h1>
            </div>

            <div className="about__section">
                <p>
                    Receitas de família costumam ficar em cadernos, mensagens e na memória de
                    quem cozinha, e somem justo na hora do preparo. O Receita de Voinha junta
                    essas receitas num caderno só, fácil de consultar e de continuar escrevendo.
                </p>
            </div>

            <div className="about__section">
                <h2>O que dá para fazer</h2>
                <ul className="about__features">
                    {features.map(({ icon: Icon, text }) => (
                        <li key={text}>
                            <Icon size={20} strokeWidth={1.5} aria-hidden="true" />
                            {text}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="about__section">
                <h2>Como foi feito</h2>
                <p>
                    Projeto da disciplina Front-end Frameworks (AV1 e AV2). O front é feito em
                    React, Vite e React Router; as receitas, os favoritos e o login vêm de uma
                    API em Java com Spring Boot.
                </p>
            </div>

            <div className="about__cta">
                <Link to="/receitas" className="btn">
                    Ver todas as receitas
                </Link>
            </div>
        </section>
    );
}

export default About;
