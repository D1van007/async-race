import { ControlPanel } from './controlPanel';
// import { Garage } from './garage';
import { RacingContainer } from './racing_container';
import { Racing } from './racing';
import { loaderGarage } from '../loader/loaderGarage';

export class GaragePage {
  parent!: HTMLElement;

  mainContainer!: HTMLElement;

  garageContainer!: HTMLElement;

  controlPanel!: ControlPanel;

  garageContainerDOM: HTMLElement;

  // garage: Garage;

  page = 1;

  limit = 7;

  racingContainer: RacingContainer;

  racingContainerDOM: HTMLElement;

  constructor() {
    this.parent = document.querySelector('.main') as HTMLElement;
    this.createGaragePage();
    this.garageContainerDOM = this.parent.querySelector('.garage__container') as HTMLElement;
    this.controlPanel = new ControlPanel(this.garageContainerDOM);
    this.racingContainer = new RacingContainer(this.garageContainerDOM);
    this.racingContainerDOM = this.parent.querySelector('.racing__list-cars') as HTMLElement;
    this.asyncCreatRacing().then(() => {
      console.log(document.querySelector('#car__picture-3'));
    });
  }

  createGaragePage() {
    this.garageContainer = document.createElement('div');
    this.garageContainer.classList.add('garage__container');
    this.parent.append(this.garageContainer);
  }

  async asyncCreatRacing() {
    const arrCarsRace = await loaderGarage.getCars(this.page, this.limit);
    const titleRacingDOM = document.querySelector('.racing__title') as HTMLElement;
    const pageNumberDOM = document.querySelector('.racing__page-number') as HTMLElement;
    pageNumberDOM.textContent = `Page #${String(this.page)}`;
    titleRacingDOM.textContent = `Garage (${String(arrCarsRace.length)})`;
    for (let i = 0; i < arrCarsRace.length; i += 1) {
      // eslint-disable-next-line no-new
      new Racing(
        this.racingContainerDOM,
        this.page,
        this.limit,
        arrCarsRace[i].id as number,
        arrCarsRace[i].name as string,
        arrCarsRace[i].color,
      );
    }
  }
}
