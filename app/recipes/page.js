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
  const [token, setToken] = useState('');
  // const [categories, setCategories] = useState([]); 

  useEffect(() => {
    fetchData();
    const tokenFromStorage = localStorage.getItem('token');
    setToken(tokenFromStorage);
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

  // const fetchCategories = async () => {
  //   try {
      
  //     const response = await fetch(`${baseURL}/category/getall`, { cache: 'no-store' });
  //     const data = await response.json();
  //     setCategories(data);
  //   } catch (error) {
  //     console.error('Error fetching categories:', error);
  //   }
  // };

  const handleRecipesClick = (rcpid) => {
    localStorage.setItem('recipesId', rcpid);
    console.log(rcpid);
  };

  // const handleCategoryChange = (e) => {
  //   const selectedValue = e.target.value;
  //   setSelectedCategory(selectedValue);
  //   localStorage.setItem('CategoryId', selectedValue);
  //   console.log(selectedValue);
    
  // };

  const deleteRecipes = async (rcpid, name) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete the recipe "${name}"?`);
    if (confirmDelete) {
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
      {!token ? (
        <div className='m-7'>
        <p className='text-2xl'>You are not logged in. Please log in.</p>
        <button className="block mx-auto bg-emerald-600 text-white px-4 py-2 rounded-md m-3" type="submit" onClick={() => router.push('http://localhost:3000/')}>
          Go to Login
        </button>
      </div>
    ) : (
      <>  
      <Link href="/addRecipes" className="bg-emerald-600 hover:bg-green-700 text-white p-2 rounded-lg  first-letter:transition-colors absolute top-4 right-40">
        Add new
      </Link>
      <div className="max-w-screen-md m-10">
      
      
        <table className="w-full table-fixed border p-2">
          <thead>
            <tr className="border p-2">
              <th>Image</th>
              <th>Name</th>
              <th>Description</th>
              {/* <th>Premium</th> */}
              <th>Action</th>
              <th></th>
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
                {/* <td className="border p-2" onClick={() => handleRecipesClick(data.rcpid)}> */}
                <td className="border p-2">
                  {data.name}
                </td>
                <td className="border p-2" >
                  {data.description}
                </td>
                {/* <td className="border  ">
                 
                </td> */}
                <td colSpan={3} className="flex flex-row items-center justify-center gap-4 p-6 ">
                <input className=''
                    type="checkbox"
                    checked={data.premium}
                    onChange={() => handlePremiumChange(data.rcpid, data.premium)}
                  />
                  <div className="hover:text-red-700 cursor-pointer " onClick={() => deleteRecipes(data.rcpid, data.name)}>
                    <AiFillDelete />
                  </div>
                  <div className="hover:text-sky-500">
                    <Link className="transition-colors p-3 " href={`/editRecipe/${data.rcpid}`}>
                      <AiTwotoneEdit />
                    </Link>
                    
                  </div>
                  
                  </td>
                  <td></td>
                  
                  <td className="flex justify-center flex-row gap-14 " colSpan={3} onClick={() => handleRecipesClick(data.rcpid)}  >
              <div className=" hover:text-sky-500 ">
              <Link href={`/ingredients`}>Ingredients</Link>
              </div>
               <div className=" hover:text-sky-500  ">
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
      </>
      )}
    </div>
  );
};

export default Recipes;
