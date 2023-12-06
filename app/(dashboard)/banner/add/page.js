// import Head from 'next/head';
// import CreateBanner from '../components/addBannerForm';


// const AddBanner= () => {
//   return (
//     <div>
//       <Head>
//         <title>Create Banner</title>
//       </Head>
//       {/* <h1></h1> */}
//       <CreateBanner/>
//     </div>
//   );
// };

// export default AddBanner;


'use client';

import { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import { baseURL } from '../../../utils/constants';
// import NavBar from '../NavBar';

const CreateBanner = () => {
  const router = useRouter(); 
  const [errorMessage, setErrorMessage] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    image: null,
    appID:localStorage.getItem('appId'),
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log(`image=${file}`);
    setFormData({ ...formData, image: file });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    const appId = localStorage.getItem('appId');
   // setFormData({ ...formData, appID: appId });
    console.log(appId);
    const URL=`${baseURL}/banner/addbanner`;
    // console.log(token);

    axios
      .post(`${URL}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      })

   

      .then((response) => {
        // console.log(`res=${response.status}`);
        console.log('Banner created:', response.data);
       
        toast.success(`Banner created.`);

        router.push('/banner');
      })
      .catch((error) => {
        if (error.response) {  
          console.error('Response error data:', error.response.data);
          setErrorMessage(error.response.data.message || 'An error occurred.');
        } else if (error.request) {
          
          console.error('Request error:', error.request);
          setErrorMessage('Failed to create user. Please try again later.');
        } else {
         
          console.error('Other error:', error.message);
          setErrorMessage('An unexpected error occurred. Please try again later.');
        }
      });
      // .catch((error) => {
      //   toast.error(`Failed to create banner `);
      //   console.error('Error creating banner:', error);
      //   Handle the error and display an error message if needed
      // });
  };

  return (
    <div className="grid place-items-center">
    <div>
      <h1 className="text-xl font-bold text-center p-2">Add New Banner</h1>
      <form onSubmit={handleSubmit} method="POST" encType="multipart/form-data"  className="shadow-2xl bg-white rounded-md p-8">
        <div className="mb-4">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-green-600"
            required
          />
        </div>
        <div className="mb-4">
          <label>Image:</label>
          <input
            type="file"
            accept=".png, .jpg, .jpeg"
            name="image"
            onChange={handleImageChange}
            className="w-full flex px-4 py-2 mt-2 border rounded-md"
            required
          />
        </div>
        <button className="bg-emerald-600 hover:bg-emerald-700 block mx-auto text-white font-bold px-6 py-2 rounded-md" type="submit">
          Add Banner
        </button>
        <ToastContainer autoClose={3000} />
        {/* <NavBar/> */}
        {errorMessage && (
          <div className="text-red-600 text-center m-2">
            {/* bg-red-500 text-white m-1 rounded-md */}
            {errorMessage}
          </div>
        )}
      </form>
      
    </div>
    
  </div>
  
  );
};

export default CreateBanner;
