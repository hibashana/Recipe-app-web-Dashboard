
import Head from 'next/head';
import CreateCategory from '../components/addCategoryForm';

const AddCategory = () => {
  return (
    <div>
      <Head>
        <title>Create category</title>
      </Head>
      <h1>Create Category</h1>
      <CreateCategory />
    </div>
  );
};

export default AddCategory;