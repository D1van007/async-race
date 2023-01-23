export function renderButtonHTML(
/* parentSelector: HTMLElement, */ textContent, className, id, disabled) {
    return `<button ${disabled ? 'disabled' : ''} ${id ? `id="${id}"` : ''} class="${className}" >${textContent}</button>`;
}
