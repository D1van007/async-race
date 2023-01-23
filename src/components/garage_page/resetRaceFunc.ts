import { drivePromice } from '../../types';
import { arrInstanceRacing } from './createRacigFunc';

export async function resetRacing() {
  const winnerTitleDOM = document.querySelector('.winner__title') as HTMLElement;
  const startRacingBtnDOM = document.querySelector('.race-control--race__btn') as HTMLButtonElement;
  const resetRacingBtnDOM = document.querySelector('.race-control--reset__btn') as HTMLButtonElement;

  if (winnerTitleDOM) {
    winnerTitleDOM.remove();
  }
  startRacingBtnDOM.disabled = false;
  resetRacingBtnDOM.disabled = true;
  const promiseArr: Promise<drivePromice>[] = [];
  arrInstanceRacing.forEach(e => {
    promiseArr.push(
      new Promise(res => {
        res(e.stopMove() as unknown as Promise<drivePromice>);
      }),
    );
  });
}
