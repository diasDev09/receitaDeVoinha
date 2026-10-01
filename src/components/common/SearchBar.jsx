function SearchBar({ value, onChange, placeholder = "Buscar receitas..." }) {
    return (
        <input
            type="search"
            className="search-bar"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            aria-label={placeholder}
        />
    );
}

export default SearchBar;