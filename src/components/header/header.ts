import { Button } from '../button/button';
import { renderButtonHTML } from '../button/buttonFunc';

export class Header {
  selector: HTMLElement;
  button: Button | undefined;
  constructor(selector: HTMLElement) {
    this.selector = selector;
    this.createHeader();
  }
  renderHeaderHTML(): string {
    return `<header class="header">
            ${renderButtonHTML('TO GARAGE', 'header__btn garage-page__btn', 'garage-page__btn')}
            ${renderButtonHTML('TO WINNERS', 'header__btn winners-page__btn', 'winners-page__btn')}
            </header>`;
  }
  createHeader() {
    this.selector.insertAdjacentHTML('afterbegin', this.renderHeaderHTML());
  }
}
