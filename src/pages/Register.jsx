import { useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import useAuth from "../hooks/useAuth";
import useDocumentTitle from "../hooks/useDocumentTitle";

const INITIAL_VALUES = { name: "", username: "", password: "", confirmPassword: "" };

// Mesmas regras de CadastroRequest.java na API (o servidor valida de novo)
function validate(values) {
    const errors = {};
    const name = values.name.trim();
    const username = values.username.trim();

    if (name.length < 2) errors.name = "Informe seu nome (pelo menos 2 letras).";

    if (username.length < 3 || username.length > 40) {
        errors.username = "O usuário deve ter entre 3 e 40 caracteres.";
    } else if (!/^[A-Za-z0-9._-]+$/.test(username)) {
        errors.username = "Use só letras, números, ponto, hífen ou sublinhado, sem espaços.";
    }

    if (values.password.length < 6 || values.password.length > 72) {
        errors.password = "A senha deve ter entre 6 e 72 caracteres.";
    }

    if (values.confirmPassword !== values.password) {
        errors.confirmPassword = "As senhas não são iguais.";
    }

    return errors;
}

function Register() {
    useDocumentTitle("Criar conta");
    const { isAuthenticated, register } = useAuth();
    const location = useLocation();

    const [values, setValues] = useState(INITIAL_VALUES);
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState({ type: "idle" }); // idle | sending | error

    // Cadastro feito (ou já logado): segue para onde a pessoa queria ir
    if (isAuthenticated) {
        const from = location.state?.from;
        const target = from ? `${from.pathname}${from.search || ""}` : "/";
        return <Navigate to={target} replace />;
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setValues((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const found = validate(values);
        setErrors(found);
        if (Object.keys(found).length > 0) return;

        setStatus({ type: "sending" });
        try {
            await register(values.name.trim(), values.username.trim(), values.password);
            // sucesso: a sessão começou e o próximo render cai no <Navigate> acima
        } catch (error) {
            // 400: erro por campo; 409: usuário já existe (fields.username).
            // Com erro de campo, o detalhe fica no campo e o topo só avisa.
            const fields = error.fields || {};
            const hasFieldErrors = Object.keys(fields).length > 0;
            setErrors(fields);
            setStatus({
                type: "error",
                message: hasFieldErrors
                    ? "Verifique os campos destacados."
                    : error.message || "Não foi possível criar a conta agora.",
            });
        }
    }

    const sending = status.type === "sending";

    return (
        <section className="form-page auth-page">
            <div className="page-title">
                <h1>Criar conta</h1>
            </div>
            <p className="page-subtitle">
                Com uma conta você cadastra receitas da sua família e guarda as favoritas.
            </p>

            <form className="recipe-form" onSubmit={handleSubmit} noValidate>
                {status.type === "error" && (
                    <p className="feedback feedback--error" role="alert">
                        {status.message}
                    </p>
                )}

                <Input
                    label="Seu nome"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    error={errors.name}
                    autoComplete="name"
                    disabled={sending}
                />

                <Input
                    label="Nome de usuário"
                    name="username"
                    value={values.username}
                    onChange={handleChange}
                    error={errors.username}
                    hint="É com ele que você entra. Letras, números, ponto, hífen ou sublinhado."
                    autoComplete="username"
                    disabled={sending}
                />

                <div className="form-row">
                    <Input
                        label="Senha"
                        name="password"
                        type="password"
                        value={values.password}
                        onChange={handleChange}
                        error={errors.password}
                        hint="Pelo menos 6 caracteres."
                        autoComplete="new-password"
                        disabled={sending}
                    />

                    <Input
                        label="Confirme a senha"
                        name="confirmPassword"
                        type="password"
                        value={values.confirmPassword}
                        onChange={handleChange}
                        error={errors.confirmPassword}
                        autoComplete="new-password"
                        disabled={sending}
                    />
                </div>

                <div className="form-actions">
                    <Button type="submit" disabled={sending}>
                        {sending ? "Criando conta..." : "Criar conta"}
                    </Button>
                </div>
            </form>

            <p className="auth-switch">
                Já tem conta?{" "}
                <Link to="/login" state={location.state}>
                    Entrar
                </Link>
            </p>
        </section>
    );
}

export default Register;
