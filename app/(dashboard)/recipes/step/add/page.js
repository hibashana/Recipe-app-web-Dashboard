// import Head from 'next/head';
// import CreateStep from '../components/addStep';
// const AddStep = () => {
//   return (
//     <div>
//       <Head>
//         <title>Create Step</title>
//       </Head>
//       {/* <h1>Create Step</h1> */}
//       <CreateStep/>
//     </div>
//   );
// };

// export default AddStep;


'use client'

import React, { useState } from 'react';
import axios from 'axios'; // Import Axios
// import NavBar from '../NavBar';
import {baseURL,imageURL } from '../../../../utils/constants';
import { useRouter ,useSearchParams} from 'next/navigation';


import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const CreateStep = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

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
      const recipesId = searchParams.get('id');
  
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
          
          router.push(`/recipes/step?id=${recipesId}`);
        })
        .catch((error) => {
          console.error('Error creating Step:', error);
          toast.error('Failed to create Step');
        });
    };
  
    return (
      <div className="flex flex-col items-center ">
  <h1 className="text-xl font-bold mb-4">Add Step</h1>
  <form className="shadow-2xl bg-white p-8 rounded-md space-y-4" onSubmit={handleSubmit}>
    <div className="mb-4">
      <label>Description:</label>
      <input
        type="text"
        name="description"
        value={formData.description}
        onChange={handleChange}
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-sky-500"
        required
      />
    </div>
    <button className="block mx-auto bg-emerald-600 text-white px-4 py-2 rounded-md" type="submit">
      Create Step
    </button>
    <ToastContainer autoClose={3000} />
  </form>
  {/* <NavBar/> */}
</div>

    );
  };
  
  export default CreateStep;
  