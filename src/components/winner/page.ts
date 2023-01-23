import { renderButtonHTML } from '../button/buttonFunc';
import { loaderWinners } from '../loader/loaderWinners';
import { saveValue } from '../save/save';
import { TableWinners } from './tableWinners';

export class WinnersPage {
  parent!: HTMLElement;

  mainContainer!: HTMLElement;

  page = saveValue.winnersPage;

  limit = saveValue.winnersLimit;

  winnersContainerDOM!: HTMLElement;

  winnersContainer!: HTMLDivElement;

  tableWinners: TableWinners;

  constructor() {
    this.parent = document.querySelector('.main') as HTMLElement;
    this.createWinnersPage();
    this.winnersContainerDOM = this.parent.querySelector('.winners__container') as HTMLElement;
    this.renderContentWinners();
    this.renderButtonPaginatin();
    this.tableWinners = new TableWinners(saveValue.winnersPage, saveValue.winnersLimit);
    this.handlePagination();
  }

  createWinnersPage() {
    this.winnersContainer = document.createElement('div');
    this.winnersContainer.classList.add('winners__container');
    this.parent.append(this.winnersContainer);
  }

  renderContentWinners() {
    this.winnersContainerDOM.insertAdjacentHTML('beforeend', this.createHTMLContentWinners());
  }

  renderButtonPaginatin() {
    this.winnersContainerDOM.insertAdjacentHTML('beforeend', this.createHTMLButtonPagination());
  }

  createHTMLButtonPagination(): string {
    return `<div class="winners__content--pagination">
                ${renderButtonHTML('PREV', 'pagination--prev__btn', '', '')}
                ${renderButtonHTML('NEXT', 'pagination--next__btn', '', '')}
            </div>`;
  }

  createHTMLContentWinners(): string {
    return `<h3 class="winners__content--title">Winners ()</h3>
            <h4 class="winners__content--page-number">Page #</h4>
            <ul class="winners__content--table"></ul>
            `;
  }

  handlePagination() {
    const paginationDOM = this.winnersContainerDOM.querySelector('.winners__content--pagination') as HTMLElement;

    paginationDOM.addEventListener('click', async event => {
      const allWinners = (await loaderWinners.getWinners()).length;
      if (
        (<HTMLElement>event.target).classList.contains(`pagination--next__btn`) &&
        allWinners / this.limit > saveValue.winnersPage
      ) {
        saveValue.winnersPage += 1;
        // eslint-disable-next-line no-new
        new TableWinners(saveValue.winnersPage, saveValue.winnersLimit);
      }
      if ((<HTMLElement>event.target).classList.contains(`pagination--prev__btn`) && saveValue.winnersPage > 1) {
        saveValue.winnersPage -= 1;
        // eslint-disable-next-line no-new
        new TableWinners(saveValue.winnersPage, saveValue.winnersLimit);
      }
    });
  }

  //   async rerenderDOM() {
  //     // ['ASC'|'DESC']
  //     // ['id'|'wins'|'time']

  //     const winnerHaedTableDOM = this.winnersContainerDOM.querySelector('.winners__content--title') as HTMLElement;
  //     winnerHaedTableDOM.addEventListener('click', event => {
  //       if (
  //         (<HTMLElement>event.target).classList.contains(`winner__name`)){
  //             let isASC = true
  // new TableWinners(saveValue.winnersPage, saveValue.winnersLimit, 'id');
  //         })
  //     const nameWinnerDOM = this.winnersContainerDOM.querySelector('.winner-__name') as HTMLElement;
  //     const nameWinnerDOM = this.winnersContainerDOM.querySelector('.winner-__name') as HTMLElement;
  //   }
}
