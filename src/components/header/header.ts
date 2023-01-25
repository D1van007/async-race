import { renderButtonHTML } from '../button/buttonFunc';

export class Header {
  selector: HTMLElement;

  constructor(selector: HTMLElement) {
    this.selector = selector;
    this.createHeader();
    this.pageHandler();
  }

  // eslint-disable-next-line class-methods-use-this
  renderHeaderHTML(): string {
    return `<header class="header">
            ${renderButtonHTML('TO GARAGE', 'header__btn garage-page__btn', 'garage-page__btn')}
            ${renderButtonHTML('TO WINNERS', 'header__btn winners-page__btn', 'winners-page__btn')}
            </header>`;
  }

  createHeader() {
    this.selector.insertAdjacentHTML('afterbegin', this.renderHeaderHTML());
  }

  pageHandler() {
    const garagePageBtnDOM = document.querySelector('.garage-page__btn');
    const winnersPageBtnDOM = document.querySelector('.winners-page__btn');
    garagePageBtnDOM?.addEventListener('click', () => {
      const garageContainer = document.querySelector('.garage__container') as HTMLElement;
      const winnersContainer = document.querySelector('.winners__container') as HTMLElement;
      garageContainer.style.zIndex = '10';
      garageContainer.style.opacity = '1';
      winnersContainer.style.zIndex = '-10';
      winnersContainer.style.opacity = '0';
    });
    winnersPageBtnDOM?.addEventListener('click', () => {
      const garageContainer = document.querySelector('.garage__container') as HTMLElement;
      const winnersContainer = document.querySelector('.winners__container') as HTMLElement;
      garageContainer.style.zIndex = '-10';
      garageContainer.style.opacity = '0';
      winnersContainer.style.zIndex = '10';
      winnersContainer.style.opacity = '1';
    });
  }
}
