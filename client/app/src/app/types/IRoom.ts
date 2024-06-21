import { Device } from './IDevice';

export interface Room {
  _id: string;
  name: string;
  temperature: number;
  devices: Device[];
}
