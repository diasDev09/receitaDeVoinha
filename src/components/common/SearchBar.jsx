import { Search } from "lucide-react";

function SearchBar({ value, onChange, placeholder = "Buscar receitas" }) {
    return (
        <label className="search">
            <span className="visually-hidden">{placeholder}</span>
            <Search size={17} strokeWidth={1.75} aria-hidden="true" />
            <input
                type="search"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
            />
        </label>
    );
}

export default SearchBar;
