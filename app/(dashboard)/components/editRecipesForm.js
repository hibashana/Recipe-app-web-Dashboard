"use client";
import React, { useState } from "react";
import axios from "axios"; // Import Axios
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { baseURL } from "../utils/constants";
import NavBar from "../NavBar";

export default function EditRecipes({
  rcpid,
  name,
  description,
  image,
}) {
  const [newName, setnewName] = useState(name);
  const [newImage, setnewImage] = useState(image);
  const [newDescription, setnewDescription] = useState(description);
  const [newID, setId] = useState(rcpid);
  const router = useRouter(); 

  const handleSubmit = async (e) => {
    e.preventDefault();


    const token = localStorage.getItem('token');
    console.log(token);


    const URL=`${baseURL}/recipes/updaterecipe/${rcpid}`;

    try {
      const result = await axios.put(
        `${URL}`,
        {
          name: newName,
          description:newDescription,
          image: newImage,
          
        },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
             'Authorization': `Bearer ${token}`,
          },
        }
      );
      console.log(`Response status: ${result.status}`);

      console.log(`Updated recipes name: ${result.data.name}`);

      toast.success("Recipes has been updated");
      router.push("/recipes"); 
    } catch (error) {
      console.error("Error updating recipe:", error);
      toast.error("Error updating recipe");
    }
  };

  return (
    <div className="grid place-items-center h-screen bg-gray-100">
    <div className="w-full max-w-md">
    <form
  onSubmit={handleSubmit}
  className="flex flex-col items-center justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-2xl p-8 bg-white rounded-md"
  encType="multipart/form-data"
  style={{ width: '500px' }} // Set a fixed width for the form
>
  <div className="mb-4">
    <label className="text-lg font-semibold">Name:</label>
    <input
      onChange={(e) => setnewName(e.target.value)}
      value={newName}
      type="text"
      placeholder="Name"
      required
      className="w-full flex px-4 py-2 mt-2 border rounded-md focus:outline-none focus:shadow-outline"
      style={{ width: '400px', height: '45px' }} // Set a fixed width and height for the input
    />
  </div>
  <div className="mb-4">
    <label className="text-lg font-semibold">Description:</label>
    <input
      onChange={(e) => setnewDescription(e.target.value)}
      value={newDescription}
      type="text"
      placeholder="Description"
      required
      className="w-full flex  px-4 py-2 mt-2 border rounded-md focus:outline-none focus:shadow-outline"
      style={{  width: '400px', height: '45px'  }} // Set a fixed width and height for the input
    />
  </div>
  <div className="mb-4">
    <label className="text-lg font-semibold">Image:</label>
    <input
      type="file"
      accept=".png, .jpg, .jpeg"
      onChange={(e) => setnewImage(e.target.files[0])}
      className="w-full flex px-4 py-2 mt-2 border rounded-md focus:outline-none focus:shadow-outline"
      style={{ width: '400px', height: '45px' }} // Set a fixed width and height for the input
    />
  </div>
  <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded">
    Update Recipe
  </button>
 
</form>
<NavBar/>
</div>
  </div>
  );
}
