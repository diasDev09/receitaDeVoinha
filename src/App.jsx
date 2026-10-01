import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Recipes from "./pages/Recipes";
import RecipeDetails from "./pages/RecipeDetails";
import NewRecipe from "./pages/NewRecipe";
import Favorites from "./pages/Favorites";
import Categories from "./pages/Categories";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

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