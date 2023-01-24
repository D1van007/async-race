import { renderButtonHTML } from '../button/buttonFunc';
import { loaderGarage } from '../loader/loaderGarage';
import { saveValue } from '../save/save';
import { asyncCreatRacing } from './createRacigFunc';

export class UpdaterCar {
  selector: HTMLElement;

  constructor(selector: HTMLElement) {
    this.selector = selector;
    this.renderUpdaterCar();
  }

  renderUpdaterCar() {
    this.selector.insertAdjacentHTML('beforeend', this.createHTMLUpdaterCar());
    this.updateCar();
  }

  createHTMLUpdaterCar(): string {
    return `<form class="updater-car__content">
                <input type="text" class="updater-car__input-text">
                <input type="color" value="#ffffff" class="updater-car__input-color">
                ${renderButtonHTML('UPDATE', 'updater-car__btn', '', '')}
            </form>`;
  }

  updateCar() {
    const updateBtnDOM = document.querySelector('.updater-car__btn') as HTMLElement;
    const updateTextInput = document.querySelector('.updater-car__input-text') as HTMLInputElement;
    const updateColorInput = document.querySelector('.updater-car__input-color') as HTMLInputElement;
    updateBtnDOM.addEventListener('click', async event => {
      event.preventDefault();
      const currentCarID = Number(updateTextInput.getAttribute('car-ID'));
      const currentName = updateTextInput.value;
      const currentColor = updateColorInput.value;

      await loaderGarage.updateCar(currentCarID, currentName, currentColor);
      await asyncCreatRacing(saveValue.carsPage, saveValue.carsLimit);
    });
  }
}
