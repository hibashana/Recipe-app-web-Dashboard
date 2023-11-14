
'use client';

import { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import { baseURL } from '../utils/constants';
import NavBar from '../NavBar';

const CreateUser= () => {
  const router = useRouter(); 

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    username: '',
    password: '',
    // Add error state for validation messages
    emailError: '',
    contactError: '',
    passwordError: '',
  });

  const validateForm = () => {
    const isValid = true;

    // Email validation
    if (!formData.email) {
      setFormData((prevData) => ({ ...prevData, emailError: 'Email is required' }));
      return false;
    } else {
      setFormData((prevData) => ({ ...prevData, emailError: '' }));
    }

    // Contact validation
    if (!formData.contact) {
      setFormData((prevData) => ({ ...prevData, contactError: 'Contact is required' }));
      return false;
    } else {
      setFormData((prevData) => ({ ...prevData, contactError: '' }));
    }

    // Password validation
    if (!formData.password) {
      setFormData((prevData) => ({ ...prevData, passwordError: 'Password is required' }));
      return false;
    } else {
      setFormData((prevData) => ({ ...prevData, passwordError: '' }));
    }

    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // Do not proceed with the submission if the form is not valid
    }

    const token = localStorage.getItem('token');
    const URL=`${baseURL}/user/register`;
    // console.log(token);

    
    axios
      .post(`${URL}`, formData, {
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
        toast.error(`Failed to create user `);
        console.error('Error creating user:', error);
        // Handle the error and display an error message if needed
      });
  };

  return (
    <div className="grid place-items-center h-screen bg-gray-100 m-6">
  <div className="bg-white p-8 rounded-md shadow-2xl max-w-md">
    <h1 className="text-2xl font-bold mb-2 text-center">Add New App</h1>
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
          value={formData.email}
          onChange={handleChange}
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
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-4">
        <label>Password:</label>
        <input
          className="w-full border border-gray-300 rounded-md p-2"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      <button
        className="w-full bg-green-600 text-white font-bold rounded-md py-2"
        type="submit"
      >
        Register User
      </button>
      <ToastContainer autoClose={3000} /> {/* Add this line to display toasts */}
    </form>
  </div>
  <NavBar/>
</div>

  );
};

export default CreateUser;
