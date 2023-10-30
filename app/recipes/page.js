
import React from 'react';
import 'tailwindcss/tailwind.css';
import { AiFillDelete } from "react-icons/ai";
import { AiTwotoneEdit } from "react-icons/ai"; 
import Link from 'next/link';
import NavBar from '../NavBar';



const recipes = async () => {

  
  const res = await fetch('http://localhost:3002/api/v1/recipes/getall', { cache: 'no-store' });
  console.log(res);
  const recipeData = await res.json();

  
 
  return (
    <div className="flex flex-col items-center"> {/* Center the content */}
      <Link href='/' className="bg-sky-600 text-black p-2 rounded-lg hover:text-white transition-colors absolute top-4 right-40">
        Add new
      </Link>
      
      <div className="max-w-screen-md m-20">
        <table className="w-full table-fixed  border p-2">
          <thead>
            <tr className="border p-2">
             
              <th>Name</th>
              <th></th> 
              
            </tr>
          </thead>
          <tbody className="border p-2">
             {recipeData.map((data) => (
              <tr  className="border p-2" key={data.id}>
                <td className="border p-2">{data.name}</td>
                <td colSpan={2} className="flex items-center justify-center gap-4 p-6">
  <div className="hover:text-red-700">
    <AiFillDelete />
  </div>
  <div className="hover:text-sky-500">
    <AiTwotoneEdit />
  </div>
</td>        
   </tr>
            ))}
          </tbody>  
        </table>
      </div>
      <NavBar/>
    </div>
  );
};


export default recipes;



