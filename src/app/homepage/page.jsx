// app/homepage/page.jsx

import React from 'react';
import { getUserFormData } from '@/lib/getUserFormData';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import ClerkAuth from "@/components/ClerkAuth";

const Homepage = async () => {
  const { data, error } = await getUserFormData();

  console.log("User Data:", data); // Log the user data to check if it's being fetched correctly  
  console.log("Error:", error); // Log any error that occurs during fetching  

  if (error && error.code === 'PGRST116') {
    // This specific error code means no rows or multiple rows returned
    console.log("User needs to register first");
    redirect('/form');
  }

  return (
    <div className="min-h-screen text-xl font-semibold relative">
      <ClerkAuth />

      {error && (
        <div className="min-h-screen flex flex-col items-center justify-center">
          <p className="text-red-500 text-xl mb-4">Error loading user data: {error.message || "Unknown error"}</p>
          <Link href="/form" className="px-4 py-2 bg-purple-600 text-white rounded-lg">
            Register Now
          </Link>
        </div>
      )}

      {!data && !error && (
        <div className="min-h-screen flex flex-col items-center justify-center">
          <p className="text-xl mb-4">No profile found. Please register first.</p>
          <Link href="/form" className="px-4 py-2 bg-purple-600 text-white rounded-lg">
            Register Now
          </Link>
        </div>
      )}

      {data && (
        <div className="pt-16">
          <div className='ml-5 flex justify-center'>
            <p>Hello, {data.first_name} {data.last_name}, Welcome to the Kurash Association Website! <br/> So you were born on {data.birth_date}. </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Homepage;
