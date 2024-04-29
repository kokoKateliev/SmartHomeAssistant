const mongoose = require("mongoose");

export const UserSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  family: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Family",
    required: true,
  },
});

const User = mongoose.model("User", UserSchema);

export { User };
