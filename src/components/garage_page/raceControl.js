import { renderButtonHTML } from '../button/buttonFunc';
import { carMethod } from '../carServer/carMethod';
import { loaderGarage } from '../loader/loaderGarage';
import { saveValue } from '../save/save';
import { arrInstanceRacing, asyncCreatRacing } from './createRacigFunc';
import { renderWinner, saveWinner } from '../winner/print_saveServer';
import { TableWinners } from '../winner/tableWinners';
import { resetRacing } from './resetRaceFunc';
export class RaceControl {
    selector;
    startRacingBtnDOM;
    resetRacingBtnDOM;
    generateCarsBtnDOM;
    updateCarBtnDOM;
    allBtnRemove;
    createCarBtnDOM;
    prevBtnDOM;
    nextBtnDOM;
    constructor(selector) {
        this.selector = selector;
        this.renderRaceControl();
        this.startRacingBtnDOM = document.querySelector('.race-control--race__btn');
        this.resetRacingBtnDOM = document.querySelector('.race-control--reset__btn');
        this.generateCarsBtnDOM = document.querySelector('.race-control--generate__btn');
        this.updateCarBtnDOM = document.querySelector('.updater-car__btn');
        this.createCarBtnDOM = document.querySelector('.creator-car__btn');
        this.generateCars(100);
        this.startRacing();
        this.handlerResetRace();
    }
    renderRaceControl() {
        this.selector.insertAdjacentHTML('beforeend', this.createHTMLRaceControl());
    }
    createHTMLRaceControl() {
        return `<div class="race-control__content">
                ${renderButtonHTML('RACE', 'race-control--race__btn')}
                ${renderButtonHTML('RESET', 'race-control--reset__btn', '', 'disabled')}
                ${renderButtonHTML('GENERATE CARS', 'race-control--generate__btn')}
            </div>`;
    }
    generateCars(amountCars) {
        const generateBtnDOM = document.querySelector('.race-control--generate__btn');
        generateBtnDOM.addEventListener('click', () => {
            for (let i = 0; i < amountCars; i += 1) {
                loaderGarage.createCar(carMethod.newRandomCar());
            }
            asyncCreatRacing(saveValue.carsPage, saveValue.carsLimit);
        });
    }
    disabledBtn() {
        this.prevBtnDOM = document.querySelector('.pagination--prev__btn');
        this.nextBtnDOM = document.querySelector('.pagination--next__btn');
        this.resetRacingBtnDOM.disabled = true;
        this.startRacingBtnDOM.disabled = true;
        this.generateCarsBtnDOM.disabled = true;
        this.updateCarBtnDOM.disabled = true;
        this.createCarBtnDOM.disabled = true;
        this.prevBtnDOM.disabled = true;
        this.nextBtnDOM.disabled = true;
        this.allBtnRemove = document.querySelectorAll('.race__btn--remove');
        const arrBtnRemove = Array.from(this.allBtnRemove);
        arrBtnRemove.forEach(e => {
            e.disabled = true;
        });
    }
    enableBtn() {
        this.prevBtnDOM = document.querySelector('.pagination--prev__btn');
        this.nextBtnDOM = document.querySelector('.pagination--next__btn');
        this.startRacingBtnDOM.disabled = false;
        this.generateCarsBtnDOM.disabled = false;
        this.updateCarBtnDOM.disabled = false;
        this.createCarBtnDOM.disabled = false;
        this.prevBtnDOM.disabled = false;
        this.nextBtnDOM.disabled = false;
        this.allBtnRemove = document.querySelectorAll('.race__btn--remove');
        const arrBtnRemove = Array.from(this.allBtnRemove);
        arrBtnRemove.forEach(e => {
            e.disabled = false;
        });
    }
    startRacing() {
        this.startRacingBtnDOM.addEventListener('click', async () => {
            this.disabledBtn();
            const promiseArr = [];
            arrInstanceRacing.forEach(e => {
                promiseArr.push(new Promise(res => {
                    res(e.startMove(true));
                }));
            });
            Promise.any(promiseArr).then(value => {
                renderWinner(value.instanceCar?.name, value.time);
                const winnerTitleDOM = document.querySelector('.winner__title');
                setTimeout(() => winnerTitleDOM.remove(), 7000);
                const winner = {
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
