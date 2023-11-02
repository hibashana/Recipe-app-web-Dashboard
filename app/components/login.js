
'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {baseURL} from '../utils/constants'

export default function LoginForm() {
  const router = useRouter(); // Create a router object
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const URL=`${baseURL}/user/admin-login`;
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
        const token = data.token; // Extract the token from the response
        console.log(token);
        localStorage.setItem('token', token); // Store the token in local storage

        alert('Logged in successfully!');
        console.log('Successful login', data);

        // Redirect to the appList page
        router.push('/appList');
      } else {
        setErrorMessage('Incorrect username or password.');
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <main>
      <div className="grid place-items-center h-screen">
        <div className="shadow-lg p-5 rounded-lg border-t-4  border-green-400">
          <h1 className="text-xl font-bold my-4">Login</h1>
          
          <form onSubmit={handleLogin} className="flex flex-col gap-3">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Password"
            />
            <button className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2" type="submit">
              Login
            </button>
          </form>
          {errorMessage && (
            <p className="text-red-500 mb-2">{errorMessage}</p> // Display error message
          )}
        </div>
      </div>
    </main>
  );
}
