import { loaderGarage } from '../loader/loaderGarage';
import { Racing } from './racing';
// eslint-disable-next-line import/no-absolute-path

// eslint-disable-next-line import/no-mutable-exports
export let arrInstanceRacing: Racing[] = [];

export function canRacing() {
  return arrInstanceRacing.some(e => e.isMoveCar);
}

export async function asyncCreatRacing(page: number, limit: number) {
  arrInstanceRacing = [];
  const racingContainerDOM = document.querySelector('.racing__list-cars') as HTMLElement;
  const titleRacingDOM = document.querySelector('.racing__title') as HTMLElement;
  const pageNumberDOM = document.querySelector('.racing__page-number') as HTMLElement;
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
      arrCarsRace[i].id as number,
      arrCarsRace[i].name as string,
      arrCarsRace[i].color,
    );

    arrInstanceRacing.push(racingInstance);
  }
}
