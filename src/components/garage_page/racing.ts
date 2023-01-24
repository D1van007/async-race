import { renderButtonHTML } from '../button/buttonFunc';
// eslint-disable-next-line import/no-cycle
import { asyncCreatRacing, canRacing } from './createRacigFunc';
import { carPicture } from './svg_car';
// eslint-disable-next-line import/no-cycle
import { loaderWinners } from '../loader/loaderWinners';
// eslint-disable-next-line import/no-cycle
import imgFlag from '../../assets/flagNew.png';
import { drivePromice, Engine, errorCallback, ICarProperties } from '../../types';
import { loaderEngine } from '../loader/loaderEngine';
import { loaderGarage } from '../loader/loaderGarage';
import { TableWinners } from '../winner/tableWinners';
import { saveValue } from '../save/save';

export class Racing {
  selector: HTMLElement;

  page: number;

  limit: number;

  id: number;

  color: string;

  name: string;

  carWidth = 110;

  racingLine!: HTMLElement;

  btnSelect!: HTMLButtonElement;

  btnRemove!: HTMLButtonElement;

  btnStart!: HTMLButtonElement;

  btnStop!: HTMLButtonElement;

  carPicture!: HTMLElement;

  carAnimationMove!: Animation;

  carProperty: ICarProperties | undefined;

  timeAnimation: number | undefined;

  garageContainerDOM!: HTMLElement;

  carNameDOM!: HTMLElement;

  updateCarNameDOM!: HTMLInputElement;

  updateCarColorDOM!: HTMLInputElement;

  startRacingBtnDOM!: HTMLButtonElement;

  resetRacingBtnDOM!: HTMLButtonElement;

  isMoveCar = false;

  constructor(selector: HTMLElement, page: number, limit: number, id: number, name: string, color: string) {
    this.selector = selector;
    this.page = page;
    this.limit = limit;
    this.id = id;
    this.name = name;
    this.color = color;
    this.allAsyncMethod();
  }

  async allAsyncMethod() {
    await this.renderRace();
    this.initDOMElement();
    this.racingHandler();
  }

  async renderRace() {
    this.selector.insertAdjacentHTML('beforeend', await this.createHTMLRace());
  }

  async createHTMLRace(): Promise<string> {
    return `<li class="racing__content" id="${this.id}">
                <div class="race__car-change">
                    ${renderButtonHTML('SELECT', 'race__btn--select', '')}
                    ${renderButtonHTML('REMOVE', 'race__btn--remove', '')}
                    <p class="race__car-name">${`${this.name}`}</p>
                </div>
                <div class="race__car-drive">
                    ${renderButtonHTML('A', `car__btn--a`, `car__btn--a-${this.id}`)}
                    ${renderButtonHTML('B', `car__btn--b`, `car__btn--b-${this.id}`, 'disabled')}
                    ${carPicture('car__picture', this.color, `car__picture-${this.id}`)}
                    <img class="car__flag" alt="flag" src="${imgFlag}">
                </div>
            </li>`;
  }


  initDOMElement() {
    this.garageContainerDOM = document.querySelector('.garage__container') as HTMLElement;
    this.racingLine = document.getElementById(`${this.id}`) as HTMLElement;
    this.btnSelect = document.querySelector('.race__btn--select') as HTMLButtonElement;
    this.btnRemove = this.racingLine.querySelector('.race__btn--remove') as HTMLButtonElement;
    this.btnStart = this.racingLine.querySelector('.car__btn--a') as HTMLButtonElement;
    this.btnStop = this.racingLine.querySelector('.car__btn--b') as HTMLButtonElement;
    this.carPicture = this.racingLine.querySelector('.car__picture') as HTMLElement;
    this.carNameDOM = this.racingLine.querySelector('.race__car-name') as HTMLElement;
    this.updateCarNameDOM = this.garageContainerDOM.querySelector('.updater-car__input-text') as HTMLInputElement;
    this.updateCarColorDOM = this.garageContainerDOM.querySelector('.updater-car__input-color') as HTMLInputElement;
    this.startRacingBtnDOM = this.garageContainerDOM.querySelector('.race-control--race__btn') as HTMLButtonElement;
    this.resetRacingBtnDOM = this.garageContainerDOM.querySelector('.race-control--reset__btn') as HTMLButtonElement;
  }

  // eslint-disable-next-line consistent-return
  async startMove(isRacing = false): Promise<void | drivePromice> {
    this.isMoveCar = true;
    this.btnStart.disabled = true;
    this.btnStop.disabled = false;
    this.startRacingBtnDOM.disabled = true;
    this.carProperty = await loaderEngine.startStopEngine(this.id, Engine.started);
    this.timeAnimation = this.carProperty!.distance / this.carProperty!.velocity;
    this.animationMove(this.timeAnimation);
    this.carAnimationMove.play();
    const data = await loaderEngine.driveCar(
      this.id,
      Engine.drive,
      () => this.carAnimationMove.pause() as unknown as errorCallback,
    );
    try {
      data!.instanceCar = this;
      data!.time = +(this.timeAnimation / 1000).toFixed(2);
    } catch {
      if (isRacing) throw new Error('ошибочка');
    }
    return data;
  }

  async stopMove() {
    this.isMoveCar = false;
    this.btnStart.disabled = false;
    this.btnStop.disabled = true;
    await loaderEngine.startStopEngine(this.id, Engine.stopped);
    this.carAnimationMove.cancel();
  }

  animationMove(time: number) {
    const carKeyFrameMove = new KeyframeEffect(
      this.carPicture,
      [
        {
          transform: `translateX(${
            this.racingLine.offsetWidth - this.carWidth - this.btnStart.offsetWidth - this.btnStop.offsetWidth
          }px)`,
        },
      ],
      { duration: time, fill: 'forwards', iterations: 1 },
    );
    this.carAnimationMove = new Animation(carKeyFrameMove);
  }

  async deleteCar() {
    await loaderGarage.deleteCar(this.id);
    const archiveWinners = await loaderWinners.getWinners();
    if (archiveWinners.some(e => e.id === Number(this.id))) {
      console.log('ds');
      await loaderWinners.deleteWinner(this.id);
      // eslint-disable-next-line no-new
      new TableWinners(saveValue.winnersPage, saveValue.winnersLimit);
    }
    asyncCreatRacing(this.page, this.limit);
  }

  selectCar() {
    this.updateCarNameDOM.value = this.carNameDOM.textContent as string;
    this.updateCarColorDOM.value = this.carPicture.getAttribute('fill') as string;
    this.updateCarNameDOM.setAttribute('car-ID', `${this.id}`);
    this.updateCarColorDOM.setAttribute('car-ID', `${this.id}`);
  }

  racingHandler() {
    this.racingLine.addEventListener('click', async event => {
      if ((<HTMLElement>event.target).classList.contains(`car__btn--a`)) {
        this.startMove();
      }
      if ((<HTMLElement>event.target).classList.contains(`car__btn--b`)) {
        this.stopMove();
        if (!canRacing()) {
          this.startRacingBtnDOM.disabled = false;
        }
        this.stopMove();
      }
      if ((<HTMLElement>event.target).classList.contains(`race__btn--remove`)) {
        this.deleteCar();
      }
      if ((<HTMLElement>event.target).classList.contains(`race__btn--select`)) {
        this.selectCar();
      }
    });
  }
}
