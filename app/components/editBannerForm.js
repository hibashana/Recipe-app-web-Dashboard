"use client";
import React, { useState } from "react";
import axios from "axios"; // Import Axios
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { baseURL } from "../utils/constants";

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
