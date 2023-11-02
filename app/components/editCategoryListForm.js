"use client";
import React, { useState } from "react";
import axios from "axios"; // Import Axios
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { baseURL } from "../utils/constants";

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
            'Content-Type': 'multipart/form-data',
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
    <form
      onSubmit={handleSubmit}
      className="absolute right-20 top-20 shadow-2xl" 
      encType="multipart/form-data" 
    >
      <div>
        <label>Name:</label>
        <input
          onChange={(e) => setnewName(e.target.value)}
          value={newName}
          type="text"
          placeholder="Name"
          required
        />
      </div>
      
      <button className="bg-sky-700" type="submit">
        Update Category
      </button>
    </form>
  );
}
