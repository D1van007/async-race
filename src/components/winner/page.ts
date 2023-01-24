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
    this.hadlerWinners();
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
    return `<h3 class="winners__content--amount">Winners ()</h3>
            <h4 class="winners__content--page-number">Page #</h4>
            <div class="winners__content--title">
                <h3 >Number</h3>
                <h3 class="winner__imgCar">Car <span class="arrow"><i class="fa-solid fa-arrow-down"></i><span></h3>
                <h3 class="winner__name">Name</h3>
                <h3 class="winner__wins">Wins <span class="arrow"><i class="fa-solid fa-arrow-down"></i><span></h3>
                <h3 class="winner__best-time">Best time (s) <span class="arrow"><i class="fa-solid fa-arrow-down"></i><span></h3>
            </div>
            <ul class="winners__content--table">
            </ul>
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

  //   .winner__name,
  // .winner__wins-amount,
  // .winner__best-time
  // ['ASC'|'DESC']
  // ['id'|'wins'|'time']
  hadlerWinners() {
    const carWinnerDOM = this.winnersContainerDOM.querySelector('.winner__imgCar') as HTMLElement;
    const carArrow = carWinnerDOM.querySelector('.arrow') as HTMLElement;
    carWinnerDOM.addEventListener('click', () => {
      if (carArrow.style.transform === 'rotate(180deg)') {
        carArrow.style.transform = 'rotate(0deg)';
        // eslint-disable-next-line no-new
        new TableWinners(saveValue.winnersPage, saveValue.winnersLimit, 'id', 'ASC');
      } else {
        carArrow.style.transform = 'rotate(180deg)';
        // eslint-disable-next-line no-new
        new TableWinners(saveValue.winnersPage, saveValue.winnersLimit, 'id', 'DESC');
      }
    });
        const winsWinnerDOM = this.winnersContainerDOM.querySelector('.winner__wins') as HTMLElement;
        const winsArrow = winsWinnerDOM.querySelector('.arrow') as HTMLElement;
        winsWinnerDOM.addEventListener('click', () => {
          if (winsArrow.style.transform === 'rotate(180deg)') {
            winsArrow.style.transform = 'rotate(0deg)';
            // eslint-disable-next-line no-new
            new TableWinners(saveValue.winnersPage, saveValue.winnersLimit, 'wins', 'ASC');
          } else {
            winsArrow.style.transform = 'rotate(180deg)';
            // eslint-disable-next-line no-new
            new TableWinners(saveValue.winnersPage, saveValue.winnersLimit, 'wins', 'DESC');
          }
        });
            const timeWinnerDOM = this.winnersContainerDOM.querySelector('.winner__best-time') as HTMLElement;
            const timeArrow = timeWinnerDOM.querySelector('.arrow') as HTMLElement;
            timeWinnerDOM.addEventListener('click', () => {
              if (timeArrow.style.transform === 'rotate(180deg)') {
                timeArrow.style.transform = 'rotate(0deg)';
                // eslint-disable-next-line no-new
                new TableWinners(saveValue.winnersPage, saveValue.winnersLimit, 'time', 'ASC');
              } else {
                timeArrow.style.transform = 'rotate(180deg)';
                // eslint-disable-next-line no-new
                new TableWinners(saveValue.winnersPage, saveValue.winnersLimit, 'time', 'DESC');
              }
            });
  }

  async rerenderMethods() {}
}
