// eslint-disable-next-line import/no-cycle
import { loaderGarage } from '../loader/loaderGarage';
import { Racing } from './racing';
// eslint-disable-next-line import/no-mutable-exports
export let arrInstanceRacing = [];
export function canRacing() {
  return arrInstanceRacing.some(e => e.isMoveCar);
}
export async function asyncCreatRacing(page, limit) {
  arrInstanceRacing = [];
  const racingContainerDOM = document.querySelector('.racing__list-cars');
  const titleRacingDOM = document.querySelector('.racing__title');
  const pageNumberDOM = document.querySelector('.racing__page-number');
  const arrCarsRace = await loaderGarage.getCars(page, limit);
  const allCars = (await loaderGarage.getCars()).length;
  pageNumberDOM.textContent = `Page #${String(page)}`;
  titleRacingDOM.textContent = `Garage (${String(allCars)})`;
  racingContainerDOM.innerHTML = '';
  const lastPage = Math.ceil(allCars / limit);
  const amountCarsOnPage = page === lastPage && allCars % limit !== 0 ? allCars % limit : limit;
  for (let i = 0; i < amountCarsOnPage; i += 1) {
    // eslint-disable-next-line no-new
    const racingInstance = new Racing(
      racingContainerDOM,
      page,
      limit,
      arrCarsRace[i].id,
      arrCarsRace[i].name,
      arrCarsRace[i].color,
    );
    arrInstanceRacing.push(racingInstance);
  }
}
