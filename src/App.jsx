import { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";

const Home = lazy(() => import("./pages/Home"));
const Recipes = lazy(() => import("./pages/Recipes"));
const RecipeDetails = lazy(() => import("./pages/RecipeDetails"));
const NewRecipe = lazy(() => import("./pages/NewRecipe"));
const Favorites = lazy(() => import("./pages/Favorites"));
const Categories = lazy(() => import("./pages/Categories"));
const About = lazy(() => import("./pages/About"));
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/receitas" element={<Recipes />} />
        <Route path="/receitas/:id" element={<RecipeDetails />} />
        <Route path="/nova-receita" element={<NewRecipe />} />
        <Route path="/favoritos" element={<Favorites />} />
        <Route path="/categorias" element={<Categories />} />
        <Route path="/sobre" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;