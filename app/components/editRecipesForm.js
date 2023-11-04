"use client";
import React, { useState } from "react";
import axios from "axios"; // Import Axios
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { baseURL } from "../utils/constants";

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
      router.push("/banner"); 
    } catch (error) {
      console.error("Error updating recipe:", error);
      toast.error("Error updating recipe");
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
      <div>
        <label>Description:</label>
        <input
          onChange={(e) => setnewDescription(e.target.value)}
          value={newDescription}
          type="text"
          placeholder="Description"
          required
        />
      </div>
      
      <div>
  <label>Image:</label>
  {/* <img src={imageUrl} alt="App Image" /> */}
  <input
    type="file"
    accept=".png, .jpg, .jpeg"
    onChange={(e) => setnewImage(e.target.files[0])}
    // onChange={handleImageChange}
  />
</div>
      <button className="bg-sky-700" type="submit">
        Update Banner
      </button>
    </form>
  );
}
