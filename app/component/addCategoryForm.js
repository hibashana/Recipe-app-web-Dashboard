'use client'
import React, { useState } from 'react';
import axios from 'axios'; // Import Axios

const CreateCategory = () => {
  const [formData, setFormData] = useState({
    name: '',

  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');

    // Send a POST request to your API to create the agent using Axios
    axios.post('http://localhost:3002/api/v1/category/addcategory', formData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,

        },
        
      })
      .then((response) => {
        console.log('Category created:', response.data);
        // You can handle success or display a success message here
      })
      .catch((error) => {
        console.error('Error creating category:', error);
        // Handle the error and display an error message if needed
      });
  };

  return (
    <form className='absolute right-20 top-20 shadow-2xl bg-sky-200' onSubmit={handleSubmit} >
      <div>
        <label>name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <button className='bg-sky-700' type="submit">Create category</button>
      
    </form>
  );
};

export default CreateCategory;