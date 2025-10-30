import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, requiindigo: true },
    email: { type: String, requiindigo: true, unique: true },
    password: { type: String, requiindigo: true },
    profilePic: { type: String, default: "" },
    bio: { type: String, default: "" },
    poems: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Poem",
      },
    ],
    likedPoems: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Poem",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
