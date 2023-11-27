
"use client"

import React, { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import { AiFillDelete } from 'react-icons/ai';
import { AiTwotoneEdit } from 'react-icons/ai';
import axios from 'axios';
import Link from 'next/link';
import NavBar from '../NavBar';
import { HiPlus } from "react-icons/hi";
import { baseURL } from '../utils/constants';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Ingredients = () => {
  const [ingredientsData, setIngredientsData] = useState([]);
  const [token, setToken] = useState('');
  const [dataResponse, setDataResponse] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  // const itemsPerPage = 3;

  useEffect(() => {
    fetchData();
    const tokenFromStorage = localStorage.getItem('token');
    setToken(tokenFromStorage);
  }, [currentPage]);

  const fetchData = async () => {
    try {

      const recipesId = localStorage.getItem('recipesId');
      const response = await fetch(`${baseURL}/ingredients/all_by_filter?RecipeID=${recipesId}&page=${currentPage}`, { cache: 'no-store' });
      const data = await response.json();
      console.log(response);
      setIngredientsData(data.data);
      setDataResponse(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const deleteIngredient = async (id, name) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete the ingredient "${name}"?`);
    if (confirmDelete) {
      try {
        const token = localStorage.getItem('token');
        const URL = `${baseURL}/ingredients/${id}`;
        const response = await axios.delete(`${URL}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          toast.success(`Ingredient ${name} has been deleted.`);
          setTimeout(() => {
            window.location.reload();
          }, 3000); // Reload the page after 3 seconds
        } else {
          toast.error(`Failed to delete Ingredient ${name}`);
        }
      } catch (error) {
        toast.error(`An error occurred: ${error.message}`);
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
        <div className='m-7'>
        <p className='text-2xl'>You are not logged in. Please log in.</p>
        <button className="block mx-auto bg-emerald-600 text-white px-4 py-2 rounded-md m-3" type="submit" onClick={() => router.push('/')}>
          Go to Login
        </button>
      </div>
    ) : (
      <>  
      {/* <Link href="/addIngredients" className="bg-emerald-600 text-white hover:text-black p-2 rounded-lg  transition-colors absolute top-4 right-40">
        Add new
      </Link> */}
      <div className="rounded overflow-hidden m-4">
            <div className="fixed bottom-10 right-10">
              <Link href="/addIngredients">
                <button className="bg-emerald-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full ">
                  <HiPlus className="text-2xl" />
                </button>
              </Link>
            </div>
          </div>
      <h1 className="text-center text-xl font-bold p-4">{dataResponse.totalCount} Ingredients</h1>
      <div className="max-w-screen-md m-8">
        <table className="w-full table-fixed border p-2">
          <thead>
            <tr className="border p-2 bg-emerald-600 text-white">
              <th className="border p-2">Name and Quality</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="border text-center bg-white p-2">
            {ingredientsData.map((data) =>(
              <tr className="border p-2" key={data.intrdid}>
                <td className="border p-2">{data.name_qnty}</td>
                <td colSpan={2} className="flex items-center justify-center gap-4 p-6">
                  <div className="hover:text-red-700" onClick={() => deleteIngredient(data.intrdid, data.name_qnty)}>
                    <AiFillDelete />
                  </div>
                  <div className="hover:text-sky-500">
                    <Link className="transition-colors p-2" href={`/editIngredient/${data.intrdid}`}>
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

export default Ingredients;



