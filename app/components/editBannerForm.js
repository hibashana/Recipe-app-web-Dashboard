"use client";
import React, { useState } from "react";
import axios from "axios"; // Import Axios
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { baseURL } from "../utils/constants";
import NavBar from "../NavBar";

export default function EditaBanner({
  id,
  name,
  image,
}) {
  const [newName, setnewName] = useState(name);
  const [newImage, setnewImage] = useState(image);
  const [newID, setId] = useState(id);
  const router = useRouter(); 

  const handleSubmit = async (e) => {
    e.preventDefault();


    const token = localStorage.getItem('token');
    console.log(token);


    const URL=`${baseURL}/banner/updatebanner/${id}`;

    try {
      const result = await axios.put(
        `${URL}`,
        {
          name: newName,
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

      console.log(`Updated banner name: ${result.data.name}`);

      toast.success("banner has been updated");
      router.push("/banner"); 
    } catch (error) {
      console.error("Error updating banner:", error);
      toast.error("Error updating banner");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
  <form
    onSubmit={handleSubmit}
    className="flex flex-col items-center p-8 shadow-lg bg-white rounded-lg"
    encType="multipart/form-data"
    style={{ width: '30rem', height: '20rem' }}
  >
    <div className="mb-4 w-64" style={{ width: '25rem', height: '20rem' }}>
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
        className="w-full py-2 px-3 text-gray-700 rounded focus:outline-none focus:shadow-outline"
      />
    </div>

    <div className="mb-4 " style={{ width: '25rem', height: '20rem' }}>
      <label className="block text-gray-700 text-sm font-bold mb-2">
        Image:
      </label>
      <input
        type="file"
        accept=".png, .jpg, .jpeg"
        onChange={(e) => setnewImage(e.target.files[0])}
        className="w-full py-2 px-3 text-gray-700 rounded focus:outline-none focus:shadow-outline"
      />
    </div>

    <button className="block mx-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded" type="submit">
      Update Banner
    </button>
    <NavBar/>
  </form>
</div>
  );
}
