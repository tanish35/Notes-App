import React, { useState, useEffect } from "react";
import axios from "axios";
function NotesPages() {
  const [notes, setNotes] = useState(null);
  const [createForm, setCreateForm] = useState({
    title: "",
    body: "",
  });
  useEffect(() => {
    fetchNotes();
  }, []);

  const createNote = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:3000/notes", createForm);
    setNotes([...notes, res.data.note]);
    setCreateForm({
      title: "",
      body: "",
    });
  };
  const updateCreateForm = (e) => {
    const { name, value } = e.target;
    setCreateForm({
      ...createForm,
      [name]: value,
    });
  };
  const fetchNotes = async () => {
    const res = await axios.get("http://localhost:3000/notes");
    setNotes(res.data.notes);
  };
  const deleteNote = async (_id) => {
    await axios.delete(`http://localhost:3000/notes/${_id}`);
    fetchNotes();
  };

  const [updateForm, setUpdateForm] = useState({
    _id: null,
    title: "",
    body: "",
  });

  const handleUpdateFieldChange = (e) => {
    const { value, name } = e.target;
    setUpdateForm({
      ...updateForm,
      [name]: value,
    });
  };

  const toggleUpdate = (note) => {
    setUpdateForm({
      _id: note._id,
      title: note.title,
      body: note.body,
    });
  };

  const updateNote = async (e) => {
    e.preventDefault();
    await axios.put(
      `http://localhost:3000/notes/${updateForm._id}`,
      updateForm
    );
    setUpdateForm({
      _id: null,
      title: "",
      body: "",
    });

    fetchNotes();
  };

  return (
    <div className="App">
      <h1>Notes</h1>
      <ul>
        {notes &&
          notes.map((note) => (
            <li key={note._id}>
              <h2>{note.title}</h2>
              <p>{note.body}</p>
              <button onClick={() => deleteNote(note._id)}>Delete</button>
              <button onClick={() => toggleUpdate(note)}>Update</button>
            </li>
          ))}
      </ul>
      <div>
        <h2>Update Note</h2>
        <div>
          <form onSubmit={updateNote}>
            <input
              onChange={handleUpdateFieldChange}
              name="title"
              type="text"
              placeholder="Title"
              value={updateForm.title}
            />
            <textarea
              onChange={handleUpdateFieldChange}
              name="body"
              placeholder="Body"
              value={updateForm.body}
            ></textarea>
            <button type="submit">Update Note</button>
          </form>
        </div>
        <h2>Add a Note</h2>
        <form onSubmit={createNote}>
          <input
            onChange={updateCreateForm}
            name="title"
            type="text"
            placeholder="Title"
            value={createForm.title}
          />
          <textarea
            onChange={updateCreateForm}
            name="body"
            placeholder="Body"
            value={createForm.body}
          ></textarea>
          <button type="submit">Add Note</button>
        </form>
      </div>
    </div>
  );
}

export default NotesPages;
