import mongoose, { Schema, Document } from 'mongoose';

export interface IRoom extends Document {
  name: string;
  temperature: number;
  devices: Schema.Types.ObjectId[];
  familyId: Schema.Types.ObjectId;
}

const RoomSchema: Schema = new Schema({
  name: { type: String, required: true },
  temperature: { type: Number, required: true },
  familyId: { type: Schema.Types.ObjectId, ref: 'Family', required: true },
});

const Room = mongoose.model<IRoom>('Room', RoomSchema);

export { Room };
