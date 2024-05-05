import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignUpForm() {
  const navigate = useNavigate();
  const [signUpForm, setSignUpForm] = useState({
    email: "",
    password: "",
  });

  const handleSetSignUpForm = (e) => {
    const { name, value } = e.target;
    setSignUpForm({
      ...signUpForm,
      [name]: value,
    });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/signup", signUpForm, {
        withCredentials: true,
      });
      navigate("/login");
    } catch (error) {
      console.error("Email already exists", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSignUp}>
        <input
          onChange={handleSetSignUpForm}
          type="text"
          name="email"
          placeholder="Enter Your Email ID"
        />
        <input
          onChange={handleSetSignUpForm}
          type="password"
          name="password"
          placeholder="Enter your Password"
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUpForm;
