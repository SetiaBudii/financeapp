import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'; // Import useNavigate

const LoginForm = () => {
    const navigate = useNavigate(); // Use useNavigate
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(`http://localhost:5000/users/${formData.username}`, formData); // Replace with your API endpoint

      if (response.status === 200) {
        navigate('/Redirect'); // Navigate to home page
      } else {
        setError('Login failed. Please check your credentials.');
        console.error('Login failed:', response.data.message);
      }
      // You can perform actions like redirecting the user after successful login
    } catch (err) {
      setError('Login failed. Please check your credentials.'); // Handle errors
      console.error('Login failed:', err);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
