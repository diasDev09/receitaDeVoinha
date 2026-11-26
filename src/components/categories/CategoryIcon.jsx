import { Beef, BookOpen, CakeSlice, Salad, Sandwich, Soup, Wheat } from "lucide-react";

// Ícone de cada capítulo. A API ainda manda um emoji em "icon", mas a
// interface usa só ícones do sistema (Lucide), como pede o guia de design.
const ICONS = {
    Carnes: Beef,
    Massas: Wheat,
    Sobremesas: CakeSlice,
    Sopas: Soup,
    Saladas: Salad,
    Lanches: Sandwich,
};

function CategoryIcon({ name, size = 16, className }) {
    const Icon = ICONS[name] || BookOpen;
    return (
        <Icon
            size={size}
            strokeWidth={1.75}
            className={className}
            aria-hidden="true"
            focusable="false"
        />
    );
}

export default CategoryIcon;
