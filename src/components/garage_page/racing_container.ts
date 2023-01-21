import { ICar } from '../../types';

export class RacingContainer {
  selector: HTMLElement;

  garageContainer!: HTMLDivElement;

  garageContainerDOM: HTMLElement;

  garageArr: ICar[] | undefined;

  constructor(selector: HTMLElement) {
    this.selector = selector;
    this.createGarageContainer();
    this.garageContainerDOM = this.selector.querySelector('.garage__content--racing') as HTMLElement;
    this.renderTitleGarage();
  }

  createGarageContainer() {
    this.garageContainer = document.createElement('div');
    this.garageContainer.classList.add('garage__content--racing');
    this.selector.append(this.garageContainer);
  }

  renderTitleGarage() {
    this.garageContainerDOM.insertAdjacentHTML('beforeend', this.createHTMLTitleGarage());
  }

  createHTMLTitleGarage(): string {
    return `<h3 class="racing__title">Garage ()</h3>
            <h4 class="racing__page-number">Page #</h4>
            <ul class="racing__list-cars"></ul>`;
  }
}
