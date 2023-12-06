import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Editapp from "@/app/(auth)/appList/components/editApplistForm";
import { baseURL } from "@/app/utils/constants";



export default async function EditApp({ params }) {
  const { id } = params;
  console.log(`idid=${id}`);
  const appData = await getAppById(id);
  console.log(`appData=${appData}`);
  if (!appData) {
    return null; // Render loading or error state while fetching data
  }

  return <Editapp{...appData} />;
}
const getAppById = async (idn) => {
  try {
    console.log(`idid=${idn}`);

    const URL=`${baseURL}/app/${idn}`;

    // const url = `http://localhost:3002/api/v1//app/${idn}`;
    const res = await axios.get(`${URL}`, {
      headers: {
        'Content-Type': 'multipart/form-data',
        "Cache-Control": "no-store",
       
      },
      // responseType: 'arraybuffer',
    });
    console.log(`res=${res}`);

    if (!res.data) {
      throw new Error("Failed to fetch App");
    }

    const app = res.data;
    

    if (!app) {
      console.error("App data is undefined");
      // Handle the error appropriately, e.g., display an error message to the user.
    }

    const { id, name, description,packageName,image } = app;
    console.log(`name=${id}`);

    // const imageBlob = new Blob([res.data], { type: 'image/jpeg' }); // You may need to specify the correct image type
    // const imageUrl = URL.createObjectURL(imageBlob);

    return {
      id,
      name,
      description,
      packageName,
      // imageUrl,
      image,
    };
  } catch (error) {
    console.error("Error fetching app data:", error);
    // Handle the error appropriately, e.g., display an error message to the user.
    return null;
  }
};