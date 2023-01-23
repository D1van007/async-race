import { renderButtonHTML } from '../button/buttonFunc';
import { loaderWinners } from '../loader/loaderWinners';
import { saveValue } from '../save/save';
import { TableWinners } from './tableWinners';
export class WinnersPage {
    parent;
    mainContainer;
    page = saveValue.winnersPage;
    limit = saveValue.winnersLimit;
    winnersContainerDOM;
    winnersContainer;
    tableWinners;
    constructor() {
        this.parent = document.querySelector('.main');
        this.createWinnersPage();
        this.winnersContainerDOM = this.parent.querySelector('.winners__container');
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
    createHTMLButtonPagination() {
        return `<div class="winners__content--pagination">
                ${renderButtonHTML('PREV', 'pagination--prev__btn', '', '')}
                ${renderButtonHTML('NEXT', 'pagination--next__btn', '', '')}
            </div>`;
    }
    createHTMLContentWinners() {
        return `<h3 class="winners__content--title">Winners ()</h3>
            <h4 class="winners__content--page-number">Page #</h4>
            <ul class="winners__content--table"></ul>
            `;
    }
    handlePagination() {
        const paginationDOM = this.winnersContainerDOM.querySelector('.winners__content--pagination');
        paginationDOM.addEventListener('click', async (event) => {
            const allWinners = (await loaderWinners.getWinners()).length;
            if (event.target.classList.contains(`pagination--next__btn`) &&
                allWinners / this.limit > saveValue.winnersPage) {
                saveValue.winnersPage += 1;
                // eslint-disable-next-line no-new
                new TableWinners(saveValue.winnersPage, saveValue.winnersLimit);
            }
            if (event.target.classList.contains(`pagination--prev__btn`) && saveValue.winnersPage > 1) {
                saveValue.winnersPage -= 1;
                // eslint-disable-next-line no-new
                new TableWinners(saveValue.winnersPage, saveValue.winnersLimit);
            }
        });
    }
}
