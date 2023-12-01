"use client";
import React, { useState } from "react";
import axios from "axios"; // Import Axios
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { baseURL } from "../../utils/constants";
// import NavBar from "../NavBar";

export default function EditCategorylist({
  ctgyid,
  name,
 
}) {
  const [newName, setnewName] = useState(name);
  const [newID, setId] = useState(ctgyid);
  const router = useRouter(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    console.log(token);


    const URL=`${baseURL}/category/updatecategory/${ctgyid}`;

    // Send a PUT request to your API to Update the app using Axios
    try {
      const result = await axios.put(
        `${URL}`,
        {
          name: newName,
        },
        {
          headers: {
            'Content-Type': 'application/json',
             'Authorization': `Bearer ${token}`,
          },
        }
      );
      console.log(`Response status: ${result.status}`);

      console.log(`Updated category name: ${result.data.name}`);

      toast.success("Category has been updated");
      router.push("/category"); 
    } catch (error) {
      console.error("Error updating category:", error);
      toast.error("Error updating category");
    }
  };

  return (
    <div className="grid place-items-center m-10">
    <div className="w-full max-w-md">
      <h1 className="text-xl font-bold text-center mb-4">Edit Category</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg px-8 py-6">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" >
            Name:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={(e) => setnewName(e.target.value)}
            value={newName}
            id="name"
            type="text"
            placeholder="Name"
            required
          />
        </div>
        <button className="block mx-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded" type="submit">
          Update Category
        </button>
        {/* <NavBar /> */}
      </form>
    </div>
  </div>
  
  );
}
