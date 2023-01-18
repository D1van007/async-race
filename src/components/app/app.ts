import { Header } from '../header/header';
import { GaragePage } from '../garage_page/page';

export class App {
  header: Header;

  parent!: HTMLElement;

  mainContainer!: HTMLElement;

  garagePage: GaragePage;

  constructor() {
    this.parent = document.querySelector('.body__container') as HTMLElement;
    this.header = new Header(this.parent);
    this.creatMainContainer();
    this.garagePage = new GaragePage();
  }

  creatMainContainer() {
    const headerDOM = document.querySelector('.header') as HTMLElement;
    this.mainContainer = document.createElement('main');
    this.mainContainer.classList.add('main');
    headerDOM.after(this.mainContainer);
  }
}
