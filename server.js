import express from "express";
import "dotenv/config";
import connectToDB from "./config/connectToDB.js";
import {
  fetchNotes,
  fetchNote,
  createNote,
  updateNote,
  deleteNote,
} from "./controllers/notesController.js";
import {
  signUp,
  signIn,
  signOut,
  checkAuth,
} from "./controllers/userController.js";

import requireAuth from "./middleware/requireAuth.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3001", // Replace with the URL of your React app
    credentials: true, // Enable credentials (cookies)
  })
);
app.use(cookieParser());
connectToDB();

app.get("/notes", requireAuth, fetchNotes);
app.get("/notes/:id", requireAuth, fetchNote);
app.post("/notes", requireAuth, createNote);
app.put("/notes/:id", requireAuth, updateNote);
app.delete("/notes/:id", requireAuth, deleteNote);
app.post("/signup", signUp);
app.post("/signin", signIn);
app.get("/signout", signOut);
app.get("/check-auth", requireAuth, checkAuth);

app.listen(process.env.PORT, () => {
  console.log("Server is running on port 3000");
});
