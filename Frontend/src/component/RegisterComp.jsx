import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';

const RegisterComp = () => {
    Cookies.remove('username');
    setPageAttributes();
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        username: '',
        password: '',
        repeatPassword: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Check if passwords match
        if (formData.password !== formData.repeatPassword) {
            Swal.fire({
              icon: 'error',
              title: 'Passwords Do Not Match!',
              text: 'Please make sure the passwords match.',
            });
            return;
          }

        try {
            const response = await axios.post('http://localhost:5005/users', formData, { validateStatus: false });
            if(response.status === 201){
                Swal.fire({
                    icon: 'success',
                    title: 'Registration Success!',
                    text: response.data.msg,
                  });
                  setDefaultPageAttributes();
                  navigate('/login');
            }else if(response.status === 400){
                Swal.fire({
                    icon: 'error',
                    title: 'Registration Failed!',
                    text: response.data.msg,
                    });
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Registration Failed!',
                    text: 'Please check your credentials.',
                    });
            }
            // Clear the form after successful registration
            setFormData({
                username: '',
                password: '',
                repeatPassword: '',
            });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div className="container">
                <div className="card o-hidden border-0 shadow-lg my-5">
                    <div className="card-body p-0">
                        <div className="row">
                            <div className="col-lg-5 d-none d-lg-block bg-register-image"></div>
                            <div className="col-lg-7">
                                <div className="p-5">
                                    <div className="text-center">
                                        <h1 className="h4 text-gray-900 mb-4 font-weight-bold">Register User</h1>
                                    </div>
                                    <form className="user" onSubmit={handleSubmit}>
                                        <div className="form-group row">
                                            <div className="col mb-3 mb-sm-0">
                                                <input type="text" className="form-control form-control-user" id="exampleFirstName"
                                                    placeholder="Username" name="username" value={formData.username} onChange={handleInputChange} required/>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <div className="col-sm-6 mb-3 mb-sm-0">
                                                <input type="password" className="form-control form-control-user"
                                                    id="exampleInputPassword" placeholder="Password" name="password" value={formData.password} onChange={handleInputChange} required/>
                                            </div>
                                            <div className="col-sm-6">
                                                <input type="password" className="form-control form-control-user"
                                                    id="exampleRepeatPassword" name="repeatPassword" placeholder="Repeat Password" value={formData.repeatPassword} onChange={handleInputChange} required/>
                                            </div>
                                        </div>
                                        <button type='submit' className="btn btn-primary btn-user btn-block">
                                            Register
                                        </button>
                                    </form>
                                    <hr />
                                    <div className="text-center">
                                    <Link className="small" to="/login">Have Account? Login!</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RegisterComp
