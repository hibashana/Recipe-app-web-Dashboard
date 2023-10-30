"use client";
import React, { useState } from "react";
import axios from "axios"; // Import Axios
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { baseURL } from "../utils/constants";

export default function Editapp({
  id,
  name,
  description,
  packageName,
  image,
}) {
  const [newName, setnewName] = useState(name);
  const [newDescription, setnewDescription] = useState(description);
  const [newPackageName, setnewPackageName] = useState(packageName);
  const [newImage, setnewImage] = useState(image);
  const [newID, setId] = useState(id);
  const router = useRouter(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const handleImageChange = (e) => {
    //     const file = e.target.files[0];
    //     console.log(`image=${file}`);
    //     setFormData({ ...formData, image: file });
    //   };

    const token = localStorage.getItem('token');
    console.log(token);


    const URL=`${baseURL}/app/updateapp/${id}`;

    // Send a PUT request to your API to Update the app using Axios
    try {
      const result = await axios.put(
        `${URL}`,
        {
          name: newName,
          description: newDescription,
          packageName: newPackageName,
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

      console.log(`Updated app name: ${result.data.name}`);

      toast.success("App has been updated");
      router.push("/appList"); 
    } catch (error) {
      console.error("Error updating app:", error);
      toast.error("Error updating app");
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
        <label>Package Name:</label>
        <input
          onChange={(e) => setnewPackageName(e.target.value)}
          value={newPackageName}
          type="text"
          placeholder="Package Name"
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
        Update App
      </button>
    </form>
  );
}
