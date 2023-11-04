import Head from 'next/head';
import CreateRecipe from '../components/addRecipeForm';
const AddRecipes = () => {
  return (
    <div>
      <Head>
        <title>Create Recipes</title>
      </Head>
      <h1>Create Recipes</h1>
      <CreateRecipe/>
    </div>
  );
};

export default AddRecipes;