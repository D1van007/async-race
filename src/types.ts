// eslint-disable-next-line import/no-cycle
import { Racing } from './components/garage_page/racing';

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
export interface IWinner {
  id: number;
  wins: number;
  time: number;
}
export interface ICarProperties {
  velocity: number;
  distance: number;
}
// eslint-disable-next-line @typescript-eslint/naming-convention
export type errorCallback = () => void;

// eslint-disable-next-line @typescript-eslint/naming-convention
export type drivePromice = { success: boolean; instanceCar: Racing; time: number };
