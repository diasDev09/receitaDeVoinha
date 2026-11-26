import { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import useAuth from "../hooks/useAuth";
import useDocumentTitle from "../hooks/useDocumentTitle";

// Contas de demonstração cadastradas na API (data.sql). Não são segredos.
const DEMO_ACCOUNTS = [
    { username: "voinha", password: "voinha123", label: "Dona Voinha (autora das receitas iniciais)" },
    { username: "neto", password: "neto123", label: "Neto Curioso" },
];

function validate(values) {
    const errors = {};
    if (!values.username.trim()) errors.username = "Informe o usuário.";
    if (!values.password) errors.password = "Informe a senha.";
    return errors;
}

function Login() {
    useDocumentTitle("Entrar");
    const { isAuthenticated, login, authNotice } = useAuth();
    const location = useLocation();

    const [values, setValues] = useState({ username: "", password: "" });
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState({ type: "idle" }); // idle | sending | error

    // Depois do login (ou se já estiver logado) volta para onde o usuário queria ir
    if (isAuthenticated) {
        const from = location.state?.from;
        const target = from ? `${from.pathname}${from.search || ""}` : "/favoritos";
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
            await login(values.username.trim(), values.password);
            // sucesso: o próximo render cai no <Navigate> acima
        } catch (error) {
            const message =
                error.status === 401
                    ? "Usuário ou senha inválidos."
                    : error.message || "Não foi possível entrar agora.";
            setErrors(error.fields || {});
            setStatus({ type: "error", message });
            setValues((prev) => ({ ...prev, password: "" }));
        }
    }

    const sending = status.type === "sending";

    return (
        <section className="form-page auth-page">
            <div className="page-title">
                <h1>Entrar</h1>
            </div>

            {authNotice === "expired" && status.type === "idle" && (
                <p className="feedback feedback--error" role="alert">
                    Sua sessão expirou. Entre novamente para continuar.
                </p>
            )}

            {authNotice === "logout" && status.type === "idle" && (
                <p className="feedback feedback--success" role="status">
                    Você saiu da sua conta.
                </p>
            )}

            {location.state?.from && !authNotice && status.type === "idle" && (
                <p className="feedback feedback--info" role="status">
                    Entre na sua conta para acessar essa página.
                </p>
            )}

            <form className="recipe-form" onSubmit={handleSubmit} noValidate>
                {status.type === "error" && (
                    <p className="feedback feedback--error" role="alert">
                        {status.message}
                    </p>
                )}

                <Input
                    label="Usuário"
                    name="username"
                    value={values.username}
                    onChange={handleChange}
                    error={errors.username}
                    autoComplete="username"
                    disabled={sending}
                />

                <Input
                    label="Senha"
                    name="password"
                    type="password"
                    value={values.password}
                    onChange={handleChange}
                    error={errors.password}
                    autoComplete="current-password"
                    disabled={sending}
                />

                <div className="form-actions">
                    <Button type="submit" disabled={sending}>
                        {sending ? "Entrando..." : "Entrar"}
                    </Button>
                </div>
            </form>

            <aside className="demo-accounts" aria-label="Contas de demonstração">
                <h2>Contas de demonstração</h2>
                <ul>
                    {DEMO_ACCOUNTS.map((account) => (
                        <li key={account.username}>
                            <span>
                                <code>{account.username}</code> / <code>{account.password}</code>
                                <small>{account.label}</small>
                            </span>
                            <button
                                type="button"
                                className="chip"
                                disabled={sending}
                                onClick={() => {
                                    setValues({
                                        username: account.username,
                                        password: account.password,
                                    });
                                    setErrors({});
                                }}
                            >
                                Preencher
                            </button>
                        </li>
                    ))}
                </ul>
            </aside>
        </section>
    );
}

export default Login;
