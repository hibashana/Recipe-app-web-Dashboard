"use client"
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { baseURL } from "../utils/constants";

export default function EditaUser({
  ruserid,
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
  const [newID, setID] = useState(ruserid);
  const router = useRouter();

  // const handlePasswordUpdate = async () => {
  //   const passwordURL = `${baseURL}/user/updatePassword`;
  //   const token = localStorage.getItem('token');

  //   try {
  //     // console.log(ruserid);
  //     const response = await axios.put(
  //       passwordURL,
  //       {
  //         userId: ruserid,
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
    const userURL = `${baseURL}/user/${ruserid}`;

    try {
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
      //   await handlePasswordUpdate(ruserid, newPassword, token);
      // }
      
      router.push('/user');
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error('Error updating user');
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="absolute right-20 top-20 shadow-2xl">
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
        <label>Email:</label>
        <input
          onChange={(e) => setnewEmail(e.target.value)}
          value={newEmail}
          type="email"
          placeholder="Email"
          required
        />
      </div>
      <div>
        <label>Contact:</label>
        <input
          onChange={(e) => setnewContact(e.target.value)}
          value={newContact}
          type="number"
          placeholder="Contact"
          required
        />
      </div>
      {/* <div> */}
        {/* <label>Username:</label>
        <input
          onChange={(e) => setnewUsername(e.target.value)}
          value={newUsername}
          type="text"
          placeholder="Username"
          required
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          onChange={(e) => setnewPassword(e.target.value)}
          value={newPassword}
          type="password"
          placeholder="Password"
        />
      </div> */}

      <button className="bg-sky-700" type="submit">
        Update User
      </button>
    </form>
  );
}
