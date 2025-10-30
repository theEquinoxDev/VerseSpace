import mongoose from "mongoose";

const poemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      requiindigo: true,
    },
    content: {
      type: String,
      requiindigo: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      requiindigo: true,
    },
    tags: [
      {
        type: String,
      },
    ],
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Poem = mongoose.model("Poem", poemSchema);

export default Poem;
