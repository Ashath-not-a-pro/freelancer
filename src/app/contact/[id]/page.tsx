"use client"

import { useState, useContext } from 'react';
import UserContext from '@/context/userContext';
import { NavBar } from '@/component/navBar';

export default function ConnectForm() {
  const [subject, setSubject] = useState('Invitation');
  const [description, setDescription] = useState('I love your works can we connect?');
  const context = useContext(UserContext)
  const userData = context?.user

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('/api/sendEmail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        subject,
        description,
        email: userData.email,
      }),
    });

    if (response.ok) {
      alert('Email sent successfully!');
    } else {
      alert('Failed to send email');
    }
  };

  return (
    <>
    <NavBar title={"Contact"}/>
    <div className="flex items-center justify-center min-h-screen bg-white shadow-lg rounded-lg">
      <form onSubmit={handleSubmit} className='border p-10'>
      <h2 className="text-2xl font-bold mb-6 text-center text-secondary underline">Contact</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Subject</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring focus:border-blue-500"
            placeholder="Enter subject"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring focus:border-blue-500"
            placeholder="Enter description"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-secondary hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Submit
        </button>
      </form>
    </div>
    </>
  );
}
