import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

// Sem sessão, manda para /login guardando de onde veio (para voltar depois).
// Funciona também com endereço digitado direto na barra do navegador.
function ProtectedRoute({ children }) {
    const { isAuthenticated } = useAuth();
    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    return children;
}

export default ProtectedRoute;
