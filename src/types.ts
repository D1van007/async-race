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

export interface ICarProperties {
  velocity: number;
  distance: number;
}
// eslint-disable-next-line @typescript-eslint/naming-convention
export type errorCallback = () => void;
