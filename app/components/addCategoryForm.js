'use client'
import React, { useState } from 'react';
import axios from 'axios'; // Import Axios
import NavBar from '../NavBar';
import {baseURL,imageURL } from '../utils/constants';

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
     const appId = localStorage.getItem('appId');
    // console.log(appId);

    // Send a POST request to your API to create the agent using Axios
    axios.post(`${baseURL}/category/addcategory`, {
      name:formData.name,
      appID:appId
    }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          // 'app-id': appId,

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