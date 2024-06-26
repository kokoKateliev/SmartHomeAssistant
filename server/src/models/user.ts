import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
  firstName: string;
  lastName: string;
  password: string;
  email:string,
  familyId: Schema.Types.ObjectId;
}

const UserSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  familyId: { type: Schema.Types.ObjectId, ref: 'Family' },
});

const User = mongoose.model<IUser>('User', UserSchema);

export { User };
