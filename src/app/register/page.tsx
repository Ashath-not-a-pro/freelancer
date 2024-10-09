"use client"

import { createUser } from '@/_actions/service';
import { message } from 'antd';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const RegisterForm = () => {
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [mail,setMail] = useState('')
  const [name, setName] = useState('');
  const [userType, setUserType] = useState('freelancer');

  const router = useRouter()

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    console.log('Register with:', { mobile, password, name, userType });
    
    try {
        await createUser({ mobile, password, name, user_type: userType })
        message.success("User created")
        router.push("/login")
    } catch (error:any){
        const errMsg = error?.stack.toString();
        if (errMsg.includes("duplicate")) {
          message.error("User already exist with this mobile. try login");
        }
        message.success("User created")
        router.push("/login")
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="bg-sky-100 p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-sky-600">Register</h2>
        <form onSubmit={handleSubmit} className="mt-6">
          <div className="mb-4">
            <label htmlFor="mobile" className="block text-sky-600">Mobile Number:</label>
            <input
              type="text"
              id="mobile"
              className="w-full p-2 border border-sky-300 rounded mt-1 text-base"
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
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-sky-600">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              className="w-full p-2 border border-sky-300 rounded mt-1 text-base"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Confirm password"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sky-600">Email:</label>
            <input
              type="email"
              id="email"
              className="w-full p-2 border border-sky-300 rounded mt-1 text-base"
              value={mail}
              onChange={(e) => setMail(e.target.value)}
              required
              placeholder="Email"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sky-600">Name:</label>
            <input
              type="text"
              id="name"
              className="w-full p-2 border border-sky-300 rounded mt-1 text-base"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="userType" className="block text-sky-600">User Type:</label>
            <select
              id="userType"
              className="w-full p-2 border border-sky-300 rounded mt-1 text-base"
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
            >
              <option value="freelancer" className='text-base'>Freelancer</option>
              <option value="recruiter" className='text-base'>Recruiter</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-sky-600 text-white py-2 rounded hover:bg-sky-700 transition"
          >
            Register
          </button>
        </form>
        <div className='text-sky-600 mt-2' onClick={()=> router.push('/login')}>already have account? Login</div>
      </div>
    </div>
  );
};

export default RegisterForm;
