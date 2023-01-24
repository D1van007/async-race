import { CreatorCar } from './creatorCar';
import { UpdaterCar } from './updaterCar';
import { RaceControl } from './raceControl';

export class ControlPanel {
  selector: HTMLElement;

  parentSelector!: HTMLElement;

  controlPanelContainer!: HTMLElement;

  controlPanelContainerDOM!: HTMLElement;

  creatorCar: CreatorCar;

  updaterCar: UpdaterCar;

  raceControl: RaceControl;

  constructor(selector: HTMLElement) {
    this.selector = selector;
    this.createControlPanelContainer();
    this.controlPanelContainerDOM = this.selector.querySelector('.garage__content--control-panel') as HTMLElement;
    this.creatorCar = new CreatorCar(this.controlPanelContainerDOM);
    this.updaterCar = new UpdaterCar(this.controlPanelContainerDOM);
    this.raceControl = new RaceControl(this.controlPanelContainerDOM);
  }

  createControlPanelContainer() {
    this.controlPanelContainer = document.createElement('div');
    this.controlPanelContainer.classList.add('garage__content--control-panel');
    this.selector.prepend(this.controlPanelContainer);
  }
}
