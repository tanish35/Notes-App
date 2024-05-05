import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import axios from "axios";
const root = ReactDOM.createRoot(document.getElementById("root"));
axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.withCredentials = true;
root.render(<App />);
