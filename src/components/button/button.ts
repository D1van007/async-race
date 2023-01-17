export class Button {
  //   parentSelector: HTMLElement;
  textContent: string;
  className: string;
  id: string | undefined;
  constructor(/* parentSelector: HTMLElement, */ textContent: string, className: string, id?: string | undefined) {
    // this.parentSelector = parentSelector;
    this.textContent = textContent;
    this.className = className;
    this.id = id;
    this.renderButtonHTML();
  }
  renderButtonHTML(): string {
    return `<button ${this.id ? `id="${this.id}"` : ''} class="${this.className}">${this.textContent}</button>`;
  }

  //   createButton() {
  //     this.parentSelector.insertAdjacentHTML('afterbegin', this.renderButtonHTML());
  //   }
}
