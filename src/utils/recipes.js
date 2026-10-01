import baseRecipes from "../data/recipes";
import { getCustomRecipes } from "./storage";

export function getAllRecipes() {
    return [...baseRecipes, ...getCustomRecipes()];
}

// Remove acentos e caixa: "Pão" e "pao" passam a ser iguais
export function normalizeText(text) {
    return String(text)
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
}

// Converte "1h30", "1h" ou "40min" em minutos
export function parseTime(time) {
    const text = normalizeText(time);
    const hours = text.match(/(\d+)\s*h/);
    const minutes = text.match(/(\d+)\s*(min|m\b)/) || text.match(/h\s*(\d+)/);
    return (
        (hours ? Number(hours[1]) * 60 : 0) + (minutes ? Number(minutes[1]) : 0)
    );
}

export function filterRecipes(recipes, { search = "", category = "" }) {
    const term = normalizeText(search.trim());

    return recipes.filter((recipe) => {
        const matchesCategory = !category || recipe.category === category;

        const searchable = normalizeText(
            [recipe.title, recipe.description, ...recipe.ingredients].join(" "),
        );
        const matchesSearch = !term || searchable.includes(term);

        return matchesCategory && matchesSearch;
    });
}

export function sortRecipes(recipes, sortBy) {
    const list = [...recipes]; // não altera o array original

    switch (sortBy) {
        case "nome":
            return list.sort((a, b) => a.title.localeCompare(b.title, "pt-BR"));
        case "avaliacao":
            return list.sort((a, b) => b.rating - a.rating);
        case "tempo":
            return list.sort((a, b) => parseTime(a.time) - parseTime(b.time));
        default:
            return list;
    }
}
