import React, { useState, useEffect } from "react";
import axios from "axios";

function RequireAuth(props) {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("/check-auth", {
          withCredentials: true,
        });
        if (res.status === 200) {
          setLoggedIn(true);
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
      }
    };

    checkAuth();
  }, []);

  if (!loggedIn) {
    return <h1>Not Authorized</h1>;
  }

  return <div>{props.children}</div>;
}

export default RequireAuth;
