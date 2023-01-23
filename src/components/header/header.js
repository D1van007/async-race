import { renderButtonHTML } from '../button/buttonFunc';
export class Header {
  selector;
  constructor(selector) {
    this.selector = selector;
    this.createHeader();
    this.pageHandler();
  }
  // eslint-disable-next-line class-methods-use-this
  renderHeaderHTML() {
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
      const garageContainer = document.querySelector('.garage__container');
      const winnersContainer = document.querySelector('.winners__container');
      garageContainer.style.display = 'block';
      winnersContainer.style.display = 'none';
    });
    winnersPageBtnDOM?.addEventListener('click', () => {
      const garageContainer = document.querySelector('.garage__container');
      const winnersContainer = document.querySelector('.winners__container');
      garageContainer.style.display = 'none';
      winnersContainer.style.display = 'block';
    });
  }
}
