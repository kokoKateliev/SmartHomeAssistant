import mongoose, { Schema, Document } from 'mongoose';

interface IFamily extends Document {
  name: string;
  members: Schema.Types.ObjectId[];
}

const FamilySchema: Schema = new Schema({
  name: { type: String, required: true },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

const Family = mongoose.model<IFamily>('Family', FamilySchema);

export { Family };
