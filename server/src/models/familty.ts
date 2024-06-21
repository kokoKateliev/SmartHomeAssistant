import mongoose, { Schema, Document } from 'mongoose';

interface IFamily extends Document {
  familyName: string;
  users: Schema.Types.ObjectId[];
}

const FamilySchema: Schema = new Schema({
  familyName: { type: String, required: true },
  users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

const Family = mongoose.model<IFamily>('Family', FamilySchema);

export { Family };
