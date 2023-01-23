// eslint-disable-next-line import/no-cycle
import { IWinner } from '../../types';

class LoaderWinners {
  serverPath: string;

  paramsPage: string;

  paramsLimit: string;

  winners: string;

  car: IWinner | undefined;

  paramsSort: string;

  paramsOrder: string;

  constructor() {
    this.serverPath = 'http://127.0.0.1:3000/';
    this.winners = 'winners';
    this.paramsPage = '_page';
    this.paramsLimit = '_limit';
    this.paramsSort = '_sort';
    this.paramsOrder = '_order';
  }

  async getWinners(page?: number, limit?: number, sort?: number, order?: number): Promise<IWinner[]> {
    try {
      const response: Response = await fetch(
        `${this.serverPath}${this.winners}${
          page || limit ? `?${this.paramsPage}=${page}&${this.paramsLimit}=${limit}` : ''
        }${sort ? `?${this.paramsSort}=${sort}` : ''}${order ? `?${this.paramsOrder}=${order}` : ''}`,
      );
      const winnersData = await response.json();
      return winnersData;
    } catch {
      throw new Error('ошибочка');
    }
  }

  async getWinner(id: number): Promise<IWinner> {
    try {
      const response: Response = await fetch(`${this.serverPath}${this.winners}/${id}`);
      const winnerData = await response.json();
      return winnerData;
    } catch {
      throw new Error('ошибочка');
    }
  }

  async deleteWinner(id: number) {
    const response: Response = await fetch(`${this.serverPath}${this.winners}/${id}`, {
      method: 'DELETE',
    });
    const winnersData = await response.json();
  }

  async createWinner(body: IWinner) {
    const response: Response = await fetch(`${this.serverPath}${this.winners}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const winnersData = await response.json();
  }

  async updateWinner(id: number, currentWins: number, currentTime: number) {
    const response: Response = await fetch(`${this.serverPath}${this.winners}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        wins: currentWins,
        time: currentTime,
      }),
    });
    const winnerData = await response.json();
  }
}

export const loaderWinners = new LoaderWinners();
