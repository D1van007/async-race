import { carPicture } from '../garage_page/svg_car';
// eslint-disable-next-line import/no-cycle
import { loaderGarage } from '../loader/loaderGarage';
import { loaderWinners } from '../loader/loaderWinners';

export class TableWinners {
  parent!: HTMLElement;

  mainContainer!: HTMLElement;

  winnersTableContainerDOM!: HTMLElement;

  page: number;

  limit: number;

  sort: string | undefined;

  order: string | undefined;

  constructor(page: number, limit: number, sort?: string, order?: string) {
    this.page = page;
    this.limit = limit;
    this.sort = sort;
    this.order = order;
    this.winnersTableContainerDOM = document.querySelector('.winners__content--table') as HTMLElement;
    this.asyncRenderTable(this.page, this.limit);
  }

  async asyncRenderTable(page: number, limit: number) {
    const titleWinnersDOM = document.querySelector('.winners__content--amount') as HTMLElement;
    const pageWinnersDOM = document.querySelector('.winners__content--page-number') as HTMLElement;
    const allWinners = (await loaderWinners.getWinners()).length;
    pageWinnersDOM.textContent = `Page #${String(page)}`;
    titleWinnersDOM.textContent = `Winners (${String(allWinners)})`;
    this.winnersTableContainerDOM.innerHTML = '';
    const lastPage = Math.ceil(allWinners / limit);
    const amountCarsOnPage = page === lastPage && allWinners % limit !== 0 ? allWinners % limit : limit;
    for (let i = 0; i < amountCarsOnPage; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      this.winnersTableContainerDOM.insertAdjacentHTML('beforeend', await this.createHTMLTableWinners(i));
    }
  }

  async createHTMLTableWinners(index: number) {
    const winnersOnPage = await loaderWinners.getWinners(this.page, this.limit, this.sort, this.order);
    const currentID = winnersOnPage[index].id;
    return `<li class="winners__content--item">
        <div>${index + 1 + (this.page - 1) * this.limit}</div>
        <div>${carPicture('iconWinner', (await loaderGarage.getCar(currentID)).color)}</div>
        <div>${(await loaderGarage.getCar(currentID)).name}</div>
        <div>${(await loaderWinners.getWinner(currentID)).wins}</div>
        <div>${(await loaderWinners.getWinner(currentID)).time}</div>
    </li`;
  }
}
