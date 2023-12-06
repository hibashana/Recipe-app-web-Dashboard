import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import EditaBanner from "@/app/(dashboard)/banner/components/editBannerForm";

import { baseURL } from "@/app/utils/constants";

export default async function EditBanner({ params }) {
  const { id } = params;
  console.log(`idid=${id}`);
  const bannerData = await getBannerById(id);
  console.log(`bannerData=${bannerData}`);
  if (!bannerData) {
    return null; // Render loading or error state while fetching data
  }

  return <EditaBanner{...bannerData} />;
}
const getBannerById = async (idn) => {
  try {
    console.log(`idid=${idn}`);

    const URL=`${baseURL}/banner/${idn}`;

    const res = await axios.get(`${URL}`, {
      headers: {
        'Content-Type': 'multipart/form-data',
        "Cache-Control": "no-store",
       
      },
     
    });
    console.log(`res=${res}`);

    if (!res.data) {
      throw new Error("Failed to fetch Banner");
    }

    const banner = res.data;
    

    if (!banner) {
      console.error("Banner data is undefined");
      // Handle the error appropriately, e.g., display an error message to the user.
    }

    const { id, name, image } = banner;
    console.log(`name=${id}`);

    // const imageBlob = new Blob([res.data], { type: 'image/jpeg' }); // You may need to specify the correct image type
    // const imageUrl = URL.createObjectURL(imageBlob);

    return {
      id,
      name,
      image,
    };
  } catch (error) {
    console.error("Error fetching banner data:", error);
    // Handle the error appropriately, e.g., display an error message to the user.
    return null;
  }
};