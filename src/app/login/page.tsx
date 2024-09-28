"use client"

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const LoginForm = () => {
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login with:', { mobile, password });
    // Call login API here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="bg-sky-100 p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center text-sky-600">Login</h2>
        <form onSubmit={handleSubmit} className="mt-6">
          <div className="mb-4">
            <label htmlFor="mobile" className="block text-sky-600">Mobile Number:</label>
            <input
              type="text"
              id="mobile"
              className="w-full p-2 border border-sky-300 rounded mt-1"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              required
              placeholder="Enter mobile number"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sky-600">Password:</label>
            <input
              type="password"
              id="password"
              className="w-full p-2 border border-sky-300 rounded mt-1 text-base"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-sky-600 text-white py-2 rounded hover:bg-sky-700 transition"
          >
            Login
          </button>
          <div className='text-sky-600 mt-2' onClick={()=> router.push('/register')}>new user? Register</div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
