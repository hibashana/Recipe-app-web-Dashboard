import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { baseURL } from "@/app/utils/constants";
import EditIngredients from "../../components/editIngredient";



export default async function EditIngredient({ params }) {
  const { intrdid} = params;
  console.log(`idid=${intrdid}`);
  const ingredientData = await getIngredientById(intrdid);
  console.log(`ingredientData=${ingredientData}`);
  if (!ingredientData) {
    return null; // Render loading or error state while fetching data
  }

  return <EditIngredients{...ingredientData}/>;
}
const getIngredientById = async (idn) => {
  try {
    console.log(`idid=${idn}`);

    const URL=`${baseURL}/ingredients/${idn}`;

   
    const res = await axios.get(`${URL}`, {
      headers: {
        'Content-Type': 'application/json',
        "Cache-Control": "no-store",
       
      },
      
    });
    console.log(`res=${res}`);

    if (!res.data) {
      throw new Error("Failed to fetch ingredient");
    }

    const ingredient = res.data;
    

    if (!ingredient) {
      console.error("ingredient data is undefined");  
    }

    const { intrdid, name_qnty} = ingredient;
    console.log(`name=${intrdid}`);

    return {
      intrdid,
      name_qnty,

    };
  } catch (error) {
    console.error("Error fetching ingredient data:", error);
    return null;
  }
};