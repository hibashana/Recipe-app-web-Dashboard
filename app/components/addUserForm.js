
'use client';

import { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import { baseURL } from '../utils/constants';
import NavBar from '../NavBar';
import { RiEyeCloseFill, RiEyeFill, RiLockPasswordLine } from 'react-icons/ri';
import { FaEyeSlash } from 'react-icons/fa';



const CreateUser = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showconfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    rusername: '',
    rpassword: '',
    confirmPassword: ''

  });



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showconfirmPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();


    const token = localStorage.getItem('token');
    const URL = `${baseURL}/user/register`;
    // console.log(token);

    if (formData.rpassword !== formData.confirmPassword) {
      setErrorMessage("Password and Confirm Password don't match.");
      return;
    }

    axios
      .post(`${URL}`, {
        name: formData.name,
        email: formData.email,
        contact:formData.contact,
        username: formData.rusername,
        password: formData.rpassword,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      })



      .then((response) => {
        // console.log(`res=${response.status}`);
        console.log('User created:', response.data);

        toast.success(`User created.`);

        setTimeout(() => {
          window.location.reload();
        }, 3000); // Reload the page after 3 seconds
        // console.log('Successful login', data);
        // You can handle success or display a success message here

        router.push('/user');
      })
      .catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error('Response error data:', error.response.data);
          setErrorMessage(error.response.data.error || 'An error occurred.');
        } else if (error.request) {
          // The request was made but no response was received
          console.error('Request error:', error.request);
          setErrorMessage('Failed to create user. Please try again later.');
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error('Other error:', error.message);
          setErrorMessage('An unexpected error occurred. Please try again later.');
        }
      });
    // toast.error(`Failed to create user `);
    // console.error('Error creating user:', error);
    // Handle the error and display an error message if needed
    // });
  };

  return (
    <div className="grid place-items-center h-screen bg-gray-100 m-6">
      <div className="bg-white p-8 rounded-md shadow-2xl max-w-md">

        <h1 className="text-2xl font-bold mb-2 text-center">Register</h1>
        <form onSubmit={handleSubmit} method="POST">
          <div className="mb-2">
            <label>Name:</label>
            <input
              className="w-full border border-gray-300 rounded-md p-2"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-2">
            <label>Email:</label>
            <input
              className="w-full border border-gray-300  rounded-md p-2"
              name="email"
              type="email" 
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-2">
            <label>Contact:</label>
            <input
              className="w-full border border-gray-300 rounded-md p-2"
              type="number"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-2">
            <label>Username:</label>
            <input
              className="w-full border border-gray-300 rounded-md p-2"
              type="text"
              name="rusername"
              value={formData.rusername}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4 relative">
            <label>Password:</label>
            <input
              type={showPassword ? 'text' : 'password'}
              className="w-full border border-gray-300 rounded-md p-2 "
              // type="password"
              name="rpassword"
              value={formData.rpassword}
              onChange={handleChange}
              required
            />
            <label className="absolute cursor-pointer flex items-center"
              style={{ color: '#9CA3AF', right: '8px', top: '50%' }}>
              {showPassword ? (
                <RiEyeFill onClick={togglePasswordVisibility} />
              ) : (
                <FaEyeSlash onClick={togglePasswordVisibility} />
              )}
            </label>
          </div>
          <div className="mb-4 relative">
            <label>Confirm Password:</label>
            <input
              className="w-full border border-gray-300 rounded-md p-2"
              type={showconfirmPassword ? 'text' : 'password'}
              // type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <label className="absolute cursor-pointer flex items-center"
              style={{ color: '#9CA3AF', right: '8px', top: '50%' }}>
              {showconfirmPassword ? (
                <RiEyeFill onClick={toggleConfirmPasswordVisibility} />
              ) : (
                <FaEyeSlash onClick={toggleConfirmPasswordVisibility} />
              )}
            </label>
          </div>
          <button
            className=" block mx-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-md py-2 px-4"
            type="submit"
          >
            Register User
          </button>
          <ToastContainer autoClose={3000} /> {/* Add this line to display toasts */}
        </form>
        {errorMessage && (
          <div className="text-red-600 text-center m-2">
            {/* bg-red-500 text-white m-1 rounded-md */}
            {errorMessage}
          </div>
        )}
      </div>
      <NavBar />
    </div>

  );
};

export default CreateUser;
