"use client";
import React, { useState } from "react";
import axios from "axios"; // Import Axios
import { useRouter,useSearchParams,useParams } from "next/navigation";
import { toast } from "react-toastify";
import { baseURL } from "../../../../../utils/constants";
// import NavBar from "../NavBar";

export default function EditIngredients({
  intrdid,
  name_qnty,
 
}) {
  const [newname_qnty, setnewname_qnty] = useState(name_qnty);
  const [newID, setId] = useState(intrdid);
  const router = useRouter(); 
 
  // const searchParams = useSearchParams();
  // const recipesId = searchParams.get('id');

  const param=useParams();
  const recipesId=param.recipesId;
  
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
      router.push(`/recipes/${recipesId}/ingredients`); 
    } catch (error) {
      console.error("Error updating ingredient:", error);
      toast.error("Error updating ingredient");
    }
  };

  return (
    <div className="flex items-center justify-center ">
  <form onSubmit={handleSubmit} className="p-8 shadow-2xl bg-white rounded-md" style={{ width: '25rem', height: '15rem' }}>
    <div className="mb-4">
      <label htmlFor="name_qnty" className="block text-gray-700 text-sm font-bold mb-2">
        Name and quality:
      </label>
      <input
        id="name_qnty"
        type="text"
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        onChange={(e) => setnewname_qnty(e.target.value)}
        value={newname_qnty}
        placeholder="Name and quality"
        required
      />
    </div>
    <button className=" block mx-auto bg-emerald-600 text-white font-bold py-2 px-4 rounded" type="submit">
      Update Ingredient
    </button>
    {/* <NavBar/> */}
  </form>
</div>

  );
}
