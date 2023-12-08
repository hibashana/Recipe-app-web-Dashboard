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
import { ClipLoader } from 'react-spinners';
import { useRouter } from 'next/navigation';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Recipes = () => {
  const [recipesData, setRecipesData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [dataResponse, setDataResponse] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [token, setToken] = useState('');
  const [selectedFilter, setSelectedFilter] = useState("all");
  // const [searchName, setSearchName] = useState("");
  const [loading, setLoading] = useState(true);
 
  const router = useRouter();
 

  useEffect(() => {
    fetchData();
    const tokenFromStorage = localStorage.getItem('token');
    setToken(tokenFromStorage);
  }, [currentPage]);

  const fetchData = async () => {
    try {
      setLoading(true);
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

  // const fetchCategories = async () => {
  //   try {
      
  //     const response = await fetch(`${baseURL}/category/getall`, { cache: 'no-store' });
  //     const data = await response.json();
  //     setCategories(data);
  //   } catch (error) {
  //     console.error('Error fetching categories:', error);
  //   }
  // };

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
        fetchData();
        // setTimeout(() => {
        //   window.location.reload();
        // }, 3000); // Reload the page after 3 seconds
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

  const handleSearch = async () => {
    try {
      const appId = localStorage.getItem("appId");
      const response = await fetch(
        `${baseURL}/recipes/all_by_filter?appID=${appId}&name=${searchName}&page=${currentPage}`,
        { cache: "no-store" }
      );
      const data = await response.json();
      setRecipesData(data.data);
      setDataResponse(data);
    } catch (error) {
      console.error("Error fetching search results:", error);
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

     {loading ? (
     <div className="flex h-screen justify-center my-32">
      <ClipLoader color={'#3d9f49'} size={100} />
      </div>
    )
    :!token ? (
        <div className='m-7'>
        <p className='flex flex-col items-center text-2xl'>You are not logged in. Please log in.</p>
        <button className="block mx-auto bg-emerald-600 text-white px-4 py-2 rounded-md m-3" type="submit" onClick={() => router.push('/')}>
          Go to Login
        </button>
      </div>
    ) : (
      <>  
      <div className="rounded overflow-hidden">
            <div className="fixed bottom-5  right-10">
              <Link href="/recipes/add">
                <button className="bg-emerald-600 hover:bg-green-700 text-white font-bold p-3 rounded-full ">
                  <HiPlus className="text-2xl" />
                </button>
              </Link>
            </div>
          </div>
          <div className='flex p-2 justify-between'>
  <div className="flex items-center ">
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
    {/* <div className="flex  p-2">
  <div className="flex border border-emerald-400 mr-auto rounded ">
              <input
                type="text"
                className="block w-full px-4 p-1 text-black bg-white border rounded-md focus:border-emerald-600  focus:outline-none  focus:ring-opacity-40"
                placeholder="Search..."
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
              />
              <button
                className="px-4 text-white bg-emerald-600 border-l rounded "
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
            </div> */}
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
              <th className="w-1/6"></th>
              <th className="w-1/6" ></th>
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
                onChange={() => handlePremiumChange(data.rcpid,data.name,data.premium)}
              />
            {/* </div> */}
          </label>
        </td>
        <td className="border justify-center flex-row gap-4  relative"  colSpan={2}>
        <div className='flex flex-row gap-4 p-2 justify-center'>
            <div className="hover:text-sky-500">
              <Link href={`/recipes/${data.rcpid}/ingredients`}>Ingredients</Link>
            </div>
            <div className="hover:text-sky-500">
              <Link href={`/recipes/${data.rcpid}/step`}>Steps</Link>
            </div>
            </div>
        </td>  

        <td colSpan={2} className="flex items-center justify-center gap-4 p-6">
                      <div className="rounded-full p-2 bg-emerald-100 hover:bg-red-700 hover:text-white transition-colors cursor-pointer" onClick={() => deleteRecipes(data.rcpid, data.name)}>
                        <AiFillDelete />
                      </div>
                      <div className="rounded-full p-2 bg-emerald-100 hover:bg-sky-400 hover:text-white transition-colors cursor-pointer">
                        <Link className="" href={`/recipes/edit/${data.rcpid}`}>
                          <AiTwotoneEdit />
                        </Link>
                      </div>
                    </td>
        
        {/* <td></td> */}
        
        
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
