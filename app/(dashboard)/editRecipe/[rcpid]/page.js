import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { baseURL } from "@/app/utils/constants";
import EditRecipes from "../../components/editRecipesForm";



export default async function EditRecipe({ params }) {
  const { rcpid} = params;
  console.log(`idid=${rcpid}`);
  const recipesData = await getRecipesById(rcpid);
  console.log(`recipesData=${recipesData}`);
  if (!recipesData) {
    return null; // Render loading or error state while fetching data
  }

  return <EditRecipes{...recipesData}/>;
}
const getRecipesById = async (idn) => {
  try {
    console.log(`idid=${idn}`);

    const URL=`${baseURL}/recipes/${idn}`;

   
    const res = await axios.get(`${URL}`, {
      headers: {
        'Content-Type': 'multipart/form-data',
        "Cache-Control": "no-store",
       
      },
      
    });
    console.log(`res=${res}`);

    if (!res.data) {
      throw new Error("Failed to fetch Recipe");
    }

    const recipe = res.data;
    

    if (!recipe) {
      console.error("Recipe data is undefined");  
    }

    const { rcpid,name,description,image } = recipe;
    console.log(`name=${rcpid}`);

    return {
      rcpid,
      name,
      description,
      image,
    };
  } catch (error) {
    console.error("Error fetching recipe data:", error);
    return null;
  }
};