
'use client';

import { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import { baseURL } from '../../utils/constants';
// import NavBar from '../NavBar';

const CreateApp = () => {
  const router = useRouter(); 

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    packageName: '',
    image: null, // Initialize image as null
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log(`image=${file}`);
    setFormData({ ...formData, image: file });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    const URL=`${baseURL}/app/create`;
    // console.log(token);

    // Send a POST request to your API to create the app using Axios
    axios
      .post(`${URL}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      })

   

      .then((response) => {
        // console.log(`res=${response.status}`);
        console.log('App created:', response.data);
       
        toast.success(`App  created.`);

        setTimeout(() => {
          window.location.reload();
        }, 3000); // Reload the page after 3 seconds
        // console.log('Successful login', data);
        // You can handle success or display a success message here

        router.push('/appList');
      })
      .catch((error) => {
        toast.error(`Failed to create app `);
        console.error('Error creating app:', error);
        // Handle the error and display an error message if needed
      });
  };

  return (
    <div className="grid place-items-center h-screen bg-gray-100 p-6">
    <div className="bg-white p-8 rounded-md shadow-md max-w-md">
      <h1 className="text-xl font-bold text-center mb-4">Add New App</h1>
      <form onSubmit={handleSubmit} method="POST" encType="multipart/form-data">
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border bg-zinc-100/40  border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Package Name:</label>
          <input
            type="text"
            name="packageName"
            value={formData.packageName}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Image:</label>
          <input
            type="file"
            accept=".png, .jpg, .jpeg"
            name="image"
            onChange={handleImageChange}
            required
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <button
          className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2 rounded-md hover:bg-green-700 transition-colors"
          type="submit"
        >
          Add App
        </button>
        <ToastContainer autoClose={3000} />
        {/* Add this line to display toasts */}
      </form>
    </div>
    {/* <NavBar/> */}
  </div>
  
  );
};

export default CreateApp;
