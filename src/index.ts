/* eslint-disable no-new */
import './style.css';
// eslint-disable-next-line import/no-extraneous-dependencies
import '@fortawesome/fontawesome-free/css/all.css';
import { loaderGarage } from './components/loader/loaderGarage';
import { App } from './components/app/app';
import { loaderEngine } from './components/loader/loaderEngine';
// import { Car } from './components/car/carInstance';
// eslint-disable-next-line import/extensions
import { carMethod } from './components/carServer/carMethod';
import { Engine } from './types';

// // const car = new Car();

// eslint-disable-next-line no-new
// loaderGarage.getCars();

new App();

// loaderGarage.getCars();
// loaderGarage.createCar(carMethod.newRandomCar());
// loaderGarage.updateCar(114, carMethod.randomCarName(), carMethod.randomColor());
// loaderEngine.startStopEngine(1, Engine.started);
// loaderEngine.driveCar(1, Engine.drive);
// loaderEngine.startStopEngine(1, Engine.stopped);
// loader.deleteCar(75)
