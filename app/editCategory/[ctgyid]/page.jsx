import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { baseURL } from "@/app/utils/constants";
import EditCategorylist from "../../components/editCategoryListForm";



export default async function EditCategory({ params }) {
  const { ctgyid} = params;
  console.log(`idid=${ctgyid}`);
  const categoryData = await getCategoryById(ctgyid);
  console.log(`categoryData=${categoryData}`);
  if (!categoryData) {
    return null; // Render loading or error state while fetching data
  }

  return <EditCategorylist{...categoryData}/>;
}
const getCategoryById = async (idn) => {
  try {
    console.log(`idid=${idn}`);

    const URL=`${baseURL}/category/${idn}`;

   
    const res = await axios.get(`${URL}`, {
      headers: {
        'Content-Type': 'application/json',
        "Cache-Control": "no-store",
       
      },
      
    });
    console.log(`res=${res}`);

    if (!res.data) {
      throw new Error("Failed to fetch Category");
    }

    const category = res.data;
    

    if (!category) {
      console.error("Category data is undefined");  
    }

    const { ctgyid, name } = category;
    console.log(`name=${ctgyid}`);

    return {
      ctgyid,
      name,
    };
  } catch (error) {
    console.error("Error fetching Category data:", error);
    return null;
  }
};