import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  familyId: Schema.Types.ObjectId;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  familyId: { type: Schema.Types.ObjectId, ref: 'Family' },
});

const User = mongoose.model<IUser>('User', UserSchema);

export { User };
