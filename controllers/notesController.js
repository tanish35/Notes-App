import Note from "../models/note.js";

const fetchNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user._id });
    res.json({ notes });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

const fetchNote = async (req, res) => {
  const id = req.params.id;
  try {
    const note = await Note.findOne({ _id: id, user: req.user._id });
    res.json({ note });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

const createNote = async (req, res) => {
  const { title, body } = req.body;
  try {
    const note = await Note.create({ title, body, user: req.user._id });
    res.json({ note: note });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

const updateNote = async (req, res) => {
  const id = req.params.id;
  try {
    const { title, body } = req.body;
    await Note.findOneAndUpdate(
      { _id: id, user: req.user._id },
      { title, body }
    );
    const note = await Note.findOne({ _id: id, user: req.user._id });
    res.json({ note: note });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

const deleteNote = async (req, res) => {
  const id = req.params.id;
  try {
    await Note.findOneAndDelete({ _id: id, user: req.user._id });
    res.json({ message: "Note deleted" });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

export { fetchNotes, fetchNote, createNote, updateNote, deleteNote };
