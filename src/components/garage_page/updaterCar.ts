import { renderButtonHTML } from '../button/buttonFunc';

export class UpdaterCar {
  selector: HTMLElement;

  constructor(selector: HTMLElement) {
    this.selector = selector;
    this.renderUpdaterCar();
  }

  renderUpdaterCar() {
    this.selector.insertAdjacentHTML('beforeend', this.createHTMLUpdaterCar());
  }

  createHTMLUpdaterCar(): string {
    return `<form class="updater-car__content">
                <input type="text" class="updater-car__input-text">
                <input type="color" value="#ffffff" class="updater-car__input-color">
                ${renderButtonHTML('UPDATE', 'updater-car__btn', '', 'submit')}
            </form>`;
  }
}
