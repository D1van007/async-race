class LoaderWinners {
  serverPath;
  paramsPage;
  paramsLimit;
  winners;
  car;
  paramsSort;
  paramsOrder;
  constructor() {
    this.serverPath = 'http://127.0.0.1:3000/';
    this.winners = 'winners';
    this.paramsPage = '_page';
    this.paramsLimit = '_limit';
    this.paramsSort = '_sort';
    this.paramsOrder = '_order';
  }
  async getWinners(page, limit, sort, order) {
    try {
      const response = await fetch(
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
  async getWinner(id) {
    try {
      const response = await fetch(`${this.serverPath}${this.winners}/${id}`);
      const winnerData = await response.json();
      return winnerData;
    } catch {
      throw new Error('ошибочка');
    }
  }
  async deleteWinner(id) {
    const response = await fetch(`${this.serverPath}${this.winners}/${id}`, {
      method: 'DELETE',
    });
    await response.json();
  }
  async createWinner(body) {
    const response = await fetch(`${this.serverPath}${this.winners}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    await response.json();
  }
  async updateWinner(id, currentWins, currentTime) {
    const response = await fetch(`${this.serverPath}${this.winners}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        wins: currentWins,
        time: currentTime,
      }),
    });
    await response.json();
  }
}
export const loaderWinners = new LoaderWinners();
