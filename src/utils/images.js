// Imagem padrão quando a receita não tem foto (ou o link falha):
// uma panela desenhada em linha sobre o papel, sem emoji.
export const PLACEHOLDER =
    "data:image/svg+xml;utf8," +
    encodeURIComponent(
        `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
  <rect width="400" height="300" fill="#dbe5f6"/>
  <g fill="none" stroke="#1b3a6b" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
    <path d="M140 140h120v50a30 30 0 0 1-30 30h-60a30 30 0 0 1-30-30z"/>
    <path d="M130 140h140M120 150h20M260 150h20"/>
    <path d="M185 125a15 8 0 0 1 30 0"/>
  </g>
  <path d="M175 110c-6-10 6-14 0-24M200 110c-6-10 6-14 0-24M225 110c-6-10 6-14 0-24" fill="none" stroke="#d4af37" stroke-width="3" stroke-linecap="round"/>
</svg>`
    );

export function handleImageError(e) {
    e.currentTarget.onerror = null; // evita loop infinito
    e.currentTarget.src = PLACEHOLDER;
}
