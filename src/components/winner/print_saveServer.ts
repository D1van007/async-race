import { IWinner } from '../../types';
import { loaderWinners } from '../loader/loaderWinners';

export function renderWinner(name: string, time: number) {
  const garageContainerDOM = document.querySelector('.garage__container') as HTMLElement;
  const winnerTitleContainer = document.createElement('div');
  winnerTitleContainer.classList.add('winner__title');
  winnerTitleContainer.textContent = `${name} went first [${time}s]`;
  garageContainerDOM.append(winnerTitleContainer);
}
export async function saveWinner(winner: IWinner) {
  const archiveWinners = await loaderWinners.getWinners();
  // console.log(winner);
  // console.log(archiveWinner);
  if (archiveWinners.some(e => e.id === Number(winner.id))) {
    console.log('ds');
    const archiveWinner = await loaderWinners.getWinner(winner.id);
    const bestWinner = [archiveWinner, winner].sort((a: IWinner, b: IWinner) => a.time - b.time)[0];
    console.log(bestWinner);
    loaderWinners.updateWinner(bestWinner.id, archiveWinner.wins + 1, bestWinner.time);
  } else {
    loaderWinners.createWinner(winner);
  }
}
