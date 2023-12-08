// import Head from 'next/head';
// import CreateRecipe from '../components/addRecipeForm';
// const AddRecipes = () => {
//   return (
//     <div>
//       <Head>
//         <title>Create Recipes</title>
//       </Head>
//       {/* <h1>Create Recipes</h1> */}
//       <CreateRecipe/>
//     </div>
//   );
// };

// export default AddRecipes;


'use client';

import { useState,useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import { baseURL } from '../../../utils/constants';
// import NavBar from '../NavBar';

const CreateRecipe = () => {
  const router = useRouter(); 
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]); 
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const appId = localStorage.getItem("appId");
      console.log(appId);
      const response = await fetch(`${baseURL}/category/getall/${appId}`, { cache: 'no-store' });
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: null, 
    appID:localStorage.getItem('appId'),
    CategoryID:'',
    // localStorage.getItem('CategoryId')
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

  const handleCategoryChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedCategory(selectedValue);
    // localStorage.setItem('CategoryId', selectedValue);
    console.log(selectedValue);
    setFormData({ ...formData, CategoryID: selectedValue });
    
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    console.log(token);
    const appId = localStorage.getItem('appId');
    console.log(appId);
    // const CategoryId=localStorage.getItem('CategoryId');
    // console.log(CategoryId);
    

    const URL=`${baseURL}/recipes/addrecipe`;
    // console.log(token);

    // Send a POST request to your API to create the app using Axios
    axios .post(`${URL}`, formData,{
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      })

   

      .then((response) => {
        // console.log(`res=${response.status}`);
        console.log('Recipe created:', response.data);
       
        toast.success(`Recipe  created.`);

       
        // console.log('Successful login', data);
        // You can handle success or display a success message here

        router.push('/recipes');
      })
      .catch((error) => {
        if (error.response) {
          console.error('Response error data:', error.response.data);
          setErrorMessage(error.response.data.message || 'An error occurred.');
        } else if (error.request) {
          // The request was made but no response was received
          console.error('Request error:', error.request);
          setErrorMessage('Failed to create user. Please try again later.');
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error('Other error:', error.message);
          setErrorMessage('An unexpected error occurred. Please try again later.');
        }
      });
      // .catch((error) => {
      //   toast.error(`Failed to create recipe `);
      //   console.error('Error creating recipe:', error);
      //   // Handle the error and display an error message if needed
      // });
  };

  return (
    <div className="grid place-items-center h-screen m-7">
  <div className="shadow-2xl max-w-md w-full p-6 bg-white rounded-lg border-slate-950">
    <h1 className="text-2xl font-bold text-center mb-4">Add New Recipe</h1>
    <form onSubmit={handleSubmit} encType="multipart/form-data" className=" space-y-4">
      <div>
        <label className="block">Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-gray-300"
        />
      </div>
      <div>
        <label className="block">Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full px-4 py-2 border bg-zinc-100/40 rounded-md focus:outline-none focus:border-gray-300"
        />
      </div>
      <div>
        <label className="block">Image:</label>
        <input
          type="file"
          accept=".png, .jpg, .jpeg"
          name="image"
          onChange={handleImageChange}
          required
          className="w-full"
        />
      </div>
      {/* <div className="w-full">
        <label className="block">Select a Category:</label>
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="w-full px-4 py-2 border rounded-md bg-zinc-100/40 focus:outline-none focus:border-gray-300"
          required
          >
          <option value="">Select Categories</option>
          {categories.map((category) => (
            <option key={category.ctgyid} value={category.ctgyid}>
              {category.name }
            </option>
          ))}
        </select>
      </div> */}
      <button
        className=" block mx-auto  bg-emerald-600 text-white font-bold cursor-pointer px-6 py-2 rounded-md"
        type="submit"
      >
        Add Recipe
      </button>
      <ToastContainer autoClose={3000} />
      {errorMessage && (
          <div className="text-red-600 text-center m-2">
            {/* bg-red-500 text-white m-1 rounded-md */}
            {errorMessage}
          </div>
        )}
    </form>
    
  </div>
  {/* <NavBar/> */}
</div>

  );
};

export default CreateRecipe;
