import React from "react";
import NotesPages from "../pages/notesPages";
import LoginPages from "../pages/loginPage";
import RequireAuth from "./requireAuth";
import SignUpPages from "../pages/signUpPages";
import LogOut from "./logOut";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
            <li>
              <Link to="/logout">Logout</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route
            path="/"
            element={
              <RequireAuth>
                <NotesPages />
              </RequireAuth>
            }
          />
          <Route path="/login" element={<LoginPages />} />
          <Route path="/signup" element={<SignUpPages />} />
          <Route path="/logout" element={<LogOut />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
