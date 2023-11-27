'use client';

import React, { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import { AiFillDelete,AiTwotoneEdit} from 'react-icons/ai';
import { HiPlus } from "react-icons/hi";
import axios from 'axios';
import Link from 'next/link';
import { baseURL, imageURL } from '../utils/constants';
import { MdFilterListAlt } from "react-icons/md";
import { useRouter, useSearchParams } from 'next/navigation';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavBar from '../NavBar';



const BannerRecipes = () => {
  const [recipesData, setRecipesData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [recipeIds, setRecipeIds] = useState([]);
  const [dataResponse, setDataResponse] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [token, setToken] = useState('');
  const [selectedFilter, setSelectedFilter] = useState("all");
 
  const searchParams = useSearchParams();
  
   

  useEffect(() => {
    fetchData();
    const tokenFromStorage = localStorage.getItem('token');
    setToken(tokenFromStorage);
    const recipeId = searchParams.get('recipeIds');
    setRecipeIds(recipeId ? recipeId.split(',') : []);
  // }, [searchParams]);
  }, [currentPage,searchParams]);

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

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const addRecipeToBanner = async (rcpid) => {
    try {
      const token = localStorage.getItem('token');
      const bannerId = searchParams.get('bannerId'); 
      const recipeId = searchParams.get('recipeIds');
      const URL = `${baseURL}/banner/create_banner_recipe`;
  
      const response = await axios.post(
        URL,
        { 
          bannerId: bannerId,
          recipeId: rcpid,},
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );
  
      if (response.status === 200) {
        toast.success(`Recipe ${rcpid} has been added to the banner.`);
        fetchData();
      } else {
        toast.error(`Failed to add recipe ${rcpid} to the banner.`);
      }
    } catch (error) {
      toast.error(`An error occurred: ${error.message}`);
      console.error(`An error occurred: ${error.message}`);
    }
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
            <div className="fixed bottom-10 right-10">
              <Link href="/addRecipes">
                <button className="bg-emerald-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full ">
                  <HiPlus className="text-2xl" />
                </button>
              </Link>
            </div>
          </div>
          <div className='flex mx-12 p-2'>
          <div className="mt-4 flex items-center mx-60">
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
          <option value="sortbyname">Sort by Name</option>
        </select>
        <button
          onClick={applyFilter}
          className="ml-2 p-2 bg-emerald-600 text-white rounded-md flex items-center "
        >
          <MdFilterListAlt className="mr-2"  />Filter 
        </button>
        <h1 className="text-xl ml-96 font-bold ">{dataResponse.totalCount}  Recipes</h1>
        </div>
      </div>
      
      <div className="max-w-screen-md m-6 mx-auto">
      
      <table className="w-full table-fixed border p-2 ">
      <thead>
            <tr className="border p-2 bg-emerald-600 text-white">
              <th className="border w-1/6">Image</th>
              <th className="border w-1/6">Name</th>
              <th className="border w-3/6">Description</th>
              <th className="border w-1/6">Premium</th>
              <th className="w-1/6"></th>
              <th className="w-1/6"></th>
              <th className="border w-1/6">Action</th>
              
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
                onChange={() => handlePremiumChange(data.rcpid, data.premium)}
              />
            {/* </div> */}
          </label>
        </td>
          
        <td className="border justify-center flex-row gap-4  relative" onClick={() => handleRecipesClick(data.rcpid)} colSpan={2}>
            <div className='flex flex-row gap-4 p-2 justify-center'>
            <div className="hover:text-sky-500">
              <Link href={`/ingredients`}>Ingredients</Link>
            </div>
            <div className="hover:text-sky-500">
              <Link href={`/step`}>Steps</Link>
            </div>
            </div>
        </td>
    <td className="flex flex-col items-center gap-2 p-4">
    {recipeIds.includes(data.rcpid) ? (
       
        <div className="w-20 rounded-full text-red-500 border hover:border-red-500 transition-colors cursor-pointer" onClick={() => deleteRecipes(data.rcpid, data.name)}>
          Remove
        </div>
      ) : (
       
        <div className="w-20 rounded-full text-emerald-600 border hover:border-emerald-600 transition-colors cursor-pointer"
        onClick={() => addRecipeToBanner(data.rcpid)}>
          Add
        </div>
      )}
  
</td>
      </tr>
    ))}
  </tbody>
</table>

        <div className="mt-4 flex justify-center">
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
      
      <NavBar />
      <ToastContainer autoClose={3000} />
      </>
      )}
    </div>
  );
};

export default BannerRecipes;
