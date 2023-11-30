
import Head from 'next/head';
import CreateApp from '../../components/addApplistForm';

const AddApp= () => {
  return (
    <div>
      <Head>
        <title>Create Applist</title>
      </Head>
      {/* <h1>Create App</h1> */}
      <CreateApp/>
    </div>
  );
};

export default AddApp;