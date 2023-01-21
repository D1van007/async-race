import { Engine, ICarProperties, errorCallback } from '../../types';

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

  // eslint-disable-next-line consistent-return
  async startStopEngine(id: number, status: Engine): Promise<ICarProperties | undefined> {
    try {
      const response: Response = await fetch(
        `${this.serverPath}${this.engine}?${this.paramsId}=${id}&${this.paramsStatus}=${status}`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
        },
      );

      const velocityCar = await response.json();
      return velocityCar;
    } catch (err) {
      console.error(err);
    }
  }

  async driveCar(id: number, status: Engine, callback?: errorCallback) {
    try {
      // this.startStopEngine(id, Engine.started);
      const response: Response = await fetch(
        `${this.serverPath}${this.engine}?${this.paramsId}=${id}&${this.paramsStatus}=${status}`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
        },
      );

      const driveCar = await response.json();
      console.log(driveCar);
    } catch {
      if (callback) callback();
    }
  }
}

export const loaderEngine = new LoaderEngine();
