import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { baseURL } from "@/app/utils/constants";
import EditaUser from "../../components/editUserForm";



export default async function EditUser({ params }) {
  // setTimeout(() => {
  //   window.location.reload();
  // }, 3000);
  const { id} = params;
  console.log(`idid=${id}`);
  const userData = await getUserById(id);
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

    const { id, name,email,contact,username,password,} = user;
    console.log(`name=${id}`);

    return {
      id,
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