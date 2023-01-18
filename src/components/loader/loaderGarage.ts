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
    const response: Response = await fetch(
      `${this.serverPath}${this.garage}?${this.paramsPage}=${page}&${this.paramsLimit}=${limit}`,
    );
    const garageData = await response.json();
    console.log(garageData);
    return garageData;
  }

  async getCar(id: number) {
    const response: Response = await fetch(`${this.serverPath}${this.garage}/${id}`);
    const garageData = await response.json();
    console.log(garageData);
  }

  async createCar(body: ICar) {
    const response: Response = await fetch(`${this.serverPath}${this.garage}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const garageData = await response.json();
    console.log(garageData);
  }

  async deleteCar(id: number) {
    const response: Response = await fetch(`${this.serverPath}${this.garage}/${id}`, {
      method: 'DELETE',
    });
    const garageData = await response.json();
    console.log(garageData);
  }

  async updateCar(id: number, name: string, color: string) {
    const response: Response = await fetch(`${this.serverPath}${this.garage}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: `${name}`,
        color: `${color}`,
      }),
    });
    const garageData = await response.json();
    console.log(garageData);
  }
}

export const loaderGarage = new LoaderGarage();
