"use client";
import React, { useState } from "react";
import axios from "axios"; // Import Axios
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { baseURL } from "../utils/constants";

export default function EditSteps({
  stpid,
  description,
 
}) {
  const [newdescription, setnewdescription] = useState(description);
  const [newID, setId] = useState(stpid);
  const router = useRouter(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    console.log(token);


    const URL=`${baseURL}/steps/update/${stpid}`;

    // Send a PUT request to your API to Update the app using Axios
    try {
      const result = await axios.put(
        `${URL}`,
        {
          description: newdescription,
        },
        {
          headers: {
            'Content-Type': 'application/json',
             'Authorization': `Bearer ${token}`,
          },
        }
      );
      console.log(`Response status: ${result.status}`);

      console.log(`Updated step description: ${result.data.description}`);

      toast.success("step has been updated");
      router.push("/step"); 
    } catch (error) {
      console.error("Error updating step:", error);
      toast.error("Error updating step");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="absolute right-20 top-20 shadow-2xl" 
      
    >
      <div>
        <label>Description:</label>
        <input
          onChange={(e) => setnewdescription(e.target.value)}
          value={newdescription}
          type="text"
          placeholder="description"
          required
        />
      </div>
      
      <button className="bg-sky-700" type="submit">
        Update Step
      </button>
    </form>
  );
}
