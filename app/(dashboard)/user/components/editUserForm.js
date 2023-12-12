"use client"
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { baseURL } from "../../../utils/constants";
import { ClipLoader } from 'react-spinners';
// import NavBar from "../NavBar";

export default function EditaUser({
  id,
  name,
  email,
  contact,
  username,
  password,
}) {
  const [newName, setnewName] = useState(name);
  const [newEmail, setnewEmail] = useState(email);
  const [newContact, setnewContact] = useState(contact);
  const [newUsername, setnewUsername] = useState(username);
  const [newPassword, setnewPassword] = useState(password);
  // const [newID, setID] = useState(id);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // const handlePasswordUpdate = async () => {
  //   const passwordURL = `${baseURL}/user/updatePassword`;
  //   const token = localStorage.getItem('token');

  //   try {
  //     // console.log(id);
  //     const response = await axios.put(
  //       passwordURL,
  //       {
  //         userId: id,
  //         password: newPassword,
  //       },
  //       {
  //         headers: {
  //           'Content-Type': 'application/json',
  //           'Authorization': `Bearer ${token}`,
  //         },
  //       }
  //     );
  
  //     if (response.status === 200) {
  //       toast.success('Password updated successfully.');
  //     } else {
      
  //       toast.error('Failed to update password.');
  //       console.error('Failed to update password:', response.status, response.statusText);
  //     }
  //   } catch (error) {

  //     toast.error('An error occurred while updating the password.');
  //     console.error('An error occurred while updating the password:', error);
  //   }
  // };
  
 
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const token = localStorage.getItem('token');
    const userURL = `${baseURL}/user/${id}`;

    try {
      // setLoading(true);
      const result = await axios.put(
        userURL,
        {
          name: newName,
          email: newEmail,
          contact: newContact,
          username: newUsername,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        }
      );
  
      console.log(`Response status: ${result.status}`);
      console.log(`Updated user name: ${result.data.name}`);
      toast.success('User has been updated');
      
      // Check if a new password is provided and update it

      // if (newPassword) {
      //   await handlePasswordUpdate(id, newPassword, token);
      // }
     
      router.push('/user');
      // setLoading(false);
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error('Error updating user');
    }
    // finally {
    //   setLoading(false);
    // }
  };
  
  return (
    <div className="grid place-items-center">
      {/* {loading ? (
     <div className="flex h-screen justify-center my-32">
      <ClipLoader color={'#3d9f49'} size={100} />
      </div>
    )
    :(
      <> */}
    <form
      onSubmit={handleSubmit}
      className="p-8 shadow-2xl bg-white rounded-md"
      style={{ width: '30rem', height: '25rem' }} // Adjust the width as needed
    >
      <div className="mb-4">
        <label>Name:</label>
        <input
          onChange={(e) => setnewName(e.target.value)}
          value={newName}
          type="text"
          placeholder="Name"
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-green-600"
        />
      </div>
      <div className="mb-4">
        <label>Email:</label>
        <input
          onChange={(e) => setnewEmail(e.target.value)}
          value={newEmail}
          type="email"
          placeholder="Email"
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-green-600"
        />
      </div>
      <div className="mb-4">
        <label>Contact:</label>
        <input
          onChange={(e) => setnewContact(e.target.value)}
          value={newContact}
          type="number"
          placeholder="Contact"
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-green-600"
        />
      </div>
      <button className="block mx-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded" type="submit">
        Update User
      </button>
      {/* <NavBar/> */}
    </form>
    {/* </>
     )}  */}
  </div>
  
  );
}
