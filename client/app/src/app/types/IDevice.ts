export interface Device {
    name: string;
    _id?: string;
    roomId: string;
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
  