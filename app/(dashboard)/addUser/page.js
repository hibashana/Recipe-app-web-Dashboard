
import Head from 'next/head';
import CreateUser from '../components/addUserForm';

const AddUser= () => {
  return (
    <div>
      <Head>
        <title>Register User</title>
      </Head>
      {/* <h1>Create App</h1> */}
      <CreateUser/>
    </div>
  );
};

export default AddUser;