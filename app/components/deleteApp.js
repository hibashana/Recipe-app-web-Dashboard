// 'use client'
// import React, { useState } from 'react';
// import axios from 'axios';

// const DeleteApp = () => {
//   const [id, setAppId] = useState('');
//   const [message, setMessage] = useState('');

//   const URL=`${baseURL}/app/${id}`;

//   const handleDelete = () => {
//     // Send a DELETE request to your API to delete the user by ID
//     axios
//       .delete(`${URL}`)
//       .then((response) => {
//         setMessage('App deleted successfully');
//       })
//       .catch((error) => {
//         setMessage('Error deleting app');
//       });
//   };

//   return (
//     <div>
//       <div className="mb-4">
//         <label className="block text-gray-700">App ID:</label>
//         <input
//           type="text"
//           value={id}
//           onChange={(e) => setAppId(e.target.value)}
//           className="w-full p-2 border border-gray-300 rounded"
//         />
//       </div>
//       <button
//         onClick={handleDelete}
//         className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
//       >
//         Delete App
//       </button>
//       <p className="mt-2 text-red-700">{message}</p>
//     </div>
//   );
// };

// export default DeleteApp;