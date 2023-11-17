import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

function Welcome() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUsername = Cookies.get("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  return (
    <div style={{ marginLeft: "10px" }}>
      <p>Welcome, {username}!</p>
    </div>
  );
}

export default Welcome;
