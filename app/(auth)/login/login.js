'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { baseURL } from '../../utils/constants';
import { FaRegCircleUser } from 'react-icons/fa6';
import { RiEyeCloseFill, RiEyeFill, RiLockPasswordLine } from 'react-icons/ri';
import { FaEyeSlash } from 'react-icons/fa';
import { ClipLoader } from 'react-spinners';

// import LoginLayout from '../login/layout';

export default function LoginForm() {
  // const [loading, setLoading] = useState(false);
  // const [showLoading, setShowLoading] = useState(false); // New state for showing loading spinner
  useEffect(() => {
    // setLoading(true);
    // setTimeout(() => {
    //   setLoading(false);
    //   setShowLoading(false); // Turn off loading spinner after loading
    // }, 5000);
  }, []);

  const router = useRouter(); // Create a router object
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };



  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const URL = `${baseURL}/user/admin-login`;
      console.log(`url=${URL}`);
      const response = await fetch(`${URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const data = await response.json();
        const type = data.type;
        console.log(type);

        if (data.type == 'admin') {
        const token = data.token; // Extract the token from the response
        console.log(token);
        localStorage.setItem('token', token); 

        // alert('Logged in successfully!');        
        console.log('Successful login', data);

        setLoading(true);
        
        // setShowLoading(true); // Show loading spinner when redirecting
        router.push('/appList');
      // } else {
      //   setErrorMessage('Invalid user type. Only admin users are allowed.');
      //   console.error('Invalid user type');
      // }
        }
        
      } else {
        setErrorMessage('Incorrect username or password.');
        console.error('Login failed');
      }
    
    } catch (error) {
      console.error('Error:', error);
    }finally {
      setLoading(false);
    }
  };

  return (
    <main>
      {/* <LoginLayout/> */}
      <div className="grid place-items-center h-screen justify-center">
        {!loading ? (
          // showLoading
          <div className="shadow-lg p-5 rounded-lg border-t-4  border-green-400" >
            <h1 className="text-xl text-center font-bold my-4">Login</h1>

            <form onSubmit={handleLogin} className="flex flex-col gap-4"
               style={{ width: '90%', height: '300px' }}>
              <div className="input-container flex">
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
                <FaRegCircleUser className="input-icon " />
              </div>
              <div className="input-container">
                <RiLockPasswordLine className="input-icon " />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Password"
                  className="pr-10" // Add some padding to the right to accommodate the icon
                />

                <label className="absolute top-1/2 transform -translate-y-1/2 right-3 cursor-pointer"
                 style={{ color: '#9CA3AF'}}>
                  {showPassword ? (
                    <RiEyeFill onClick={togglePasswordVisibility} />
                  ) : (
                    <FaEyeSlash onClick={togglePasswordVisibility} />
                  )}
                </label>
              </div>
              <button className="bg-green-600 text-white font-bold rounded-full cursor-pointer px-12 py-2" type="submit">
                Login
              </button>
            </form>

            {errorMessage && <p className="text-red-500 mb-2">{errorMessage}</p>}
          </div>
        ) : (
          <ClipLoader color={'#36d7b7'}size={100} />
        )}
      </div>
    </main>
  );
}
