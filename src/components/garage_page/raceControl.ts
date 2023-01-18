import { renderButtonHTML } from '../button/buttonFunc';

export class RaceControl {
  selector: HTMLElement;

  constructor(selector: HTMLElement) {
    this.selector = selector;
    this.renderRaceControl();
  }

  renderRaceControl() {
    this.selector.insertAdjacentHTML('beforeend', this.createHTMLRaceControl());
  }

  createHTMLRaceControl(): string {
    return `<div class="race-control__content">
                ${renderButtonHTML('RACE', 'race-control--race__btn', '', 'submit')}
                ${renderButtonHTML('RESET', 'race-control--reset__btn', '', 'submit')}
                ${renderButtonHTML('GENERATE CARS', 'race-control--generate__btn', '', 'submit')}
            </div>`;
  }
}
