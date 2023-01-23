// eslint-disable-next-line import/no-cycle
import { ICar } from '../../types';

class LoaderGarage {
  serverPath: string;

  paramsPage: string;

  paramsLimit: string;

  garage: string;

  car: ICar | undefined;

  constructor() {
    this.serverPath = 'http://127.0.0.1:3000/';
    this.garage = 'garage';
    this.paramsPage = '_page';
    this.paramsLimit = '_limit';
  }

  async getCars(page?: number, limit?: number): Promise<ICar[]> {
    try {
      const response: Response = await fetch(
        `${this.serverPath}${this.garage}${
          page || limit ? `?${this.paramsPage}=${page}&${this.paramsLimit}=${limit}` : ''
        }`,
      );
      const garageData = await response.json();
      return garageData;
    } catch {
      throw new Error('ошибочка');
    }
  }

  async getCar(id: number): Promise<ICar> {
    try {
      const response: Response = await fetch(`${this.serverPath}${this.garage}/${id}`);
      const garageData = await response.json();
      return garageData;
    } catch {
      throw new Error('ошибочка');
    }
  }

  async createCar(body: ICar) {
    try {
      const response: Response = await fetch(`${this.serverPath}${this.garage}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const garageData = await response.json();
    } catch {
      throw new Error('ошибочка');
    }
  }

  async deleteCar(id: number) {
    try {
      const response: Response = await fetch(`${this.serverPath}${this.garage}/${id}`, {
        method: 'DELETE',
      });
      const garageData = await response.json();
    } catch {
      throw new Error('ошибочка');
    }
  }

  async updateCar(id: number, name: string, color: string) {
    try {
      const response: Response = await fetch(`${this.serverPath}${this.garage}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${name}`,
          color: `${color}`,
        }),
      });
      const garageData = await response.json();
    } catch {
      throw new Error('ошибочка');
    }
  }
}

export const loaderGarage = new LoaderGarage();
