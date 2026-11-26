import { createContext } from "react";

// Valor fornecido pelo AuthProvider: { user, isAuthenticated, authNotice, login, register, logout }
const AuthContext = createContext(null);

export default AuthContext;
