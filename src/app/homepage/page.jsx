// app/homepage/page.jsx

import React from 'react';
import { getUserFormData } from '@/lib/getUserFormData';
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'

const Homepage = async () => {
  const { data, error } = await getUserFormData();

  console.log("User Data:", data); // Log the user data to check if it's being fetched correctly  
  console.log("Error:", error); // Log any error that occurs during fetching  

  if (error) {
    return <div>Error loading user data: {error}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="text-xl font-semibold">
      <div className='mt-2 ml-2'>
      <SignedIn>
        <UserButton />
      </SignedIn>
      </div>
      <div className='ml-5 flex justify-center'>
        <p>Hello, {data.first_name} {data.last_name} , Welcome to the Kusrash Association Website! <br/> So you were born on {data.birth_date}. </p>
      </div>

    </div>
  );
};

export default Homepage;
