"use client";
import React, { useState, useEffect } from "react";
import "tailwindcss/tailwind.css";
import { AiFillDelete, AiTwotoneEdit } from "react-icons/ai";
import { HiPlus } from "react-icons/hi";
import { ClipLoader } from 'react-spinners';
import axios from "axios";
import Link from "next/link";
// import NavBar from "../NavBar";
import { baseURL, imageURL } from "../../utils/constants";
import { Toaster, toast } from 'sonner'
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import tablesize from "../../tablestyle.css";

// Create a new component for the table rows
const CategoryRow = ({ data, onDelete, onView }) => (
  <tr className="border p-4" key={data.ctgyid}>
    <td className="border p-6">{data.name}</td>
    <td className="border p-3">
    <div className={data.Recipes.length === 0 ? 'text-red-500' : ''}>
        {data.Recipes.length} Recipes
      </div>{" "}
      {/* {data.Recipes.length} Recipes {" "} */}
      <div className="flex gap-11 flex-row justify-center p-1">
      <div
        className="flex text-lg justify-center text-emerald-600 hover:text-blue-500 cursor-pointer "
        onClick={() => onView(data.ctgyid)}
      >
        View
        </div>
      <Link href={`/category/categoryRecipe?categoryId=${data.ctgyid}`}>
                    <div className="flex  rounded-full justify-center text-emerald-600 hover:text-blue-500 cursor-pointer">
                       Add 
                    </div>
                  </Link>
                 
                  </div>
    </td>
    <td colSpan={2} className="flex items-center justify-center gap-4 p-6">
      <div
        className="rounded-full p-2 bg-emerald-100 hover:bg-red-700 hover:text-white transition-colors"
        onClick={() => onDelete(data.ctgyid, data.name)}
      >
        <AiFillDelete />
      </div>
      <div className="rounded-full p-2 bg-emerald-100 hover:bg-sky-400 hover:text-white transition-colors">
        <Link
          className=""
          href={`/category/edit/${data.ctgyid}`}
        >
          <AiTwotoneEdit />
        </Link>
      </div>
    </td>
  </tr>
);

const Category = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [dataResponse, setDataResponse] = useState([]);
  const [visibleCategory, setVisibleCategory] = useState(null);
  const [searchName, setSearchName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [token, setToken] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
    const tokenFromStorage = localStorage.getItem("token");
    setToken(tokenFromStorage);
  }, [currentPage]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const appId = localStorage.getItem("appId");
      const response = await fetch(
        `${baseURL}/category/all_by_filter?appID=${appId}&name=${searchName}&page=${currentPage}`,
        { cache: "no-store" }
      );
      const data = await response.json();
      setCategoryData(data.data);
      setDataResponse(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  // const handleSearch = async () => {
  //   try {
  //     const appId = localStorage.getItem("appId");
  //     const response = await fetch(
  //       `${baseURL}/category/all_by_filter?appID=${appId}&name=${searchName}&page=${currentPage}`,
  //       { cache: "no-store" }
  //     );
      
  //     const data = await response.json();
  //     setCategoryData(data.data);
  //     setDataResponse(data);
  //   } catch (error) {
  //     console.error("Error fetching search results:", error);
  //   }
    
  // };

  const apply = () => {
    setCurrentPage(1); 
    fetchData();
    //handleSearch();
  };


  const deleteApp = async (id, name) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete the category "${name}"?`
    );
    if (confirmDelete) {
      try {
        const token = localStorage.getItem("token");
        const URL = `${baseURL}/category/${id}`;
        const response = await axios.delete(`${URL}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          toast.success(`Category ${name} has been deleted.`);
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        } else {
          toast.error(`Failed to delete Category ${name}`);
        }
      } catch (error) {
        toast.error(`An error occurred: ${error.message}`);
      }
    }
  };

  const deleteRecipes = async (rcpid, name) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete the recipe "${name}"?`);
    if (confirmDelete) {
    try {
      const token = localStorage.getItem('token');
      const URL = `${baseURL}/recipes/${rcpid}`;
      const response = await axios.delete(`${URL}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        toast.success(`Recipes ${name} has been deleted.`);
        console.log(`Recipes ${name} has been deleted.`);
        // setTimeout(() => {
        //   window.location.reload();
        // }, 3000); // Reload the page after 3 seconds
      } else {
        // Handle any errors that occur during the API call.
        toast.error(`Failed to delete Recipes ${name}`);
        console.error(`Failed to delete Recipes ${name}`);
      }
    } catch (error) {
      // Handle network errors or other exceptions.
      toast.error(`An error occurred: ${error.message}`);
      console.error(`An error occurred: ${error.message}`);
    }
  }
  };

