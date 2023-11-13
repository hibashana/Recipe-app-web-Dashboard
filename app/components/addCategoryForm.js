

// 'use client';

// import { useState } from 'react';
// import axios from 'axios';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { useRouter } from 'next/navigation';
// import { baseURL } from '../utils/constants';

// const CreateCategory = () => {
//   const router = useRouter(); 

//   const [formData, setFormData] = useState({
//     name: '',
//     description: '',
//     packageName: '',
//     image: null, // Initialize image as null
//   });

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     console.log(`image=${file}`);
//     setFormData({ ...formData, image: file });
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const token = localStorage.getItem('token');
//     const URL=`${baseURL}/app/create`;
//     // console.log(token);

//     // Send a POST request to your API to create the app using Axios
//     axios
//       .post(`${URL}`, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           'Authorization': `Bearer ${token}`,
//         },
//       })

   

//       .then((response) => {
//         // console.log(`res=${response.status}`);
//         console.log('App created:', response.data);
       
//         toast.success(`App  created.`);

//         setTimeout(() => {
//           window.location.reload();
//         }, 3000); // Reload the page after 3 seconds
//         // console.log('Successful login', data);
//         // You can handle success or display a success message here

//         router.push('/appList');
//       })
//       .catch((error) => {
//         toast.error(`Failed to create app `);
//         console.error('Error creating app:', error);
//         // Handle the error and display an error message if needed
//       });
//   };

//   return (
//     <div className="grid place-items-center h-screen">
//       <div>
//         <h1 className="text-xl font-bold  text-center">Add New App</h1>
//         <form onSubmit={handleSubmit}  method="POST" encType="multipart/form-data" >
//           <div>
//             <label>Name:</label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div>
//             <label>Description:</label>
//             <textarea
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
             
//             />
//           </div>
//           <div>
//             <label>Package Name:</label>
//             <input
//               type="text"
//               name="packageName"
//               value={formData.packageName}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div>
//             <label>Image:</label>
//             <input
//               type="file"
//               accept=".png, .jpg, .jpeg"
//               name="image"
//               onChange={handleImageChange}
//               required
//             />
//           </div>
//           <button
//             className="bg-green-600 text-white font-bold  cursor-pointer px-6 py-2"
//             type="submit"
//           >
//             Add App
//           </button>
//           <ToastContainer autoClose={3000} /> {/* Add this line to display toasts */}
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CreateCategory;



'use client'

import React, { useState } from 'react';
import axios from 'axios'; // Import Axios
import NavBar from '../NavBar';
import {baseURL,imageURL } from '../utils/constants';
import { useRouter } from 'next/navigation';


import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateCategory = () => {
  const router = useRouter(); 

  const [formData, setFormData] = useState({
    name: '',

  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

   

    const token = localStorage.getItem('token');
     const appId = localStorage.getItem('appId');
    // console.log(appId);

   
    axios.post(`${baseURL}/category/addcategory`, {
      name:formData.name,
      appID:appId
    }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          // 'app-id': appId,

        },
        
      })
      .then((response) => {
        console.log('Category created:', response.data);
        toast.success('Category added successfully');
        setTimeout(() => {
                    window.location.reload();
                  }, 4000);
         router.push('/category');
      })
      .catch((error) => {
        console.error('Error creating category:', error);
        toast.error(`Failed to create app `);
       

       
      });
  };

  return (
<div className="flex flex-col items-center h-screen justify-center bg-gray-100">
      <form
        className="shadow-2xl bg-white p-8 rounded-md"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label className="text-gray-800">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-gray-400"
          />
        </div>
        <button className="block mx-auto bg-emerald-600  text-white px-4 py-2 rounded-md" type="submit">
          Create category
        </button>
      </form>
      <ToastContainer autoClose={3000} />
      <NavBar />
    </div>
  );
 
};

export default CreateCategory;  