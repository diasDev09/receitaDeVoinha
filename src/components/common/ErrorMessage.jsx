function ErrorMessage({ id, message }) {
    if (!message) return null;

    return (
        <p id={id} className="field__error" role="alert">
            {message}
        </p>
    );
}

export default ErrorMessage;