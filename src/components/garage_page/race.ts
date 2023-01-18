import { renderButtonHTML } from '../button/buttonFunc';
import { loaderGarage } from '../loader/loaderGarage';

export class Race {
  selector: HTMLElement;

  constructor(selector: HTMLElement, page: number, limit: number, index: number) {
    this.selector = selector;
    this.renderRace(page, limit, index);
  }

  async renderRace(page: number, limit: number, index: number) {
    this.selector.insertAdjacentHTML('beforeend', await this.createHTMLRace(page, limit, index));
  }

  async createHTMLRace(page: number, limit: number, index: number): Promise<string> {
    return `<div class="race__content">
                ${renderButtonHTML('SELECT', 'race__btn--select', '', '')}
                ${renderButtonHTML('REMOVE', 'race__btn--remove', '', '')}
                <p class="race__car-name">${(await loaderGarage.getCars(page, limit))[index].name}</p>
            </div>`;
  }
}
