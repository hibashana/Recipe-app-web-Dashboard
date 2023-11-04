
'use client';

import { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import { baseURL } from '../utils/constants';

const CreateUser= () => {
  const router = useRouter(); 

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    username: '',
    password: '',
   
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

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
    <div className="grid place-items-center h-screen">
      <div>
        <h1 className="text-xl font-bold  text-center">Add New App</h1>
        <form onSubmit={handleSubmit}  method="POST"  >
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Email:</label>
            <textarea
              name="email"
              value={formData.email}
              onChange={handleChange}
             
            />
          </div>
          <div>
            <label>Contact:</label>
            <input
              type="number"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              required
            />
          </div>
          <div>
          <label>Username:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div>
          <label>Password:</label>
            <input
              type="text"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button
            className="bg-green-600 text-white font-bold  cursor-pointer px-6 py-2"
            type="submit"
          >
            Register User
          </button>
          <ToastContainer autoClose={3000} /> {/* Add this line to display toasts */}
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
