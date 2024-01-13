import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';


const LoginForm = () => {
  setPageAttributes();

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
      const response = await axios.post(`http://localhost:5005/users/login`, formData, { validateStatus: false }); // Replace with your API endpoint
      if (response.status === 200) {
        setDefaultPageAttributes();
        Cookies.set('username', response.data.username, { expires: 1 }); // Save username to cookie with expiry of 1 day
        navigate('/home'); // Navigate to home page
      } else if (response.status === 400) {
        Swal.fire({
          icon: 'error',
          title: 'Login Failed!',
          text: response.data.error,
        });
      } else if (response.status === 404) {
        Swal.fire({
          icon: 'error',
          title: 'Login Failed!',
          text: response.data.error,
        });
      }
      // You can perform actions like redirecting the user after successful login
    } catch (err) {
      setError('Login failed. Please check your credentials.'); // Handle errors
      console.error('Login failed:', err);
    }
  };

  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-10 col-lg-12 col-md-9">
            <div className="card o-hidden border-0 shadow-lg my-5">
              <div className="card-body p-0">
                <div className="row">
                  <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                  <div className="col-lg-6">
                    <div className="p-5">
                      <div className="text-center">
                        <h1 className="h4 text-gray-900 mb-4 font-weight-bold">Login Page</h1>
                      </div>
                      <form className="user" onSubmit={handleSubmit}>
                        <div className="form-group">
                          <input type="text" className="form-control form-control-user" name="username" id="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                          <input type="password" className="form-control form-control-user" id="password" name="password" value={formData.password} onChange={handleChange} required placeholder="Password" />
                        </div>
                        <button type='submit' className="btn btn-primary btn-user btn-block">
                          Login
                        </button>
                      </form>
                      <hr />
                      <div className="text-center">
                        <Link className="small" to="/register">Klik disini untuk registrasi!</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </>
  );
};

export default LoginForm;
