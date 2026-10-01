import ErrorMessage from "./ErrorMessage";

function Input({ label, name, error, hint, as: Tag = "input", children, ...props }) {
    const errorId = `${name}-error`;

    return (
        <div className={error ? "field field--error" : "field"}>
            <label htmlFor={name}>{label}</label>

            <Tag
                id={name}
                name={name}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? errorId : undefined}
                {...props}
            >
                {children}
            </Tag>

            {hint && !error && <small className="field__hint">{hint}</small>}
            <ErrorMessage id={errorId} message={error} />
        </div>
    );
}

export default Input;