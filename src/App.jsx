import recipes from "./data/recipes";
import categories from "./data/categories";
import { getFavorites, saveFavorites } from "./utils/storage";
import { validateRecipe } from "./utils/validators";

function App() {
  const erros = validateRecipe({
    title: "Ab", category: "", time: "", description: "curta",
    image: "foto.png", ingredients: "só um", preparation: "",
  });

  console.log("Receitas:", recipes.length);
  console.log("Categorias:", categories.length);
  console.log("Favoritos salvos:", getFavorites());
  console.log("Erros de validação:", erros);

  return <h1>Fase 1: abra o console (F12)</h1>;
}

export default App;