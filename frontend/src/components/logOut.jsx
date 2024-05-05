import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LogOut() {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      try {
        await axios.get("/signout", {
          withCredentials: true,
        });
        navigate("/");
      } catch (error) {
        console.error("Error logging out:", error);
      }
    };

    logout();
  }, [navigate]);

  return <h1>Logging out...</h1>;
}

export default LogOut;
