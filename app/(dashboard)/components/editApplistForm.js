"use client";
import React, { useState } from "react";
import axios from "axios"; // Import Axios
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { baseURL } from "../utils/constants";
import NavBar from "../NavBar";

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
    <div className="grid place-items-center h-screen bg-gray-100">
  <form
    onSubmit={handleSubmit}
    className="w-96 p-6 shadow-md bg-white rounded-lg"
    encType="multipart/form-data"
  >
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        Name:
      </label>
      <input
        onChange={(e) => setnewName(e.target.value)}
        value={newName}
        id="name"
        type="text"
        placeholder="Name"
        required
        className="w-full py-3 px-3 text-gray-700 rounded focus:outline-none focus:shadow-outline"
      />
    </div>
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        Description:
      </label>
      <input
        onChange={(e) => setnewDescription(e.target.value)}
        value={newDescription}
        id="description"
        type="text"
        placeholder="Description"
        required
        className="w-full py-3 px-3 text-gray-700 rounded"
      />
    </div>
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        Package Name:
      </label>
      <input
        onChange={(e) => setnewPackageName(e.target.value)}
        value={newPackageName}
        id="packageName"
        type="text"
        placeholder="Package Name"
        required
        className="w-full py-3 px-3 text-gray-700 rounded"
      />
    </div>
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        Image:
      </label>
      <input
        type="file"
        accept=".png, .jpg, .jpeg"
        onChange={(e) => setnewImage(e.target.files[0])}
        className="w-full py-3 px-3 text-gray-700 rounded focus:outline-none focus:shadow-outline"
      />
    </div>
    <button className="block mx-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded" type="submit">
      Update App
    </button>
  </form>
</div>

  );
}
