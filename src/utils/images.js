export const PLACEHOLDER =
    "data:image/svg+xml;utf8," +
    encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="260">
    <rect width="100%" height="100%" fill="#e6f1e3"/>
    <text x="50%" y="52%" font-size="64" text-anchor="middle">🍲</text>
    </svg>`
    );

export function handleImageError(e) {
    e.currentTarget.onerror = null; // evita loop infinito
    e.currentTarget.src = PLACEHOLDER;
}