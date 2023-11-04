
'use client';

import { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import { baseURL } from '../utils/constants';

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
    <div className="grid place-items-center h-screen">
      <div>
        <h1 className="text-xl font-bold text-center">Add New Banner</h1>
        <form onSubmit={handleSubmit} method="POST" encType="multipart/form-data">
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
            <label>Image:</label>
            <input
              type="file"
              accept=".png, .jpg, .jpeg"
              name="image"
              onChange={handleImageChange}
              required
            />
          </div>
          <button
            className="bg-green-600 text-white font-bold  cursor-pointer px-6 py-2"
            type="submit"
          >
            Add Banner
          </button>
          <ToastContainer autoClose={3000} /> {/* Add this line to display toasts */}
        </form>
      </div>
    </div>
  );
};

export default CreateBanner;
