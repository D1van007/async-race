import { Engine } from '../../types';

class LoaderEngine {
  serverPath: string;
  paramsId: string;
  paramsStatus: string;
  engine: string;
  constructor() {
    this.serverPath = 'http://127.0.0.1:3000/';
    this.engine = 'engine';
    this.paramsId = 'id';
    this.paramsStatus = 'status';
  }
  async startStopEngine(id: number, status: string) {
    try {
      const response: Response = await fetch(
        `${this.serverPath}${this.engine}?${this.paramsId}=${id}&${this.paramsStatus}=${status}`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
        },
      );

      const velocityCar = await response.json();
      console.log(velocityCar);
    } catch (err) {
      alert(err);
    }
  }

  async driveCar(id: number, status: string) {
    try {
      const startCar = this.startStopEngine(id, Engine.started);
      const response: Response = await fetch(
        `${this.serverPath}${this.engine}?${this.paramsId}=${id}&${this.paramsStatus}=${status}`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
        },
      );

      const driveCar = await response.json();
      console.log(driveCar);
    } catch (err) {
      alert(err);
    }
  }
}

export const loaderEngine = new LoaderEngine();
