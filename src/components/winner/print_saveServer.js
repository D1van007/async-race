import { loaderWinners } from '../loader/loaderWinners';
export function renderWinner(name, time) {
  const garageContainerDOM = document.querySelector('.garage__container');
  const winnerTitleContainer = document.createElement('div');
  winnerTitleContainer.classList.add('winner__title');
  winnerTitleContainer.textContent = `${name} went first [${time}s]`;
  garageContainerDOM.append(winnerTitleContainer);
}
export async function saveWinner(winner) {
  const archiveWinners = await loaderWinners.getWinners();
  // console.log(winner);
  // console.log(archiveWinner);
  if (archiveWinners.some(e => e.id === Number(winner.id))) {
    console.log('ds');
    const archiveWinner = await loaderWinners.getWinner(winner.id);
    const bestWinner = [archiveWinner, winner].sort((a, b) => a.time - b.time)[0];
    console.log(bestWinner);
    loaderWinners.updateWinner(bestWinner.id, archiveWinner.wins + 1, bestWinner.time);
  } else {
    loaderWinners.createWinner(winner);
  }
}
