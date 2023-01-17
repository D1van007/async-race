import { Header } from '../header/header';

export class App {
  header: Header;
  parent!: HTMLElement;
  constructor() {
    this.parent = document.querySelector('.body__container') as HTMLElement;
    this.header = new Header(this.parent);
  }
}