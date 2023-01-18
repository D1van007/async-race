import { renderButtonHTML } from '../button/buttonFunc';

export class CreatorCar {
  selector: HTMLElement;

  constructor(selector: HTMLElement) {
    this.selector = selector;
    this.renderCreatorCar();
  }

  renderCreatorCar() {
    this.selector.insertAdjacentHTML('beforeend', this.createHTMLCreatorCar());
  }

  createHTMLCreatorCar(): string {
    return `<form class="creator-car__content">
                <input type="text" class="creator-car__input-text">
                <input type="color" value="#f05151" class="creator-car__input-color">
                ${renderButtonHTML('CREATE', 'creator-car__btn', '', 'submit')}
            </form>`;
  }
}
