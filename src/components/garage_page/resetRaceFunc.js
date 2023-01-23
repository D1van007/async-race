import { arrInstanceRacing } from './createRacigFunc';
export async function resetRacing() {
  const winnerTitleDOM = document.querySelector('.winner__title');
  const startRacingBtnDOM = document.querySelector('.race-control--race__btn');
  const resetRacingBtnDOM = document.querySelector('.race-control--reset__btn');
  if (winnerTitleDOM) {
    winnerTitleDOM.remove();
  }
  startRacingBtnDOM.disabled = false;
  resetRacingBtnDOM.disabled = true;
  const promiseArr = [];
  arrInstanceRacing.forEach(e => {
    promiseArr.push(
      new Promise(res => {
        res(e.stopMove());
      }),
    );
  });
}
