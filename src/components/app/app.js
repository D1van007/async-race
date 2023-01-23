import { Header } from '../header/header';
import { GaragePage } from '../garage_page/page';
import { WinnersPage } from '../winner/page';
export class App {
    header;
    parent;
    mainContainer;
    garagePage;
    winnersPage;
    constructor() {
        this.parent = document.querySelector('.body__container');
        this.header = new Header(this.parent);
        this.creatMainContainer();
        this.garagePage = new GaragePage();
        this.winnersPage = new WinnersPage();
    }
    creatMainContainer() {
        const headerDOM = document.querySelector('.header');
        this.mainContainer = document.createElement('main');
        this.mainContainer.classList.add('main');
        headerDOM.after(this.mainContainer);
    }
}
