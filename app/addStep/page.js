import Head from 'next/head';
import CreateStep from '../components/addStep';
const AddStep = () => {
  return (
    <div>
      <Head>
        <title>Create Step</title>
      </Head>
      {/* <h1>Create Step</h1> */}
      <CreateStep/>
    </div>
  );
};

export default AddStep;