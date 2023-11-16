
'use client';

import { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import { baseURL } from '../utils/constants';
import NavBar from '../NavBar';

const CreateBanner = () => {
  const router = useRouter(); 

  const [formData, setFormData] = useState({
    name: '',
    image: null,
    appID:localStorage.getItem('appId'),
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
    const appId = localStorage.getItem('appId');
   // setFormData({ ...formData, appID: appId });
    console.log(appId);
    const URL=`${baseURL}/banner/addbanner`;
    // console.log(token);

    axios
      .post(`${URL}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      })

   

      .then((response) => {
        // console.log(`res=${response.status}`);
        console.log('Banner created:', response.data);
       
        toast.success(`Banner created.`);

        setTimeout(() => {
          window.location.reload();
        }, 3000); // Reload the page after 3 seconds

        router.push('/banner');
      })
      .catch((error) => {
        toast.error(`Failed to create banner `);
        console.error('Error creating banner:', error);
        // Handle the error and display an error message if needed
      });
  };

  return (
    <div className="grid place-items-center h-screen bg-gray-100 ">
    <div>
      <h1 className="text-xl font-bold text-center">Add New Banner</h1>
      <form onSubmit={handleSubmit} method="POST" encType="multipart/form-data"  className="shadow-2xl bg-white rounded-md p-8">
        <div className="mb-4">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-green-600"
            required
          />
        </div>
        <div className="mb-4">
          <label>Image:</label>
          <input
            type="file"
            accept=".png, .jpg, .jpeg"
            name="image"
            onChange={handleImageChange}
            className="w-full flex px-4 py-2 mt-2 border rounded-md"
            required
          />
        </div>
        <button className="bg-emerald-600 hover:bg-emerald-700 block mx-auto text-white font-bold px-6 py-2 rounded-md" type="submit">
          Add Banner
        </button>
        <ToastContainer autoClose={3000} />
        <NavBar/>
      </form>
    </div>
    
  </div>
  
  );
};

export default CreateBanner;
