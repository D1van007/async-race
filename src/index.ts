import { loaderGarage } from './components/loader/loaderGarage';
import './style.css';
import { App } from './components/app/app';
import { loaderEngine } from './components/loader/loaderEngine';
import { Car } from './components/car/carInstance';
import { carMethod } from './components/car/carMethod';
import { Engine } from './types';

// // const car = new Car();
new App();
loaderGarage.getCars(1, 3);
// loaderGarage.getCar(29);
// loaderGarage.createCar(carMethod.newRandomCar());
// loaderGarage.updateCar(128, carMethod.randomCarName(), carMethod.randomColor());
// loaderEngine.startStopEngine(1, Engine.started)
// loaderEngine.driveCar(1, Engine.drive);
// loaderEngine.startStopEngine(1, Engine.stopped);
// loader.deleteCar(75)
