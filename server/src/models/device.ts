import mongoose, { Schema, Document } from "mongoose";

interface IDevice extends Document {
  name: string;
  type: string;
  status: string;
  roomId: Schema.Types.ObjectId;
}

const DeviceSchema: Schema = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  status: { type: String, required: true },
  roomId: { type: Schema.Types.ObjectId, ref: "Room", required: true },
});

const Device = mongoose.model<IDevice>("Device", DeviceSchema);

export { Device, IDevice };
