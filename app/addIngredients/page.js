
import Head from 'next/head';
import CreateIngredient from '../components/addIngredientForm';

const AddIngredients = () => {
  return (
    <div>
      <Head>
        <title>Create Ingredient</title>
      </Head>
      {/* <h1>Create Ingredient</h1> */}
      <CreateIngredient />
    </div>
  );
};

export default AddIngredients;