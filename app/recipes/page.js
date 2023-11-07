'use client';

import React, { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import { AiFillDelete } from 'react-icons/ai';
import { AiTwotoneEdit } from 'react-icons/ai';
import axios from 'axios';
import Link from 'next/link';
import NavBar from '../NavBar';
import { baseURL, imageURL } from '../utils/constants';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Recipes = () => {
  const [recipesData, setRecipesData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]); // State to store categories

  useEffect(() => {
    fetchData();
    fetchCategories();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`${baseURL}/recipes/getall`, { cache: 'no-store' });
      const data = await response.json();
      setRecipesData(data);
      localStorage.setItem('dataId', data.rcpid);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      
      const response = await fetch(`${baseURL}/category/getall`, { cache: 'no-store' });
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleRecipesClick = (rcpid) => {
    localStorage.setItem('recipesId', rcpid);
  };

  const handleCategoryChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedCategory(selectedValue);
    localStorage.setItem('CategoryId', selectedValue);
    console.log(selectedValue);
    // Additional logic to filter and fetch recipes based on the selected category can be added here.
  };

  const deleteRecipes = async (rcpid, name) => {
    try {
      const token = localStorage.getItem('token');
      const URL = `${baseURL}/recipes/${rcpid}`;
      const response = await axios.delete(`${URL}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        toast.success(`Recipes ${name} has been deleted.`);
        console.log(`Recipes ${name} has been deleted.`);
        setTimeout(() => {
          window.location.reload();
        }, 3000); // Reload the page after 3 seconds
      } else {
        // Handle any errors that occur during the API call.
        toast.error(`Failed to delete Recipes ${name}`);
        console.error(`Failed to delete Recipes ${name}`);
      }
    } catch (error) {
      // Handle network errors or other exceptions.
      toast.error(`An error occurred: ${error.message}`);
      console.error(`An error occurred: ${error.message}`);
    }
  };

  const handlePremiumChange = async (rcpid, isPremium) => {
    try {
      const token = localStorage.getItem('token');
      const URL = `${baseURL}/recipes/change_premium_status/?id=${rcpid}`;
      const response = await axios.get(
        URL,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        toast.success(`Premium status updated for Recipe ${rcpid}`);
        fetchData(); // Refresh the data after the update
      } else {
        toast.error(`Failed to update Premium status for Recipe ${rcpid}`);
        console.error(`Failed to update Premium status for Recipe ${rcpid}`);
      }
    } catch (error) {
      toast.error(`An error occurred: ${error.message}`);
      console.error(`An error occurred: ${error.message}`);
    }
  };


  return (
    <div className="flex flex-col items-center">
      <div className='p-4 right-40"'>
        <label>Select a Category: </label>
        <select value={selectedCategory} onChange={handleCategoryChange}>
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category.ctgyid} value={category.ctgyid}>
            {category.name}
          </option>
          ))}
        </select>
      </div>
      <Link href="/addRecipes" className="bg-sky-600 text-black p-2 rounded-lg hover:text-white transition-colors absolute top-4 right-40">
        Add new
      </Link>
      <div className="max-w-screen-md m-10">
      
      
        <table className="w-full table-fixed border p-2">
          <thead>
            <tr className="border p-2">
              <th>Image</th>
              <th>Name</th>
              <th>Description</th>
              <th>Premium</th>
              <th>Action</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody className="border p-2">
            {recipesData.map((data) => (
              <tr className="border p-2" key={data.rcpid}>
                <td className="border p-2">
                  <img src={`${imageURL}${data.image}`} width="100" height="100" />
                </td>
                <td className="border p-2" onClick={() => handleRecipesClick(data.rcpid)}>
                  {data.name}
                </td>
                <td className="border p-2" >
                  {data.description}
                </td>
                <td className="border ">
                  <input
                    type="checkbox"
                    checked={data.premium}
                    onChange={() => handlePremiumChange(data.rcpid, data.premium)}
                  />
                </td>
                <td colSpan={2} className="flex items-center justify-center gap-4 p-6 border">
                  <div className="hover:text-red-700" onClick={() => deleteRecipes(data.rcpid, data.name)}>
                    <AiFillDelete />
                  </div>
                  <div className="hover:text-sky-500">
                    <Link className="transition-colors p-2" href={`/editRecipe/${data.rcpid}`}>
                      <AiTwotoneEdit />
                    </Link>
                  </div>
                  </td>
                  <td onClick={() => handleRecipesClick(data.rcpid)}>
                  <div className="colSpan={2} flex items-center justify-center  hover:text-sky-500" >
                    <Link href={`/ingredients`}>Ingredients</Link>
                  </div>
                  
                  <div className="hover:text-sky-500">
                    <Link href={`/step`}>Steps</Link>
                  </div>
                  </td>
              </tr>
            ))}
          </tbody>
        </table>
  
      </div>
      
      <NavBar />
      <ToastContainer autoClose={3000} />
    </div>
  );
};

export default Recipes;
