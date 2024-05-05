import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  title: String,
  body: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Note = mongoose.model("Note", noteSchema);

export default Note;
