
'use client';
import { useState } from 'react';
import axios from 'axios';


const CreateApp = () => {
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
    // console.log(token);

    // Send a POST request to your API to create the app using Axios
    axios
      .post('http://localhost:3002/api/v1/app/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log('App created:', response.data);
        // You can handle success or display a success message here
      })
      .catch((error) => {
        console.error('Error creating app:', error);
        // Handle the error and display an error message if needed
      });
  };

  return (
    <div className="grid place-items-center h-screen">
      <div>
        <h1 className="text-xl font-bold my-4 text-center">Add New App</h1>
        <form onSubmit={handleSubmit}  method="POST" encType="multipart/form-data" >
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
            <label>Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
             
            />
          </div>
          <div>
            <label>Package Name:</label>
            <input
              type="text"
              name="packageName"
              value={formData.packageName}
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
            className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2"
            type="submit"
          >
            Add App
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateApp;
