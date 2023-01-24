import { renderButtonHTML } from '../button/buttonFunc';
import { loaderGarage } from '../loader/loaderGarage';
import { ControlPanel } from './controlPanel';
import { asyncCreatRacing } from './createRacigFunc';
import { saveValue } from '../save/save';
import { resetRacing } from './resetRaceFunc';

export class GaragePage {
  parent!: HTMLElement;

  mainContainer!: HTMLElement;

  garageContainer!: HTMLElement;

  controlPanel!: ControlPanel;

  garageContainerDOM: HTMLElement;

  page = saveValue.carsPage;

  limit = saveValue.carsLimit;

  racingContainerDOM: HTMLElement;

  racingContainer!: HTMLDivElement;

  racingListDOM!: HTMLElement;

  constructor() {
    this.parent = document.querySelector('.main') as HTMLElement;
    this.createGaragePage();
    this.garageContainerDOM = this.parent.querySelector('.garage__container') as HTMLElement;
    this.controlPanel = new ControlPanel(this.garageContainerDOM);
    this.createRacingContainer();
    this.racingContainerDOM = this.parent.querySelector('.garage__content--racing') as HTMLElement;
    this.renderTitleGarage();
    this.racingListDOM = this.parent.querySelector('.racing__list-cars') as HTMLElement;
    this.renderButtonPaginatin();
    this.rerenderDOM();
  }

  createGaragePage() {
    this.garageContainer = document.createElement('div');
    this.garageContainer.classList.add('garage__container');
    this.parent.append(this.garageContainer);
  }

  createRacingContainer() {
    this.racingContainer = document.createElement('div');
    this.racingContainer.classList.add('garage__content--racing');
    this.garageContainerDOM.append(this.racingContainer);
  }

  renderTitleGarage() {
    this.racingContainerDOM.insertAdjacentHTML('beforeend', this.createHTMLTitleGarage());
  }

  renderButtonPaginatin() {
    this.garageContainerDOM.insertAdjacentHTML('beforeend', this.createHTMLButtonPagination());
  }

  createHTMLButtonPagination(): string {
    return `<div class="garage__content--pagination">
                ${renderButtonHTML('PREV', 'pagination--prev__btn', '', '')}
                ${renderButtonHTML('NEXT', 'pagination--next__btn', '', '')}
            </div>`;
  }

  createHTMLTitleGarage(): string {
    return `<h3 class="racing__title">Garage ()</h3>
            <h4 class="racing__page-number">Page #</h4>
            <ul class="racing__list-cars"></ul>
            `;
  }

  handlePagination() {
    const paginationDOM = this.garageContainerDOM.querySelector('.garage__content--pagination') as HTMLElement;
    const startRacingBtnDOM = document.querySelector('.race-control--race__btn') as HTMLButtonElement;
    paginationDOM.addEventListener('click', async event => {
      const allCars = (await loaderGarage.getCars()).length;
      if (startRacingBtnDOM.disabled === true) {
        resetRacing();
      }
      if (
        (<HTMLElement>event.target).classList.contains(`pagination--next__btn`) &&
        allCars / this.limit > saveValue.carsPage
      ) {
        saveValue.carsPage += 1;
        asyncCreatRacing(saveValue.carsPage, this.limit);
      }
      if ((<HTMLElement>event.target).classList.contains(`pagination--prev__btn`) && saveValue.carsPage > 1) {
        saveValue.carsPage -= 1;
        asyncCreatRacing(saveValue.carsPage, this.limit);
      }
    });
  }

  async rerenderDOM() {
    await asyncCreatRacing(this.page, this.limit);
    this.handlePagination();
  }
}
