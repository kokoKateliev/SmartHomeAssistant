import mongoose, { Schema, Document, Model } from 'mongoose';

interface IDevice extends Document {
    name: string;
    room: mongoose.Types.ObjectId;
    mode: boolean;
}

const deviceSchema = new Schema<IDevice>({
  name: {
    type: String,
    required: true,
  },
  room: {
    type: Schema.Types.ObjectId,
    ref: "Room",
  },
  mode: {
    type: Boolean,
    default: false,
  },
});

const Device: Model<IDevice> = mongoose.model<IDevice>('Device', deviceSchema);

export { Device, IDevice };
