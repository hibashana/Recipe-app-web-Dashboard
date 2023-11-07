

'use client'

import React, { useState } from 'react';
import axios from 'axios'; // Import Axios
import NavBar from '../NavBar';
import {baseURL,imageURL } from '../utils/constants';
import { useRouter } from 'next/navigation';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const CreateStep = () => {
    const router = useRouter();
  
    const [formData, setFormData] = useState({
      description: '', 
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
  
      setFormData({
        ...formData,
        [name]: value,
      });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      const token = localStorage.getItem('token');
      const recipesId = localStorage.getItem('recipesId');
  
      axios
        .post(
          `${baseURL}/steps/add`,
          {
            description: formData.description,
            RecipeID: recipesId,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          console.log('Step created:', response.data);
          toast.success('Step added successfully');
          setTimeout(() => {
            window.location.reload();
          }, 4000);
          router.push('/step');
        })
        .catch((error) => {
          console.error('Error creating Step:', error);
          toast.error('Failed to create Step');
        });
    };
  
    return (
      <form className='absolute right-20 top-20 shadow-2xl bg-sky-200' onSubmit={handleSubmit}>
        <div>
          <label>Description :</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <button className='bg-sky-700' type="submit">Create Step</button>
        <ToastContainer autoClose={3000} />
      </form>
    );
  };
  
  export default CreateStep;
  