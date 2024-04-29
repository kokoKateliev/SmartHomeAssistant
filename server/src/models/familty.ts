import { Schema, model, Document } from "mongoose";
const ObjectId = Schema.ObjectId;

const mongoose = require("mongoose");

export const FamilySchema = new mongoose.Schema({
  familyId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  familyName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    require: true,
  },
  users: [
    {
      type: ObjectId,
      ref: "User",
    },
  ],
  rooms: [
    {
      type: ObjectId,
      ref: "Room",
    },
  ],
  uniqueCode:{
    type: String,
    require: true,
  }
});

const Family = mongoose.model("Family", FamilySchema);

export { Family };
