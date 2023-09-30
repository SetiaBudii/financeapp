import React, { useEffect, useState } from 'react';

function Welcome() {
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Retrieve the username from the cookie
    const cookieUsername = getCookie('username');
    if (cookieUsername) {
      setUsername(cookieUsername);
    }
  }, []);

  // Helper function to get a cookie value by its name
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return '';
  }

  return (
    <div>
      <p>Welcome, {username}!</p>
    </div>
  );
}

export default Welcome;
