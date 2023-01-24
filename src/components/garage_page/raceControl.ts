import { drivePromice, IWinner } from '../../types';
import { renderButtonHTML } from '../button/buttonFunc';
import { carMethod } from '../carServer/carMethod';
import { loaderGarage } from '../loader/loaderGarage';
import { saveValue } from '../save/save';
import { arrInstanceRacing, asyncCreatRacing } from './createRacigFunc';
import { renderWinner, saveWinner } from '../winner/print_saveServer';
import { TableWinners } from '../winner/tableWinners';
import { resetRacing } from './resetRaceFunc';

export class RaceControl {
  selector: HTMLElement;

  startRacingBtnDOM!: HTMLButtonElement;

  resetRacingBtnDOM!: HTMLButtonElement;

  generateCarsBtnDOM!: HTMLButtonElement;

  updateCarBtnDOM!: HTMLButtonElement;

  allBtnRemove!: NodeList;

  createCarBtnDOM: HTMLButtonElement;

  prevBtnDOM!: HTMLButtonElement;

  nextBtnDOM!: HTMLButtonElement;

  constructor(selector: HTMLElement) {
    this.selector = selector;
    this.renderRaceControl();
    this.startRacingBtnDOM = document.querySelector('.race-control--race__btn') as HTMLButtonElement;
    this.resetRacingBtnDOM = document.querySelector('.race-control--reset__btn') as HTMLButtonElement;
    this.generateCarsBtnDOM = document.querySelector('.race-control--generate__btn') as HTMLButtonElement;
    this.updateCarBtnDOM = document.querySelector('.updater-car__btn') as HTMLButtonElement;
    this.createCarBtnDOM = document.querySelector('.creator-car__btn') as HTMLButtonElement;

    this.generateCars(100);
    this.startRacing();
    this.handlerResetRace();
  }

  renderRaceControl() {
    this.selector.insertAdjacentHTML('beforeend', this.createHTMLRaceControl());
  }

  createHTMLRaceControl(): string {
    return `<div class="race-control__content">
                ${renderButtonHTML('RACE', 'race-control--race__btn')}
                ${renderButtonHTML('RESET', 'race-control--reset__btn', '', 'disabled')}
                ${renderButtonHTML('GENERATE CARS', 'race-control--generate__btn')}
            </div>`;
  }

  generateCars(amountCars: number) {
    const generateBtnDOM = document.querySelector('.race-control--generate__btn') as HTMLElement;
    generateBtnDOM.addEventListener('click', () => {
      for (let i = 0; i < amountCars; i += 1) {
        loaderGarage.createCar(carMethod.newRandomCar());
      }
      asyncCreatRacing(saveValue.carsPage, saveValue.carsLimit);
    });
  }

  disabledBtn() {
    this.prevBtnDOM = document.querySelector('.pagination--prev__btn') as HTMLButtonElement;
    this.nextBtnDOM = document.querySelector('.pagination--next__btn') as HTMLButtonElement;
    this.resetRacingBtnDOM.disabled = true;
    this.startRacingBtnDOM.disabled = true;
    this.generateCarsBtnDOM.disabled = true;
    this.updateCarBtnDOM.disabled = true;
    this.createCarBtnDOM.disabled = true;
    this.prevBtnDOM.disabled = true;
    this.nextBtnDOM.disabled = true;
    this.allBtnRemove = document.querySelectorAll('.race__btn--remove') as NodeList;
    const arrBtnRemove = Array.from(this.allBtnRemove) as HTMLButtonElement[];
    arrBtnRemove.forEach(e => {
      e.disabled = true;
    });
  }

  enableBtn() {
    this.prevBtnDOM = document.querySelector('.pagination--prev__btn') as HTMLButtonElement;
    this.nextBtnDOM = document.querySelector('.pagination--next__btn') as HTMLButtonElement;
    this.startRacingBtnDOM.disabled = false;
    this.generateCarsBtnDOM.disabled = false;
    this.updateCarBtnDOM.disabled = false;
    this.createCarBtnDOM.disabled = false;
    this.prevBtnDOM.disabled = false;
    this.nextBtnDOM.disabled = false;
    this.allBtnRemove = document.querySelectorAll('.race__btn--remove') as NodeList;
    const arrBtnRemove = Array.from(this.allBtnRemove) as HTMLButtonElement[];
    arrBtnRemove.forEach(e => {
      e.disabled = false;
    });
  }

  startRacing() {
    this.startRacingBtnDOM.addEventListener('click', async () => {
      this.disabledBtn();
      const promiseArr: Promise<drivePromice>[] = [];
      arrInstanceRacing.forEach(e => {
        promiseArr.push(
          new Promise(res => {
            res(e.startMove(true) as Promise<drivePromice>);
          }),
        );
      });
      Promise.any(promiseArr).then(value => {
        renderWinner(value.instanceCar?.name, value.time);
        const winnerTitleDOM = document.querySelector('.winner__title') as HTMLElement;
        setTimeout(() => winnerTitleDOM.remove(), 7000);
        const winner: IWinner = {
          id: value.instanceCar?.id,
          wins: 1,
          time: value.time,
        };
        saveWinner(winner);
        // eslint-disable-next-line no-new
        new TableWinners(saveValue.winnersPage, saveValue.winnersLimit);
      });
      Promise.allSettled(promiseArr).then(() => {
        console.log('гонка завершена');
        this.resetRacingBtnDOM.disabled = false;
      });
    });
  }

  handlerResetRace() {
    this.resetRacingBtnDOM.addEventListener('click', async () => {
      resetRacing();
      this.enableBtn();
    });
  }
}
