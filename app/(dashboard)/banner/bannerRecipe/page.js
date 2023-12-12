'use client';

import React, { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import { AiFillDelete, AiTwotoneEdit } from 'react-icons/ai';
import { HiPlus } from "react-icons/hi";
import axios from 'axios';
import Link from 'next/link';
import { baseURL, imageURL } from '../../../utils/constants';
import { MdFilterListAlt } from "react-icons/md";
import { useRouter, useSearchParams } from 'next/navigation';
import tablesize from "../../../tablestyle.css";
import { ClipLoader } from 'react-spinners';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import NavBar from '../NavBar';

const BannerRecipes = () => {
  const [recipesData, setRecipesData] = useState([]);
  const [dataResponse, setDataResponse] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [token, setToken] = useState('');
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [loading, setLoading] = useState(true);
 
  const searchParams = useSearchParams();
  
  const bannerId = searchParams.get('bannerId');

  useEffect(() => {
    fetchData();
    const tokenFromStorage = localStorage.getItem('token');
    setToken(tokenFromStorage);
  }, [currentPage, searchParams]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const appId = localStorage.getItem('appId');

      const url =
        selectedFilter === 'premium'
          ? `${baseURL}/recipes/all_by_filter?appID=${appId}&page=${currentPage}&premium=true`
          : selectedFilter === 'nonPremium'
          ? `${baseURL}/recipes/all_by_filter?appID=${appId}&page=${currentPage}&premium=false`
          : selectedFilter === 'all'
          ?`${baseURL}/recipes/all_by_filter?appID=${appId}&page=${currentPage}`
          : `${baseURL}/recipes/all_by_filter?appID=${appId}&sortBy=name&page=${currentPage}`;

      const response = await fetch(url, { cache: 'no-store' });

      const data = await response.json();
      setRecipesData(data.data);
      setDataResponse(data);
      localStorage.setItem('dataId', data.rcpid);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const applyFilter = () => {
    setCurrentPage(1); // Reset to the first page when applying a new filter
    fetchData();
  };

  const handleRecipesClick = (rcpid) => {
    localStorage.setItem('recipesId', rcpid);
  };

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
          toast.error(`Failed to delete Recipes ${name}`);
          console.error(`Failed to delete Recipes ${name}`);
        }
      } catch (error) {
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

  const addRecipeToBanner = async (rcpid,name) => {
    try {
      const token = localStorage.getItem('token');
      const bannerId = searchParams.get('bannerId'); 
      const URL = `${baseURL}/banner/create_banner_recipe`;
  
      const response = await axios.post(
        URL,
        { 
          bannerId: bannerId,
          recipeId: rcpid,
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );
  
      if (response.status === 200) {
        toast.success(`Recipe ${name} has been added to the banner.`);
        fetchData();
      } else {
        toast.error(`Failed to add recipe ${name} to the banner.`);
      }
    } catch (error) {
      toast.error(`An error occurred: ${error.message}`);
      console.error(`An error occurred: ${error.message}`);
    }
  };

  const deleteRecipeFromBanner = async (id, name) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete the recipe "${name}"?`);
    if (confirmDelete) {
      try {
        const token = localStorage.getItem('token');
        const URL = `${baseURL}/banner/delete_banner_recipe/${id}`;
        const response = await axios.delete(`${URL}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          toast.success(`Recipe ${id} has been removed from the banner.`);
          console.log(`Recipe ${id} has been removed from the banner.`);
          // setTimeout(() => {
          //   window.location.reload();
          // }, 3000); // Reload the page after 3 seconds
        } else {
          toast.error(`Failed to remove recipe ${id} from the banner.`);
          console.error(`Failed to remove recipe ${id} from the banner.`);
        }
      } catch (error) {
        toast.error(`An error occurred: ${error.message}`);
        console.error(`An error occurred: ${error.message}`);
      }
    }
  };

  return (
    <div className="flex flex-col">
      {loading ? (
     <div className="flex h-screen justify-center my-32">
      <ClipLoader color={'#3d9f49'} size={100} />
      </div>
    )
    :
      !token ? (
        <div className='m-7'>
          <p className='text-2xl'>You are not logged in. Please log in.</p>
          <button className="block mx-auto bg-emerald-600 text-white px-4 py-2 rounded-md m-3" type="submit" onClick={() => router.push('/')}>
            Go to Login
          </button>
        </div>
      ) : (
        <>  
          <div className="rounded overflow-hidden m-4">
            <div className="fixed bottom-6 right-10">
              <Link href="/recipes/add">
                <button className="bg-emerald-600 hover:bg-green-700 text-white font-bold p-3 rounded-full ">
                  <HiPlus className="text-2xl" />
                </button>
              </Link>
            </div>
          </div>
          <div className='flex p-2'>
            <div className="flex">
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="p-2 ml-auto border rounded-md"
              >
                <option value="all">All Recipes</option>
                <option value="premium">Premium Recipes</option>
                <option value="nonPremium">Free Recipes</option>
                <option value="sortbyname">Sort by Name</option>
              </select>
              <button
                onClick={applyFilter}
                className="ml-2 p-2 bg-emerald-600 text-white rounded-md flex items-center "
              >
                <MdFilterListAlt className="mr-2" />Filter 
              </button>
              </div>
              <h1 className="text-xl ml-auto items-center font-bold p-2">{dataResponse.totalCount}  Recipes</h1>
          </div>
          
      
          <div className={tablesize.fullWidthTable}>
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
                        <input
                          className='cursor-pointer'
                          type="checkbox"
                          checked={data.premium}
                          onChange={() => handlePremiumChange(data.rcpid,data.name,data.premium)}
                        />
                      </label>
                    </td>
                    <td className="border justify-center flex-row gap-4  relative" onClick={() => handleRecipesClick(data.rcpid)} colSpan={2}>
                      <div className='flex flex-row gap-4 p-2 justify-center'>
                        <div className="hover:text-sky-500">
                          <Link href={`/recipes/${data.rcpid}/ingredients`}>Ingredients</Link>
                        </div>
                        <div className="hover:text-sky-500">
                          <Link href={`/recipes/${data.rcpid}/step`}>Steps</Link>
                        </div>
                      </div>
                    </td>
                    <td className="flex flex-col items-center gap-2 p-8">
                      {data.Banners !== null && data.Banners.some(item => item.id === bannerId) ? (
                        data.Banners.map((item) => (
                          item.id === bannerId ? (
                            <div
                              className="w-20 rounded-full text-red-500 border hover:border-red-500 transition-colors hover:text-red-700 justify-center cursor-pointer"
                              key={item.id}
                              onClick={() => deleteRecipeFromBanner(item.BannerRecipes.id, data.name)}
                            >
                              Remove
                            </div>
                          ) : null
                        ))
                      ) : (
                        <div
                          className="w-20 justify-center rounded-full text-emerald-600 border  hover:border-emerald-600 transition-colors cursor-pointer"
                          onClick={() => addRecipeToBanner(data.rcpid,data.name)}
                        >
                          Add
                        </div>
                      )}
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

export default BannerRecipes;
