'use client';

import React, { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import { AiFillDelete,AiTwotoneEdit} from 'react-icons/ai';
import { HiPlus } from "react-icons/hi";
import axios from 'axios';
import Link from 'next/link';
// import NavBar from '../NavBar';
import { baseURL, imageURL } from '../../utils/constants';
import { MdFilterListAlt } from "react-icons/md";
import tablesize from "../../tablestyle.css";

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Recipes = () => {
  const [recipesData, setRecipesData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [dataResponse, setDataResponse] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [token, setToken] = useState('');
  const [selectedFilter, setSelectedFilter] = useState("all");
 

  // const [categories, setCategories] = useState([]); 

  useEffect(() => {
    fetchData();
    const tokenFromStorage = localStorage.getItem('token');
    setToken(tokenFromStorage);
  }, [currentPage]);

  const fetchData = async () => {
    try {
      const appId = localStorage.getItem('appId');
      console.log(appId);
      

      const url =
  selectedFilter === 'premium'
    ? `${baseURL}/recipes/all_by_filter?appID=${appId}&page=${currentPage}&premium=true`
    : selectedFilter === 'nonPremium'
    ? `${baseURL}/recipes/all_by_filter?appID=${appId}&page=${currentPage}&premium=false`
    : selectedFilter === 'all'
    ?`${baseURL}/recipes/all_by_filter?appID=${appId}&page=${currentPage}`
    // : selectedFilter === 'latest'
    // ?`${baseURL}/recipes/all_by_filter?appID=${appId}&sortBy=createdAt&page=${currentPage}`
    : `${baseURL}/recipes/all_by_filter?appID=${appId}&sortBy=name&page=${currentPage}`;

      // selectedFilter === 'premium'
      //   ? `${baseURL}/recipes/all_by_filter?appID=${appId}&page=${currentPage}&premium=true`
      //   : `${baseURL}/recipes/all_by_filter?appID=${appId}&page=${currentPage}`;

    const response = await fetch(url, { cache: 'no-store' },

      // const response = await fetch(`${baseURL}/recipes/all_by_filter?appID=${appId}&page=${currentPage}&limit=2`, { cache: 'no-store' },
      {
        params: { page: currentPage, filter: selectedFilter },
      }
      );
    
      const data = await response.json();
      console.log(response);
      setRecipesData(data.data);
      setDataResponse(data);
      localStorage.setItem('dataId', data.rcpid);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const applyFilter = () => {
    setCurrentPage(1); // Reset to the first page when applying a new filter
    fetchData();
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

  const handlePremiumChange = async (rcpid,name,isPremium) => {
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
        toast.success(`Premium status updated for Recipe ${name}`);
        fetchData(); // Refresh the data after the update
      } else {
        toast.error(`Failed to update Premium status for Recipe ${name}`);
        console.error(`Failed to update Premium status for Recipe ${name}`);
      }
    } catch (error) {
      toast.error(`An error occurred: ${error.message}`);
      console.error(`An error occurred: ${error.message}`);
    }
  };

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };


  return (
    <div className="flex flex-col">
      {!token ? (
        <div className='m-7'>
        <p className='text-2xl'>You are not logged in. Please log in.</p>
        <button className="block mx-auto bg-emerald-600 text-white px-4 py-2 rounded-md m-3" type="submit" onClick={() => router.push('/')}>
          Go to Login
        </button>
      </div>
    ) : (
      <>  
      <div className="rounded overflow-hidden m-4">
            <div className="fixed bottom-7 right-10">
              <Link href="/addRecipes">
                <button className="bg-emerald-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full ">
                  <HiPlus className="text-2xl" />
                </button>
              </Link>
            </div>
          </div>
          <div className='flex p-2 justify-between'>
  <div className="flex items-center">
    {/* <Link href="/addRecipes" className="bg-emerald-600 hover:bg-green-700 text-white p-2 rounded-lg  first-letter:transition-colors absolute top-4 right-40">
      Add new
    </Link> */}
    <select
      value={selectedFilter}
      onChange={(e) => setSelectedFilter(e.target.value)}
      className="p-2 border rounded-md"
    >
      {/* <option></option> */}
      <option value="all">All Recipes</option>
      <option value="premium">Premium Recipes</option>
      <option value="nonPremium">Free Recipes</option>
      {/* <option value="latest">Latest</option> */}
      <option value="sortbyname">Sort by Name</option>

    </select>
    <button
      onClick={applyFilter}
      className="ml-2 p-2 bg-emerald-600 text-white rounded-md flex items-center"
    >
      <MdFilterListAlt className="mr-2"  />Filter 
    </button>
  </div>
  <h1 className="text-xl p-2 font-bold">
    {dataResponse.totalCount} Recipes
  </h1>
</div>

      
      <div className={tablesize.fullWidthTable}>
      
      <table className="w-full table-fixed border p-2 ">
      <thead>
            <tr className="border p-2 bg-emerald-600 text-white">
              <th className="border w-1/6">Image</th>
              <th className="border w-1/6">Name</th>
              <th className="border w-3/6">Description</th>
              <th className="border w-1/6">Premium</th>
              <th className="border w-1/6">Action</th>
              <th className="w-1/6"></th>
              <th className="w-1/6" ></th>
              
            </tr>
          </thead>
  <tbody className="border text-center bg-white p-2">
    {recipesData.map((data) => (
      <tr className="border p-2" key={data.rcpid}>
        <td className="border p-2">
          <img src={`${imageURL}${data.image}`} className="w-20 h-20 object-cover" />
        </td>
        <td className="border p-2">{data.name}</td>
        <td className="border p-2">{data.description}</td>
        <td className="border p-2">
          <label className="flex  cursor-pointer">
            {/* <div className="relative"> */}
              <input
                className='cursor-pointer'
                type="checkbox"
                checked={data.premium}
                onChange={() => handlePremiumChange(data.rcpid,data.name,data.premium)}
              />
            {/* </div> */}
          </label>
        </td>
          
        <td className="flex flex-row items-center justify-center gap-2">
  <div className="hover:text-red-700 justify-center cursor-pointer " onClick={() => deleteRecipes(data.rcpid, data.name)}>
    <AiFillDelete />
  </div>
  <div className="hover:text-sky-500">
    <Link className="transition-colors p-3 " href={`/editRecipe/${data.rcpid}`}>
      <AiTwotoneEdit />
    </Link>
  </div>
</td>
        <td></td>
        <td className="w-1/4  flex justify-center flex-row gap-4  relative" onClick={() => handleRecipesClick(data.rcpid)}>
          {/* <div className="absolute left-1/2 transform -translate-x-1/2"> */}
            <div className="hover:text-sky-500">
              <Link href={`/ingredients`}>Ingredients</Link>
            </div>
            <div className="hover:text-sky-500">
              <Link href={`/step`}>Steps</Link>
            </div>
            <td></td>
          {/* </div> */}
        </td>
        
      </tr>
    ))}
  </tbody>
</table>

        <div className="mt-4 flex">
          <button onClick={prevPage} disabled={currentPage === 1} className={`mx-2 p-2 border rounded-lg ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}>
            Previous
          </button>
          <button
            onClick={nextPage}
            disabled={!dataResponse.hasNext}
            className={`mx-2 p-2 border rounded-lg ${!dataResponse.hasNext ?'opacity-50 cursor-not-allowed' : ''}`}
          >
            Next
          </button>
        </div>
      </div>
      
      {/* <NavBar /> */}
      <ToastContainer autoClose={3000} />
      </>
      )}
    </div>
  );
};

export default Recipes;
