import { renderButtonHTML } from '../button/buttonFunc';
// import { loaderGarage } from '../loader/loaderGarage';
import { carPicture } from './svg_car';
// import { ininElementQueryClass } from './init_Element_DOM';
import { Engine, errorCallback, ICarProperties } from '../../types';
import { loaderEngine } from '../loader/loaderEngine';

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

  btnStart!: HTMLElement;

  btnStop!: HTMLElement;

  carPicture!: HTMLElement;

  carAnimationMove!: Animation;

  carProperty: ICarProperties | undefined;

  timeAnimation: number | undefined;

  constructor(selector: HTMLElement, page: number, limit: number, id: number, name: string, color: string) {
    this.selector = selector;
    this.page = page;
    this.limit = limit;
    this.id = id;
    this.name = name;
    this.color = color;
    this.renderRace();
  }

  async allAsyncMethod() {
    await this.renderRace();
    this.initDOMElement();
    this.racingHandler();
  }

  async renderRace() {
    this.selector.insertAdjacentHTML('beforeend', await this.createHTMLRace());
    this.initDOMElement();
    this.racingHandler();
  }

  async createHTMLRace(): Promise<string> {
    return `<li class="racing__content" id="racing__content-${this.id}">
                <div class="race__car-change">
                    ${renderButtonHTML('SELECT', 'race__btn--select', '', '')}
                    ${renderButtonHTML('REMOVE', 'race__btn--remove', '', '')}
                    <p class="race__car-name">${`${this.name}`}</p>
                </div>
                <div class="race__car-drive">
                    ${renderButtonHTML('A', `car__btn--a`, `car__btn--a-${this.id}`)}
                    ${renderButtonHTML('B', `car__btn--b`, `car__btn--b-${this.id}`)}
                    ${carPicture('car__picture', this.color, `car__picture-${this.id}`)}
                    <img class="car__flag" src="src/assets/racing_flag.svg">
                </div>
            </li>`;
  }

  initDOMElement() {
    this.racingLine = document.querySelector(`#racing__content-${this.id}`) as HTMLElement;
    this.btnSelect = document.querySelector('.race__btn--select') as HTMLButtonElement;
    this.btnRemove = this.racingLine.querySelector('.race__btn--remove') as HTMLButtonElement;
    this.btnStart = this.racingLine.querySelector('.car__btn--a') as HTMLElement;
    this.btnStop = this.racingLine.querySelector('.car__btn--b') as HTMLElement;
    this.carPicture = this.racingLine.querySelector('.car__picture') as HTMLElement;
  }

  async startMove() {
    this.carProperty = await loaderEngine.startStopEngine(this.id, Engine.started);
    console.log(this.carProperty);
    this.timeAnimation = this.carProperty!.distance / this.carProperty!.velocity;
    this.animationMove(this.timeAnimation);
    this.carAnimationMove.play();
    loaderEngine.driveCar(this.id, Engine.drive, () => this.carAnimationMove.pause() as unknown as errorCallback);
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

  racingHandler() {
    this.racingLine.addEventListener('click', event => {
      if ((<HTMLElement>event.target).classList.contains(`car__btn--a`) && this.timeAnimation === undefined) {
        this.startMove();
      } else if ((<HTMLElement>event.target).classList.contains(`car__btn--a`)) {
        this.carAnimationMove.play();
      }
      if ((<HTMLElement>event.target).classList.contains(`car__btn--b`)) {
        this.carAnimationMove.pause();
      }
    });
  }
}
