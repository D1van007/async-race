export enum Engine {
  started = 'started',
  stopped = 'stopped',
  drive = 'drive',
}

export interface ICar {
  name: string;
  color: string;
  id?: number;
}
