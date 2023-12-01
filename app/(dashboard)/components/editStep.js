"use client";
import React, { useState } from "react";
import axios from "axios"; // Import Axios
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { baseURL } from "../../utils/constants";
// import NavBar from "../NavBar";

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
    <div className="flex justify-center ">
  <form
    onSubmit={handleSubmit}
    className="bg-white p-8 shadow-2xl rounded-md"
    style={{ width: '30rem', height: '15rem' }}
  >
    <div  style={{ width: '25rem', height: '10rem' }}>
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
      >
        Description:
      </label>
      <textarea
        id="description"
        type="text"
        className="shadow appearance-none border rounded w-full py-6 px-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        onChange={(e) => setnewdescription(e.target.value)}
        value={newdescription}
        placeholder="Description"
        required
      />
    </div>
    <button
      className="block mx-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold  py-2 px-4 rounded"
      type="submit"
    >
      Update Step
    </button>
  </form>
</div>

  );
}
