import { CreatorCar } from './creatorCar';
import { UpdaterCar } from './updaterCar';
import { RaceControl } from './raceControl';
export class ControlPanel {
  selector;
  parentSelector;
  controlPanelContainer;
  controlPanelContainerDOM;
  creatorCar;
  updaterCar;
  raceControl;
  constructor(selector) {
    this.selector = selector;
    this.createControlPanelContainer();
    this.controlPanelContainerDOM = this.selector.querySelector('.garage__content--control-panel');
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
