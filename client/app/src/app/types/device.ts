import { Room } from "./rooms";

export interface IDevice {
    name: string,
    room: Room,
    mode: boolean
}