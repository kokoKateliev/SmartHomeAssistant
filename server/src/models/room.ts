import mongoose, { Schema, Document, Model } from "mongoose";

const ObjectId = Schema.ObjectId;

export interface IRoom extends Document {
  roomId: mongoose.Types.ObjectId;
  name: string;
  familyId: mongoose.Types.ObjectId;
  devices: mongoose.Types.ObjectId[];
  light: boolean;
  temperature: number;
}

export const RoomSchema = new mongoose.Schema<IRoom>({
  roomId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  name: {
    type: String,
    required: true,
  },
  familyId: {
    type: ObjectId,
    ref: "Family",
    required: true,
  },
  devices: [
    {
      type: ObjectId,
      ref: "Device",
    },
  ],
  light: {
    type: Boolean,
    default: false,
  },
  temperature: {
    type: Number,
    default: 37,
  },
});

const Room = mongoose.model("Room", RoomSchema);

export const EditRoom: Model<IRoom> = mongoose.model<IRoom>("Room", RoomSchema);

export { Room };
