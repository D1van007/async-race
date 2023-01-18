export function renderButtonHTML(
  /* parentSelector: HTMLElement, */ textContent: string,
  className: string,
  id?: string | undefined,
  type?: string | undefined,
): string {
  return `<button type=${type} ${id ? `id="${id}"` : ''} class="${className}">${textContent}</button>`;
}
