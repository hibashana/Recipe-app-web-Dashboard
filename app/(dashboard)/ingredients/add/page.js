
// import Head from 'next/head';
// import CreateIngredient from '../components/addIngredientForm';

// const AddIngredients = () => {
//   return (
//     <div>
//       <Head>
//         <title>Create Ingredient</title>
//       </Head>
//       {/* <h1>Create Ingredient</h1> */}
//       <CreateIngredient />
//     </div>
//   );
// };

// export default AddIngredients;



'use client'

import React, { useState } from 'react';
import axios from 'axios'; // Import Axios
// import NavBar from '../NavBar';
import {baseURL,imageURL } from '../../../utils/constants';
import { useRouter,useSearchParams} from 'next/navigation';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const CreateIngredient = () => {
    const router = useRouter();
  
  const searchParams = useSearchParams();
  // const recipesId = searchParams.get('id');

    const [formData, setFormData] = useState({
      name_qnty: '', 
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
          `${baseURL}/ingredients/add`,
          {
            name_qnty: formData.name_qnty,
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
          console.log('Ingredient created:', response.data);
          toast.success('Ingredient added successfully');
          setTimeout(() => {
            window.location.reload();
          }, 4000);
          console.log(recipesId);
          router.push(`/ingredients?id=${recipesId}`);
        })
        .catch((error) => {
          console.error('Error creating Ingredient:', error);
          toast.error('Failed to create ingredient');
        });
    };
  
    return (
      // <div className="absolute top-20 right-20 shadow-2xl bg-sky-200 p-8 ">
        <div className="flex flex-col items-center mx-auto">
  <h1 className="text-xl font-bold mb-4">Create Ingredient</h1>
  <form onSubmit={handleSubmit} className="space-y-4 shadow-2xl bg-white p-8 rounded-md">
    <div className="mb-4">
      <label>Name and Quality:</label>
      <input
        type="text"
        name="name_qnty"
        value={formData.name_qnty}
        onChange={handleChange}
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-sky-500"
        required
      />
    </div>
    <button className=" block mx-auto bg-emerald-600 text-white px-4 py-2 rounded-md" type="submit">
      Create Ingredient
    </button>
    <ToastContainer autoClose={3000} />
  </form>
  {/* <NavBar/> */}
</div>

    );
  };
  
  export default CreateIngredient;
  