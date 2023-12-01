import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { baseURL } from "@/app/utils/constants";
import EditSteps from "../../components/editStep";

export default async function EditStep({ params }) {
  const { stpid} = params;
  console.log(`idid=${stpid}`);
  const stepData = await getStepById(stpid);
  console.log(`stepData=${stepData}`);
  if (!stepData) {
    return null; // Render loading or error state while fetching data
  }

  return <EditSteps{...stepData}/>;
}
const getStepById = async (idn) => {
  try {
    console.log(`idid=${idn}`);

    const URL=`${baseURL}/steps/${idn}`;

   
    const res = await axios.get(`${URL}`, {
      headers: {
        'Content-Type': 'application/json',
        "Cache-Control": "no-store",
       
      },
      
    });
    console.log(`res=${res}`);

    if (!res.data) {
      throw new Error("Failed to fetch step");
    }

    const step = res.data;
    

    if (!step) {
      console.error("step data is undefined");  
    }

    const { stpid, description} = step;
    // console.log(`name=${stpid}`);

    return {
      stpid,
      description,

    };
  } catch (error) {
    console.error("Error fetching step data:", error);
    return null;
  }
};