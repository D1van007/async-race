import { ControlPanel } from './controlPanel';
import { Garage } from './garage';

export class GaragePage {
  parent!: HTMLElement;

  mainContainer!: HTMLElement;

  garageContainer!: HTMLDivElement;

  controlPanel!: ControlPanel;

  garageContainerDOM: HTMLElement;

  garage: Garage;

  page = 1;

  limit = 3;

  constructor() {
    this.parent = document.querySelector('.main') as HTMLElement;
    this.createGaragePage();
    this.garageContainerDOM = this.parent.querySelector('.garage__container') as HTMLElement;
    this.controlPanel = new ControlPanel(this.garageContainerDOM);
    this.garage = new Garage(this.garageContainerDOM, this.page, this.limit);
  }

  createGaragePage() {
    this.garageContainer = document.createElement('div');
    this.garageContainer.classList.add('garage__container');
    this.parent.append(this.garageContainer);
  }
}
