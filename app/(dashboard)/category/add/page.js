
// import Head from 'next/head';
// import CreateCategory from '../components/addCategoryForm';

// const AddCategory = () => {
//   return (
//     <div>
//       <Head>
//         <title>Create category</title>
//       </Head>
//       {/* <h1>Create Category</h1> */}
//       <CreateCategory />
//     </div>
//   );
// };

// export default AddCategory;

'use client'

import React, { useState } from 'react';
import axios from 'axios'; // Import Axios
// import NavBar from '../NavBar';
import {baseURL,imageURL } from '../../../utils/constants';
import { useRouter } from 'next/navigation';

import { Toaster, toast } from 'sonner'

// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

const CreateCategory = () => {
  const router = useRouter(); 
  const [errorMessage, setErrorMessage] = useState('');

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
        toast.success('Category added successfully');
        
         router.push('/category');
      })
      .catch((error) => {
        if (error.response) {
         
          console.error('Response error data:', error.response.data);
          setErrorMessage(error.response.data.message || 'An error occurred.');
          toast.error(`Failed to create category `);
        } else if (error.request) {
         
          console.error('Request error:', error.request);
          setErrorMessage('Failed to create user. Please try again later.');
          
        } else {
         
          console.error('Other error:', error.message);
          setErrorMessage('An unexpected error occurred. Please try again later.');
          
        }
      });
  };

  return (
<div className="flex flex-col items-center p-20 mx-auto">
      <form
        className="shadow-2xl bg-white p-8 rounded-md"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label className="text-gray-800">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-gray-400"
            required
          />
        </div>
        <button className="block mx-auto bg-emerald-600  text-white px-4 py-2 rounded-md" type="submit">
          Create category
        </button>
        {errorMessage && (
          <div className="text-red-600 text-center m-2">
            {/* bg-red-500 text-white m-1 rounded-md */}
            {errorMessage}
          </div>
        )}
        <Toaster richColors  />
      </form>
      
      {/* <ToastContainer autoClose={3000} /> */}
      {/* <NavBar /> */}
    </div>
  );
 
};

export default CreateCategory;  