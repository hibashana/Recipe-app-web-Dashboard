import Head from 'next/head';
import CreateBanner from '../components/addBannerForm';


const AddBanner= () => {
  return (
    <div>
      <Head>
        <title>Create Banner</title>
      </Head>
      {/* <h1></h1> */}
      <CreateBanner/>
    </div>
  );
};

export default AddBanner;