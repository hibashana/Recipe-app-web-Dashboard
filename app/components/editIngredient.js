"use client";
import React, { useState } from "react";
import axios from "axios"; // Import Axios
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { baseURL } from "../utils/constants";

export default function EditIngredients({
  intrdid,
  name_qnty,
 
}) {
  const [newname_qnty, setnewname_qnty] = useState(name_qnty);
  const [newID, setId] = useState(intrdid);
  const router = useRouter(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    console.log(token);


    const URL=`${baseURL}/ingredients/update/${intrdid}`;

    // Send a PUT request to your API to Update the app using Axios
    try {
      const result = await axios.put(
        `${URL}`,
        {
          name_qnty: newname_qnty,
        },
        {
          headers: {
            'Content-Type': 'application/json',
             'Authorization': `Bearer ${token}`,
          },
        }
      );
      console.log(`Response status: ${result.status}`);

      console.log(`Updated ingredient name_qnty: ${result.data.name_qnty}`);

      toast.success("ingredient has been updated");
      router.push("/ingredients"); 
    } catch (error) {
      console.error("Error updating ingredient:", error);
      toast.error("Error updating ingredient");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="absolute right-20 top-20 shadow-2xl" 
      
    >
      <div>
        <label>Name and quality:</label>
        <input
          onChange={(e) => setnewname_qnty(e.target.value)}
          value={newname_qnty}
          type="text"
          placeholder="Name and quality"
          required
        />
      </div>
      
      <button className="bg-sky-700" type="submit">
        Update Ingredient
      </button>
    </form>
  );
}
