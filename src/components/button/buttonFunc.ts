export function renderButtonHTML(
  /* parentSelector: HTMLElement, */ textContent: string,
  className: string,
  id?: string | undefined,
): string {
  return `<button ${id ? `id="${id}"` : ''} class="${className}">${textContent}</button>`;
}
