import mongoose, { Schema, Document } from "mongoose";

interface IDevice extends Document {
  name: string;
  power_status: boolean;
  time_start: Date;
  roomId: Schema.Types.ObjectId;
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

const DeviceSchema: Schema = new Schema({
  name: { type: String, required: true },
  power_status: { type: Boolean, required: true },
  roomId: { type: Schema.Types.ObjectId, ref: "Room", required: true },
  time_start: { type: Date },
  position: {type: Object},
  settings: {type: Object}, 
});

const Device = mongoose.model<IDevice>("Device", DeviceSchema);

export { Device, IDevice };
