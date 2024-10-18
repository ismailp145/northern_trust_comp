import React from 'react';
import Wallet from '../components/Wallet';
const Landing = () => {
  return (
    <main className="bg-blue-500 min-h-screen flex flex-col items-center justify-center text-black font-quicksand">
      <h1 className="text-4xl">Welcome to the Landing Page</h1>
      <p className="mt-4">This is the landing page of the website.</p>
      
      {/* Insert the Wallet component here */}
      <div className="mt-8">
        <Wallet />
      </div>
    </main>
  );
};

export default Landing;
