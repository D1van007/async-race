import { carPicture } from '../garage_page/svg_car';
// eslint-disable-next-line import/no-cycle
import { loaderGarage } from '../loader/loaderGarage';
import { loaderWinners } from '../loader/loaderWinners';
import { saveValue } from '../save/save';

export class TableWinners {
  parent!: HTMLElement;

  mainContainer!: HTMLElement;

  winnersTableContainerDOM!: HTMLElement;

  page: number;

  limit: number;

  sort: number | undefined;

  order: number | undefined;

  constructor(page: number, limit: number, sort?: number, order?: number) {
    this.page = page;
    this.limit = limit;
    this.sort = sort;
    this.order = order;
    this.winnersTableContainerDOM = document.querySelector('.winners__content--table') as HTMLElement;
    this.asyncRenderTable(this.page, this.limit);
  }

  async asyncRenderTable(page: number, limit: number) {
    const titleWinnersDOM = document.querySelector('.winners__content--title') as HTMLElement;
    const pageWinnersDOM = document.querySelector('.winners__content--page-number') as HTMLElement;
    const allWinners = (await loaderWinners.getWinners()).length;
    pageWinnersDOM.textContent = `Page #${String(page)}`;
    titleWinnersDOM.textContent = `Winners (${String(allWinners)})`;
    this.winnersTableContainerDOM.innerHTML = '';
    const lastPage = Math.ceil(allWinners / limit);
    const amountCarsOnPage = page === lastPage && allWinners % limit !== 0 ? allWinners % limit : limit;
    this.winnersTableContainerDOM.insertAdjacentHTML(
      'beforeend',
      `<li class="winners__content--title">
        <h3 >Number</h3>
        <h3>Car</h3>
        <h3 class="winner__name">Name</h3>
        <h3 class="winner__wins-amount">Wins</h3>
        <h3 class="winner__best-time">Best time (seconds)</h3>
    </li>`,
    );
    for (let i = 0; i < amountCarsOnPage; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      this.winnersTableContainerDOM.insertAdjacentHTML('beforeend', await this.createHTMLTableWinners(i));
    }
  }

  async createHTMLTableWinners(index: number) {
    const winnersOnPage = await loaderWinners.getWinners(this.page, this.limit);
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
