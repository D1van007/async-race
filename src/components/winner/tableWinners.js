import { carPicture } from '../garage_page/svg_car';
// eslint-disable-next-line import/no-cycle
import { loaderGarage } from '../loader/loaderGarage';
import { loaderWinners } from '../loader/loaderWinners';
export class TableWinners {
  parent;
  mainContainer;
  winnersTableContainerDOM;
  page;
  limit;
  sort;
  order;
  constructor(page, limit, sort, order) {
    this.page = page;
    this.limit = limit;
    this.sort = sort;
    this.order = order;
    this.winnersTableContainerDOM = document.querySelector('.winners__content--table');
    this.asyncRenderTable(this.page, this.limit);
  }
  async asyncRenderTable(page, limit) {
    const titleWinnersDOM = document.querySelector('.winners__content--amount');
    const pageWinnersDOM = document.querySelector('.winners__content--page-number');
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
  async createHTMLTableWinners(index) {
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
