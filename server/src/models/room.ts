import mongoose, { Schema, Document } from 'mongoose';

export interface IRoom extends Document {
  name: string;
  temperature: number;
  devices: Schema.Types.ObjectId[];
  userId: Schema.Types.ObjectId;
}

const RoomSchema: Schema = new Schema({
  name: { type: String, required: true },
  temperature: { type: Number, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

const Room = mongoose.model<IRoom>('Room', RoomSchema);

export { Room };
