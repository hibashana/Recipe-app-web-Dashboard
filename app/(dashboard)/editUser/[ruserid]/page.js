import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { baseURL } from "@/app/utils/constants";
import EditaUser from "../../components/editUserForm";



export default async function EditUser({ params }) {
  const { ruserid} = params;
  console.log(`idid=${ruserid}`);
  const userData = await getUserById(ruserid);
  console.log(`userData=${userData}`);
  if (!userData) {
    return null; // Render loading or error state while fetching data
  }

  return <EditaUser{...userData}/>;
}
const getUserById = async (idn) => {
  try {
    console.log(`idid=${idn}`);

    const URL=`${baseURL}/user/${idn}`;

   
    const res = await axios.get(`${URL}`, {
      headers: {
        'Content-Type': 'application/json',
        "Cache-Control": "no-store",
       
      },
      
    });
    console.log(`res=${res}`);

    if (!res.data) {
      throw new Error("Failed to fetch User");
    }

    const user = res.data;
    

    if (!user) {
      console.error("User data is undefined");  
    }

    const { ruserid, name,email,contact,username,password,} = user;
    console.log(`name=${ruserid}`);

    return {
      ruserid,
      name,
      email,
      contact,
      username,
      password,
    };
  } catch (error) {
    console.error("Error fetching User data:", error);
    return null;
  }
};