"use client"

import React, { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import { AiFillDelete } from 'react-icons/ai';
import { AiTwotoneEdit } from 'react-icons/ai';
import axios from 'axios';
import Link from 'next/link';
import NavBar from '../NavBar';
import { baseURL } from '../utils/constants';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';

const Category = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [dataResponse, setDataResponse] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [token, setToken] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetchData();
    const tokenFromStorage = localStorage.getItem('token');
    setToken(tokenFromStorage);
  }, [currentPage]);

 

  const fetchData = async () => {
    try {
      const appId = localStorage.getItem('appId');
      console.log(appId);
      const response = await fetch(`${baseURL}/category/all_by_filter?appID=${appId}&page=${currentPage}`, { cache: 'no-store' });
      // const response = await fetch(`${baseURL}/category/getall`, { cache: 'no-store' });
      const data = await response.json();
      console.log(response);
      setCategoryData(data.data);
      setDataResponse(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // const handleCategoryClick = (ctgyid) => {
  //   localStorage.setItem('CategoryId', ctgyid);
  //   console.log(ctgyid);
  // };

  const deleteApp = async (id, name) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete the category "${name}"?`);
    if (confirmDelete) {
      try {
        const token = localStorage.getItem('token');
        // if (!token && !isChecked) {
        //   return; // redirect to the login page 
        // }
        const URL = `${baseURL}/category/${id}`;
        const response = await axios.delete(`${URL}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          toast.success(`Category ${name} has been deleted.`);
          console.log(`Category ${name} has been deleted.`);
          setTimeout(() => {
            window.location.reload();
          }, 3000); // Reload the page after 3 seconds
        } else {
          toast.error(`Failed to delete Category ${name}`);
          console.error(`Failed to delete Category ${name}`);
        }
      } catch (error) {
        toast.error(`An error occurred: ${error.message}`);
        console.error(`An error occurred: ${error.message}`);
      }
    }
  };

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <div className="flex flex-col items-center">
       {!token ? (
        <div className='m-7 '>
          <p className='text-2xl'>You are not logged in. Please login.</p>
          
          <button className="block mx-auto bg-emerald-600  text-white px-4 py-2 rounded-md m-3" type="submit" onClick={() => router.push('/')}>Go to Login</button>
        </div>
      ) : (
        <>
          <Link href="/addCategory" className="bg-emerald-600 text-white hover:text-black p-2 rounded-lg transition-colors absolute top-4 right-40">
            Add new
          </Link>
          <h1 className="text-center text-xl font-bold">{dataResponse.totalCount} Categories</h1>
          <div className="max-w-screen-md m-20">
            <table className="w-full table-fixed border p-2">
              <thead>
                <tr className="border p-2">
                  <th>Name</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className="border p-2">
                {categoryData.map((data) => (
                  <tr className="border p-2" key={data.ctgyid} >
                    {/* onClick={() => handleCategoryClick(data.ctgyid)} */}
                    <td className="border p-2">{data.name}</td>
                    <td colSpan={2} className="flex items-center justify-center gap-4 p-6">
                      <div className="hover:text-red-700" onClick={() => deleteApp(data.ctgyid, data.name)}>
                        <AiFillDelete />
                      </div>
                      <div className="hover:text-sky-500">
                        <Link className="transition-colors p-2" href={`/editCategory/${data.ctgyid}`}>
                          <AiTwotoneEdit />
                        </Link>
                      </div>
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

export default Category;
