import { ICar } from '../../types';
import { renderButtonHTML } from '../button/buttonFunc';
import { loaderGarage } from '../loader/loaderGarage';
import { saveValue } from '../save/save';
import { asyncCreatRacing } from './createRacigFunc';

export class CreatorCar {
  selector: HTMLElement;

  constructor(selector: HTMLElement) {
    this.selector = selector;
    this.renderCreatorCar();
    this.createCarDOM();
  }

  renderCreatorCar() {
    this.selector.insertAdjacentHTML('beforeend', this.createHTMLCreatorCar());
  }

  createHTMLCreatorCar(): string {
    return `<form class="creator-car__content">
                <input type="text" class="creator-car__input-text">
                <input type="color" value="#f05151" class="creator-car__input-color">
                ${renderButtonHTML('CREATE', 'creator-car__btn', '')}
            </form>`;
  }

  createCarDOM() {
    const createBtnDOM = document.querySelector('.creator-car__btn') as HTMLElement;
    const createTextInput = document.querySelector('.creator-car__input-text') as HTMLInputElement;
    const createColorInput = document.querySelector('.creator-car__input-color') as HTMLInputElement;
    createBtnDOM.addEventListener('click', async event => {
      const currentName = createTextInput.value;
      const currentColor = createColorInput.value;
      const carObj: ICar = {
        name: `${currentName}`,
        color: `${currentColor}`,
      };
      event.preventDefault();
      await loaderGarage.createCar(carObj);
      asyncCreatRacing(saveValue.carsPage, saveValue.carsLimit);
    });
  }
}
