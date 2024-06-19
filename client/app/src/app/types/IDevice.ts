import { UUID } from "crypto";

export interface Device {
    name: string;
    device_id: UUID;
    power_status: boolean;
    time_start: Date;
    position: {
        x?: number;
        y?: number;
    };
    settings: {
      color?: string;
      temperature?: number;
      mode?: string;
    };
  }
  