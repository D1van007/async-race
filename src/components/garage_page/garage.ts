import { ICar } from '../../types';
import { loaderGarage } from '../loader/loaderGarage';
import { Race } from './race';

export class Garage {
  selector: HTMLElement;

  garageContainer!: HTMLDivElement;

  garageContainerDOM: HTMLElement;

  limit: number;

  page: number;

  garageArr: ICar[] | undefined;

  constructor(selector: HTMLElement, page: number, limit: number) {
    this.selector = selector;
    // this.getGarage(page, limit);
    this.createGarageContainer();
    this.garageContainerDOM = this.selector.querySelector('.garage__content--garage') as HTMLElement;
    this.page = page;
    this.limit = limit;
    this.renderTitleGarage();
    this.renderCars();
  }

  //   async getGarage(page?: number, limit?: number): Promise<ICar[]> {
  //     this.garageArr = await loaderGarage.getCars(page, limit);
  //     return this.garageArr;
  //   }

  createGarageContainer() {
    this.garageContainer = document.createElement('div');
    this.garageContainer.classList.add('garage__content--garage');
    this.selector.append(this.garageContainer);
  }

  async renderTitleGarage() {
    this.selector.insertAdjacentHTML('beforeend', await this.createHTMLTitleGarage());
  }

  async createHTMLTitleGarage(): Promise<string> {
    this.garageArr = await loaderGarage.getCars(this.page, this.limit);
    return `<p class="garage__title">Garage (${this.garageArr.length})</p>
            <p class="garage__page-number">Page #${this.page}</p>`;
  }

  async renderCars() {
    this.garageArr = await loaderGarage.getCars(this.page, this.limit);
    for (let i = 0; i < this.garageArr.length; i += 1) {
      // eslint-disable-next-line no-new
      new Race(this.selector, this.page, this.limit, i);
    }
  }
}
