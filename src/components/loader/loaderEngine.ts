// eslint-disable-next-line import/no-cycle
import { Engine, ICarProperties, errorCallback, drivePromice } from '../../types';

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

      const velocityCar: Promise<ICarProperties | undefined> = await response.json();
      return await velocityCar;
    } catch {
      throw new Error('ошибочка');
    }
  }

  // eslint-disable-next-line consistent-return
  async driveCar(id: number, status: Engine, callback?: errorCallback): Promise<drivePromice | undefined | void> {
    try {
      // this.startStopEngine(id, Engine.started);
      const controller = new AbortController();
      const response: Response = await fetch(
        `${this.serverPath}${this.engine}?${this.paramsId}=${id}&${this.paramsStatus}=${status}`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          signal: controller.signal,
        },
      );
      const driveCar: drivePromice = await response.json();
      return driveCar;
    } catch {
      if (callback) callback();
    }
  }
}

export const loaderEngine = new LoaderEngine();
