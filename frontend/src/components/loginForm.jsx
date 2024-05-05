import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const navigate = useNavigate();
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const handleSetLoginForm = (e) => {
    const { name, value } = e.target;
    setLoginForm({
      ...loginForm,
      [name]: value,
    });
  };

  const [name, setName] = useState("Welcome");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/signin", loginForm, {
        withCredentials: true,
      });
      navigate("/");
    } catch (error) {
      setName("Invalid Email or Password");
    }
  };

  return (
    <div>
      <h1>{name}</h1>
      <form onSubmit={handleLogin}>
        <input
          onChange={handleSetLoginForm}
          type="email"
          name="email"
          placeholder="Enter Your Email ID"
        />
        <input
          onChange={handleSetLoginForm}
          type="password"
          name="password"
          placeholder="Enter your Password"
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginForm;
