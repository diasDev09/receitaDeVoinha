import { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import ProtectedRoute from "./components/auth/ProtectedRoute";

const Home = lazy(() => import("./pages/Home"));
const Recipes = lazy(() => import("./pages/Recipes"));
const RecipeDetails = lazy(() => import("./pages/RecipeDetails"));
const NewRecipe = lazy(() => import("./pages/NewRecipe"));
const Favorites = lazy(() => import("./pages/Favorites"));
const Categories = lazy(() => import("./pages/Categories"));
const About = lazy(() => import("./pages/About"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/receitas" element={<Recipes />} />
                <Route path="/receitas/:id" element={<RecipeDetails />} />
                <Route path="/categorias" element={<Categories />} />
                <Route path="/sobre" element={<About />} />
                <Route path="/login" element={<Login />} />
                <Route path="/cadastro" element={<Register />} />

                {/* Rotas protegidas: sem sessão redirecionam para /login */}
                <Route
                    path="/nova-receita"
                    element={
                        <ProtectedRoute>
                            <NewRecipe />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/favoritos"
                    element={
                        <ProtectedRoute>
                            <Favorites />
                        </ProtectedRoute>
                    }
                />

                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
}

export default App;
