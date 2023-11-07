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

const ingredients = () => {
  const [ingredientsData, setingredientsData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`${baseURL}/ingredients/getall`, { cache: 'no-store' });
      const data = await response.json();
      setingredientsData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

//   const handleIngredientClick = (intrdid) => {
//     // Store the selected intrdid in localStorage
//     localStorage.setItem('IngredientId', intrdid);
//     console.log(intrdid);
//     onClick={() => handleIngredientClick(data.intrdid)}
//   };

  const deleteIngredient = async (id, name) => {
    try {
      const token = localStorage.getItem('token');
      const URL = `${baseURL}/ingredients/${id}`;
      console.log(`${id}`);
      const response = await axios.delete(`${URL}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      console.log(`res=${response.status}`);
      if (response.status === 200) {
        toast.success(`Ingredient ${name} has been deleted.`);
        console.log(`Ingredient ${name} has been deleted.`);
        setTimeout(() => {
          window.location.reload();
        }, 3000); // Reload the page after 3 seconds
      } else {
        // Handle any errors that occur during the API call.
        toast.error(`Failed to delete Ingredient ${name}`);
        console.error(`Failed to delete Ingredient ${name}`);
      }
    } catch (error) {
      // Handle network errors or other exceptions.
      toast.error(`An error occurred: ${error.message}`);
      console.error(`An error occurred: ${error.message}`);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <Link href="/addIngredients" className="bg-sky-600 text-black p-2 rounded-lg hover:text-white transition-colors absolute top-4 right-40">
        Add new
      </Link>
      <div className="max-w-screen-md m-20">
        <table className="w-full table-fixed border p-2">
          <thead>
            <tr className="border p-2">
              <th>Name and Quality</th>
              <th></th>
            </tr>
          </thead>
          <tbody className="border p-2">
            {ingredientsData.map((data) => (
              <tr className="border p-2" key={data.intrdid}>
                <td className="border p-2" >
                  {data.name_qnty}
                </td>
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
      </div>
      <NavBar />
    </div>
  );
};

export default ingredients;



