import { Device } from './IDevice';

export interface Room {
  room_id: number;
  name: string;
  temperature: number;
  devices: Device[];
}
