import { Device } from './IDevice';

export interface Room {
  room_id: string;
  name: string;
  temperature: number;
  devices: Device[];
}