const handlePremiumChange = async (rcpid,name,isPremium) => {
    try {
      const token = localStorage.getItem('token');
      const URL = `${baseURL}/recipes/change_premium_status/?id=${rcpid}`;
      const response = await axios.get(
        URL,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        toast.success(`Premium status updated for Recipe ${name}`);
        fetchData(); // Refresh the data after the update
      } else {
        toast.error(`Failed to update Premium status for Recipe ${name}`);
        console.error(`Failed to update Premium status for Recipe ${name}`);
      }
    } catch (error) {
      toast.error(`An error occurred: ${error.message}`);
      console.error(`An error occurred: ${error.message}`);
    }
  };


  const deleteRecipeFromCategory = async (id, name) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete the recipe "${name}"?`);
    if (confirmDelete) {
      try {
        const token = localStorage.getItem('token');
        const URL = `${baseURL}/category/delete_category_recipe/${id}`;
        const response = await axios.delete(`${URL}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          toast.success(`Recipe ${name} has been removed from the category.`);
          console.log(`Recipe ${name} has been removed from the category.`);
          // fetchData();
          setTimeout(() => {
            window.location.reload();
          }, 3000); // Reload the page after 3 seconds
        } else {
          toast.error(`Failed to remove recipe ${name} from the category.`);
          console.error(`Failed to remove recipe ${name} from the category.`);
        }
      } catch (error) {
        toast.error(`An error occurred: ${error.message}`);
        console.error(`An error occurred: ${error.message}`);
      }
    }
  };

  // const handleRecipesClick = (rcpid) => {
  //   localStorage.setItem('recipesId', rcpid);
  //   console.log(rcpid);
  // };

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleViewRecipes = (categoryId) => {
    setVisibleCategory(visibleCategory === categoryId ? null : categoryId);
  };

  return (
    <div className="flex flex-col ">
      {loading ? (
     <div className="flex h-screen justify-center my-32">
      <ClipLoader color={'#36d7b7'} size={100} />
      </div>
    ) : (
        <>
          <div className="rounded overflow-hidden m-4">
            <div className="fixed bottom-6 right-10">
              <Link href="/category/add">
                <button className="bg-emerald-600 hover:bg-green-700 text-white font-bold p-3 rounded-full ">
                  <HiPlus className="text-2xl" />
                </button>
              </Link>
            </div>
          </div>

          <div className="flex  p-2">
            <div className="flex border border-emerald-400 mr-auto rounded ">
              <input
                type="text"
                className="block w-full px-4  text-black bg-white border rounded-md focus:border-emerald-600  focus:outline-none  focus:ring-opacity-40"
                placeholder="Search..."
                value={searchName}
                onChange={(e) => setSearchName(e.target.value??"")}
              />
              <button
                className="px-4 text-white bg-emerald-600 border-l rounded "
                onClick={apply}
              >
                Search
              </button>
            </div>
            <h1 className="ml-auto text-center text-xl  p-2 font-bold ">
              {dataResponse.totalCount} Categories
            </h1>
          </div>

          <div className={tablesize.fullWidthTable}>
        
            <table className="w-full table-fixed text-center items-center border-black ">
              <thead>
                <tr className=" p-2 bg-emerald-600 text-white">
                  <th className="border p-2">Name</th>
                  <th className="border p-2">
                    Total Recipes{" "}
                    
                  </th>
                  <th className=" p-2">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {categoryData.map((data) => (
                  <React.Fragment key={data.ctgyid}>
                    <CategoryRow
                      data={data}
                      onDelete={deleteApp}
                      onView={handleViewRecipes}
                    />
                    {data.Recipes.length > 0 && visibleCategory === data.ctgyid && (
                      <tr>
                        <td colSpan={3}>
                          <table className="w-full table-fixed text-center  bg-emerald-100">
                            <thead>
                              <tr className="border-black p-2 bg-emerald-600 text-white">
                                <th className="border w-1/6">Image</th>
                                <th className="border w-1/6">Name</th>
                                <th className="border w-3/6">Description</th>
                                <th className="border w-1/6">Premium</th>
                                {/* <th className="border w-1/6">Action</th> */}
                                <th className=" w-1/6"></th>
                                <th className="w-1/6"></th>
                                <th className="border w-1/6">Remove</th>
                                
                              </tr>
                            </thead>
                            <tbody>
                              {data.Recipes.map((recipe) => (
                                <tr className="border p-2" key={recipe.rcpid}>
                                  <td className="border p-2">
                                    <img
                                      src={`${imageURL}${recipe.image}`}
                                      className="w-20 h-20 object-cover"
                                    />
                                  </td>
                                  <td className="border p-2">{recipe.name}</td>
                                  <td className="border p-2">
                                    {recipe.description}
                                  </td>
                                  <td className="border p-2">
                                    <label className="flex  cursor-pointer">
                                    <input
                                        className='cursor-pointer'
                                         type="checkbox"
                                         checked={recipe.premium}
                                         onChange={() => handlePremiumChange(recipe.rcpid,recipe.name,recipe.premium)}
                                      />
                                      
                                    </label>
                                  </td>
                                  {/* <td className="flex flex-row items-center justify-center gap-4 p-8">
                                    <div
                                      className="rounded-full p-2 bg-emerald-100  hover:bg-red-700 hover:text-white transition-colors"
                                      onClick={() => deleteRecipes(recipe.rcpid, recipe.name)}>
                                      <AiFillDelete />
                                    </div>
                                    <div className="rounded-full p-2 bg-emerald-100 hover:bg-sky-400 hover:text-white transition-colors">
                                      <Link
                                        className=""
                                        href={`/editRecipe/${recipe.rcpid}`}
                                      >
                                        <AiTwotoneEdit />
                                      </Link>
                                    </div>
                                  </td> */}
                                  <td></td>
                                 
                                  <td className=" w-1/6 p-8 flex justify-center text-center flex-row gap-4" colSpan={2}>
                                    <div className="hover:text-sky-500">
                                      <Link href={`/recipes/${recipe.rcpid}/ingredients`}>Ingredients</Link>
                                    </div>
                                    <div className="hover:text-sky-500">
                                      <Link href={`/recipes/${recipe.rcpid}/step`}>Steps</Link>
                                    </div>
                                  </td>
                                  <td className='p-4 border'>
                                  <div
                                  
                               className="w-20 justify-center rounded-full text-red-500 border hover:bg-white border-red-500 transition-colors hover:text-red-700 cursor-pointer"
                               onClick={() =>deleteRecipeFromCategory(recipe.CategoryRecipes.id, recipe.name)}
                               >
                               Remove
                              </div>
                              </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>

            <div className="flex p-2">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className={`mr-2 p-2 border rounded-lg ${
                  currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                Previous
              </button>
              <button
                onClick={nextPage}
                disabled={!dataResponse.hasNext}
                className={`mx-2 p-2 border rounded-lg ${
                  !dataResponse.hasNext ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                Next
              </button>
            </div>
          </div>

          {/* <NavBar /> */}
          <Toaster richColors autoClose={3000} />
          {/* <ToastContainer autoClose={3000} /> */}
        </>
      )}
    </div>
  );
};

export default Category;
