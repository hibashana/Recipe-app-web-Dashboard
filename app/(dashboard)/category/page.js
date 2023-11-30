"use client";
import React, { useState, useEffect } from "react";
import "tailwindcss/tailwind.css";
import { AiFillDelete, AiTwotoneEdit } from "react-icons/ai";
import { HiPlus } from "react-icons/hi";
import axios from "axios";
import Link from "next/link";
// import NavBar from "../NavBar";
import { baseURL, imageURL } from "../../utils/constants";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

// Create a new component for the table rows
const CategoryRow = ({ data, onDelete, onView }) => (
  <tr className="border p-4" key={data.ctgyid}>
    <td className="border p-6">{data.name}</td>
    <td className="border p-6">
      {data.Recipes.length} Recipes {" "}
      <span
        className="flex justify-center text-emerald-600 hover:text-blue-500 cursor-pointer"
        onClick={() => onView(data.ctgyid)}
      >
        View
      </span>
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
          href={`/editCategory/${data.ctgyid}`}
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

  useEffect(() => {
    fetchData();
    const tokenFromStorage = localStorage.getItem("token");
    setToken(tokenFromStorage);
  }, [currentPage]);

  const fetchData = async () => {
    try {
      const appId = localStorage.getItem("appId");
      const response = await fetch(
        `${baseURL}/category/all_by_filter?appID=${appId}&page=${currentPage}`,
        { cache: "no-store" }
      );
      const data = await response.json();
      setCategoryData(data.data);
      setDataResponse(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearch = async () => {
    try {
      const appId = localStorage.getItem("appId");
      const response = await fetch(
        `${baseURL}/category/all_by_filter?appID=${appId}&name=${searchName}&page=${currentPage}`,
        { cache: "no-store" }
      );
      const data = await response.json();
      setCategoryData(data.data);
      setDataResponse(data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
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
        setTimeout(() => {
          window.location.reload();
        }, 3000); // Reload the page after 3 seconds
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

const handlePremiumChange = async (rcpid, isPremium) => {
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
        toast.success(`Premium status updated for Recipe ${rcpid}`);
        fetchData(); // Refresh the data after the update
      } else {
        toast.error(`Failed to update Premium status for Recipe ${rcpid}`);
        console.error(`Failed to update Premium status for Recipe ${rcpid}`);
      }
    } catch (error) {
      toast.error(`An error occurred: ${error.message}`);
      console.error(`An error occurred: ${error.message}`);
    }
  };


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
      {!token ? (
        <div className="m-7">
          <p className="text-2xl">You are not logged in. Please login.</p>
          <button
            className="block mx-auto bg-emerald-600 text-white px-4 py-2 rounded-md m-3"
            type="submit"
            onClick={() => router.push("/")}
          >
            Go to Login
          </button>
        </div>
      ) : (
        <>
          <div className="rounded overflow-hidden m-4">
            <div className="fixed bottom-10 right-10">
              <Link href="/addCategory">
                <button className="bg-emerald-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full ">
                  <HiPlus className="text-2xl" />
                </button>
              </Link>
            </div>
          </div>

          <div className="flex mx-12 p-2">
            <div className="flex border border-emerald-400 rounded mx-60">
              <input
                type="text"
                className="block w-full px-4 py-2 text-black bg-white border rounded-md focus:border-emerald-600  focus:outline-none  focus:ring-opacity-40"
                placeholder="Search..."
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
              />
              <button
                className="px-4 text-white bg-emerald-600 border-l rounded "
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
            <h1 className="text-center text-xl p-2 font-bold ">
              {dataResponse.totalCount} Categories
            </h1>
          </div>

          <div className="max-w-screen-md items-center p-2">
            <table className="w-full table-fixed text-center items-center border-black ">
              <thead>
                <tr className="border p-2 bg-emerald-600 text-white">
                  <th className="border p-2">Name</th>
                  <th className="border p-2">
                    Total Recipes{" "}
                    
                  </th>
                  <th className="border p-2">Action</th>
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
                          <table className="w-full table-fixed text-center border-black bg-emerald-100">
                            <thead>
                              <tr className="border-black p-2 bg-emerald-600 text-white">
                                <th className="border w-1/6">Image</th>
                                <th className="border w-1/6">Name</th>
                                <th className="border w-3/6">Description</th>
                                <th className="border w-1/6">Premium</th>
                                <th className="border w-1/6">Action</th>
                                <th className=" w-1/6"></th>
                                <th className="w-1/6"></th>
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
                                         onChange={() => handlePremiumChange(recipe.rcpid, recipe.premium)}
                                      />
                                      
                                    </label>
                                  </td>
                                  <td className="flex flex-row items-center justify-center gap-4 p-8">
                                    <div
                                      className="rounded-full p-2 bg-white  hover:bg-red-700 hover:text-white transition-colors"
                                      onClick={() => deleteRecipes(recipe.rcpid, recipe.name)}>
                                      <AiFillDelete />
                                    </div>
                                    <div className="rounded-full p-2 bg-white hover:bg-sky-400 hover:text-white transition-colors">
                                      <Link
                                        className=""
                                        href={`/editRecipe/${recipe.rcpid}`}
                                      >
                                        <AiTwotoneEdit />
                                      </Link>
                                    </div>
                                  </td>
                                  <td></td>
                                  <td className="w-1/4 flex justify-center text-center flex-row gap-4  " colSpan={3}>
                                    <div className="hover:text-sky-500">
                                      <Link href={`/ingredients`}>Ingredients</Link>
                                    </div>
                                    <div className="hover:text-sky-500">
                                      <Link href={`/step`}>Steps</Link>
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
                className={`mx-2 p-2 border rounded-lg ${
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
          <ToastContainer autoClose={3000} />
        </>
      )}
    </div>
  );
};

export default Category;
