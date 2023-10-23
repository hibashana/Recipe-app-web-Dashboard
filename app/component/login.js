'use client'
import { useState } from 'react';

export default function LoginForm() {
  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Send a POST request to your back-end with formData (username and password)
    try {
      const response = await fetch('http://localhost:3002/api/v1/user/admin-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Handle successful login, e.g., save the token and user data
        const data = await response.json();
        const token = data.token; // Extract the token from the response
        console.log(token);
        // Store the token in local storage
        localStorage.setItem('token', token);

        alert("Logged in successfully !");
        console.log('Successful login', data);

      } else {
        // Handle login errors, e.g., display an error message
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <main>
        <div className=" grid place-items-center h-screen">
            <div className="shadow-lg p-5 rounded-lg border-t-4  border-green-400 ">

                <h1 className=" text-xl font-bold my-4 ">Login</h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <input type="text"
                      name="username" placeholder="Username"
                      value={formData.username}
                      onChange={handleChange}
                       required/>
                    <input type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required placeholder="Password"/>
                    <button className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2" type="submit">Login</button>
                 
                  <div></div>
                  {/* <Link href={'/register'}></Link> */}
                </form>
            </div>
        </div>
            </main>

  );
}

