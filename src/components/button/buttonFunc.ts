export function renderButtonHTML(
  /* parentSelector: HTMLElement, */ textContent: string,
  className: string,
  id?: string | undefined,
  disabled?: string,
): string {
  return `<button ${disabled ? 'disabled' : ''} ${
    id ? `id="${id}"` : ''
  } class="${className}" >${textContent}</button>`;
}
