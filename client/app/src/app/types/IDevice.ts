export interface Device {
    name: string;
    device_id: number;
    power_status: boolean;
    position: {
        x?: number;
        y?: number;
    };
    settings: {
      color?: string;
      temperature?: number;
      mode?: string;
      time_end?: string;
      mode_time?: string;
    };
  }
  