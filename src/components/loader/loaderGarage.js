class LoaderGarage {
  serverPath;
  paramsPage;
  paramsLimit;
  garage;
  car;
  constructor() {
    this.serverPath = 'http://127.0.0.1:3000/';
    this.garage = 'garage';
    this.paramsPage = '_page';
    this.paramsLimit = '_limit';
  }
  async getCars(page, limit) {
    try {
      const response = await fetch(
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
  async getCar(id) {
    try {
      const response = await fetch(`${this.serverPath}${this.garage}/${id}`);
      const garageData = await response.json();
      return garageData;
    } catch {
      throw new Error('ошибочка');
    }
  }
  async createCar(body) {
    try {
      const response = await fetch(`${this.serverPath}${this.garage}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      await response.json();
    } catch {
      throw new Error('ошибочка');
    }
  }
  async deleteCar(id) {
    try {
      const response = await fetch(`${this.serverPath}${this.garage}/${id}`, {
        method: 'DELETE',
      });
      await response.json();
    } catch {
      throw new Error('ошибочка');
    }
  }
  async updateCar(id, name, color) {
    try {
      const response = await fetch(`${this.serverPath}${this.garage}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${name}`,
          color: `${color}`,
        }),
      });
      await response.json();
    } catch {
      throw new Error('ошибочка');
    }
  }
}
export const loaderGarage = new LoaderGarage();
